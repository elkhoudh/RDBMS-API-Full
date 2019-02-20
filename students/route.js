const express = require("express");
const db = require("../db");
const route = express.Router();

route.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.json(students);
    })
    .catch(() => res.status(500).json({ message: "Server Error" }));
});

route.post("/", (req, res) => {
  const { name, cohort_id } = req.body;

  if (!name || !cohort_id) {
    res.status(422).json({ message: "Name and Cohort ID Required" });
  } else {
    db("students")
      .insert({ name, cohort_id })
      .then(result => {
        if (result.rowCount) {
          db("students")
            .then(students => {
              res.json(students);
            })
            .catch(() => {
              res.status(500).json({ message: "Failed To Get All students" });
            });
        } else {
          res.status(400).json({ message: "Failed to add a student" });
        }
      });
  }
});

// route.get("/:id", (req, res) => {
//   const { id } = req.params;

//   db("cohorts")
//     .where({ id })
//     .first()
//     .then(cohort => {
//       if (cohort) {
//         res.json(cohort);
//       } else {
//         res.status(404).json({ message: "Cohort Not Found" });
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ message: "Server Error" });
//     });
// });

// route.get("/:id/students", (req, res) => {
//   const { id } = req.params;

//   db("students")
//     .where("cohort_id", id)
//     .then(students => {
//       res.json(students);
//     })
//     .catch(() => {
//       res.status(500).json({ message: "Server Error" });
//     });
// });

module.exports = route;
