const models    = require('../models');

module.exports = {

  getAllUsers: function(req, res) {
    models.User.findAll(
      ).then(function(user) {
        res.status(200).json(user);
    });
  },

  getOneUser: function(req, res) {
    models.User.findOne({
      where: { id: req.params.id }
    }).then(function(user) {
      if (user == null) {
        res.status(404).json({"not found" : 404})
      } else {
        res.status(200).json(user)
      }
    });
  },

  createUser: function (req, res) {
    if (req.body.firstname && req.body.lastname) {
      models.User.create(
        { firstname: req.body.firstname, lastname: req.body.lastname }
      ).then(function (user) {
            res.status(201).json(user)
      })
    } else {
      res.status(500).json({"Please check your data" : 500})
    }
  },

  updateUser: function (req, res) {
    models.User.update({ firstname: req.body.firstname, lastname: req.body.lastname }, {
        where: { id: req.body.id }
    }
    ).then(function (user) {
        if (user == 1) {
          res.status(200).json({"succes" : 200})
        } else {
          res.status(500).json({"failed" : 500})
        }
    })
  },

  deleteUser: function (req, res) {

    if (req.body.id) {
      models.User.destroy({
          where: { id: req.body.id }
      }
      ).then(function (user) {
        if (user == 1) {
          res.status(200).json({"succes" : 200})
        } else {
          res.status(404).json({"not found": 404})
        }
      })
    } else {
      res.status(500).json({"Please check your data" : 500})
    }


  }

}
