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
    
    let pluginImports = [];
    let MyData = [];
    let valores = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://api.collegefootballdata.com/coaches"); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginImports = json;
			console.log("Received " +  pluginImports.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
		}
        let items = ["2006", "2007", "2008", "2009", "2010"];
        let valor = {};
        let ultimo = 2015;
        let entro = 0;
        let i = 0;
        let diferencia = 0;
        let partidos = [];
        pluginImports.forEach( (v) => {
            partidos = [];
            entro = 0;
            ultimo = 2006;
            v.seasons.forEach((s) => {
                if(s.year > 2005 && s.year < 2011) {
                    diferencia = s.year - ultimo;
                    for(var x = 0; x < diferencia; x++) {
                        partidos.push(0);
                    }
                    ultimo = s.year + 1;
                    partidos.push(parseInt(s.games));
                }
                if(entro == 0 && s.year >= 2011) {
                    entro = 1;
                    diferencia = 2010 - ultimo;
                    for(var x = 0; x < diferencia; x++) {
                        partidos.push(0);
                    }
                }
            });
            if(ultimo < 2010) {
                diferencia = 2011 - ultimo;
                    for(var x = 0; x < diferencia; x++) {
                        partidos.push(0);
                    }
            }
            if(partidos.length == 5 && entro == 1 && i < 15) {
                valor = {
                    name: v.first_name + " " + v.last_name,
                    data: partidos
                } 
                valores.push(valor);
                i = i + 1;
            }
          
        });
        pluginImports = valores;
        
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Numero de partidos jugados por entrenadores de futbol'
            },
            subtitle: {
                text: 'Source: AnyAPI'
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
    {#await  pluginImports}
        Loading renewable sources...
    {:then  pluginImports}
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p>   </p>
            <p class="highcharts-description">
                Gráfica con API externa con los numeros de partidos disputados por entrenadores de futbol americano. 
                Hemos seleccionado 15 entrenadores que disputaron partidos desde 2006 al 2011.
                Extraida de la API College Football Data de AnyAPI.
                
            </p>
            <p> <strong> Tabla con los datos proporcionados por la API de College Football Data: </strong> </p>

        </figure>	
        <Table bordered>
            <thead>
                <tr>
                    <th> Nombre </th>
                    <th> 2006</th>
                    <th> 2007 </th>
                    <th> 2008 </th>
                    <th> 2009 </th>
                    <th> 2010 </th>

                </tr>
            </thead>
            <tbody>
                {#each pluginImports as pluginImports}
                <tr>
                    <td> {pluginImports.name} </td>
                    <td> {pluginImports.data[0]} </td>
                    <td> {pluginImports.data[1]} </td>
                    <td> {pluginImports.data[2]} </td>
                    <td> {pluginImports.data[3]} </td>
                    <td> {pluginImports.data[4]} </td>
                    
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


