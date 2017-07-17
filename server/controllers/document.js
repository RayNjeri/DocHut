const { Document, Role } = require('../models');

// create document

module.exports = {
  create(req, res) {
    const { userId, roleId } = req;
    const data = {
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      userId,
      roleId,
    };

    if (req.body.access === 'role') {
      Role.findById(roleId)
        .then((role) => {
          data.access = role.roleName;  
          Document.create(data)
                .then(document => res.status(201).send(document))
                .catch(error => res.status(400).send(error));
        });
    } else {
      Document.create(data)
            .then(document => res.status(201).send(document))
            .catch(error => res.status(400).send(error));  
    }
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
      document.update(req.body, { fields: Object.keys(req.body)})
      .then(() => res.status(201).send(document))
      .catch(error => {
        console.log("xxxx", error );
        res.status(400).send(error); 
      });
    })
    .catch(error => {
      res.status(400).send(error);
    });
  },

    // list all documents

  list(req, res) {
    const findDocs = (query) => {
      return Document.findAll({
        offset: req.query.offset,
        limit: req.query.limit,
        query})
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error));
    };
    const querySearch = (offset, limit, isPublic, roleId) => {
      let query = {
        where: {
          $or: []
        }
      };
      if (offset) {
        req.query.offset = offset;
      }
      if (limit) {
        req.query.limit = limit;
      }
      if (isPublic) {
        query.where.$or.push({ access: 'public' });
      }
      if (roleId) {
        Role.findById(roleId)
          .then((role) => {
            query.where.$or.push({ access: role.roleName });
            findDocs(query);
          });
      } else {
        findDocs(query);
      }
    };
    const allSearch = (isPublic) => {
      let query = {};
      if (isPublic) {
        query.where = {
          access: 'public'
        };
      }
      return Document.findAll(query)
                .then(document => res.status(200).send(document))
                .catch(error => res.status(400).send(error));
    };
    if (req.roleId == 1) {
      if (req.query.limit || req.query.offset) {
        querySearch(req.query.offset, req.query.limit);
      } else {
        allSearch();
      }
    } else {
      if (req.query.limit || req.query.offset) {
        querySearch(req.query.offset, req.query.limit, true, req.roleId);
      } else {
        querySearch(null, null, true, req.roleId);
       
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

