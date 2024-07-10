console.log('Server is started!');

const db = require('./src/db/models');

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Connection with DB cars has been successfully done!`);
  } catch (error) {
    console.log(`Can't connect to DB: `, error.message);
  }
};

dbCheck();
