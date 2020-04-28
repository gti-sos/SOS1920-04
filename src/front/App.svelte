<script>
	import Router from 'svelte-spa-router';

	import NotFound from './NotFound.svelte';

	import Home from './Home.svelte';
	import RoadsAPI from './RoadsAPI/RoadsTable.svelte';
	import VehiclesAPI from './VehiclesAPI/VehiclesTable.svelte';
	import TrafficAccidentsAPI from './TrafficAccidentsAPI/TrafficAccidentsTable.svelte';

	const routes = {
		"/" : Home,
		"/vehicles": VehiclesAPI,
		"/traffic_accidents": TrafficAccidentsAPI,
		"/roads": RoadsAPI,
		"*" : NotFound
	};
</script>

<main>
	<h1>API Manager</h1>
	<Router {routes}/>
</main>