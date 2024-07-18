console.log('Server is started!');
// ===================================
const db = require('./src/db/models');
// ===================================
const { Brand, Type, Country } = db;

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

const dropSomeTable = async (model) => {
  try {
    await model.drop();
    console.log(`Table ${model.name} has been droped!`);
  } catch (error) {
    console.log(`Can't drop table: `, error.message);
  }
};

// dropSomeTable(Country)

const syncSomeTable = async (model) => {
  try {
    await model.sync({ alter: true });
    console.log(`Sync ${model.name} table has been done!`);
  } catch (error) {
    console.log(`Can't sync table: `, error.message);
  }
};

//  syncSomeTable(Country)

const addType = async () => {
  const newType = {
    title: 'Crossover2',
    description: 'The most popular type for city',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    const type = await db.Type.create(newType, {
      returning: ['id', 'updatedAt'],
    });
    console.log(type.dataValues);
  } catch (error) {
    console.log(`Can't add item to table:`, error.message);
  }
};

// addType();
