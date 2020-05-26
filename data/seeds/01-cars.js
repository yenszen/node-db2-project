exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          make: "Audi",
          model: "R8",
          mileage: 5000,
          transmission: "manual",
          status: "like new"
        },
        {
          make: "BMW",
          model: "X6",
          mileage: 10000,
          transmission: "automatic",
          status: "need servicing"
        }
      ]);
    });
};
