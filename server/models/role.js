
module.exports = function (sequelize, DataTypes) {
  const role = sequelize.define('role', {
    userId: DataTypes.INTEGER,
    flag: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate(models) {
          // associations can be defined here
      }
    }
  });
  return role;
};
