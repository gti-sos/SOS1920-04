<script>
	import Router from 'svelte-spa-router';

	import NotFound from './NotFound.svelte';

	import Home from './Home.svelte';
	import RoadsAPI from './RoadsAPI/RoadsTable.svelte';
	import VehiclesAPI from './VehiclesAPI/VehiclesTable.svelte';
	import TrafficAccidentsAPI from './TrafficAccidentsAPI/TrafficAccidentsTable.svelte';
	import EditRoad from './RoadsAPI/RoadsUpdate.svelte';
	import EditVehicle from './VehiclesRoadsAPI/VehiclesUpdate.svelte';
	import EditTrafficAccidents from './TrafficAccidentsAPI/TrafficAccidentsUpdate.svelte';

	const routes = {
		"/" : Home,
		"/vehicles": VehiclesAPI,
		"/traffic_accidents": TrafficAccidentsAPI,
		"/roads": RoadsAPI,
		"/vehicles/:vehicleProvince/:vehicleYear" : EditVehicle,
		"/roads/:roadProvince/:roadYear" : EditRoad,
		"/traffic_accidents/:traffic_accidentProvince/:traffic_accidentsYear" : EditTrafficAccidents,
		"*" : NotFound
	};
</script>

<main>
	<h1>API Manager</h1>
	<Router {routes}/>
</main>