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
    
    const url = "https://sos1920-30.herokuapp.com/api/v2/sugarconsume";

    let pluginVehicles = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginVehicles = json;
			console.log("Received " +  pluginVehicles.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        const resData = await fetch("/api/v1/roads");
        MyData = await resData.json();
        let yearsRoads = [];
        MyData.forEach( (r) => {
            yearsRoads.push(r.year);
        });
        let yearsVehicles = [];
        pluginVehicles.forEach( (v) => {
            if(v.country == "Spain"){
                yearsVehicles.push(v.year);
            }
        });
        yearsRoads = yearsRoads.sort();
        yearsVehicles = yearsVehicles.sort();
        console.log("roads: " + yearsRoads);
        console.log("vehicles: " + yearsVehicles);

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Historic and Estimated Worldwide Population Distribution by Region'
            },
            subtitle: {
                text: 'Source: Wikipedia.org'
            },
            xAxis: {
                //categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                categories: yearsRoads,
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
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
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
                        point.y + ' millions, ' + round(point.percentage) + '%, ' +
                        point.series.name;
                    }
                }
                }
            },
            series: [{
                name: 'Asia',
                data: [502, 635, 809, 0, 1402, 3634, 5268]
            }, {
                name: 'Africa',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'Europe',
                data: [163, 203, 276, 408, 547, 729, 628]
            }, {
                name: 'America',
                data: [18, 31, 54, 156, 339, 818, 1201]
            }, {
                name: 'Oceania',
                data: [2, 2, 2, 6, 13, 30, 46]
            }]
            });
	};
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      Chart demonstrating a percentage-stacked area chart, a variation of the 
      stacked area chart where each data series is visualized as a running
      percentage of the total.
    </p>
  </figure>



<style>
	.highcharts-figure, .highcharts-data-table table {
  min-width: 310px; 
  max-width: 800px;
  margin: 1em auto;
}

#container {
  height: 420px;
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

<main>
	{#await  pluginVehicles}
		Loading renewable sources...
	{:then  pluginVehicles}
		<figure class="highcharts-figure">
			<div id="container"></div>
			<p class="highcharts-description">
				Basic line chart showing trends in a dataset. This chart includes the
				<code>series-label</code> module, which adds a label to each line for
				enhanced readability.
			</p>
		</figure>	
		<Table bordered>
			<thead>
				<tr>
                    <th> Año </th>
				</tr>
			</thead>
			<tbody>
				{#each  pluginVehicles as  pluginVehicles}
				<tr>
                    <td> {pluginVehicles.year} </td>
					
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}

    <p>
        <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
    </p>
</main>
