import { DataTypes, Model } from 'sequelize';

export class Order extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        customer_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        total_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('PENDING', 'PAID', 'SHIPPED', 'DELIVERED'),
          defaultValue: 'PENDING',
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users', 
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Order',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
  }
}

export class OrderItem extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price_at_purchase: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        orderId: {
          type: DataTypes.INTEGER,
          references: { model: 'Orders', key: 'id' },
        },
        productId: {
          type: DataTypes.INTEGER,
          references: { model: 'Products', key: 'id' },
        },
      },
      {
        sequelize,
        modelName: 'OrderItem',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'orderId' });
    this.belongsTo(models.Product, { foreignKey: 'productId' });
  }
}