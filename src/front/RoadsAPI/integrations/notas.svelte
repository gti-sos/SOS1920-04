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
    
    const url = "/record/87664/files/JSON.json";

    let pluginNotas = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginNotas = json;
			console.log("Received " +  pluginNotas.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        pluginNotas = pluginNotas["datos"];
        console.log(pluginNotas);
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let items = ["Un carril", "Doble carril", "Autovía", "Autopista", "1º nota definitiva", "2º nota definitiva",
         "1º nota adjudicación", "2º nota adjudicación"];
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
        pluginNotas.forEach( (n) => {
            if(n["NOTA_CORTE_DEFINITIVA_1"] != null && n["NOTA_CORTE_DEFINITIVA_2"] != null && n["NOTA_CORTE_ADJUDICACION_1"] != null &&
            n["NOTA_CORTE_ADJUDICACION_2"] != null) {
                valor = {
                    name: n["ESTUDIO"] + "(" + n["LOCALIDAD"] +")",
                    data: [null, null, null, null, n["NOTA_CORTE_ADJUDICACION_1"], n["NOTA_CORTE_ADJUDICACION_2"], n["NOTA_CORTE_DEFINITIVA_1"],
                     n["NOTA_CORTE_DEFINITIVA_2"]]
                }
                valores.push(valor);
            }
        });
        console.log(provincias);

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Integración entre el numero de carreteras y las notas de corte de 2019'
            },
            subtitle: {
                text: 'Source: Universidad de Zaragoza'
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
                    Grafica uniendo los datos de carreteras, con notas de corte. 
                    Extraida de la Universidad de Zaragoza.
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


