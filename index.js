const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const backVehicles = require("./src/back/VehiclesAPI");
const backRoads = require("./src/back/RoadsAPI");
const backTrafficAccidents = require("./src/back/TrafficAccidentsAPI");
const cors = require("cors");

const port = process.env.PORT || 1234;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}) 
//app.use(cors());
app.use(bodyParser.json());

backVehicles(app);
backRoads(app);
backTrafficAccidents(app);

app.use("/", express.static("./public"));

// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");