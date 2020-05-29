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
    
	const url = "https://www.mapabase.es/arcgis/rest/services/Ejemplos/Prueba_incidencias_DGT/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
	async function loadGraph(){
		let MyData = [];
		const resData = await fetch("/api/v1/vehicles");
		MyData = await resData.json();
		let parsed_data = [];
		MyData.forEach( (v) => {
			let data = {
				name: v.province + " " + v.year,
				data: [v.bus, null, null]
			};
			parsed_data.push(data)
		});
		const resData2 = await fetch(url);
        let dgt = await resData2.json();
        dgt = dgt.features
		console.log(dgt);
        let i = 0;
        let a = 0;
        let control = 0;
		dgt.forEach( (d) => {
            if (d.attributes.causa == " ITINERARIO ALTERNATIVO "){
            i = i + 1;
            }
            if (d.attributes.causa == " ACCESOS CERRADOS "){
                a = a + 1;
            }
            control++;
        });
            let data = {
					name: "Itinierario alternativo",
					data: [null, i, null]
				};
            parsed_data.push(data)
            let data2 = {
					name: "Accesos cerrados",
					data: [null, null, a]
				};
			parsed_data.push(data2)

		
		console.log(parsed_data);
		
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Total de autobuses e incidentes de la DGT'
			},
			xAxis: {
				categories: ["Autobuses", "Accesos cerrados", "Itinierario alternativo"]
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
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			El gráfico compara el número de autobuses según la provincia y los incidentes de las carreteras de la DGT.
		</p>
	</figure>	
</main>