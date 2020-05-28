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
    
    const url = "/api/v2/evolution-of-cycling-routes";

    let pluginCycling = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginCycling = json;
			console.log("Received " +  pluginCycling.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let items = ["Un carril", "Doble carril", "Autovía", "Autopista", "Metropolitano", "Urbano",
         "Resto"];
        let valores = [];
        let valor = {};
        MyData.forEach( (r) => {
            pluginCycling.forEach( (v) => {
                if(r.province.toLowerCase() == v.province ){
                    valor = {
                        name: r.province + "(" + r.year + "-" + v.year + ")",
                        data: [r.oneway, r.multipleway, r.dualCarriagewayAndHighway, r.highwayWithToll, 
                                v['metropolitan'], v['urban'], v['rest']]
                        }
                    valores.push(valor);
                }
                
            });    
        });

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Integración entre el numero de carreteras y los kilometros de carriles bici'
            },
            subtitle: {
                text: 'Source: SOS1920-02'
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
        {#await  pluginCycling}
            Loading renewable sources...
        {:then  pluginCycling}
            <figure class="highcharts-figure">
                <div id="container"></div>
                <p>   </p>
                <p class="highcharts-description">
                    Grafica uniendo los datos de carreteras, con los carriles bici. En 
                    este caso hemos podido unir ambos datos por las provincias en las que coinciden
                    nuestras APIs. Entre parentesis ponemos el año al que se refiere nuestra API
                    y el año al que se refiere la suya.
                    
                </p>
                <p> <strong> Tabla con los datos proporcionados por la API de carriles de bici: </strong> </p>

            </figure>	
            <Table bordered>
                <thead>
                    <tr>
                        <th> Provincia </th>
                        <th> Año </th>
                        <th> Metropolitano</th>
                        <th> Urbano </th>
                        <th> Resto </th>
                    </tr>
                </thead>
                <tbody>
                    {#each  pluginCycling as  pluginCycling}
                    <tr>
                        <td> {pluginCycling.province} </td>
                        <td> {pluginCycling.year} </td>
                        <td> {pluginCycling['metropolitan']} </td>
                        <td> {pluginCycling['urban']} </td>
                        <td> {pluginCycling['rest']} </td>
                    </tr>
                    {/each}
                </tbody>
            </Table>
        {/await}
        <p>
            <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
        </p>
  </figure>



<style>
	#container {
        height: 550px; 
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


