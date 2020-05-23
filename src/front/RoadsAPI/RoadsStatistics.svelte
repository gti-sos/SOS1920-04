<script>
    async function loadGraph(){
        let MyData = [];
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let parsed_data = [];
        MyData.forEach( (v) => {
            let graphic_data = {
                name: v.province + " (" + v.year + ")",
                data: [0, v.oneway, v.multipleway, v.dualCarriagewayAndHighway, v.highwayWithToll, v.total]
            };
            parsed_data.push(graphic_data);
        });

            var colors = Highcharts.getOptions().colors;
            Highcharts.chart('container', {

            chart: {
                type: 'streamgraph',
                marginBottom: 30,
                zoomType: 'x'
            },

            // Make sure connected countries have similar colors
            colors: [
                colors[0],
                colors[1],
                colors[2],
                colors[3],
                colors[4],
                // East Germany, West Germany and Germany
                Highcharts.color(colors[5]).brighten(0.2).get(),
                Highcharts.color(colors[5]).brighten(0.1).get(),

                colors[5],
                colors[6],
                colors[7],
                colors[8],
                colors[9],
                colors[0],
                colors[1],
                colors[3],
                // Soviet Union, Russia
                Highcharts.color(colors[2]).brighten(-0.1).get(),
                Highcharts.color(colors[2]).brighten(-0.2).get(),
                Highcharts.color(colors[2]).brighten(-0.3).get()
            ],

            title: {
                floating: true,
                align: 'left',
                text: 'Estadísticas de carreteras según la provincia y el año'
            },
            subtitle: {
                floating: true,
                align: 'left',
                y: 30,
            },
            series: parsed_data,
            xAxis: {
                maxPadding: 0,
                type: 'category',
                crosshair: true,
                categories: [ '', 'Un carril', 'Doble carril', 'Autovía', 'Autopista', 'Total'],
                labels: {
                    align: 'left',
                    reserveSpace: false,
                    rotation: 270
                },
                lineWidth: 0,
                margin: 20,
                tickWidth: 0
            },

            yAxis: {
                visible: false,
                startOnTick: false,
                endOnTick: false
            },

            legend: {
                enabled: false
            },

            annotations: [{
                labels: [{
                    point: {
                        x: 5.5,
                        xAxis: 0,
                        y: 30,
                        yAxis: 0
                    },
                    text: 'Datos recogidos en kilómetros'
                }, {
                    point: {
                        x: 18,
                        xAxis: 0,
                        y: 90,
                        yAxis: 0
                    },
                }],
                labelOptions: {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderColor: 'silver'
                }
            }],

            plotOptions: {
                series: {
                    label: {
                        minFontSize: 5,
                        maxFontSize: 15,
                        style: {
                            color: 'rgba(255,255,255,0.75)'
                        }
                    }
                }
            },

            // Data parsed with olympic-medals.node.js

            exporting: {
                sourceWidth: 800,
                sourceHeight: 600
            }

});
    }

</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/streamgraph.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/annotations.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>



<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Este gráfico muestra distintos datos del número de carreteras en España, según la provincia y el año. 
        Mostrando el numero de carreteras de diferentes categorias.
    </p>
</figure>


<style>
    #container {
	height: 600px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
	max-width: 800px;
	overflow: auto;
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