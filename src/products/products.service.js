const knex = require("../db/connection");

function list() {
    return knex("products").select("*");
}

function count() {
    return knex("products").count("product_id").first()
}

function read(productId) { // read operation
    return knex("products").select("*").where({ product_id: productId }).first();
    // don't forget to add first() to the end so it can only give you the first data point
}

function listOutOfStockCount() {
    /**
     * SELECT product_quantity_in_stock as out_of_stock, count(product_id)
     * FROM products
     * WHERE product_quantity_in_stock = 0
     * GROUP BY out_of_stock
     */
    return knex("products")
        .select("product_quantity_in_stock as out_of_stock") // selects the out of stock quantity as out of stock
        .count("product_id") // count returns a bigInt
        .where({ "product_quantity_in_stock": 0 }) // checks if quantity in stock is zero
        .groupBy("out_of_stock") // groups by out of stock column. REQUIRED for agregating between out of stock and count
}

function listPriceSummary() {
    /**
     * SELECT supplier_id, min(product_price), max(product_price), avg(product_price)
     * FROM products
     * GROUP BY supplier_id
     */
    return knex("products")
        .select("supplier_id")
        .min("product_price") // min() used for minimum of columns
        .max("product_price") // max() used for maximum of columns
        .avg("product_price") // avg() used for average of columns
        .groupBy("supplier_id") // group every raw column that you're aggregating
}

function listTotalWeightByProduct() {
    /**
     * SELECT product_sku, product_title, SUM(product_weight_in_lbs * product_quantity_in_stock) AS total_weight_in_lbs
     * FROM products
     * GROUP BY product_title, product_sku
     */
    return knex("products")
        .select(
            "product_sku",
            "product_title",
            knex.raw("sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs") //knex.raw() used for raw SQL code not usually in normal functions
        )
        .groupBy("product_title", "product_sku") // group every raw column that you're aggregating
}

module.exports = {
    list,
    read,
    listOutOfStockCount,
    listPriceSummary,
    listTotalWeightByProduct,
    count
};