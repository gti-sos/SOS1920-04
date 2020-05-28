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
    
    const url = "https://sos1920-30.herokuapp.com/api/v2/sugarconsume";

    let pluginSugar = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginSugar = json;
			console.log("Received " +  pluginSugar.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let items = ["Un carril", "Doble carril", "Autovía", "Autopista", "Consumo de azucar"];
        let valores = [];
        let valor = {};
        MyData.forEach( (r) => {
            valor = {
                   name: r.province + "(" + r.year + ")",
                   data: [r.oneway, r.multipleway, r.dualCarriagewayAndHighway, r.highwayWithToll, null]
               }
            valores.push(valor);
        });
        pluginSugar.forEach( (v) => {
            if(v.place == "Europa"){
               valor = {
                   name: v.place + "(" + v.year + ")",
                   data: [null, null, null, null,  v['sugarconsume']]
               }
               console.log("oneway: " + parseInt(v['sugarconsume']));
               valores.push(valor);
            }
            
        });

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Integración entre carreteras y consumo de azucar'
            },
            subtitle: {
                text: 'Source: SOS1920-30'
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
        {#await  pluginSugar}
            Loading renewable sources...
        {:then  pluginSugar}
            <figure class="highcharts-figure">
                <div id="container"></div>
                <p>   </p>
                <p class="highcharts-description">
                    Grafica uniendo los datos de carreteras, con los de consumo de azucar. Solo podemos
                    mostrar los datos de Europa por años, ya que son los unicos datos
                    comparables con los nuestros.
                </p>
                <p> <strong> Tabla con los datos proporcionados por la API de consumo de azucar: </strong> </p>

            </figure>	
            <Table bordered>
                <thead>
                    <tr>
                        <th> Zona </th>
                        <th> Año </th>
                        <th> Consumo de azucar</th>
                    </tr>
                </thead>
                <tbody>
                    {#each  pluginSugar
                 as  pluginSugar
        }
                    <tr>
                        <td> {pluginSugar.place} </td>
                        <td> {pluginSugar.year} </td>
                        <td> {pluginSugar['sugarconsume']} </td>
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


