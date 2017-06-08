const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_TOKEN_KEY;

const saltRounds = 10;

const user = require('../models').User;
const document = require('../models').Document;

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
    let password = bcrypt.hashSync(req.body.password, saltRounds);

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: 'Enter All Required Fields' });
    } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
      return res.status(401).json({ message: 'Please Enter A Valid Email Address' });
    } else {
      user.create({
        firstName,
        lastName,
        userName,
        email,
        password,
      })
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).send(error));
    }
  },

  login(req, res) {
    user.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(403).send({
            message: 'Invalid user',
          });
        }
        if (user && user.validatePassword(req.body.password)) {
          const payload = {
            userId: user.id,
            userName: user.userName
          };
          const token = jwt.sign(payload, secret, { expiresIn: '24h' });
          res.status(200).send({
            message: 'You were successfully logged in',
            token,
            expiresIn: '24h'
          });
        } else {
          res.status(401).send({
            message: 'Invalid login credentials',
          });
        }
      })
      .catch(() => {
        res.status(401).send({
          error: 'Invalid login credentials'
        });
      });
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