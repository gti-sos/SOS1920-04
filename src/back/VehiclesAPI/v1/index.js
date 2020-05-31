module.exports = function (app) {
	console.log("Registering vehicles API...");
	const dataStore = require("nedb");
	const path = require("path");
	const request = require("request");
	
	const dbFileName = path.join(__dirname,"VehiclesAPI.db");
	const BASE_API_URL = "/api/v1";

	var sos1920_28 = 'https://sos1920-28.herokuapp.com';
	var recurso28 = '/api/v1/gce';

    app.use(recurso28, function(req, res) {
		var url = sos1920_28 + req.baseUrl + req.url;
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

	var sos1920_01 = 'https://sos1920-01.herokuapp.com';
	var recurso01 = '/api/v2/natality-stats';

    app.use(recurso01, function(req, res) {
		var url = sos1920_01 + req.baseUrl + req.url;
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

	var sos1920_06 = 'https://sos1920-06.herokuapp.com';
	var recurso06 = '/api/v2/lottery-sales';

    app.use(recurso06, function(req, res) {
		var url = sos1920_06 + req.baseUrl + req.url;
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});
	
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
				});
	
		// INITIAL DATA
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
		},
		{
			province:"Pontevedra",
			year: 2016,
			car: 512529,
			bus: 1224,
			motorcycle: 66323,
			truck: 81665,
			total: 685522
		},
		{
			province:"Madrid",
			year: 2015,
			car: 3336964,
			bus: 10279,
			motorcycle: 320169,
			truck: 586914,
			total: 4339426
		},
		{
			province:"Cadiz",
			year: 2018,
			car: 572171,
			bus: 1100,
			motorcycle: 102634,
			truck: 92205,
			total: 787838
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
		
		var limit = req.query.limit;
		var offset = req.query.offset;
		console.log("limit="+limit+", offset="+offset);
		
		var province = req.query.province;
		var year = parseInt(req.query.year);
		var car = parseInt(req.query.car);
		var bus = parseInt(req.query.bus);
		var motorcycle = parseInt(req.query.motorcycle);
		var truck = parseInt(req.query.truck);
		var total = parseInt(req.query.total);
		var fromYear = parseInt(req.query.fromYear);
		var toYear = parseInt(req.query.toYear);
		console.log("province="+province+", year="+year+", car="+car+", bus="+bus+", motorcycle="+motorcycle+", truck="+truck+", total="+total
				   +", fromYear="+fromYear+", toYear="+toYear);
		
		
		db.find({}).skip(offset).limit(limit).exec( function (err, vehicles) {
			vehicles.forEach( (v) => {
				delete v._id;
			});
			if(province){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.province == province;
				});
			};
			if(year){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.year == year;
				});
			};
			if(car){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.car == car;
				});
			};
			if(bus){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.bus == bus;
				});
			};
			if(motorcycle){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.motorcycle == motorcycle;
				});
			};
			if(truck){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.truck == truck;
				});
			};
			if(total){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.total == total;
				});
			};
			if(fromYear && toYear){
				vehicles = vehicles.filter(function(vehicle) {
 					return vehicle.year >= fromYear && vehicle.year < toYear;
				});
			};
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
			
			if(vehicles.length >= 1){
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
		var searchYear = parseInt(req.params.year);
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
