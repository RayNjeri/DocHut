const Document = require('../models').Document;

// create document

module.exports = {
  create(req, res) {
    Document.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.userId,
      access: req.body.access,
    })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },

  // update document by Id

  update(req, res) {
    Document.findById(req.params.documentId, {
    })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        Document.update({
          content: req.body.content || document.content,
          access: req.body.access || document.access,
        })
          .then(() => res.status(201).send(document))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  // list all documents

  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return Document.findAll({ offset: req.query.offset, limit: req.query.limit })
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error));
    }
    Document.all()
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send(error));
  },

  // get a document by id

  retrieve(req, res) {
    Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',

          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  },

  // delete a document

  destroy(req, res) {
    Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        document.destroy()
          .then(() => res.status(204).send({ message: 'Document Succesfully deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  //search document

  findByContent(req, res) {
    return Document
      .findAll({
        where: {
          content: { $like: `%${req.query.q}%` }
        }
      })
      .then(response => res.status(302).send(response))
      .catch(error => res.status(400).send(error));
  },

};

