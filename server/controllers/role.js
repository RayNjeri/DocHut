const Role = require('../models').Role;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Role.create({
      roleName: req.body.roleName,
    })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },

  getRoles(req, res) {
    return Role
      .all({
        include: [{
          model: User,
          as: 'users',
        }, {
          model: Document,
          as: 'documents'
        }],
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },

  getarole(req, res) {
    return Role
      .find({
        where: {
          id: req.params.roleId,
        },
        include: [{
          model: User,
          as: 'users',
        }],
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',

          });
        }
        return res.status(200).send(role);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Role
      .find({
        where: {
          id: req.params.roleId,
        },
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }

        return Role
          .update({
            roleName: req.body.roleName || role.roleName,
          })
          .then(updatedRole => res.status(200).send(updatedRole))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },


  destroy(req, res) {
    return Role
      .find({
        where: {
          id: req.params.roleId,
        },
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }

        return role
          .destroy()
          .then(() => res.status(202).send({ message: 'Role deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};