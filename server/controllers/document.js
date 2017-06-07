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

  update(req, res) {
    return document
      .find({
        where: {
          id: req.params.documentId,
          userId: req.params.userId,
        },
      })
      .then(document => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        document.update({
          content: req.body.content || document.content,
          access: req.body.access || document.access,
        })
          .then(updateddocument => res.status(200).send(updateddocument))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    document.find({
      where: {
        id: req.params.documentId,
        userId: req.params.documentId,
      },
    })
      .then(document => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        document.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error));
  }
}


