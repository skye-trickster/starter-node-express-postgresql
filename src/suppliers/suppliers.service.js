const knex = require("../db/connection");

function create(supplier) {
    return knex("suppliers")
        .insert(supplier)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
    return knex("suppliers")
        .select("*")
        .where({ supplier_id: updatedSupplier.supplier_id }) //make sure that you get the right supplier
        .update(updatedSupplier, "*") // update only things in the where criteria
        .then((updatedRecords) => updatedRecords[0]);
}

function destroy(supplier_id) {
    return knex("suppliers").where({ supplier_id }).del(); // delete only things that fit the where criteria
}

module.exports = {
    create,
    read,
    update,
    delete: destroy,
};
