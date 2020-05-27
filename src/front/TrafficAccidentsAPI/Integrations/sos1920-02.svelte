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
    
	const url = "/API/v2/rural-tourism-stats";
	
	onMount(getTourism);
    let tourism = [];
	async function getTourism() {
		console.log("Fetching tourism stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			tourism = json;
			console.log("Received " + tourism.length + " tourism stats.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await tourism}
		Loading tourism...
	{:then tourism}	
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
                	<th>Año</th>
                	<th>Viajero</th>
                	<th>Pernoctación</th>
					<th>Estancia media</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each tourism as tou}
				<tr>	
					<td>{tou.province}</td>
					<td>{tou.year}</td>
                    <td>{tou.traveller}</td>
					<td>{tou.overnightstay}</td>
                    <td>{tou.averagestay}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>