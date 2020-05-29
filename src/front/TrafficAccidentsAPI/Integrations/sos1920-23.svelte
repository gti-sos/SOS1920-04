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
    
	const url = "https://sos1920-23.herokuapp.com/API/v2/cigarretes-sales";
	
	onMount(getCigarretes);
    let cigarretes = [];
	async function getCigarretes() {
		console.log("Fetching cigarretes stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			cigarretes = json;
			console.log("Received " + cigarretes.length + " cigarretes.");
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
    let accidentWithVictims = [];
    let mortalAccident = [];
    let death = [];
    let hospitalizedWounded = [];
	let notHospitalizedWounded = [];
	let datosCigarrillos = [];
	var Totalcigarrete_sale = 0;
	
	

	MyData.forEach( (v) => {
		Totalcigarrete_sale = Totalcigarrete_sale + v['cigarrete_sale'];
	});
	provinces.push("Total España");
	datosCigarrillos.push(Totalcigarrete_sale);
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
            name: 'Total cigarrillos vendidos',
            data: datosCigarrillos,
            stack: 'Total cigarrillos vendidos'
        };
		let graphic_data2 = {
            name: 'Accidentes con víctimas',
            data: accidentWithVictims,
            stack: 'Accidentes'
        };
        let graphic_data3 = {
            name: 'Accidentes mortales',
            data: mortalAccident,
            stack: 'Accidentes'
        };
        let graphic_data4 = {
            name: 'Muertes',
            data: death,
            stack: 'Víctimas'
        };
        let graphic_data5 = {
            name: 'Víctimas hospitalizadas',
            data: hospitalizedWounded,
            stack: 'Víctimas'
        };
        let graphic_data6 = {
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
		text: 'Total ventas'
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

	{#await cigarretes}
		Loading cigarretes...
	{:then cigarretes}	
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico muestra las ventas de cigarrillos.
		</p>
	</figure>
		<Table bordered>
			<thead>
				<tr>
					<th>Comunidad</th>
					<th>Año</th>
					<th>Venta de paquetes</th>
					<th>Primera variacion</th>
					<th>Segunda variacion</th>
				</tr>
			</thead>
			<tbody>
				{#each cigarretes as cigarrete}
				<tr>
					<td>{cigarrete.community}</td>	
					<td>{cigarrete.year}</td>
					<td>{cigarrete.cigarrete_sale}</td>
					<td>{cigarrete.first_variation}</td>
					<td>{cigarrete.second_variation}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>