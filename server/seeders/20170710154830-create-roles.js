'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {id:1, roleName: "admin", createdAt: new Date(), updatedAt: new Date() },
      {id:2, roleName: "user", createdAt: new Date(), updatedAt: new Date() }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
   
    return queryInterface.bulkDelete('roles', null, {});
  
  }
};
