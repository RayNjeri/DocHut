const userController = require('../controllers').user;
const documentController = require('../controllers').document;
module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the User API!',
    }));

    app.post('/api/user', userController.create);
    app.get('/api/user', userController.list);
    app.get('/api/user/:userId', userController.retrieve);
    app.put('/api/user/:userId', userController.update);
    app.delete('/api/user/:userId', userController.destroy);

    app.post('/api/document', documentController.create);
    app.put('api/document/:documentId', documentController.update);
    app.delete('api/document/:documentId', documentController.destroy);

    app.all('api/user/:userId', (req, res) => res.status(405).send({
        message: 'Method Not Allowed',
    }));
};