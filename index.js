const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const backVehicles = require("./src/back/VehiclesAPI");
const backRoads = require("./src/back/RoadsAPI/v1");
const backTrafficAccidents = require("./src/back/TrafficAccidentsAPI/v1");
const cors = require("cors");

const port = process.env.PORT || 1234;

const app = express();
app.use(bodyParser.json());
app.use(cors());

backVehicles(app);
backRoads(app);
backTrafficAccidents(app);

app.use("/", express.static("./public"));

// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");