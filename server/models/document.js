
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Document;
};
