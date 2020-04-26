exports.up = async (db) => {
  await db.schema.createTable('product', (t) => {
    t.uuid('id').primary();
    t.string('name');
    t.decimal('price');
    t.integer('amount');
    t.timestamp('created_at').defaultTo(db.fn.now());
    t.timestamp('updated_at').defaultTo(db.fn.now());
  });
};

exports.down = async (db) => {
  await db.schema.dropTable('product');
};
