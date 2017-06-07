const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_TOKEN_KEY;

const { Document, User } = require('../models')

const findWithDocuments = (method, params) => {
  const includeDocuments = {
    include: [{
      model: document,
      as: 'documents',
    }],
  };

  if (params) {
    return User[method](params, includeDocuments);
  }

  return User[method](includeDocuments);
}

module.exports = {
  create(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: 'Enter All Required Fields' });
    }

    User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    })
      .then(user => res.status(201).json(user))
      .catch(error => res.status(400).send(error));
  },


  list(req, res) {
    findWithDocuments('findAll')
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    findWithDocuments('findById', req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    findWithDocuments('findById', req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        User.update({ userName: req.body.userName || user.userName, })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    findWithDocuments('findById', req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        User.destroy()
          .then(() => res.status(204).send({ message: 'User Deleted Successfully' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};