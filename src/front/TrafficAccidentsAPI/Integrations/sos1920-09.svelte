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
    
	const url = "https://sos1920-09.herokuapp.com/api/v2/oil-coal-nuclear-energy-consumption-stats";
	
	onMount(getOilEnergy);
    let oilEnergy = [];
	async function getOilEnergy() {
		console.log("Fetching oil energy stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			oilEnergy = json;
			console.log("Received " + oilEnergy.length + " oil energy stats.");
		} else {
			console.log("ERROR!");
		}
	}

	async function loadGraph(){
    
	let MyData = [];
	

	const resData = await fetch(url);
	MyData = await resData.json();
	let parsed_data = [];
	let country = [];
	let oilConsuption = [];
	let coalConsuption = [];
	let nuclearEnergyConsumption = [];
	

	MyData.forEach( (v) => {
		let countryyear = v.country + " (" + v.year + ")";
		country.push(countryyear);
		oilConsuption.push(v['oil-consumption']);
		coalConsuption.push(v['coal-consumption']);
		nuclearEnergyConsumption.push(v['nuclear-energy-consumption']);
	});

	let graphic_data1 = {
		name: 'Consumo aceite',
		data: oilConsuption,
		stack: 'Consumo'
	};
	let graphic_data2 = {
		name: 'Consumo carbón',
		data: coalConsuption,
		stack: 'Consumo'
	};
	let graphic_data3 = {
		name: 'Consumo energía nuclear',
		data: nuclearEnergyConsumption,
		stack: 'Consumo'
	};
	
	parsed_data.push(graphic_data2);
	parsed_data.push(graphic_data1);
	parsed_data.push(graphic_data3);
	

	Highcharts.chart('container', {
		chart: {
			type: 'column',
			options3d: {
			enabled: true,
			alpha: 15,
			beta: 15,
			viewDistance: 25,
			depth: 40
			}
	},

	title: {
		text: 'Total consumo'
	},

	xAxis: {
		categories: country,
		labels: {
		skew3d: true,
		style: {
		fontSize: '16px'
		}
	}
	},

	yAxis: {
		allowDecimals: false,
		min: 0,
		title: {
		text: 'Números',
		skew3d: true
	}
	},

	tooltip: {
		headerFormat: '<b>{point.key}</b><br>',
		pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
	},

	plotOptions: {
		column: {
		stacking: 'normal',
		depth: 40
	}
	},

	series: parsed_data
});

	console.log(parsed_data);  
}
</script>

<svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
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

	{#await oilEnergy}
		Loading oil energy...
	{:then oilEnergy}
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico muestra el uso de energías renovables.
		</p>
	</figure>	
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Consumo de Gasolina</th>
					<th>Consumo de Carbón</th>
                    <th>Consumo de Energía Nuclear</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each oilEnergy as oilEnergyStat}
				<tr>	
					<td>{oilEnergyStat.country}</td>
                    <td>{oilEnergyStat.year}</td>			
                    <td>{oilEnergyStat['oil-consumption']}</td>
                    <td>{oilEnergyStat['coal-consumption']}</td>
                    <td>{oilEnergyStat['nuclear-energy-consumption']}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>