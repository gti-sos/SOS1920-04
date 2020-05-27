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
    
    const url = "http://sos1920-27.herokuapp.com/api/v2/spc-stats";

    let pluginSPC = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginSPC = json;
			console.log("Received " +  pluginSPC.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let items = ["Un carril", "Doble carril", "Autovía", "Autopista", "Ambos sexos", "Rango de hombres",
         "rango de mujeres"];
        let valores = [];
        let valor = {};
        MyData.forEach( (r) => {
            valor = {
                   name: r.province + "(" + r.year + ")",
                   data: [r.oneway, r.multipleway, r.dualCarriagewayAndHighway, r.highwayWithToll, 0, 0, 0]
               }
            valores.push(valor);
        });
        pluginSPC.forEach( (v) => {
            if(v['continent'] == "europe"){
               valor = {
                   name: v.country + "(" + v.year + ")",
                   data: [0, 0, 0, 0,  parseInt(v['both_sex']),v['male_rank'], v['female_rank']]
               }
               console.log("oneway: " + parseInt(v['both_sex']));
               valores.push(valor);
            }
            
        });

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Integración entre carreteras y SPCs'
            },
            subtitle: {
                text: 'Source: SOS1920-27'
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
                        return this.value;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ' '
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
        {#await  pluginSPC}
            Loading renewable sources...
        {:then  pluginSPC}
            <figure class="highcharts-figure">
                <div id="container"></div>
                <p>   </p>
                <p class="highcharts-description">
                    Grafica uniendo los datos de carreteras, con los de SPCs. Solo podemos
                    mostrar los datos de algunos paises de Europa, ya que son los unicos datos
                    comparables con los nuestros.
                </p>
                <p> <strong> Tabla con los datos proporcionados por la API de vehiculos eléctricos: </strong> </p>

            </figure>	
            <Table bordered>
                <thead>
                    <tr>
                        <th> País </th>
                        <th> Año </th>
                        <th> Ambos sexos</th>
                        <th> Rango de hombres </th>
                        <th> Rango de mujeres </th>
                    </tr>
                </thead>
                <tbody>
                    {#each  pluginSPC as  pluginSPC}
                    <tr>
                        <td> {pluginSPC.country} </td>
                        <td> {pluginSPC.year} </td>
                        <td> {pluginSPC['both_sex']} </td>
                        <td> {pluginSPC['male_rank']} </td>
                        <td> {pluginSPC['female_rank']} </td>
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


