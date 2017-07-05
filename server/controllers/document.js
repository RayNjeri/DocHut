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
    const querySearch = (offset, limit, isPublic) => {
      let query = {};
      if (offset) {
        query.offset = offset;
      }
      if (limit) {
        query.limit = limit;
      }
      if (isPublic) {
        query.where = {
          access: 'public'
        };
      }
      return Document.findAll(query)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error));
    };
    const allSearch = (isPublic) => {
      let query = {};
      if (isPublic) {
        console.log('IS PUBLIC RAN');
        query.where = {
          access: 'public'
        };
      }
      return Document.findAll(query)
        .then(document => res.status(200).send(document))
        .catch(error => res.status(400).send(error));
    };
    if (req.roleId == 1) {
      console.log('IS AN ADMIN');
      if (req.query.limit || req.query.offset) {
        querySearch(req.query.offset, req.query.limit);
      } else {
        allSearch();
      }
    } else {
      console.log('NOT AN ADMIN!!');
      if (req.query.limit || req.query.offset) {
        console.log('QUERY');
        querySearch(req.query.offset, req.query.limit, true);
      } else {
        console.log('NO QUERY');
        allSearch(true);
      }
    }
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

  findByTitle(req, res) {
    return Document
      .findAll({
        where: {
          title: { $ilike: `%${req.query.q}%` }
        }
      })
      .then(response => res.status(302).send(response))
      .catch(error => res.status(400).send(error));
  },

};

