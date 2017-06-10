const document = require('../models').Document;

module.exports = {
  create(req, res) {
    document.create({
      content: req.body.content,
      userId: req.body.userId,
      access: req.body.access,
    })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    document.findById(req.params.id, {
    })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        document.update({
          content: req.body.content || document.content,
          access: req.body.access || document.access,
        })
          .then(() => res.status(200).send(document))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    document.findAll({
    })
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    document.findById(req.params.documentId)
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'Document Not Found',

          });
        }
        return res.status(200).send(resp);
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    document.findById(req.params.documentId)
      .then((resp) => {
        if (!resp) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        resp.destroy()
          .then(() => res.status(200).send({ message: 'Document Succesfully deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
}


