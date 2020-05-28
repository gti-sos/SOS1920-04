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
    

    let pluginCycling = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/cities.json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
		"x-rapidapi-key": "1aadc89e2cmsh7affff1b7dc9661p1e119fjsneb577e40a33e"
	}
}); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginCycling = json;
			console.log("Received " +  pluginCycling.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
        let valores = [];
        let valor = {};
        let v = {};
        for(var i = 0; i < 30; i++) {
            v = pluginCycling[i];
            if(v.coordinates != null){
                valor = {
                    name: v.time_zone,
                    data: [v.coordinates.lat, v.coordinates.lon]
                }
            valores.push(valor)
         }
        }
        pluginCycling = valores;
	};
</script>

<svelte:head>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<figure class="highcharts-figure">
        {#await  pluginCycling}
            Loading renewable sources...
        {:then  pluginCycling}	
        <p>
            
        </p>
        <p>
            Tabla de localización de Aeropuertos del mundo (Datos extraidos de Flight Data, de RapidAPI):
        </p>
            <Table bordered>
                <thead>
                    <tr>
                        <th> Aeropuerto </th>
                        <th> Latitud </th>
                        <th> Longitud</th>
                    </tr>
                </thead>
                <tbody>
                    {#each  pluginCycling as  pluginCycling}
                    <tr>
                        <td> {pluginCycling.name} </td>
                        <td> {pluginCycling.data[0]} </td>
                        <td> {pluginCycling.data[1]} </td>
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


