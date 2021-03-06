const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

const path = __dirname + '/app/my-app/';
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

// db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to casino site." });
});

require("./app/routes/casino.routes")(app);

app.get('/*', (req, res) => {
  res.sendFile(path + '/my-app/index.html');
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
