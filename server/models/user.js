const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
        unique: {
          args: true,
          msg:
            'Oops. Looks like you already have an account with this email address. Please try to login.',
          fields: [sequelize.fn('lower', sequelize.col('email'))]
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'The email you entered is invalid or is already in our system.'
          },
          max: {
            args: 254,
            msg:
              'The email you entered is invalid or longer than 254 characters.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      classMethods: {
        associate: models => {
          User.hasMany(models.Document, {
            foreignKey: 'userId',
            as: 'documents'
          });
        }
      },
      hooks: {
        afterValidate(instance) {
          if (instance.changed('password')) {
            instance.set('password', bcrypt.hashSync(instance.get('password')));
          }
        }
      }
    }
  );

  return User;
};
