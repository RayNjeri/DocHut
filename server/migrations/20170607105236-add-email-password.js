'use strict';
const getColumns = (Sequelize) => ({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = {
  up: function (queryInterface, Sequelize) {
    const columns = getColumns(Sequelize);
    const colNames = Object.keys(columns);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const addPromises = colNames.map(name => queryInterface.addColumn(
      'users',
      name,
      columns[name]
    ));
    return Promise.all(addPromises);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    const colNames = Object.keys(getColumns(Sequelize));
    const dropPromises = colNames.map(name => queryInterface.removeColumn(
      'users',
      name
    ));
    return Promise.all(dropPromises);
  }
};
