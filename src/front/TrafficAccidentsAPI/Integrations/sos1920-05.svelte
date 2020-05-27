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
    
	const url = "https://sos1920-05.herokuapp.com/api/v1/health_public";
	
	onMount(getHealthPublics);
    let health_publics = [];
	async function getHealthPublics() {
		console.log("Fetching health publics stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			health_publics = json;
			console.log("Received " + health_publics.length + " health_publics stats.");
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
	let total_spending = [];
	let public_spending = [];
	let public_spending_pib = [];
	

	MyData.forEach( (v) => {
		let countryyear = v.country + " (" + v.year + ")";
		country.push(countryyear);
		total_spending.push(v['total_spending']);
		public_spending.push(v['public_spending']);
		public_spending_pib.push(v['public_spending_pib']);
	});

	let graphic_data1 = {
		name: 'Total gastado',
		data: total_spending,
		stack: 'Total'
	};
	let graphic_data2 = {
		name: 'Gasto público',
		data: public_spending,
		stack: 'Público'
	};
	let graphic_data3 = {
		name: 'PIB público',
		data: public_spending_pib,
		stack: 'Público'
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
		text: 'Total gasto salud'
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

	{#await health_publics}
		Loading health_publics...
	{:then health_publics}
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico muestra el gasto total en salud.
		</p>
	</figure>		
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Gasto Total (Millones €)</th>
					<th>Gasto Público (Millones €)</th>
					<th>Gasto Público (%PIB)</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each health_publics as health_public}
				<tr>
					<td>{health_public.country}</td>	
					<td>{health_public.year}</td>
					<td>{health_public['total_spending']}</td>
					<td>{health_public['public_spending']}</td>
					<td>{health_public['public_spending_pib']}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>