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
    
	onMount(getUniversity);
    let cannabis = [];
	async function getUniversity() {
		console.log("Fetching university...");	
		const res = await fetch("https://brianiswu-otreeba-open-cannabis-v1.p.rapidapi.com/seed-companies", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "brianiswu-otreeba-open-cannabis-v1.p.rapidapi.com",
		"x-rapidapi-key": "751d116867msh3a1f728314793dap1eae7bjsn1738b29d11e8"
	}
})
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			cannabis = json;
			console.log("Received " + cannabis.length + " universities.");
		} else {
			console.log("ERROR!");
        }
        console.log(cannabis);
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
		const resData2 = await fetch("https://covid19india.p.rapidapi.com/getIndiaStateData", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid19india.p.rapidapi.com",
		"x-rapidapi-key": "751d116867msh3a1f728314793dap1eae7bjsn1738b29d11e8"
	}
})
		lq = await resData2.json();
		console.log(lq);
		lq.forEach( (l) => {
			if(l.country == "spain"){
				let data = {
					name: "España"+" " + l.year,
					data: [null, l.total]
				};
				parsed_data.push(data)
			}
		});
		
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Total de vehículos y calidad de vida'
			},
			xAxis: {
				categories: ["Vehículos (en miles)", "Porcentaje de calidad de vida"]
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

	{#await lq}
		Loading lq ...
	{:then lq}
		<figure class="highcharts-figure">
			<div id="container"></div>
			<p class="highcharts-description">
				El gráfico compara el número total de vehículos según la provincia y la calidad de vida en España.
			</p>
		</figure>	
		<Table bordered>
			<thead>
				<tr>
                    <th>Rank</th>
                    <th>Country</th>
                    <th>Stability</th>
                    <th>Right</th>
                    <th>Health</th>
                    <th>Security</th>
                    <th>Climate</th>
                    <th>Costs</th>
                    <th>Popularity</th>
                    <th>Total</th>
                    <th>Year</th>
                    <th>Continent</th>
				</tr>
			</thead>
			<tbody>
				{#each lq as lifeq}
				<tr>
                    <td>{lifeq.rank}</td>
                    <td>{lifeq.country}</td>
                    <td>{lifeq.stability}</td>
                    <td>{lifeq.right}</td>
                    <td>{lifeq.health}</td>
                    <td>{lifeq.security}</td>
                    <td>{lifeq.climate}</td>
                    <td>{lifeq.costs}</td>
                    <td>{lifeq.popularity}</td>
                    <td>{lifeq.total}</td>
                    <td>{lifeq.year}/td>
                    <td>{lifeq.continent}</td>
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>
