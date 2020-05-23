<script>
    async function loadGraph(){
      let MyData = [];
          const resData = await fetch("/api/v1/roads");
          MyData = await resData.json();
          let parsed_data = [];
          let nombres = [];
          let oneway = [];
          let multipleway = [];
          let dualCarriagewayAndHighway = [];
          let highwayWithToll = [];
          let total = [];
          MyData.forEach( (v) => {
              nombres.push(v.province + " (" + v.year + ")");
              oneway.push(parseInt(v.oneway));
              multipleway.push(parseInt(v.multipleway));
              dualCarriagewayAndHighway.push(parseInt(v.dualCarriagewayAndHighway));
              highwayWithToll.push(parseInt(v.highwayWithToll));
              total.push(parseInt(v.total));
          });
          console.log(parsed_data);
      new RGraph.Bar({
          id: 'cvs',
          //data: [[47,75,47,75],[32,74,47,75],[71,85,47,75],[25,19,47,75],[23,71,47,75],[81,59,47,75],[43,130,47,75],[23,20,47,75]],
          data: [oneway, multipleway, dualCarriagewayAndHighway, highwayWithToll, total],
          options: {
              marginLeft: 50,
              colors: ['#00FFFF','#A52A2A','#4B0082','#FF1493','#008000','#35A0DA','#FFD700','#008000', '#4B0082'],
              xaxisLabels: ['Un carril', 'Doble carril', 'Autovía', 'Autopista', 'Total'],
              yaxisLabelsCount: 3,
              yaxisTickmarksCount: 3,
              backgroundGridHlinesCount: 3,
              backgroundGridVlines: false,
              backgroundGridBorder: false,
              colorsStroke: 'rgba(0,0,0,0)',
              shadowOffsety: -3
          }
      }).on('draw', function (obj)
      {
          var len = obj.coords.length;
          for (var i=0; i<len; ++i) {
              var x = obj.coords[i][0],
                  y = obj.coords[i][1],
                  w = obj.coords[i][2] / 2,
                  h = obj.coords[i][3];
              obj.context.fillStyle = RGraph.linearGradient({
                  object: obj,
                  x1: 0, y1: 0, x2: 0, y2: 250,
                  colors: ['rgba(255,255,255,.75)','rgba(255,255,255,0)']
              });
              obj.context.fillRect(x,y,w,h)
          }
      }).draw().responsive([
          {maxWidth: 900, width:850,height:425,options: {textSize:10,marginInner: 2,shadow:false,xaxis: false,yaxis: false,}, css: {'float': 'none'}},
          {maxWidth: null,width:850,height:450,options: {textSize:14,marginInner: 5,shadow:true, xaxis: false,yaxis: false,}, css: {'float': 'left'}}
      ], {delay: 0});
    }
    </script>
  
    <svelte:head>
      <script src="libraries/RGraph.common.core.js"on:load="{loadGraph}"></script>
      <script src="libraries/RGraph.common.key.js"on:load="{loadGraph}"></script>
      <script src="libraries/RGraph.line.js"on:load="{loadGraph}"></script>
      <script src="libraries/RGraph.bar.js"on:load="{loadGraph}"></script>
  </svelte:head>
      <h3>Análisis de carreteras en España</h3>
      <main>
           <canvas id="cvs" width="575" height="450">
                  [No canvas support]
           </canvas>
      </main>
      <p>
          Gráfica con RGraph del número de carreteras por categorias de España.
      </p>
  
  
  