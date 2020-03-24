const express = require("express");
const bodyParser = require("body-parser")

var app = express();

var port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";
	
	// INITIAL DATA

var vehicles = [
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

	// GET VEHICLES

app.get(BASE_API_URL+"/vehicles/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(vehicles,null,2));
	console.log("Data sent:"+JSON.stringify(vehicles,null));
});

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");