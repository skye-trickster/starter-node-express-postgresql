const knex = require("../db/connection");

function list() {
    return knex("products").select("*");
}

function read(productId) { // read operation
    return knex("products").select("*").where({ product_id: productId }).first();
    // don't forget to add first() to the end so it can only give you the first data point
}

module.exports = {
    list,
    read
};