'use strict';
module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    userId: DataTypes.INTEGER,
    flag: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return role;
};