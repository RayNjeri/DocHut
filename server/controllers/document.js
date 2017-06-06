const document = require('../models').document;

module.exports = {
    create(req, res) {
        return document
            .create({
                title: req.body.title,
            })
            .then(document => res.status(201).send(document))
            .catch(error => res.status(400).send(error));
    },
};