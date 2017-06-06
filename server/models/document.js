'use strict';
module.exports = function(sequelize, DataTypes) {
  var document = sequelize.define('document', {
    content: DataTypes.STRING,
    access: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return document;
};