/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("products", (table) => { // creates a "products" table.
        table.increments("product_id").primary(); // Sets `product_id` as the primary key
        table.string("product_sku");
        table.string("product_name");
        table.text("product_description");
        table.integer("product_quantity_in_stock");
        table.decimal("product_weight_in_lbs");
        table.integer("supplier_id").unsigned().notNullable(); // notNullable: NOT NULL; unsigned: >= 0
        table
            .foreign("supplier_id")
            .references("supplier_id")
            .inTable("suppliers")   // supplier_id INTEGER REFERENCES suppliers(supplier_id)
            .onDelete("cascade");   // deletes the related items if the supplier_id is deleted
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("products");
};
