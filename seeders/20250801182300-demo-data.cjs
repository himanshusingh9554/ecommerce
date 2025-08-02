'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Products', [{
      name: 'Laptop Pro X',
      price: 1499.99,
      category: 'Electronics',
      available: true,
      stock_quantity: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Wireless Keyboard',
      price: 75.00,
      category: 'Accessories',
      available: true,
      stock_quantity: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};