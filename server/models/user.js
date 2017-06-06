'use strict';
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          User.hasMany(models.Document, {
            foreignKey: 'userId',
            as: 'documents',
          });
        },
      },
    });
  return User;
};