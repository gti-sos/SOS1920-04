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
    
	const url = "/api/v2/poverty-stats";
	
	onMount(getPovertyStats);
    let PovertyStats = [];
	async function getPovertyStats() {
		console.log("Fetching poverty stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			PovertyStats = json;
			console.log("Received " + PovertyStats.length + " poverty stats.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await PovertyStats}
		Loading oil energy...
	{:then PovertyStats}	
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Personas en riesgo de pobreza</th>
					<th>Umbral persona</th>
					<th>Umbral hogar</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each PovertyStats as stat}
				<tr>	
					<td>{stat.country}</td>
                    <td>{stat.year}</td>
					<td>{stat.poverty_prp}</td>
					<td>{stat.poverty_pt}</td>
					<td>{stat.poverty_ht}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>