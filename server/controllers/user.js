const user = require('../models').User;
const document = require('../models').Document;

module.exports = {
  create(req, res) {
    user.create({
      userName: req.body.userName,
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    user.all()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    user.findAll({
      include: [{
        model: document,
        as: 'documents',
      }],
    })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    user.findById(req.params.userId, {
      include: [{
        model: document,
        as: 'documents',
      }],
    })
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
};