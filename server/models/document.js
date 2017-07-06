module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'documents',
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Document.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
      },
    },
  });
  return Document;
};
