const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const RoadsAPI = require(path.join(__dirname,"RoadsAPI"));
const VehiclesAPI = require(path.join(__dirname,"VehiclesAPI"));
const TrafficAccidentsAPI = require(path.join(__dirname,"TrafficAccidentsAPI"));

const port = process.env.PORT || 1234;

const app = express();
app.use(bodyParser.json());

RoadsAPI(app);
VehiclesAPI(app);
TrafficAccidentsAPI(app);

	// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");