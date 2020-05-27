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
    
	const url = "/api/v1/health_public/";
	
	onMount(getHealthPublics);
    let health_publics = [];
	async function getHealthPublics() {
		console.log("Fetching health publics stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			health_publics = json;
			console.log("Received " + health_publics.length + " health_publics stats.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await health_publics}
		Loading health_publics...
	{:then health_publics}	
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Gasto Total (Millones €)</th>
					<th>Gasto Público (Millones €)</th>
					<th>Gasto Público (%PIB)</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each health_publics as health_public}
				<tr>
					<td>{health_public.country}</td>	
					<td>{health_public.year}</td>
					<td>{health_public['total_spending']}</td>
					<td>{health_public['public_spending']}</td>
					<td>{health_public['public_spending_pib']}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>