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

    let pluginCities = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://referential.p.rapidapi.com/v1/timezone?fields=offset%252Cdaylights_offset%252Cdaylights%252Cdaylights_code%252Ctimezone&lang=de", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "referential.p.rapidapi.com",
		"x-rapidapi-key": "1aadc89e2cmsh7affff1b7dc9661p1e119fjsneb577e40a33e"
	}
}); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginCities = json;
			console.log("Received " +  pluginCities.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
		}
        console.log(pluginCities);
        let valor = {};
        let valores = [];
        pluginCities.cities.forEach( (v) => {
            valor = {
                name: v.name,
                estado: v.timezone,
                poblacion: v.population
            }
            valores.push(valor);         
        });
        pluginCities = valores;
	};
</script>

<svelte:head>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<figure class="highcharts-figure">
    {#await  pluginCities}
        Loading renewable sources...
    {:then  pluginCities}
    <p>
        Tabla de población de ciudades de Estados Unidos (Datos extraidos de Countries Cities, de RapidAPI):
    </p>	
        <Table bordered>
            <thead>
                <tr>
                    <th> Ciudad </th>
                    <th> Estado </th>
                    <th> Población </th>
                </tr>
            </thead>
            <tbody>
                {#each  pluginCities as  pluginCities}
                <tr>
                    <td> {pluginCities.name} </td>
                    <td> {pluginCities.estado} </td>
                    <td> {pluginCities.poblacion} </td>

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


