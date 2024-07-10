console.log('Server is started!');

const db = require('./src/db/models');

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with DB ${process.env.DB_NAME.toUpperCase()} has been successfully done!`
    );
  } catch (error) {
    console.log(`Can't connect to DB: `, error.message);
  }
};

dbCheck();

const dropTypesTable = async () => {
  try {
    await db.Type.drop();
    console.log(`Table ${db.Type.name} has been droped!`);
  } catch (error) {
    console.log(`Can't drop table: `, error.message);
  }
};

// dropTypesTable();

const syncTypeTable = async () => {
  try {
    await db.Type.sync();
    console.log(`Sync table has been done!`);
  } catch (error) {
    console.log(`Can't sync table: `, error.message);
  }
};

// syncTypeTable();
