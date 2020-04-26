exports.up = async (db) => {
  await db.schema.createTable('invoices', (t) => {
    t.uuid('id').primary();
    t.uuid('account_id').references('id').inTable('accounts');
    t.uuid('order_id');
    t.decimal('tax');
    t.decimal('price');
    t.boolean('charged').defaultTo(false);
    t.paid('paid').defaultTo(false);
    t.string('address');
    t.timestamp('created_at').defaultTo(db.fn.now());
  });
};

exports.down = async (db) => db.schema.dropTable('invoices');
