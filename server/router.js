const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getFriends', mid.requiresLogin, controllers.Friends.getFriends);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.post('/newPass', mid.requiresSecure, mid.requiresLogout, controllers.Account.newPass);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/friend', mid.requiresLogin, controllers.Friends.friendPage);
  app.post('/friend', mid.requiresLogin, controllers.Friends.addFriend);

  // app.get('/funds', mid.requiresLogin, controllers.Friends.fundsPage);
  app.post('/funds', mid.requiresLogin, controllers.Friends.addFunds);
  app.post('/transfer', mid.requiresLogin, controllers.Friends.transferFunds);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
