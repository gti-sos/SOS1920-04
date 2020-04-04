module.exports = function (app) {
	console.log("Registering vehicles API...");
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName = path.join(__dirname,"VehiclesAPI.db");
	const BASE_API_URL = "/api/v1";
	
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
				});
	
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
	
	// LOAD INITIAL DATA VEHICLES

	app.get(BASE_API_URL+"/vehicles/loadInitialData", (req,res) =>{
		console.log("New GET .../loadInitialData");

		db.insert(initialVehicles);
		res.sendStatus(200);

		cosole.log("Initial Vehicles loaded: "+JSON.stringify(initialVehicles,null,2));
	});
	
	// GET VEHICLES

	app.get(BASE_API_URL+"/vehicles", (req,res) =>{
		console.log("New GET .../vehicles");
		
		db.find({}, (err, vehicles) =>{
			
			vehicles.forEach( (v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(vehicles,null,2));
			res.sendStatus(200);
			console.log("Data sent:"+JSON.stringify(vehicles,null,2));
		});
	});

	
}



/*

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

	// POST VEHICLES/xxxx
app.post(BASE_API_URL+"/vehicles/:province/:year", (req,res) =>{
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

	// PUT ROADS
app.put(BASE_API_URL+"/roads", (req,res) =>{
	res.sendStatus(405);
});

	// GET ROADS/xxxx
app.get(BASE_API_URL+"/roads/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredRoads = roads.filter((v) => {
		return (v.province == province && v.year == year);
	});
	
	if(filteredRoads.length >= 1){
		res.send(filteredRoads[0]);
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"ROAD NOT FOUND");
	}
});

	// POST ROAD/xxxx
app.post(BASE_API_URL+"/roads/:province/:year", (req,res) =>{
	res.sendStatus(405);
});

	// PUT ROAD/xxxx
app.put(BASE_API_URL+"/roads/:province/:year", (req,res)=>{
	var newRoad = req.body;
	if((newRoad.province==null) || (newRoad.year==null) || (newRoad.oneway==null) || (newRoad.multipleway==null)  ||	               (newRoad.dualCarriagewayAndHighway==null) || (newRoad.highwayWithToll==null) ||(newRoad.total==null) || (newRoad == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		var filteredRoads = roads.filter((v) => {
		return (v.province != newRoad.province && v.year != newRoad.year);
		});
		roads = filteredRoads;
		roads.push(newRoad);
		res.sendStatus(200,"OK");
	}
});
	// DELETE ROAD/xxxx
	app.delete(BASE_API_URL+"/roads/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredRoads = roads.filter((v) => {
		return (v.province != province && v.year != year);
	});
	
	if(filteredRoads.length < roads.length){
		roads = filteredRoads;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"ROAD NOT FOUND");
	}
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


	// PUT TRAFIC_ACCIDENTS
app.put(BASE_API_URL+"/traffic_accidents", (req,res) =>{
	res.sendStatus(405);
});
	// GET TRAFIC_ACCIDENTS/xxxx
app.get(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredTraffic_accidents = traffic_accidents.filter((v) => {
		return (v.province == province && v.year == year);
	});
	
	if(filteredTraffic_accidents.length >= 1){
		res.send(filteredTraffic_accidents[0]);
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"TRAFFIC ACCIDENT NOT FOUND");
	}
});

	// POST TRAFIC_ACCIDENT/xxxx
app.post(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res) =>{
	res.sendStatus(405);
});
	// PUT TRAFIC_ACCIDENT/xxxx
app.put(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res)=>{
	var newTraffic_accident = req.body;
	if((newTraffic_accident.province==null) || (newTraffic_accident.year==null) || (newTraffic_accident.accidentWithVictims==null) || (newTraffic_accident.mortalaccident==null)  || (newTraffic_accident.death==null) || (newTraffic_accident.hospitalizedWounded==null) ||(newTraffic_accident.notHospitalizedWounded==null) || (newTraffic_accident == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		var filteredTraffic_accidents = traffic_accidents.filter((v) => {
		return (v.province != newTraffic_accident.province && v.year != newTraffic_accident.year);
		});
		traffic_accidents = filteredTraffic_accidents;
		traffic_accidents.push(newTraffic_accident);
		res.sendStatus(200,"OK");
	}
});
	// DELETE TRAFIC_ACCIDENT/xxxx
app.delete(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredTraffic_accidents = traffic_accidents.filter((v) => {
		return (v.province != province && v.year != year);
	});
	
	if(filteredTraffic_accidents.length < traffic_accidents.length){
		traffic_accidents = filteredTraffic_accidents;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"TRAFFIC ACCIDENT NOT FOUND");
	}
});		

*/