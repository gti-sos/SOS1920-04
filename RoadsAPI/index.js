module.exports = function(app){
	console.log("Registering roads API...")
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
		
		db.find({}, (err, roads) =>{
			
			roads.forEach((v) => {
				delete v._id;
			});
			
			res.send(JSON.stringify(roads,null,2));
			res.sendStatus(200);
			console.log("Data sent:"+JSON.stringify(roads,null));
		});
		
	});
	
}

/*
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
