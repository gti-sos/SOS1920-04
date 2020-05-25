<script>
 	import Button from "sveltestrap/src/Button.svelte";
    import {
        pop
    } from "svelte-spa-router";
	import bb from "billboard.js";

    async function loadGraph () {
        const BASE_API_URL = "/api/v1/vehicles";
        const resData = await fetch(BASE_API_URL);
		let MyData = await resData.json();   
		let parsed_data = [];
		MyData.forEach( (v) => {
			parsed_data.push([v.province+" "+v.year,v.car,v.bus,v.motorcycle,v.bus])
		});
        
		var chart = bb.generate({
	 		data: {
				columns: parsed_data
			},
			grid: {
				x: {
				lines: [
					{
					value: 0,
					text: "Coches"
					},
					{
					value: 1,
					text: "Autobuses",
					},
					{
					value: 2,
					text: "Motos",
					},
					{
					value: 3,
					text: "Camiones",
					}
				]
				}
 			},
			bindto: "#lineChart"
		});

	};
    loadGraph();
</script>

<main>
    <div id="lineChart"></div>
    <p></p>
    <p>Gráfica del número de vehículos usando Billboard.js</p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>