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

		console.log("Initial Vehicles loaded: "+JSON.stringify(initialVehicles,null,2));
	});
	
	// GET VEHICLES

	app.get(BASE_API_URL+"/vehicles", (req,res) =>{
		console.log("New GET .../vehicles");
		
		db.find({}, (err, vehicles) =>{
			
			vehicles.forEach( (v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(vehicles,null,2));
			console.log("Data sent:"+JSON.stringify(vehicles,null,2));
		});
	});
	
	// POST VEHICLES

	app.post(BASE_API_URL+"/vehicles", (req,res) =>{
		console.log("New POST .../vehicles");
		var newVehicle = req.body;
		if((newVehicle.province==null) || (newVehicle.year==null) || (newVehicle.car==null) || (newVehicle.motorcycle==null)  ||(newVehicle.bus==null) || (newVehicle.truck==null) ||(newVehicle.total==null) || (newVehicle == "")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.insert(newVehicle);
			res.sendStatus(201,"CREATED");
		}
	});

	// DELETE VEHICLES
	
	app.delete(BASE_API_URL+"/vehicles", (req,res) =>{
		console.log("New DELETE .../vehicles");
		db.remove({}, { multi: true }, function (err, numRemoved) {});
		res.sendStatus(200);
	});
	
	// PUT VEHICLES

	app.put(BASE_API_URL+"/vehicles", (req,res) =>{
		console.log("New PUT .../vehicles");
		res.sendStatus(405);
	});
	
	// GET VEHICLES/XXXX
	app.get(BASE_API_URL+"/vehicles/:province/:year", (req,res)=>{
		console.log("New GET .../vehicles/:province/:year");
		var searchProvince = req.params.province;
		var searchYear = parseInt(req.params.year);
		db.find({province: searchProvince, year: searchYear}, (err, vehicles) =>{
			
			vehicles.forEach( (v) => {
				delete v._id;
			});
			
			if(vehicles.length == 1){
				res.send(JSON.stringify(vehicles[0],null,2));
				console.log("Data sent:"+JSON.stringify(vehicles[0],null,2));
			}else{
				res.sendStatus(404,"NOT FOUND");
				console.log("Not found");
			}
			
		});
	});
	
	// POST VEHICLES/XXXX
	app.post(BASE_API_URL+"/vehicles/:province/:year", (req,res) =>{
		console.log("New POST .../vehicles/:province/:year");
		res.sendStatus(405);
	});
	
		// PUT VEHICLE/XXX
	app.put(BASE_API_URL+"/vehicles/:province/:year", (req,res)=>{
		console.log("New PUT .../vehicles/:province/:year");
		var newVehicle = req.body;
		var searchProvince = req.params.province;
		var searchYear = parseInt(req.params.year);
		if((newVehicle.province==null) || (newVehicle.year==null) || (newVehicle.car==null) || (newVehicle.motorcycle==null)  ||(newVehicle.bus==null) || (newVehicle.truck==null) ||(newVehicle.total==null) || (newVehicle == "")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.remove({province: searchProvince, year: searchYear}, {}, function (err, numRemoved) {});
			db.insert(newVehicle);
			res.sendStatus(200);
		};
	});
	
	// DELETE VEHICLES/XXX
	app.delete(BASE_API_URL+"/vehicles/:province/:year", (req,res)=>{
		console.log("New DELETE .../vehicles/:province/:year");
		var searchProvince = req.params.province;
		var searchYear = req.params.year;
		db.remove({province: searchProvince, year: searchYear}, {}, function (err, numRemoved) {
			if (numRemoved == 1){
				res.sendStatus(200);
				console.log("Removed");
			}else{
				res.sendStatus(404);
				console.log("Not found");
			}
		});
	});
};
