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
    
	const url = "https://sos1920-07.herokuapp.com/api/v2/foodsImports";
	
	onMount(getFood);
    let foods = [];
	async function getFood() {
		console.log("Fetching foods...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			foods = json;
			console.log("Received " + foods.length + " foods stats.");
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
	let vegetalesYpreparados = [];
	let zumoDeFrutas = [];
	let dulcesYcaramelos = [];
	let animalesVivos = [];
	let filetesYdesmenuzados = [];

	MyData.forEach( (v) => {
		let countryyear = v.name + " (" + v.year + ")";
		country.push(countryyear);
		vegetalesYpreparados.push(v.TVegANDPrep);
		zumoDeFrutas.push(v.fruitJuice);
		dulcesYcaramelos.push(v.TSweANDCndy);
		animalesVivos.push(v.TLiveAnimal);
		filetesYdesmenuzados.push(v.FishFilletANDMince);
	});

	let graphic_data1 = {
		name: 'Vegetales y preparados',
		data: vegetalesYpreparados,
		stack: 'Importación'
	};
	let graphic_data2 = {
		name: 'Zumo de Frutas',
		data: zumoDeFrutas,
		stack: 'Importación'
	};
	let graphic_data3 = {
		name: 'Dulces y caramelos',
		data: dulcesYcaramelos,
		stack: 'Importación'
	};
	let graphic_data4 = {
		name: 'Animales vivos',
		data: animalesVivos,
		stack: 'Importación'
	};
	let graphic_data5 = {
		name: 'Filetes de pescado y desmenuzado',
		data: filetesYdesmenuzados,
		stack: 'Importación'
	};
	
	parsed_data.push(graphic_data2);
	parsed_data.push(graphic_data1);
	parsed_data.push(graphic_data3);
	parsed_data.push(graphic_data4);
	parsed_data.push(graphic_data5);
	

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
		text: 'Total importación'
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

	{#await foods}
		Loading foods...
	{:then foods}	
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico muestra las estadísticas de importación de alimentos.
		</p>
	</figure>	
		<Table bordered>
			<thead>
				<tr>
				<th>País</th>
                <th>Año</th>
                <th>Vegetales y preparados</th>
                <th>Zumo de frutas</th>
                <th>Dulces y caramelos</th>
                <th>Animales vivos</th>
                <th>Filetes de pescado y desmenuzado</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each foods as food}
				<tr>	
					<td>{food.name}</td>
					<td>{food.year}</td>
                    <td>{food.TVegANDPrep}</td>
                    <td>{food.fruitJuice}</td>
                    <td>{food.TSweANDCndy}</td>
                    <td>{food.TLiveAnimal}</td>
                    <td>{food.FishFilletANDMince}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>