var express      = require('express');
var usersCtrl    = require('../controllers/usersCtrl');

exports.router = (function() {
  var apiRouter = express.Router();

  apiRouter.route('/users/').get(usersCtrl.getAllUsers);
  apiRouter.route('/user/:id').get(usersCtrl.getOneUser);
  apiRouter.route('/createuser').post(usersCtrl.createUser);
  apiRouter.route('/updateuser').put(usersCtrl.updateUser);
  apiRouter.route('/deleteuser').delete(usersCtrl.deleteUser);

  return apiRouter;
})();
