exports.up = async (db) => {
  await db.schema.createTable('account', (t) => {
    t.string('email').primary();
    t.string('password');
    t.decimal('balance');
    t.timestamp('created_at').defaultTo(db.fn.now());
  });
  await db.schema.createTable('invoice', (t) => {
    t.uuid('id').primary();
    t.string('email').references('email').inTable('account');
    t.uuid('order_id');
    t.decimal('tax');
    t.decimal('price');
    t.boolean('charged').defaultTo(false);
    t.boolean('paid').defaultTo(false);
    t.string('address');
    t.timestamp('created_at').defaultTo(db.fn.now());
  });
};

exports.down = async (db) => {
  await db.schema.dropTable('account');
  await db.schema.dropTable('invoice');
};
