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
        as: 'document',
      }],
    })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
};