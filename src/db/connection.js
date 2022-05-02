// THIS SHOULD BE IN ./DB
const env = process.env.NODE_ENV || "development"; // gets the current NODE_ENV from the process, development by default
const config = require("../../knexfile")[env]; // gets configuration from the knexfile for the environment type
const knex = require("knex")(config); // initializes knex with the config

module.exports = knex; // export