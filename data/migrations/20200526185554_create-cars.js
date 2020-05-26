exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments("VIN");
    tbl.string("make", 128).notNullable();
    tbl.string("model", 128).notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("transmission");
    tbl.string("status", 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
