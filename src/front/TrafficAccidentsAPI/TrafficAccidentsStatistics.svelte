<script>


    async function loadGraph(){
    
        let MyData = [];

        const resData = await fetch("/api/v1/traffic_accidents");
        MyData = await resData.json();
        let parsed_data = [];
        MyData.forEach( (v) => {
            let graphic_data = {
                name: v.province + " en el año " + v.year,
                data: [{
                    name:"Accidentes con víctimas",
                    value: v.accidentWithVictims / 1000
                },{
                    name:"Accidentes mortales",
                    value: v.mortalAccident / 1000
                },{
                    name:"Muertes",
                    value: v.death / 1000
                },{
                    name:"Hospitalizados",
                    value: v.hospitalizedWounded / 1000
                },{
                    name:"No hospitalizados",
                    value: v.notHospitalizedWounded / 1000
                }]
            }
            parsed_data.push(graphic_data);
        });

        Highcharts.chart('container', {
            chart: {
                type: 'column',
                options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
                }
        },

        title: {
            text: 'Total fruit consumption, grouped by gender'
        },

        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
            labels: {
            skew3d: true,
            style: {
            fontSize: '16px'
            }
        }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
            text: 'Number of fruits',
            skew3d: true
        }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },

        plotOptions: {
            column: {
            stacking: 'normal',
            depth: 40
        }
        },

        series: parsed_data
    });

        console.log(parsed_data);  
    }
</script>
    
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    </svelte:head>
    
    
    <main>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
                Este gráfico muestra distintos datos del número de accidentes de tráfico en España, según la provincia.
            </p>
        </figure>
    </main>

<style>
    #container {
  height: 400px; 
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