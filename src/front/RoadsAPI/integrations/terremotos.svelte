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
    
    const url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=landslide&q=&sort=date&facet=countrynam&facet=landslide&facet=location_a&facet=adminname1&facet=country&facet=landslide1"
    let pluginGasolina = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginGasolina = json;
			console.log("Received " +  pluginGasolina.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        pluginGasolina = pluginGasolina["records"];
        console.log(pluginGasolina);
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let items = ["Un carril", "Doble carril", "Autovía", "Autopista", "Poblacion","Distancia", "Heridos",
         "Muertos"];
        let valores = [];
        let valor = {};
        let provincias = [];
        MyData.forEach( (r) => {
            provincias.push(r.province);
            valor = {
                name: r.province,
                data: [r.oneway, r.multipleway, r.dualCarriagewayAndHighway, r.highwayWithToll, 
                    null, null, null, null]
            }
            valores.push(valor);
        });
        for(var i = 0; i < pluginGasolina.length; i++) {
            console.log(pluginGasolina[i].fields.date);
            valor = {
                name: pluginGasolina[i].fields.adminname1 + "(" ,
                data: [null, null, null, null,pluginGasolina[i].fields.population,  pluginGasolina[i].fields.distance,
                pluginGasolina[i].fields.injuries, pluginGasolina[i].fields.fatalities]
            }
            valores.push(valor);
        }
        console.log(valores)
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Integración entre el numero de carreteras y los terremotos de EEUU'
            },
            subtitle: {
                text: 'Source: Public.opendatasoft'
            },
            xAxis: {
                categories: items,
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value ;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ''
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: valores
        });
	};
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<figure class="highcharts-figure">
            <figure class="highcharts-figure">
                <div id="container"></div>
                <p>   </p>
                <p class="highcharts-description">
                    Grafica uniendo los datos de carreteras, con los terremotos de Estados Unidos. 
                    Extraida de Public.opendatasoft mediante la API de Global Landslide Catalog.
                </p>
            </figure>	
        <p>
            <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
        </p>
  </figure>



<style>
	#container {
        height: 550px; 
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 1200px; 
    max-width: 1200px;
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


