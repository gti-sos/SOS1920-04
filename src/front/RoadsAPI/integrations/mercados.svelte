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
    
    const url = "https://sos1920-07.herokuapp.com/api/v2/imports";

    let pluginImports = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		"x-rapidapi-key": "1aadc89e2cmsh7affff1b7dc9661p1e119fjsneb577e40a33e"
	}
}); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginImports = json;
			console.log("Received " +  pluginImports.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
		}
        const resData = await fetch("/api/v1/roads");
        let valor = {};
        let valores = [];
        MyData = await resData.json();
        MyData.forEach( (r) => {
            valor = {
                   name: r.province + "(" + r.year + ")",
                   data: [r.oneway, r.multipleway, r.dualCarriagewayAndHighway, r.highwayWithToll, r.total, null, null, null]
               }
            valores.push(valor);
        });
        let items = ["Un carril", "Doble carril", "Autovía", "Autopista", "Total", 
        "Valor de cambio", "Valor del mercado antes de cerrarse", "Valor del mercado"];
        let paises = [];
        pluginImports = pluginImports.marketSummaryResponse.result;
        pluginImports.forEach( (v) => {
            if(paises.includes(v.exchangeTimezoneName + "(" + v.regularMarketTime.fmt + ")")) {

            }
            else {
                valor = {
                   name: v.exchangeTimezoneName + "(" + v.regularMarketTime.fmt + ")",
                   data: [null, null, null, null, null,
                   v.regularMarketChange.raw,v.regularMarketPreviousClose.raw, v.regularMarketPrice.raw]
               }
                valores.push(valor);
                paises.push(v.exchangeTimezoneName + "(" + v.regularMarketTime.fmt + ")");
            }            
        });

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Valores actuales de los mercados en el mundo'
            },
            subtitle: {
                text: 'Source: RapidAPI'
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
                Gráfica con API externa con los valores actuales de los mercados en el mundo con mi API de numero de carreteras. 
                Extraida de la API Yahoo Finance de Rapidapi.
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


