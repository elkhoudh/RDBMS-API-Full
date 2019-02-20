exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Hamza", cohort_id: 1 },
        { id: 2, name: "John", cohort_id: 2 },
        { id: 3, name: "Joe", cohort_id: 3 }
      ]);
    });
};
