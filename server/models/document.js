'use strict';
module.exports = function (sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
  }, {
      tableName: 'documents',
      classMethods: {
        associate: (models) => {
          // associations can be defined here
          Document.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
          });
        },
      },
    });
  return Document;
};