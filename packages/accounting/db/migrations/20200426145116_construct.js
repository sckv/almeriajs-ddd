exports.up = async (db) => {
  await db.schema.createTable('accounts', (t) => {
    t.uuid('id').primary();
    t.string('email');
    t.string('password');
    t.decimal('balance');
    t.timestamp('created_at').defaultTo(db.fn.now());
  });
};

exports.down = async (db) => db.schema.dropTable('accounts')
