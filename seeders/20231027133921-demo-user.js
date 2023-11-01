'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
        user_name:'1',
        firstName: 'John',
        lastName: 'Doe',
        email:'example@example.com',
        username:'TestUser1',
        password:'TestPassword',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
