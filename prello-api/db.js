// connect to postgresql and error checking

var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://luan@localhost:5432/prello'); // no password
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

// why put it in a different file?