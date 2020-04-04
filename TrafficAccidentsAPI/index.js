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
		db.find({}, (err, traffic_accidents) =>{
			traffic_accidents.forEach( (v) => {
				delete v.id;
			});
		
			res.send(JSON.stringify(traffic_accidents,null,2));
			console.log("Data sent:"+JSON.stringify(traffic_accidents,null,2));
		});	
	});
	
	

	// POST traffic_accidents

	app.post(BASE_API_URL+"/traffic_accidents", (req,res) =>{
		console.log("New POST .../traffic_accidents");
		
		
		var newTraffic_accidents = req.body;
		if((newTraffic_accidents.province==null) || (newTraffic_accidents.year==null) || (newTraffic_accidents.accidentWithVictims==null) || 				(newTraffic_accidents.mortalaccident==null)  ||(newTraffic_accidents.death==null) || (newTraffic_accidents.hospitalizedWounded==null) ||			(newTraffic_accidents.notHospitalizedWounded==null) || (newTraffic_accidents == "" || (newTraffic_accident.length() != 7))){
			res.sendStatus(400,"BAD REQUEST");
			console.log("Data sent: "+JSON.stringify(newTraffic_accidents,null,2));
		}else{
			db.insert(newTraffic_accident);
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


};







/*
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
	// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");
*/