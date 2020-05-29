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
	import TrafficAccidentsStatistics2 from './TrafficAccidentsAPI/TrafficAccidentsStatistics2.svelte';
	import integrations from "./integrations.svelte";

	import VehiclesIntegrations from './VehiclesAPI/Integrations/Home.svelte';
	import sos1920_12_overdose_deaths from './VehiclesAPI/Integrations/overdose_deaths.svelte';
	import sos1920_09_renewable_sources from './VehiclesAPI/Integrations/renewable_sources.svelte';
	import sos1920_05_life_expectancies from './VehiclesAPI/Integrations/life_expectancies.svelte';
	import sos1920_27_lq_stats from './VehiclesAPI/Integrations/lq_stats.svelte';
	import sos1920_02_traffic_accidents from './VehiclesAPI/Integrations/traffic_accidents.svelte';
	import sos1920_01_natality_stats from './VehiclesAPI/Integrations/natality_stats.svelte';
	import sos1920_06_lottery_sales from './VehiclesAPI/Integrations/lottery_sales.svelte';
	import sos1920_28_gce from './VehiclesAPI/Integrations/gce.svelte';
	import sos1920_22_formula_stats from './VehiclesAPI/Integrations/formula_stats.svelte';
	import incidents from './VehiclesAPI/Integrations/incidents.svelte';
	import coronavirus from './VehiclesAPI/Integrations/coronavirus.svelte';
	import incidenciasDGT from './VehiclesAPI/Integrations/incidenciasDGT.svelte';
	import vehiculosZaragoza from './VehiclesAPI/Integrations/vehiculosZaragoza.svelte';

	import RoadsIntegrations from './RoadsAPI/integrations/Home.svelte';
	import sos1920_06 from './RoadsAPI/integrations/sos1920-06.svelte';
	import sos1920_07 from './RoadsAPI/integrations/sos1920-07.svelte';
	import sos1920_09 from './RoadsAPI/integrations/sos1920-09.svelte';
	import sos1920_27 from './RoadsAPI/integrations/sos1920-27.svelte';
	import sos1920_30 from './RoadsAPI/integrations/sos1920-30.svelte';
	import sos1920_02 from './RoadsAPI/integrations/sos1920-02.svelte';
	import mercados from './RoadsAPI/integrations/mercados.svelte';
	import covid from './RoadsAPI/integrations/covid.svelte';
	import bitcoin from './RoadsAPI/integrations/bitcoin.svelte';
	import football from './RoadsAPI/integrations/football.svelte';
	import aeropuertos from './RoadsAPI/integrations/aeropuertos.svelte';
	import poblacion from './RoadsAPI/integrations/poblacion.svelte';
	import notas from './RoadsAPI/integrations/notas.svelte';
	import gasolina from './RoadsAPI/integrations/gasolina.svelte';
	import terremotos from './RoadsAPI/integrations/terremotos.svelte';
	import Analytics from './analytics/statistics.svelte';


	import TrafficAccidentsIntegrations from './TrafficAccidentsAPI/Integrations/Home.svelte';
	import sos1920_09_TA from './TrafficAccidentsAPI/Integrations/sos1920-09.svelte';
	import sos1920_23_TA from './TrafficAccidentsAPI/Integrations/sos1920-23.svelte';
	import sos1920_01_TA from './TrafficAccidentsAPI/Integrations/sos1920-01.svelte';
	import sos1920_07_TA from './TrafficAccidentsAPI/Integrations/sos1920-07.svelte';
	import sos1920_02_TA from './TrafficAccidentsAPI/Integrations/sos1920-02.svelte';
	import sos1920_05_TA from './TrafficAccidentsAPI/Integrations/sos1920-05.svelte';
	import sos1920_22_TA from './TrafficAccidentsAPI/Integrations/sos1920-22.svelte';
	import apiexternacontaminacionmadrid from './TrafficAccidentsAPI/Integrations/apiexternacontaminacionmadrid.svelte';
	import apiexternapaises from './TrafficAccidentsAPI/Integrations/apiexternapaises.svelte';
	
	import About from './about/about.svelte';

	const routes = {
		"/" : Home,
		"/analytics": Analytics,
		"/about": About,
		"/vehicles": VehiclesAPI,
		"/traffic_accidents": TrafficAccidentsAPI,
		"/traffic_accidents/statistics": TrafficAccidentsStatistics,
		"/traffic_accidents/statistics2": TrafficAccidentsStatistics2,
		"/roads": RoadsAPI,
		"/vehicles/statistics": VehiclesStatistics,
		"/vehicles/statistics2": VehiclesStatistics2,
		"/roads/statistics": RoadsStatistics,
		"/roads/statistics2": RoadsStatistics2,
		"/vehicles/:vehicleProvince/:vehicleYear" : EditVehicle,
		"/roads/:roadProvince/:roadYear" : EditRoad,
		"/traffic_accidents/:traffic_accidentProvince/:traffic_accidentYear" : EditTrafficAccidents,
		
		"/vehicles/integrations": VehiclesIntegrations,
		'/vehiclesI/integrations/overdose_deaths': sos1920_12_overdose_deaths,
		'/vehiclesI/integrations/renewable_sources': sos1920_09_renewable_sources,
		'/vehiclesI/integrations/life_expectancies': sos1920_05_life_expectancies,
		'/vehiclesI/integrations/lq_stats': sos1920_27_lq_stats,
		'/vehiclesI/integrations/traffic_accidents': sos1920_02_traffic_accidents,
		'/vehiclesI/integrations/natality_stats': sos1920_01_natality_stats,
		'/vehiclesI/integrations/gce': sos1920_28_gce,
		'/vehiclesI/integrations/lottery_sales': sos1920_06_lottery_sales,
		'/vehiclesI/integrations/formula_stats': sos1920_22_formula_stats,
		"/vehiclesI/integrations/incidents": incidents,
		"/vehiclesI/integrations/coronavirus": coronavirus,
		"/vehiclesI/integrations/incidenciasDGT": incidenciasDGT,
		"/vehiclesI/integrations/vehiculosZaragoza": vehiculosZaragoza,


		"/roads/integrations": RoadsIntegrations,
		"/roads2/integrations/sos1920-02": sos1920_02,
		"/roads2/integrations/sos1920-06": sos1920_06,
		"/roads2/integrations/sos1920-07": sos1920_07,
		"/roads2/integrations/sos1920-09": sos1920_09,
		"/roads2/integrations/sos1920-27": sos1920_27,
		"/roads2/integrations/sos1920-30": sos1920_30,
		"/roads2/integrations/mercados": mercados,
		"/roads2/integrations/covid": covid,
		"/roads2/integrations/bitcoin": bitcoin,
		"/roads2/integrations/football": football,
		"/roads2/integrations/aeropuertos": aeropuertos,
		"/roads2/integrations/poblacion": poblacion,
		"/roads2/integrations/notas": notas,
		"/roads2/integrations/gasolina": gasolina,
		"/roads2/integrations/terremotos": terremotos,





		"/traffic_accidents/integrations": TrafficAccidentsIntegrations,
		"/traffic_accidentsI/integrations/sos1920-09": sos1920_09_TA,
		"/traffic_accidentsI/integrations/sos1920-23": sos1920_23_TA,
		"/traffic_accidentsI/integrations/sos1920-01": sos1920_01_TA,
		"/traffic_accidentsI/integrations/sos1920-07": sos1920_07_TA,
		"/traffic_accidentsI/integrations/sos1920-02": sos1920_02_TA,
		"/traffic_accidentsI/integrations/sos1920-05": sos1920_05_TA,
		"/traffic_accidentsI/integrations/sos1920-22": sos1920_22_TA,
		"/traffic_accidentsI/integrations/apiexternacontaminacionmadrid": apiexternacontaminacionmadrid,
		"/traffic_accidentsI/integrations/apiexternapaises": apiexternapaises,

		"/integrations": integrations,
		"*" : NotFound
	};
</script>

<main>
	<h1>Análisis del tráfico en España</h1>
	<Router {routes}/>
</main>
