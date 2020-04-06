module.exports = function(app){
	console.log("Registering Traffic Accidents API...")
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName = path.join(__dirname,"TrafficAccidentsAPI.db");
	const BASE_API_URL = "/api/v1";
	
	const db = new dataStore({
				filename: dbFileName,
				autoload: true
			});
	
	// INITIAL DATA
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
		},
		{
			province:"Pontevedra",
			year: 2016,
			accidentWithVictims: 1726,
			mortalAccident: 35,
			death: 36,
			hospitalizedWounded: 260,
			nothHspitalizedWounded: 2372
		},
		{
			province:"Madrid",
			year: 2015,
			accidentWithVictims: 15442,
			mortalAccident: 101,
			death: 111,
			hospitalizedWounded: 1314,
			nothHspitalizedWounded: 18689
		},
		{
			province:"Cรกdiz",
			year: 2018,
			accidentWithVictims: 1872,
			mortalAccident: 15,
			death: 15,
			hospitalizedWounded: 115,
			nothHspitalizedWounded: 2644
		}
	];
	// LOAD INITIAL DATA traffic_accidents

	app.get(BASE_API_URL+"/traffic_accidents/loadInitialData",(req,res) =>{
			console.log("NEW GET .../loadInitialData");
	
			db.insert(initialTraffic_accidents);
			res.sendStatus(200);

			console.log("Initial traffic accidents loaded: "+JSON.stringify(initialTraffic_accidents,null,2));
	});
	
	// GET traffic_accidents

	app.get(BASE_API_URL+"/traffic_accidents", (req,res) =>{
		console.log("New GET .../traffic_accidents");
		limit = req.query.limit;
		offset = req.query.offset;
		console.log("limit="+limit+":, offset="+offset);
		
		province = req.query.province;
		year = parseInt(req.query.year);
		accidentWithVictims = parseInt(req.query.accidentWithVictims);
		mortalAccident = parseInt(req.query.mortalAccident);
		death = parseInt(req.query.death);
		limdeath = parseInt(req.query.limdeath);
		hospitalizedWounded = parseInt(req.query.hospitalizedWounded);
		nothHspitalizedWounded = parseInt(req.query.nothHspitalizedWounded);
		console.log("province="+province+", year="+year+", accidentWithVictims="+accidentWithVictims+", mortalAccident="+mortalAccident+", death="+death+", limdeath="+limdeath+", hospitalizedWounded="+hospitalizedWounded+", nothHospitalizedWounded="+nothHospitalizedWounded);
		
		if(province){
			
			db.find({province: province}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			});
		}else if(year){
				
			
			db.find({year: year}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
				 
		}else if(accidentWithVictims){
				
			
			db.find({accidentWithVictims: accidentWithVictims}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
				 
		}else if(mortalAccident){
				
			
			db.find({mortalAccident: mortalAccident}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
				 
		}else if(death){
				
			
			db.find({death: death}).sort({death: 1}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
		}else if(limdeath){
				
			
			db.find({death: {$gte: limdeath}}).sort({death: 1}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
				 
		}else if(hospitalizedWounded){
				
			
			db.find({hospitalizedWounded: hospitalizedWounded}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
				 
		}else if(nothHspitalizedWounded){
				
			
			db.find({nothHspitalizedWounded: nothHspitalizedWounded}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			}); 
				 
		}else{
				 
																		 
			db.find({}).skip(offset).limit(limit).exec( function (err, traffic_accidents) {
				traffic_accidents.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(traffic_accidents,null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
			});
		}
	});
	
	

	// POST traffic_accidents

	app.post(BASE_API_URL+"/traffic_accidents", (req,res) =>{
		console.log("New POST .../traffic_accidents");
		var newTraffic_accidents = req.body;
		if((newTraffic_accidents.province==null) || (newTraffic_accidents.year==null) || (newTraffic_accidents.accidentWithVictims==null) || 				(newTraffic_accidents.mortalaccident==null)  ||(newTraffic_accidents.death==null) || (newTraffic_accidents.hospitalizedWounded==null) ||			(newTraffic_accidents.notHospitalizedWounded==null) || (newTraffic_accidents == "")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.insert(newTraffic_accidents);
			res.sendStatus(201, "CREATED");
		}
	});
	
	
	// DELETE traffic_accidents
	app.delete(BASE_API_URL+"/traffic_accidents", (req,res) =>{
		console.log("New DELETE .../traffic_accidents");
		db.remove({}, {multi: true}, function (err, numRemoved) {} );
		res.sendStatus(200);
	});

	// PUT TRAFIC_ACCIDENTS
	app.put(BASE_API_URL+"/traffic_accidents", (req,res) =>{
		console.log("New PUT .../traffic_accidents");
		res.sendStatus(405);
	});
	
	
	// GET traffic_accidents/XXXX
	app.get(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res)=>{
		console.log("New GET .../traffic_accidents/:province/:year");
		var searchProvince = req.params.province;
		var searchYear = parseInt(req.params.year);
		db.find({province: searchProvince, year: searchYear}, (err, traffic_accidents) =>{
			
			traffic_accidents.forEach( (v) => {
				delete v._id;
			});
			
			if(traffic_accidents.length == 1){
				res.send(JSON.stringify(traffic_accidents[0],null,2));
				console.log("Data sent:"+JSON.stringify(traffic_accidents[0],null,2));
			}else{
				res.sendStatus(404,"NOT FOUND");
				console.log("Not found");
			}
			
		});
	});




// POST TRAFIC_ACCIDENT/xxxx
app.post(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res) =>{
	console.log("New GET .../traffic_accidents/:province/:year");
	res.sendStatus(405);
});


	// PUT TRAFIC_ACCIDENT/xxxx
app.put(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res)=>{
	console.log("New PUT .../traffic_accidents/:province/:year");
	var newTraffic_accident = req.body;
	var searchProvince = req.params.province;
	var searchYear = parseInt(req.params.year);
	if((newTraffic_accidents.province==null) || (newTraffic_accidents.year==null) || (newTraffic_accidents.accidentWithVictims==null) || 				(newTraffic_accidents.mortalaccident==null)  ||(newTraffic_accidents.death==null) || (newTraffic_accidents.hospitalizedWounded==null) ||			(newTraffic_accidents.notHospitalizedWounded==null) || (newTraffic_accidents == "")){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		db.remove({province: searchProvince, year: searchYear}, {}, function (err, numRemoved) {} );
		db.insert(newTraffic_accident);
		res.sendStatus(200);
		
	}
});
	
	// DELETE TRAFIC_ACCIDENT/xxxx
app.delete(BASE_API_URL+"/traffic_accidents/:province/:year", (req,res)=>{
	var searchProvince = req.params.province;
	var searchYear = parseInt(req.params.year);
	db.remove({province: searchProvince, year: searchYear}, {}, function (err, numRemoved) {
		if (numRemoved == 1){
		res.sendStatus(200);
		console.log("Removed");
	}else{
		res.sendStatus(404);
		console.log("Not Found");
	}} );
	
});		
	
};
