const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const secretKey = process.env.SECRET_TOKEN_KEY;

const saltRounds = bcrypt.genSaltSync(10);

const User = require('../models').User;
const document = require('../models').Document;

// create an static method to handle inclutions

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
};

module.exports = {

  // create a new user

  create(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const roleId = 2;

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: 'Enter All Required Fields' });
    } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
      return res.status(400).json({ message: 'Please Enter A Valid Email Address' });
    }
    User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      roleId,
    })
      .then((user) => {
        const token = jwt.sign({ userId: user.id, roleId }, secretKey, { expiresIn: '24h' });
        let data = {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          token: token
        };
        return res.status(201).json(data);
      })
      .catch(error => res.status(400).send(error));
  },

  // login a user

  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Invalid user',
          });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).send({
            message: 'Password/email does not match'
          });
        }
        const token = jwt.sign({ userId: user.id, roleId: user.roleId }, secretKey, { expiresIn: '24h' });
        return res.status(200).send({
          message: 'You were successfully logged in',
          user,
          token,
          expiresIn: '24h'
        });

      })
      .catch(() => {
        res.status(401).send({
          message: 'Invalid login credentials'
        });
      });
  },

  // Find matching instances of user

  list(req, res) {
    findWithDocuments('findAll')
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  // Find user

  retrieve(req, res) {
    findWithDocuments('findById', req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  // Update user attributes
  update(req, res) {
    findWithDocuments('findById', req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        user.update(req.body, { fields: Object.keys(req.body) })
          .then((updatedUser) => {
            res.status(201).send(updatedUser);
          })
          .catch(error => { console.log('update catch', error); res.status(400).send(error); });
      })
      .catch(error => { console.log('Final catch', error); res.status(400).send(error); });
  },

  // delete a user

  destroy(req, res) {
    User.findById(req.params.userId)
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        resp.destroy()
          .then(() => res.status(204).send({ message: 'user deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  // search existing user

  searchUser(req, res) {
    if (!req.query.q) {
      return res.status(400).send({ message: 'please provide query' });
    }
    return User.findAll({
      where: {
        $or: [
          { firstName: { $like: `%${req.query.q}%` } },
          { lastName: { $like: `%${req.query.q}%` } },
          { userName: { $like: `%${req.query.q}%` } },
          { email: { $like: `%${req.query.q}%` } }
        ]
      }
    })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));

  },

  // logout a user
  logout(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }
};

