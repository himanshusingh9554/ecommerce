import { DataTypes, Model } from 'sequelize';

export default class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
        },
        available: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        stock_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'Product',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.OrderItem, { foreignKey: 'productId' });
  }
}