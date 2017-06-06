'use strict';
module.exports = function (sequelize, DataTypes) {
  var document = sequelize.define('document', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          document.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
          });
        },
      },
    });
  return document;
};