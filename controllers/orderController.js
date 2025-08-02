import db from '../models/index.js';
import { Op } from 'sequelize';

const { Order, OrderItem, Product, sequelize } = db;

export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { customer_name, items } = req.body; 
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).send({ message: 'Order must contain at least one item.' });
    }

    let totalPrice = 0;
    const productsToUpdate = [];
    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      if (!product.available) {
        throw new Error(`Product "${product.name}" is not available for order.`);
      }
      if (product.stock_quantity < item.quantity) {
        throw new Error(`Not enough stock for "${product.name}". Requested: ${item.quantity}, Available: ${product.stock_quantity}.`);
      }

      totalPrice += product.price * item.quantity;
      productsToUpdate.push({ product, quantity: item.quantity, price_at_purchase: product.price });
    }
    const order = await Order.create(
      { customer_name, total_price: totalPrice, userId, status: 'PENDING' },
      { transaction: t }
    );
    for (const itemData of productsToUpdate) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: itemData.product.id,
          quantity: itemData.quantity,
          price_at_purchase: itemData.price_at_purchase,
        },
        { transaction: t }
      );
      await itemData.product.decrement('stock_quantity', { by: itemData.quantity, transaction: t });
    }
    await t.commit();
    res.status(201).send({ message: 'Order placed successfully!', orderId: order.id });

  } catch (error) {
    await t.rollback();
    res.status(400).send({ message: error.message || 'Failed to place order.' });
  }
};

export const getDailyReport = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const { count: totalTransactions } = await Order.findAndCountAll({
            where: {
                createdAt: {
                    [Op.between]: [todayStart, todayEnd],
                },
            },
        });

        const totalRevenue = await Order.sum('total_price', {
            where: {
                createdAt: {
                    [Op.between]: [todayStart, todayEnd],
                },
            },
        });

        const topProducts = await OrderItem.findAll({
            attributes: [
                'productId',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantitySold'],
            ],
            include: [{
                model: Order,
                where: {
                    createdAt: {
                        [Op.between]: [todayStart, todayEnd],
                    },
                },
                attributes: [],
            },{
                model: Product,
                attributes: ['name']
            }],
            group: ['productId', 'Product.id'],
    order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
            limit: 3,
        });

        res.status(200).send({
            date: todayStart.toISOString().split('T')[0],
            totalTransactions,
            totalRevenue: totalRevenue || 0,
            topSellingProducts: topProducts,
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Could not generate report." });
    }
};