const suppliers = require("../fixtures/suppliers"); // requires suppliers seed data and stores into suppliers variable

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE") //raw: raw SQL code; executes as is. returns a promise
    .then(function () {
      return knex("suppliers").insert(suppliers);
    });
};
