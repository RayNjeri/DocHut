const document = require('../models').Document;

module.exports = {
  create(req, res) {
    document.create({
      content: req.body.content,
      userId: req.params.userId,
    })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },
};