'use strict';
module.exports = function (sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
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
  return Document;
};