console.log('Server is started!');
// ===================================
const db = require('./src/db/models');
// ===================================
const {
  Brand,
  Type,
  Country,
  Sequelize: { Op },
  sequelize,
} = db;
const { brands, types, countries } = require('./src/constants');

const newBrand = {
  title: 'ZAZ',
  description: 'Famous Ukrainian auto brand',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const newCountry = {
  title: 'JPPPPPPPPPPP',
  description: 'Japan',
  created_at: new Date(),
  updated_at: new Date(),
};

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

const addItem = async (model, values) => {
  try {
    const type = await model.create(values, {
      returning: ['id'],
      raw: true,
      validate: false,
    });
    console.log(type);
  } catch (error) {
    console.log(`Can't add item to table:`, error.message);
  }
};

// addItem(Country, newCountry);

const deleteItem = async (model) => {
  try {
    const delAmount = await model.destroy({
      where: {
        title: 'ZAZ',
      },
    });
    console.log(`Number of deleting rows: ${delAmount}`);
  } catch (error) {
    console.log(`Can't delete item from table:`, error.message);
  }
};

// deleteItem(Brand)

const addItems = async (model, values) => {
  try {
    await model.bulkCreate(values, {
      // fields: ['title', 'description'],
    });
  } catch (error) {
    console.log(`Can't add items to table:`, error.message);
  }
};

// addItems(Brand, brands)
// addItems(Type, types)
// addItems(Country, countries)

const getItems = async (model) => {
  try {
    const gettingItems = await model.findAll({
      where: {
        // id: 2,
        title: {
          [Op.like]: 'L%',
        },
      },
      raw: true,
      // attributes: ['id', ['title', 'name']],
      group: 'id',
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
        include: [[db.sequelize.fn('SUM', db.sequelize.col('id')), 'Total']],
      },
    });
    // console.log(gettingItems);
    gettingItems.forEach((item) => {
      console.log(`Item is: `, item);
    });
  } catch (error) {
    console.log(`Can't get items from table:`, error.message);
  }
};

// getItems(Type);
