exports.up = async (db) => {
  await db.schema.createTable('order', (t) => {
    t.uuid('id').primary();
    t.string('email');
    t.enum('status', ['PREPARED', 'IN_PROCESS', 'DELIVERED', 'DISPATCHED']).defaultTo('IN_PROCESS');
    t.string('address');
    t.timestamp('created_at').defaultTo(db.fn.now());
    t.timestamp('updated_at').defaultTo(db.fn.now());
  });

  await db.schema.createTable('order_item', (t) => {
    t.uuid('order_id').references('id').inTable('order');
    t.uuid('product_id').notNullable();
    t.decimal('price').notNullable();
    t.integer('amount').notNullable();
    t.timestamp('created_at').defaultTo(db.fn.now());
    t.unique(['order_id', 'product_id']);
  });
};

exports.down = async (db) => {
  await db.schema.dropTable('order');
  await db.schema.dropTable('order_item');
};
