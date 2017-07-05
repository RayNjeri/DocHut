'use strict';
module.exports = function(sequelize, DataTypes) {
    let role = sequelize.define('role', {
        roleName: DataTypes.STRING,

    }, {
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                    role.hasMany(models.User, {
                        as: 'users',
                        foreignKey: 'roleId',
                        allowNull: false,
                    });
                    role.hasMany(models.Document, {
                        as: 'Documents',
                        foreignKey: 'roleId',
                        allowNull: false,
                    });
                }
            }
        });
    return role;
};