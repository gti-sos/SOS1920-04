<canvas id="myChart" width="3" height="1"></canvas>
<script>
  import {onMount} from 'svelte';
  import Button from "sveltestrap/src/Button.svelte";
  import {
        pop
    } from "svelte-spa-router";
  async function loadGraph(){
    const BASE_API_URL = "/api/v1/traffic_accidents";
    const resData = await fetch(BASE_API_URL);
    let Data = await resData.json(); 
    let years = Array.from(new Set(Data.map((d) => {return d.year;})));
    let provinces = Array.from(new Set(Data.filter(d => d.year == 2016).map((d) => {return d.province;})));
    let deaths = Array.from(new Set(Data.filter(d => d.year == 2016).map((d) => {return d["death"];})));
      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: provinces,
              datasets: [{
                  label: 'Muertes',
                  data: deaths,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
    }
    onMount(loadGraph);
    
    
</script>
<main>
<p>Representación Gráfica del número de muertes en 2016.</p>
<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>
