const userController = require('../controllers').user;
const documentController = require('../controllers').document;
const { Auth, isAdmin } = require('../middlewares'); // authorise middlwares


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the User API!',
  }));

  app.post('/api/user', userController.create);
  app.post('/api/user/login', userController.login);
  app.get('/api/user', [Auth, isAdmin], userController.list);
  app.get('/api/user/:userId', userController.retrieve);
  app.get('/api/search/user', userController.searchUser);
  app.put('/api/user/:userId', userController.update);
  app.delete('/api/user/:userId', Auth, userController.destroy);
  app.post('/api/user/logout', userController.logout);

  app.post('/api/document', Auth, documentController.create);
  app.get('/api/document', Auth, documentController.list);
  // app.get('get/document/?limit={integer}&offset={integer}', documentController.list);
  app.get('/api/document/:documentId', Auth, documentController.retrieve);
  app.put('/api/document/:documentId', documentController.update);
  app.get('/api/search/document', documentController.findByTitle);
  app.delete('/api/document/:documentId', Auth, documentController.destroy);


  app.all('api/user/:userId', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
