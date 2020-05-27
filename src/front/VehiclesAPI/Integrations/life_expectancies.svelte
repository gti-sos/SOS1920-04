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
    
	const url = "https://sos1920-05.herokuapp.com/api/v1/life_expectancies";
	
	onMount(getLife_expectancies );
    let life_expectancies  = [];
	async function getLife_expectancies() {
		console.log("Fetching life expectancies...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			life_expectancies = json;
			console.log("Received " + life_expectancies.length + " life expectancies.");
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
		life_expectancies = await resData2.json();
		console.log(life_expectancies);
		life_expectancies.forEach( (l) => {
            let data = {
                name: l.country + " " + l.year,
                data: [null, l['average_life_expectancy']]
            };
            parsed_data.push(data)
		});
		
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Total de vehículos y esperanza de vida'
			},
			xAxis: {
				categories: ["Vehículos (en miles)", "Esperanza de vida"]
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

	{#await life_expectancies}
		Loading life expectancies ...
	{:then life_expectancies}
		<figure class="highcharts-figure">
			<div id="container"></div>
			<p class="highcharts-description">
				El gráfico compara el número total de vehículos según la provincia y la esperanza de vida en distintos países.
			</p>
		</figure>	
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
                    <th>Año</th>
                    <th>Esperanza de vida en Mujeres</th>
                    <th>Esperanza de vida en Hombres</th>
                    <th>Esperanza de vida Media</th>
				</tr>
			</thead>
			<tbody>
				{#each life_expectancies as life_expectancie}
				<tr>
                    <td>{life_expectancie.country}</td>
					<td>{life_expectancie.year}</td>
					<td>{life_expectancie['women_life_expectancy']}</td>
					<td>{life_expectancie['men_life_expectancy']}</td>
					<td>{life_expectancie['average_life_expectancy']}</td>
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>