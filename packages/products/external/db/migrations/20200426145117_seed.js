const casual = require('casual');
const uuid = require('uuid');

exports.up = async (db) => {
  await Promise.all(
    new Array(100).fill(null).map(async () => {
      return await db('product').insert({
        id: uuid.v1(),
        name: casual.title,
        price: casual.double(1, 20),
        amount: casual.integer(1, 10),
      });
    })
  );
};

exports.down = async (db) => {};
