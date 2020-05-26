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
    
	const url = "https://sos1920-12.herokuapp.com/api/v2/overdose-deaths";
	
	onMount(getOverdoseDeaths);
    let overdoseDeaths = [];
	async function getOverdoseDeaths() {
		console.log("Fetching overdose deaths...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			overdoseDeaths = json;
			console.log("Received " + overdoseDeaths.length + " roverdose deaths.");
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
			let total = Math.round(v.total / 10) / 100
			let data = {
				name: v.province + " " + v.year,
				data: [total, null]
			};
			parsed_data.push(data)
		});
		const resData2 = await fetch(url);
		overdoseDeaths = await resData2.json();
		console.log(overdoseDeaths);
		overdoseDeaths.forEach( (o) => {
			if(o.country == "France"){
				let data = {
					name: "España"+" " + o.year,
					data: [null, o.death_total]
				};
				parsed_data.push(data)
			}
		});
		
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Total de vehículos y muertes por sobredosis'
			},
			xAxis: {
				categories: ["Vehículos (en miles)", "Muertes por sobredosis"]
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

	{#await overdoseDeaths}
		Loading overdose deaths ...
	{:then overdoseDeaths}
		<figure class="highcharts-figure">
			<div id="container"></div>
			<p class="highcharts-description">
				El gráfico compara el número total de vehículos según la provincia y las muertes por sobredosis en España.
			</p>
		</figure>	
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Hombres fallecidos</th>
					<th>Mujeres fallecidas</th>
					<th>Total fallecidos</th>
					<th>Edad media</th>
				</tr>
			</thead>
			<tbody>
				{#each overdoseDeaths as overdose_death}
				<tr>
                    <td>{overdose_death.country}</td>
                    <td>{overdose_death.year}</td>
                    <td>{overdose_death.death_male}</td>
                    <td>{overdose_death.death_female}</td>
                    <td>{overdose_death.death_total}</td>
                    <td>{overdose_death.mean_age}</td>
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>