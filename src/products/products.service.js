const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex("products").select("*");
}

function count() {
    return knex("products").count("product_id").first()
}

// OLD READ OPERATION
/*function read(productId) { // read operation
    return knex("products").select("*").where({ product_id: productId }).first();
    // don't forget to add first() to the end so it can only give you the first data point
}*/

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

/**
 * Converts the average to a float
 * REMINDER: bigInt / bigFloat data selectors retun as strings
 */
function convertAverage(data) {

    data.forEach((item, index) => {
        if (item["avg"])
            data[index]["avg"] = parseFloat(data[index]["avg"])
    })
    return data
}

function listAverageByCategory() {
    return knex("products as p")
        .join("products_categories as pc", "p.product_id", "pc.product_id")
        .join("categories as c", "pc.category_id", "c.category_id")
        .select("c.category_name")
        .avg("p.product_price")
        .groupBy("c.category_name")
        .then(convertAverage) // convert the average to a float
}

const addCategory = mapProperties({
    category_id: "category.category_id",
    category_name: "category.category_name",
    category_description: "category.category_description"
})
const addSupplier = mapProperties({
    supplier_id: "supplier.supplier_id"
})
/**
 * NEW READ OPERATION USING JOIN
 * Get all product information from Product, especially from multiple tables
 */
function read(product_id) {
    /**
     * SELECT p.*, c.*
     * FROM products p
     * JOIN products_categories pc 
     * ON p.product_id = pc.product_id 
     * JOIN categories c 
     * ON pc.category_id = c.category_id 
     */
    return knex("products as p")
        .join("products_categories as pc", "p.product_id", "pc.product_id")
        .join("categories as c", "pc.category_id", "c.category_id")
        .select("p.*", "c.*")
        .where({ "p.product_id": product_id })
        .first()
        .then(addCategory)
        .then(addSupplier)
}

module.exports = {
    list,
    read,
    listOutOfStockCount,
    listPriceSummary,
    listTotalWeightByProduct,
    count,
    listAverageByCategory
};