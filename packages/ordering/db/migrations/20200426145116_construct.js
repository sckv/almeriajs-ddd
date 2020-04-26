exports.up = async (db) => {
  await db.schema.createTable('orders', (t) => {
    t.uuid('id').primary();
    t.enum('status', ['PREPARED', 'IN_PROCESS', 'DELIVERED', 'DISPATCHED']).defaultTo('IN_PROCESS');
    t.string('address');
    t.timestamp('created_at').defaultTo(db.fn.now());
    t.timestamp('updated_at').defaultTo(db.fn.now());
  });

  await db.schema.createTable('order_item', (t) => {
    t.uuid('id').primary();
    t.uuid('product_id').notNullable();
    t.integer('amount').notNullable();
    t.timestamp('created_at').defaultTo(db.fn.now());
  });

  await db.schema.createTable('order_line', (t) => {
    t.uuid('order_id').notNullable();
    t.uuid('order_item_id').notNullable();
    t.unique(['order_id', 'order_item_id']);
  });
};

exports.down = async (db) => db.schema.dropTable('invoices');
