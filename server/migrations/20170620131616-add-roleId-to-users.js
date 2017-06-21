'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   queryInterface.addColumn(
      'users',
      'roleId',
      Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
   queryInterface.removeColumn('users', 'roleId');
  }
};
