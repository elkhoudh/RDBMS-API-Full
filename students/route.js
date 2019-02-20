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

route.get("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id })
    .first()
    .then(student => {
      if (student) {
        res.json(student);
      } else {
        res.status(404).json({ message: "student Not Found" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, cohort_id } = req.body;

  if (!name || !cohort_id) {
    res.status(422).json({ message: "Name and Cohort ID Required" });
  } else {
    db("students")
      .where({ id })
      .update({ name, cohort_id })
      .then(result => {
        if (result) {
          db("students").then(students => {
            res.json(students);
          });
        } else {
          res.status(400).json({ message: "Failed to update student" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Server Error" });
      });
  }
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id })
    .del()
    .then(result => {
      if (result) {
        db("students").then(students => {
          res.json(students);
        });
      } else {
        res.status(400).json({ message: "Failed to delete Student" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = route;
