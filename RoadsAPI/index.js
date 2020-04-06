module.exports = function(app){
	console.log("Registering roads API...");
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName = path.join(__dirname, "RoadsAPI.db");
	const BASE_API_URL = "/api/v1";
	
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
	});
	
		// INITIAL DATA

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
		},
		{
			province:"Pontevedra",
			year: 2016,
			oneway: 3220,
			multipleway: 16,
			dualCarriagewayAndHighway: 109,
			highwayWithToll: 148,
			total: 3492
		},
		{
			province:"Madrid",
			year: 2015,
			oneway: 2347,
			multipleway: 208,
			dualCarriagewayAndHighway: 622,
			highwayWithToll: 161,
			total: 3338
		},
		{
			province:"Cadiz",
			year: 2018,
			oneway: 1804,
			multipleway: 40,
			dualCarriagewayAndHighway: 276,
			highwayWithToll: 48,
			total: 2168
		}
	];

	// LOAD INITIAL DATA ROADS

	app.get(BASE_API_URL+"/roads/loadInitialData", (req,res) =>{
		console.log("Nwe GET .../loadInitialData");
		
		db.insert(initialRoads);
		res.sendStatus(200);
		
		console.log("Initial Roads loaded: " + JSON.stringify(initialRoads,null,2));
	});
	
		// GET ROADS

	app.get(BASE_API_URL+"/roads", (req,res) =>{
		
		console.log("New GET .../roads");
		var limit = req.query.limit;
		var offset= req.query.offset;
		
		var province = req.query.province;
		var year = parseInt(req.query.year);
		var oneway = parseInt(req.query.oneway);
		var multipleway = parseInt(req.query.multipleway);
		var dualCarriagewayAndHighway = parseInt(req.query.dualCarriagewayAndHighway);
		var highwayWithToll = parseInt(req.query.highwayWithToll);
		var total = parseInt(req.query.total);
		var minTotal = parseInt(req.query.minTotal);
		var maxTotal = parseInt(req.query.maxTotal);
		console.log("province="+province+", year="+year+", oneway="+oneway+", multipleway="+multipleway+", dualCarriagewayAndHighway="+dualCarriagewayAndHighway+", highwayWithToll="+highwayWithToll+", total="+total);

		
		if(province) {
			db.find({province: province}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else if(year){
			db.find({year: year}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else if(oneway){
			db.find({oneway: oneway}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else if(multipleway){
			db.find({multipleway: multipleway}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else if(dualCarriagewayAndHighway){
			db.find({dualCarriagewayAndHighway: dualCarriagewayAndHighway}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else if(highwayWithToll){
			db.find({highwayWithToll: highwayWithToll}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else if(total){
			db.find({total: total}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});			
		}else if(minTotal && maxTotal){
			db.find({total: {$lt: maxTotal, $gt: minTotal}}).sort({total: -1}).skip(offset).limit(limit).exec(function (err, roads) {
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}else{
			db.find({}).skip(offset).limit(limit).exec(function (err, roads) {
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		}
		
	});
	
	// POST ROADS
	app.post(BASE_API_URL+"/roads", (req,res) =>{
		var newRoads = req.body;
		if((newRoads.province==null) || (newRoads.year==null) || (newRoads.oneway==null) || (newRoads.multipleway==null)  |	            						(newRoads.dualCarriagewayAndHighway==null) || (newRoads.highwayWithToll==null) ||(newRoads.total==null) || (newRoads == "")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.insert(newRoads);
			res.sendStatus(201,"CREATED");
		}
	});
	
	// DELETE ROADS
	app.delete(BASE_API_URL+"/roads", (req,res) =>{
		console.log("New DELETE .../roads");
		db.remove({}, { multi: true }, function (err, numRemoved) {});
		res.sendStatus(200);
	});
		// PUT ROADS
	app.put(BASE_API_URL+"/roads", (req,res) =>{
		console.log("New PUT .../roads");
		res.sendStatus(405);
	});
		// GET ROADS/xxxx
	app.get(BASE_API_URL+"/roads/:province/:year", (req,res)=>{
		console.log("New GET .../roads/:province/:year");
		var searchProvince = req.params.province;
		var searchYear = parseInt(req.params.year);
		db.find({province: searchProvince, year: searchYear}, (err, roads) =>{

			roads.forEach( (v) => {
				delete v._id;
			});

			if(roads.length == 1){
				res.send(JSON.stringify(roads[0],null,2));
				console.log("Data sent:"+JSON.stringify(roads[0],null,2));
			}else{
				res.sendStatus(404,"NOT FOUND");
				console.log("Not found");
			}

		});
	});
	// POST ROAD/xxxx
	app.post(BASE_API_URL+"/roads/:province/:year", (req,res) =>{
		console.log("New POST .../roads/:province/:year");
		res.sendStatus(405);
	});
		// PUT ROAD/xxxx
	app.put(BASE_API_URL+"/roads/:province/:year", (req,res)=>{
		var newRoads = req.body;
		var searchProvince= req.params.province;
		var searchYear = parseInt(req.params.year);
			if((newRoads.province==null) || (newRoads.year==null) || (newRoads.oneway==null) || (newRoads.multipleway==null)  |	            						(newRoads.dualCarriagewayAndHighway==null) || (newRoads.highwayWithToll==null) ||(newRoads.total==null) || (newRoads == "")){
				res.sendStatus(400,"BAD REQUEST");
			}else{
				db.remove({province: searchProvince, year: searchYear}, { multi: true }, function (err, numRemoved) {});
				db.insert(newRoads);
				res.sendStatus(200);
			}
	});
	// DELETE ROAD/xxxx
	app.delete(BASE_API_URL+"/roads/:province/:year", (req,res)=>{
		var searchProvince = req.params.province;
		var searchYear = parseInt(req.params.year);
		db.remove({province: searchProvince, year: searchYear},  {}, function(err, numRemoved){
			if(numRemoved == 1) {
				res.sendStatus(200);
				console.log("Removed");
			}else {
				res.sendStatus(404);
				console.log("Not found");
			}
		})
		
	});	
};


	
