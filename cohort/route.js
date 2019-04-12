const express = require("express");
const db = require("../db");
const route = express.Router();

route.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(() => res.status(500).json({ message: "Server Error" }));
});

route.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(422).json({ message: "Name Required" });
  } else {
    db("cohorts")
      .insert({ name })
      .then(result => {
        if (result.rowCount) {
          db("cohorts")
            .then(cohorts => {
              res.json(cohorts);
            })
            .catch(() => {
              res.status(500).json({ message: "Failed To Get All cohorts" });
            });
        } else {
          res.status(400).json({ message: "Failed to add a cohort" });
        }
      });
  }
});

route.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .first()
    .then(cohort => {
      if (cohort) {
        res.json(cohort);
      } else {
        res.status(404).json({ message: "Cohort Not Found" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.get("/:id/students", (req, res) => {
  const { id } = req.params;

  db("students")
    .where("cohort_id", id)
    .then(students => {
      res.json(students);
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db("cohorts")
    .where({ id })
    .update({ name })
    .then(result => {
      if (result) {
        db("cohorts").then(cohorts => {
          res.json(cohorts);
        });
      } else {
        res.status(404).json({ message: "Failed to update cohort" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to update cohort" });
    });
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(result => {
      if (result) {
        db("cohorts").then(cohorts => {
          res.json(cohorts);
        });
      } else {
        res.status(500).json({ message: "Failed to delete cohort" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = route;
