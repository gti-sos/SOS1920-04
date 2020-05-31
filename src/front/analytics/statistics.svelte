<script>
    import {
       pop
   } from "svelte-spa-router";
   import Button from "sveltestrap/src/Button.svelte";
   
   async function loadGraph(){
    let roads = [];
        const resData1 = await fetch("/api/v1/roads");
        roads = await resData1.json();

        let vehicles = [];
        const resData2 = await fetch("/api/v1/vehicles");
        vehicles = await resData2.json();

        let trafficAccidents = [];
        const resData3 = await fetch("/api/v1/traffic_accidents");
        trafficAccidents = await resData3.json();

        let valores = [];
        roads.forEach( (r) => {
            vehicles.forEach ( (v) =>{
                trafficAccidents.forEach( (t) =>{
                    if(r.province == v.province && v.province == t.province && r.year == v.year && v.year == t.year){
                        let graphic_data = {
                            name: v.province + " (" + v.year + ")",
                            data: [r.oneway, r.multipleway, r.dualCarriagewayAndHighway, r.highwayWithToll, r.total, v.car/1000, v.bus/1000, v.motorcycle/1000, v.truck/1000, v.total/1000, t.accidentWithVictims, t.mortalAccident, t.death, t.hospitalizedWounded, t.notHospitalizedWounded]
                         };
                    valores.push(graphic_data);
                    }
                });
            });
        });
    Highcharts.chart('container', {
  chart: {
    type: 'area'
  },
  title: {
    text: 'Estadísticas de carreteras, vehiculos y accidentes en España'
  },
  subtitle: {
    text: 'Source: SOS1920'
  },
  xAxis: {
    categories: ['Un carril', 'Doble carril', 'Autovía', 'Autopista', 'Total de carreteras', 'Coches', 'Autobuses', 'Motos', 'Camiones', 'Total de vehículos', 'Accidentes con víctimas', 'Accidentes mortales', 'Muertes', 'Hospitalizados', 'No hospitalizados'],
    tickmarkPlacement: 'on',
    title: {
      enabled: false
    }
  },
  yAxis: {
    labels: {
      format: '{value}%'
    },
    title: {
      enabled: false
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} )<br/>',
    split: true
  },
  plotOptions: {
    area: {
      stacking: 'percent',
      lineColor: '#ffffff',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#ffffff'
      },
      accessibility: {
        pointDescriptionFormatter: function (point) {
          function round(x) {
            return Math.round(x * 100) / 100;
          }
          return (point.index + 1) + ', ' + point.category + ', ' +
            point.y + ' carreteras, ' + round(point.percentage) + '%, ' +
            point.series.name;
        }
      }
    }
  },
  series: valores
});
   }

</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"on:load="{loadGraph}"></script>
<script src="https://code.highcharts.com/modules/series-label.js"on:load="{loadGraph}"></script>
<script src="https://code.highcharts.com/modules/exporting.js"on:load="{loadGraph}"></script>
<script src="https://code.highcharts.com/modules/export-data.js"on:load="{loadGraph}"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"on:load="{loadGraph}"></script>
   <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      Este gráfico muestra distintos datos del número de carreteras, de vehiculos y accidentes en España, según la provincia y el año. 
      Mostrando el numero de carreteras de diferentes categorias, el de vehiculos de diferentes tipos y los accidentes según su alcance.
    </p>
    <p>
      <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
  </p>
  </figure>

<style>
  .highcharts-figure, .highcharts-data-table table {
  min-width: 500px; 
  max-width: 1000px;
  margin: 1em auto;
}

#container {
  height: 500px;
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