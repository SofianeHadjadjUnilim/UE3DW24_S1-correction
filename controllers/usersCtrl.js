const models = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await models.User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await models.User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async createUser(req, res) {
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname) {
      return res.status(400).json({ error: 'Please provide valid data' });
    }

    try {
      const user = await models.User.create({ firstname, lastname });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateUser(req, res) {
    const { id, firstname, lastname } = req.body;

    if (!id || (!firstname && !lastname)) {
      return res.status(400).json({ error: 'Please provide valid data' });
    }

    try {
      const [updated] = await models.User.update(
        { firstname, lastname },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Please provide a valid ID' });
    }

    try {
      const deleted = await models.User.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
