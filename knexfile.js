// Update with your config settings.
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://bbipyydlkkifde:42f4430f3aa70862585d1fd891aa2316565f8acc1d017db7e9fdadb7f9fa9e57@ec2-54-83-196-179.compute-1.amazonaws.com:5432/d3nrvg3l93b21f",
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
