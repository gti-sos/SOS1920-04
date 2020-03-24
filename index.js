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
		province:"Almeria",
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

var roads = [];

var initialRoads = [
	{
		province:"Almeria",
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

var traffic_accidents = [];

var initialTraffic_accidents = [
	{
		province:"Almeria",
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

	// PUT VEHICLES

app.put(BASE_API_URL+"/vehicles", (req,res) =>{
	res.sendStatus(405);
});

	// GET VEHICLES/XXXX
app.get(BASE_API_URL+"/vehicles/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredVehicles = vehicles.filter((v) => {
		return (v.province == province && v.year == year);
	});
	
	if(filteredVehicles.length >= 1){
		res.send(filteredVehicles[0]);
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"PROVINCE NOT FOUND");
	}
});

	// PUT VEHICLE/XXX
app.put(BASE_API_URL+"/vehicles/:province/:year", (req,res)=>{
	var newVehicle = req.body;
	if((newVehicle.province==null) || (newVehicle.year==null) || (newVehicle.car==null) || (newVehicle.motorcycle==null)  ||(newVehicle.bus==null) || (newVehicle.truck==null) ||(newVehicle.total==null) || (newVehicle == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		var filteredVehicles = vehicles.filter((v) => {
		return (v.province != newVehicle.province && v.year != newVehicle.year);
		});
		vehicles = filteredVehicles;
		vehicles.push(newVehicle);
		res.sendStatus(200,"OK");
	}
});

	// DELETE VEHICLE/XXX

app.delete(BASE_API_URL+"/vehicles/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredVehicles = vehicles.filter((v) => {
		return (v.province != province && v.year != year);
	});
	
	if(filteredVehicles.length < vehicles.length){
		vehicles = filteredVehicles;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"VEHICLE NOT FOUND");
	}
});

	// LOAD INITIAL DATA ROADS

app.get(BASE_API_URL+"/roads/loadInitialData", (req,res) =>{
	roads.push(initialRoads[0]);
	roads.push(initialRoads[1]);
	res.send("Initial dates have been load");
	res.sendStatus(201,"CREATED");
});

	// GET ROADS

app.get(BASE_API_URL+"/roads", (req,res) =>{
	res.send(JSON.stringify(roads,null,2));
	console.log("Data sent:"+JSON.stringify(roads,null));
});

	// POST ROADS
app.post(BASE_API_URL+"/roads", (req,res) =>{
		var newRoads = req.body;
	if((newRoads.province==null) || (newRoads.year==null) || (newRoads.oneway==null) || (newRoads.multipleway==null)  ||(newRoads.dualCarriagewayAndHighway==null) || (newRoads.highwayWithToll==null) ||(newRoads.total==null) || (newRoads == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		roads.push(newRoads);
		res.sendStatus(201,"CREATED");
	}
});

	// DELETE ROADS
app.delete(BASE_API_URL+"/roads", (req,res) =>{
	roads = [];
	res.sendStatus(200);
});
		
	// LOAD INITIAL DATA traffic_accidents

app.get(BASE_API_URL+"/traffic_accidents/loadInitialData", (req,res) =>{
	traffic_accidents.push(initialTraffic_accidents[0]);
	traffic_accidents.push(initialTraffic_accidents[1]);
	res.send("Initial dates have been load");
	res.sendStatus(201,"CREATED");
});

	// GET traffic_accidents

app.get(BASE_API_URL+"/traffic_accidents", (req,res) =>{
	res.send(JSON.stringify(traffic_accidents,null,2));
	console.log("Data sent:"+JSON.stringify(traffic_accidents,null));
});

	// POST traffic_accidents

app.post(BASE_API_URL+"/traffic_accidents", (req,res) =>{
		var newTraffic_accidents = req.body;
	if((newTraffic_accidents.province==null) || (newTraffic_accidents.year==null) || (newTraffic_accidents.accidentWithVictims==null) || (newTraffic_accidents.mortalaccident==null)  ||(newTraffic_accidents.death==null) || (newTraffic_accidents.hospitalizedWounded==null) ||(newTraffic_accidents.notHospitalizedWounded==null) || (newTraffic_accidents == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		traffic_accidents.push(newTraffic_accidents);
		res.sendStatus(201,"CREATED");
	}
});

	// DELETE traffic_accidents
app.delete(BASE_API_URL+"/traffic_accidents", (req,res) =>{
	traffic_accidents = [];
	res.sendStatus(200);
});
	// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");