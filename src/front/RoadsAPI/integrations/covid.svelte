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

    let pluginCoronavirus = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
		"x-rapidapi-key": "1aadc89e2cmsh7affff1b7dc9661p1e119fjsneb577e40a33e"
	}
});
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginCoronavirus = json;
			console.log("Received " +  pluginCoronavirus.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
		}
        let items = ["Casos", "Recuperados", "Muertos"];
        let valor = {};
        let valores = [];
        let i = 0;
        pluginCoronavirus.forEach( (v) => {
            if(i < 10) {
                valor = {
                   name: v.name,
                   data: [parseInt(v.cases), parseInt(v.recovered), parseInt(v.deaths)]
                }
                valores.push(valor);
            }
            i = i + 1;
        });

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Valores actuales del coronavirus en la India'
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
    {#await  pluginCoronavirus}
        Loading renewable sources...
    {:then  pluginCoronavirus}
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p>   </p>
            <p class="highcharts-description">
                Gráfica con API externa con los valores actuales del coronavirus en zonas de la India. 
                    Extraida de la API Coronavirus Tracker India de Rapidapi.
                
            </p>
            <p> <strong> Tabla con los datos proporcionados por la API de los valores de los mercados: </strong> </p>

        </figure>	
        <Table bordered>
            <thead>
                <tr>
                    <th> Zona </th>
                    <th> Casos </th>
                    <th> Recuperados</th>
                    <th> Muertos </th>
                </tr>
            </thead>
            <tbody>
                {#each  pluginCoronavirus as  pluginCoronavirus}
                <tr>
                    <td> {pluginCoronavirus.name} </td>
                    <td> {pluginCoronavirus.cases} </td>
                    <td> {pluginCoronavirus.recovered} </td>
                    <td> {pluginCoronavirus.deaths} </td>
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


