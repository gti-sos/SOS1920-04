<script>
	import  {
		onMount
	}
	from "svelte";
	import {
        pop
    } from "svelte-spa-router";

	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
	const url = "https://sos1920-09.herokuapp.com/api/v4/renewable-sources-stats";
	
	onMount(getRenewableSources);
    let renewableSources = [];
	async function getRenewableSources() {
		console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			renewableSources = json;
			console.log("Received " + renewableSources.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
		}
	}
	async function loadGraph(){
		let MyData = [];
		const resData = await fetch("/api/v1/vehicles");
		MyData = await resData.json();
		let parsed_data = [];
		MyData.forEach( (v) => {
			let porcentajeCoche = v.car/v.total*100;
			porcentajeCoche = Math.round(porcentajeCoche * 100) / 100
			let porcentajeBus = v.bus/v.total*100;
			porcentajeBus = Math.round(porcentajeBus * 100) / 100
			let data = {
				name: v.province,
				data: [porcentajeCoche, porcentajeBus, null]
			};
			parsed_data.push(data)
		});
		const resData2 = await fetch(url);
		renewableSources = await resData2.json();
		console.log(renewableSources);
		renewableSources.forEach( (r) => {
			if(r.country == "Spain"){
				let data = {
					name: "España",
					data: [null, null, r["percentage-re-total"]]
				};
				parsed_data.push(data)
			}
		});
		
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Coches y autobuses y uso de energías renovables'
			},
			xAxis: {
				categories: ["Coches", "Autobuses", "Porcentaje de energías renovables"]
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Porcentaje'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: ( // theme
							Highcharts.defaultOptions.title.style &&
							Highcharts.defaultOptions.title.style.color
						) || 'gray'
					}
				}
			},
			legend: {
				align: 'right',
				x: -30,
				verticalAlign: 'top',
				y: 25,
				floating: true,
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true
					}
				}
			},
			series: parsed_data
		});
	};
</script>

<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>
<style>
	#container {
    height: 400px; 
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #EBEBEB;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>


<main>

	{#await renewableSources}
		Loading renewable sources...
	{:then renewableSources}
		<figure class="highcharts-figure">
			<div id="container"></div>
			<p class="highcharts-description">
				El gráfico compara el porcentaje de coches existentes, con el de autobuses por provincias. Este resultado se compara también con el porcentaje de uso de energías renovables.
			</p>
		</figure>	
		<Table bordered>
			<thead>
				<tr>
					<th> País </th>
					<th> Año </th>
					<th> Porcentaje de uso de energías renovables </th>
					<th> Porcentaje de uso de energías hidroeléctricas </th>
					<th> Porcentaje de uso de energías eólica </th>
				</tr>
			</thead>
			<tbody>
				{#each renewableSources as renewableSource}
				<tr>
					<td> {renewableSource.country} </td>
					<td> {renewableSource.year} </td>
					<td> {renewableSource['percentage-re-total']} </td>
					<td> {renewableSource['percentage-hydropower-total']} </td>
					<td> {renewableSource['percentage-wind-power-total']} </td>
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>