<script>
	import Router from 'svelte-spa-router';

	import NotFound from './NotFound.svelte';

	import Home from './Home.svelte';
	import RoadsAPI from './RoadsAPI/RoadsTable.svelte';
	import VehiclesAPI from './VehiclesAPI/VehiclesTable.svelte';
	import TrafficAccidentsAPI from './TrafficAccidentsAPI/TrafficAccidentsTable.svelte';
	import EditRoad from './RoadsAPI/RoadsUpdate.svelte';
	import EditVehicle from './VehiclesAPI/VehiclesUpdate.svelte';
	import EditTrafficAccidents from './TrafficAccidentsAPI/TrafficAccidentsUpdate.svelte';
	import VehiclesStatistics from './VehiclesAPI/VehiclesStatistics.svelte';
	import VehiclesStatistics2 from './VehiclesAPI/VehiclesStatistics2.svelte';
	import RoadsStatistics from './RoadsAPI/RoadsStatistics.svelte';
	import RoadsStatistics2 from './RoadsAPI/RoadsStatistics2.svelte';
	import TrafficAccidentsStatistics from './TrafficAccidentsAPI/TrafficAccidentsStatistics.svelte';
	import VehiclesIntegrations from './VehiclesAPI/Integrations/Home.svelte';
	import Renewable_sources from './VehiclesAPI/Integrations/renewable_sources.svelte';
	import Company from './VehiclesAPI/Integrations/company.svelte';
	import RoadsIntegrations from './RoadsAPI/Integrations/Home.svelte';
	import sos1920_06 from './RoadsAPI/Integrations/sos1920-06.svelte';
	import sos1920_07 from './RoadsAPI/Integrations/sos1920-07.svelte';
	import sos1920_09 from './RoadsAPI/Integrations/sos1920-09.svelte';
	import sos1920_27 from './RoadsAPI/Integrations/sos1920-27.svelte';
	import sos1920_30 from './RoadsAPI/Integrations/sos1920-30.svelte';
	import sos1920_02 from './RoadsAPI/Integrations/sos1920-02.svelte';
	import Analytics from './analytics/statistics.svelte';
	import About from './about/about.svelte';


	const routes = {
		"/" : Home,
		"/analytics": Analytics,
		"/about": About,
		"/vehicles": VehiclesAPI,
		"/traffic_accidents": TrafficAccidentsAPI,
		"/traffic_accidents/statistics": TrafficAccidentsStatistics,
		"/roads": RoadsAPI,
		"/vehicles/statistics": VehiclesStatistics,
		"/vehicles/statistics2": VehiclesStatistics2,
		"/roads/statistics": RoadsStatistics,
		"/roads/statistics2": RoadsStatistics2,
		"/vehicles/:vehicleProvince/:vehicleYear" : EditVehicle,
		"/roads/:roadProvince/:roadYear" : EditRoad,
		"/traffic_accidents/:traffic_accidentProvince/:traffic_accidentYear" : EditTrafficAccidents,
		"/vehicles/integrations": VehiclesIntegrations,
		"/vehicles2/integrations/renewable_sources": Renewable_sources,
		"/vehicles2/integrations/company": Company,
		"/roads/integrations": RoadsIntegrations,
		"/roads2/integrations/sos1920-02": sos1920_02,
		"/roads2/integrations/sos1920-06": sos1920_06,
		"/roads2/integrations/sos1920-07": sos1920_07,
		"/roads2/integrations/sos1920-09": sos1920_09,
		"/roads2/integrations/sos1920-27": sos1920_27,
		"/roads2/integrations/sos1920-30": sos1920_30,
		"*" : NotFound
	};
</script>

<main>
	<h1>Análisis del tráfico en España</h1>
	<Router {routes}/>
</main>