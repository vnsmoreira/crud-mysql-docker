const db = require('../database');
const bcrypt = require('bcryptjs');

const database = db.getDatabase();

module.exports = {
  async userExists(email) {
    const query = 'SELECT id,name,email FROM users WHERE email LIKE ?';

    const [rows] = await database.query(query, [email]);
    const [user] = rows;

    return user;
  },

  async listUsers() {
    const query = 'SELECT id, name, email FROM users';

    const [users] = await database.query(query);

    return users;
  },

  async showUser(userId) {
    const query = 'SELECT id, name, email FROM users WHERE id = ?';

    const [rows] = await database.query(query, [userId]);
    const [user] = rows;

    return user;
  },

  async createUser(user) {
    const { name, email, password } = user;

    const passwordHash = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password_hash) VALUES(?, ?, ?)';

    const [sqlLog] = await database.query(query, [name, email, passwordHash]);
    const { insertId: userId } = sqlLog;

    const newUser = { ...user, userId };
    newUser.password = undefined;

    return newUser;
  },

  async updateUser(userId, user) {
    const { name, email, password } = user;

    const passwordHash = await bcrypt.hash(password, 10);

    const query = 'UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?';

    const [rows] = await database.query(query, [name, email, passwordHash, userId]);
    const updated = rows.changedRows > 0;

    const updatedUser = { ...user, userId };
    updatedUser.password = undefined;

    return updated ? updatedUser : null;
  },

  async deleteUser(userId) {
    const query = 'DELETE FROM users WHERE id = ?';

    const [rows] = await database.query(query, [userId]);
    const deleted = rows.affectedRows > 0;

    return deleted;
  },
};
