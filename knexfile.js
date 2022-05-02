// Update with your config settings.
const path = require("path")
require("dotenv").config(); //loads dotenv from application code (npm install dotenv)
const { DATABASE_URL } = process.env; // stores value of process.env.DATABASE_URL

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL, // use DATABASE_URL for connection (should have ElephantSQL database instance in .env file)
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"), // store migration files in src/db/migrations
    }
  },

};
