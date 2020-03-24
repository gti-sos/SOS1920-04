const express = require("express");
const bodyParser = require("body-parser")

var app = express();

var port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";
	
	// INITIAL DATA
var vehicles = [];

var initialVehicles = [
	{
		province:"Almería",
		year: 2018,
		car: 361888,
		bus: 831,
		motorcycle: 44574,
		truck: 96518,
		total: 533067
		
	},
	{
		province:"Las Palmas",
		year: 2017,
		car: 570714,
		bus: 2949,
		motorcycle: 62944,
		truck: 180984,
		total: 839149
	}
];


var roads = [
	{
		province:"Almería",
		year: 2018,
		oneway: 2003,
		multipleway: 4,
		dualCarriagewayAndHighway: 321,
		highwayWithToll: 28,
		total: 2356
	},
	{
		province:"Las Palmas",
		year: 2017,
		oneway: 1962,
		multipleway: 76,
		dualCarriagewayAndHighway: 129,
		highwayWithToll: 0,
		total: 2149
	}
];

var traffic_accidents = [
	{
		province:"Almería",
		year: 2018,
		accidentWithVictims: 1194,
		mortalaccident: 27,
		death: 27,
		hospitalizedWounded: 111,
		notHospitalizedWounded: 1780
	},
	{
		province:"Las Palmas",
		year: 2017,
		accidentWithVictims: 1302,
		mortalAccident: 29,
		death: 30,
		hospitalizedWounded: 115,
		nothHspitalizedWounded: 1886
	}
];

	// LOAD INITIAL DATA VEHICLES

app.get(BASE_API_URL+"/vehicles/loadInitialData", (req,res) =>{
	vehicles.push(initialVehicles[0]);
	vehicles.push(initialVehicles[1]);
	res.send("Initial dates have been load");
	res.sendStatus(201,"CREATED");
});

	// GET VEHICLES

app.get(BASE_API_URL+"/vehicles", (req,res) =>{
	res.send(JSON.stringify(vehicles,null,2));
	console.log("Data sent:"+JSON.stringify(vehicles,null));
});

	// POST VEHICLES

app.post(BASE_API_URL+"/vehicles", (req,res) =>{
		var newVehicle = req.body;
	if((newVehicle.province==null) || (newVehicle.year==null) || (newVehicle.car==null) || (newVehicle.motorcycle==null)  ||(newVehicle.bus==null) || (newVehicle.truck==null) ||(newVehicle.total==null) || (newVehicle == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		vehicles.push(newVehicle);
		res.sendStatus(201,"CREATED");
	}
});

	// DELETE VEHICLES
app.delete(BASE_API_URL+"/vehicles", (req,res) =>{
	vehicles = [];
	res.sendStatus(200);
});

	// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");