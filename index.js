console.log('Server is started!');

const bcrypt = require('bcrypt');
// ===================================
const db = require('./src/db/models');
// ===================================
const {
  Brand,
  Type,
  Country,
  User,
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

const newUser = {
  full_name: 'Petr Pyatochkin',
  email: 'p_p@gmail.com',
  password: 'QWERTY12',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const newCountry = {
  title: 'JPPPPPPPPPPP',
  description: 'Japan',
  created_at: new Date(),
  updated_at: new Date(),
};

const updatedCountry = {
  title: 'JP',
  updated_at: new Date(),
};

const updatedCounties = {
  description: 'Unknown',
  updated_at: new Date(),
};

// =================== DB CHECK =====================

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

// =================== DROP =====================

const dropSomeTable = async (model) => {
  try {
    await model.drop();
    console.log(`Table ${model.name} has been droped!`);
  } catch (error) {
    console.log(`Can't drop table: `, error.message);
  }
};

// dropSomeTable(Country)

// =================== SYNC =====================

const syncSomeTable = async (model) => {
  try {
    await model.sync({ alter: true });
    console.log(`Sync ${model.name} table has been done!`);
  } catch (error) {
    console.log(`Can't sync table: `, error.message);
  }
};

//  syncSomeTable(User)
//  syncSomeTable(Brand)
//  syncSomeTable(Country)

// =================== ADD =====================

const addItem = async (model, values) => {
  try {
    const type = await model.create(values, {
      returning: ['id'],
      // raw: true,
      // validate: false,
    });
    console.log(type);
  } catch (error) {
    console.log(`Can't add item to table:`, error.message);
  }
};

// addItem(Country, newCountry);
// addItem(User, newUser);

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

// =================== DELETE =====================

const deleteItem = async (model) => {
  try {
    const delAmount = await model.destroy({
      where: {
        // title: 'ZAZ',

        full_name: 'vasya pupkin',
      },
    });
    console.log(`Number of deleting rows: ${delAmount}`);
  } catch (error) {
    console.log(`Can't delete item from table:`, error.message);
  }
};

// deleteItem(Brand)
// deleteItem(User)

// =================== GET =====================

const getItems = async (model) => {
  try {
    const gettingItems = await model.findAll({
      where: {
        // id: 2,

        // title: {
        //   [Op.like]: 'L%',
        // },

        full_name: {
          [Op.like]: 'vas%',
        },
      },

      // raw: true,
      // attributes: ['id', ['title', 'name']],
      // group: 'id',
      // attributes: {
      // exclude: ['createdAt', 'updatedAt'],
      // include: [[db.sequelize.fn('SUM', db.sequelize.col('id')), 'Total']],
      // },
    });
    // console.log(gettingItems);

    gettingItems.forEach((item) => {
      console.log(`Item is: `, item.full_name);
    });
  } catch (error) {
    console.log(`Can't get items from table:`, error.message);
  }
};

// getItems(Type);
// getItems(User);

// =================== UPDATE =====================

const changeItems = async (model, values) => {
  try {
    // const updatedItems = await model.update(values, {
    const [number, result] = await model.update(values, {
      where: {
        // id: 8,

        title: {
          [Op.like]: 'U%',
        },
      },
      // returning: ['id'],

      returning: ['*'],
      raw: true,
    });
    // console.log(updatedItems);

    console.log(number);
    console.log(result);
  } catch (error) {
    console.log(`Can't update items from table:`, error.message);
  }
};

// changeItems(Country, updatedCounties)

// =================== CRYPT TEST =====================

const cryptTest = async () => {
  const password = 'ASDFGHJ';
  const anotherOnePassword = 'JHGFDSA';
  const hash = await bcrypt.hash(password, 10);
  console.log(`Hash is: `, hash);

  const compareResult = await bcrypt.compare(password, hash);
  console.log(`Right: `, compareResult);

  const otherCompareResult = await bcrypt.compare(anotherOnePassword, hash);
  console.log(`Error: `, otherCompareResult);
};

// cryptTest();
