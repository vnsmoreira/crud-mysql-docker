const User = require('../../services/user');

module.exports = {
  async listUsers_GET(req, res) {
    try {
      const users = await User.listUsers();

      return res.send({ users });
    } catch (err) {
      return res.status(400).send({ error: 'Error listing users' });
    }
  },

  async showUser_GET(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).send({ error: 'You need to provide an userId' });
      }

      const user = await User.showUser(userId);

      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: 'Error listing user' });
    }
  },

  async createUser_POST(req, res) {
    try {
      const requiredFields = ['name', 'email', 'password'];

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).send({ error: `You need to provide ${field} field` });
        }
      }

      if (await User.userExists(req.body.email)) {
        return res.status(400).send({ error: 'Email has already been registered' });
      }

      const user = await User.createUser(req.body);

      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: 'Error creating user' });
    }
  },

  async updateUser_PUT(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).send({ error: 'You need to provide an userId' });
      }

      const requiredFields = ['name', 'email', 'password'];

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).send({ error: `You need to provide ${field} field` });
        }
      }

      const user = await User.updateUser(userId, req.body);

      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: 'Error updating user' });
    }
  },

  async deleteUser_DELETE(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).send({ error: 'You need to provide an userId' });
      }

      const deleted = await User.deleteUser(userId);

      if (!deleted) {
        return res.status(400).send({ error: 'Could not delete user' });
      }

      return res.send({ message: 'User has been successfully deleted' });
    } catch (err) {
      return res.status(400).send({ error: 'Error deleting user' });
    }
  },
};
