exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    tbl.incements();
    tbl.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
