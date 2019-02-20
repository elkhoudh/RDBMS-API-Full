const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cohortRoute = require("./cohort/route");
const studentRoute = require("./students/route");
const server = express();

// MiddleWare
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

// Router
server.use("/api/cohorts", cohortRoute);
server.use("/api/students", studentRoute);

// Server start
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Listening on port ${port}...`));
