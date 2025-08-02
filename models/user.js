import { DataTypes, Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('customer', 'admin'),
          allowNull: false,
          defaultValue: 'customer',
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'userId' });
  }
}