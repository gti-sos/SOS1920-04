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
    
	const url = "https://sos1920-22.herokuapp.com/api/v2/formula-stats";
	
	onMount(getformula1);
    let formula1  = [];
	async function getformula1() {
		console.log("Fetching formula 1 ...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			formula1 = json;
			console.log("Received " + formula1.length + " formula 1.");
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
			let car = Math.round(v.car / 10) / 100
			let data = {
				name: v.province + " " + v.year,
				data: [car, null]
			};
			parsed_data.push(data)
		});
		const resData2 = await fetch(url);
		formula1 = await resData2.json();
		console.log(formula1);
		formula1.forEach( (f) => {
            let data = {
                name: f.country +" " + f.year,
                data: [null, f.victorynumber]
            };
            parsed_data.push(data)
		});
		
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Número de coches y victorias en fórmula 1'
			},
			xAxis: {
				categories: ["Coches (en miles)", "Victorias"]
			},
			yAxis: {
				min: 0,
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

	{#await formula1}
		Loading formula 1 ...
	{:then formula1}
		<figure class="highcharts-figure">
			<div id="container"></div>
			<p class="highcharts-description">
				El gráfico compara el número de coches según la provincia y las victorias de los pilotos de fórmula 1.
			</p>
		</figure>	
		<Table bordered>
			<thead>
				<tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Número de puntos</th>
                    <th>Número de pilotos</th>
                    <th>Número de victorias</th>
                </tr>
			</thead>
			<tbody>
				{#each formula1 as piloto}
				<tr>
                    <td> {piloto.country} </td>
                    <td> {piloto.year} </td>
                    <td> {piloto.totalpointnumber} </td>
                    <td> {piloto.pilotnumber} </td>
                    <td> {piloto.victorynumber} </td>
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>