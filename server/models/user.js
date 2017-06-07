'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      tableName: 'users',
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