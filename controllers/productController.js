import db from '../models/index.js';
const Product = db.Product;

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, available, stock_quantity } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      available,
      stock_quantity,
    });

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Could not create product.' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Could not retrieve products.' });
  }
};