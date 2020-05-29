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
    
	const url = "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ResiduosPeligrosos/FeatureServer/0/query?where=1%3D1&outFields=MUNICIPIO,DIRECCION,ACTIVIDAD&returnGeometry=false&outSR=4326&f=json";
	
	onMount(getPullutionStats);
    let PullutionStats = [];
	async function getPullutionStats() {
		console.log("Fetching poverty stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            PullutionStats = json.features;
            console.log(PullutionStats[0]);
			console.log("Received " + PullutionStats.length + " mortality stats.");
		} else {
			console.log("ERROR!");
		}
    }
    
</script>




<main>

	{#await PullutionStats}
		Loading oil energy...
	{:then PullutionStats}	
		<Table bordered>
			<thead>
				<tr>
					<th>Distrito</th>
					<th>Barrio</th>
					<th>Actividad</th> 
				</tr>
			</thead>
			<tbody>
				{#each PullutionStats as PullutionStat}
				<tr>	
					<td>{PullutionStat["attributes"]["MUNICIPIO"]}</td>
                    <td>{PullutionStat["attributes"]["DIRECCION"]}</td>
					<td>{PullutionStat["attributes"]["ACTIVIDAD"]}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>