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
    return user[method](params, includeDocuments);
  }

  return user[method](includeDocuments);
}

module.exports = {
  create(req, res) {
    user.create({
      userName: req.body.userName,
    })
      .then(user => res.status(201).send(user))
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
        user.update({ userName: req.body.userName || user.userName, })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    findWithDocuments('findById', req.params.userId)
      .then(user => {
        if (!todo) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        user.destroy()
          .then(() => res.status(204).send({ message: 'User Deleted Successfully' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};