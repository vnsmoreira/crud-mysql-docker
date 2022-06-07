let database = null;

module.exports = {
  async connect() {
    try {
      const mysql = require('mysql2/promise');

      const uri = 'mysql://root:password@localhost:3306/mysql_db';
      const connection = await mysql.createConnection(uri);

      database = connection;
      console.info('Connected to database');
    } catch (err) {
      console.error('Could not connect to mysql');
    }
  },

  getDatabase() {
    return database;
  },
};
