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
    
	const url = "/api/v1/swim-stats";
	
	onMount(getSwimmers);
    let swimmers = [];
	async function getSwimmers() {
		console.log("Fetching swimmers stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			swimmers = json;
			console.log("Received " + swimmers.length + " swimmers stats.");
		} else {
			console.log("ERROR!");
		}
	}

	async function loadGraph(){
    
	let MyDataAPI = [];
	let MyData = [];
	let parsed_data = [];
	const resData1 = await fetch(url);
	MyData = await resData1.json();
	const resData2 = await fetch("/api/v1/traffic_accidents");
	MyDataAPI = await resData2.json();

	
	let provinces = [];
	let position = [];
	let time = [];
	let accidentWithVictims = [];
    let mortalAccident = [];
    let death = [];
    let hospitalizedWounded = [];
	let notHospitalizedWounded = [];

	MyData.forEach( (v) => {
		if(v.country == "korea"){
		provinces.push(v.country);
		position.push(v.position);
		time.push(v.time);
		}
		
	});
	accidentWithVictims.push(0);
    mortalAccident.push(0);
	death.push(0);
    hospitalizedWounded.push(0);
    notHospitalizedWounded.push(0);

	MyDataAPI.forEach( (v) => {
            provinces.push(v.province);
            accidentWithVictims.push(v.accidentWithVictims);
            mortalAccident.push(v.mortalAccident);
            death.push(v.death);
            hospitalizedWounded.push(v.hospitalizedWounded);
            notHospitalizedWounded.push(v.notHospitalizedWounded);
        });


	let graphic_data1 = {
		name: 'Poasición',
		data: position,
		stack: 'Poasición'
	};
	let graphic_data2 = {
		name: 'Tiempo',
		data: time,
		stack: 'Tiempo'
	};
	let graphic_data3 = {
            name: 'Accidentes con víctimas',
            data: accidentWithVictims,
            stack: 'Accidentes'
        };
    let graphic_data4 = {
        name: 'Accidentes mortales',
        data: mortalAccident,
        stack: 'Accidentes'
    };
    let graphic_data5 = {
        name: 'Muertes',
        data: death,
        stack: 'Víctimas'
    };
    let graphic_data6 = {
        name: 'Víctimas hospitalizadas',
        data: hospitalizedWounded,
        stack: 'Víctimas'
    };
    let graphic_data7 = {
        name: 'Víctimas no hospitalizadas',
        data: notHospitalizedWounded,
        stack: 'Víctimas'
    };	
	parsed_data.push(graphic_data1);
	parsed_data.push(graphic_data2);
	parsed_data.push(graphic_data3);
	parsed_data.push(graphic_data4);
	parsed_data.push(graphic_data5);
	parsed_data.push(graphic_data6);	
	parsed_data.push(graphic_data7);
	
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
		text: 'Estadísticas natación'
	},

	xAxis: {
		categories: provinces,
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

	{#await swimmers}
		Loading swimmers...
	{:then swimmers}
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico muestra estadísticas de natación.
		</p>
	</figure>		
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
                    <th>Año</th>
                    <th>Año de nacimiento</th>
                    <th>Posición</th>
                    <th>Tiempo</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each swimmers as swimmer}
				<tr>	
					<td> {swimmer.country} </td>
					<td> {swimmer.year} </td>
					<td> {swimmer.yearofbirth} </td>
                    <td> {swimmer.position}</td>
					<td> {swimmer.time} </td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>