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
    
	const url = "https://sos1920-02.herokuapp.com/API/v2/rural-tourism-stats";
	
	onMount(getTourism);
    let tourism = [];
	async function getTourism() {
		console.log("Fetching tourism stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			tourism = json;
			console.log("Received " + tourism.length + " tourism stats.");
		} else {
			console.log("ERROR!");
		}
	}

	async function loadGraph(){
    
	let MyData = [];
	

	const resData = await fetch(url);
	MyData = await resData.json();
	let parsed_data = [];
	let province = [];
	let traveller = [];
	let overnightstay = [];
	let averagestay = [];
	

	MyData.forEach( (v) => {
		let provinceyear = v.province + " (" + v.year + ")";
		province.push(provinceyear);
		traveller.push(v.traveller);
		overnightstay.push(v.overnightstay);
		averagestay.push(v.averagestay);
	});

	let graphic_data1 = {
		name: 'Viajeros',
		data: traveller,
		stack: 'Datos'
	};
	let graphic_data2 = {
		name: 'Pernoctaciones',
		data: overnightstay,
		stack: 'Datos'
	};
	let graphic_data3 = {
		name: 'Estancia media',
		data: averagestay,
		stack: 'Datoss'
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
		text: 'Total turismo rural'
	},

	xAxis: {
		categories: province,
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

	{#await tourism}
		Loading tourism...
	{:then tourism}	
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico muestra el turismo rural por provincias.
		</p>
	</figure>
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
                	<th>Año</th>
                	<th>Viajero</th>
                	<th>Pernoctación</th>
					<th>Estancia media</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each tourism as tou}
				<tr>	
					<td>{tou.province}</td>
					<td>{tou.year}</td>
                    <td>{tou.traveller}</td>
					<td>{tou.overnightstay}</td>
                    <td>{tou.averagestay}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>