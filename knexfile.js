// Update with your config settings.
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://ortrrlreghbyfi:dfa04fde8db0fd43bbc2548a10b920688ab49d90c1e5ee2c1c107a460b4b56a4@ec2-54-243-128-95.compute-1.amazonaws.com:5432/dac4b9jqsflgi5",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    useNullAsDefault: true
  }
};
