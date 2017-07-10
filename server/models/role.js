'use strict';
module.exports = function(sequelize, DataTypes) {
  let Role = sequelize.define('Role', {
    roleName: {
      type:DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Oops. Looks like this roleName already exists',
        fields: [sequelize.fn('lower', sequelize.col('roles'))]
      },
    },
   

  }, {
    tableName: 'roles',      
    classMethods: {
      associate: function(models) {
                    // associations can be defined here
        Role.hasMany(models.User, {
          as: 'users',
          foreignKey: 'roleId',
          allowNull: false,
        });
        Role.hasMany(models.Document, {
          as: 'documents',
          foreignKey: 'roleId',
          allowNull: false,
        });
      }
    }
  });
  return Role;
};
