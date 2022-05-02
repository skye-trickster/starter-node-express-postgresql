const knex = require("../db/connection"); // initializes knex

function list() { // builds query for all columns in category
    return knex("categories").select("*");
}

module.exports = {
    list, // exports list for use in other files.
};
