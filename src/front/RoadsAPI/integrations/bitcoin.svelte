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
    
    let pluginBitcoin = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://alpha-vantage.p.rapidapi.com/query?market=CNY&symbol=BTC&function=DIGITAL_CURRENCY_DAILY", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"x-rapidapi-key": "1aadc89e2cmsh7affff1b7dc9661p1e119fjsneb577e40a33e"
	}
})
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginBitcoin = json;
			console.log("Received " +  pluginBitcoin.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
		}
        let items = ["2017-10-28", "2018-05-28", "2018-10-28", "2019-05-28", "2019-10-28", "2020-05-28"];
        let valor = {};
        let valores = [];
        let datos = [];
        items.forEach( (v) => {
            datos.push(parseInt(pluginBitcoin["Time Series (Digital Currency Daily)"][v]["1b. open (USD)"]));
        });
        console.log(datos);
        valor = {
                name: "Bitcoin",
                data: datos
            }
        valores.push(valor);

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Valores del bitcoin en euros'
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
                    Gráfica con API externa con los valores del bitcoin en euros. 
                    Extraida de la API Alpha Vantage de Rapidapi.
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


