/**
 * Specifies Knex methods for making database changes 
 * (ex. creating tables, adding/removing table columns, changing indexes, etc.)
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("suppliers", (table) => { //                         CREATE TABLE suppliers (
        table.increments("supplier_id").primary(); //                                       supplier_id INTEGER PRIMARY KEY, 
        table.string("supplier_name"); //                                                   supplier_name STRING,
        table.string("supplier_address_line_1"); //                                         supplier_address_line_1 STRING,
        table.string("supplier_address_line_2"); //                                         supplier_address_line_2 STRING,
        table.string("supplier_city"); //                                                   supplier_city STRING,
        table.string("supplier_state"); //                                                  supplier_state STRING,
        table.string("supplier_zip"); //                                                    supplier_zip STRING,
        table.string("supplier_phone"); //                                                  supplier_phone STRING,
        table.string("supplier_email"); //                                                  supplier_email STRING,
        table.text("supplier_notes"); //                                                    supplier_notes STRING,
        table.string("supplier_type_of_goods"); //                                          supplier_type_of_goods STRING )
        table.timestamps(true, true); // Adds created_at and updated_at columns
    })
};

/**
 * SQL statements to _undo_ changs. Quickly undo a migration if needed
 * Opposite of exports.up
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("suppliers"); // drops the table to undo the table creation
};
