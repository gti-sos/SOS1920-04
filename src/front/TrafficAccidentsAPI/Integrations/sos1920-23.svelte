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
    
	const url = "https://sos1920-23.herokuapp.com/API/v2/cigarretes-sales";
	
	onMount(getCigarretes);
    let cigarretes = [];
	async function getCigarretes() {
		console.log("Fetching cigarretes stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			cigarretes = json;
			console.log("Received " + cigarretes.length + " cigarretes.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await cigarretes}
		Loading cigarretes...
	{:then cigarretes}	
		<Table bordered>
			<thead>
				<tr>
					<th>Comunidad</th>
					<th>Año</th>
					<th>Venta de paquetes</th>
					<th>Primera variacion</th>
					<th>Segunda variacion</th>
				</tr>
			</thead>
			<tbody>
				{#each cigarretes as cigarrete}
				<tr>
					<td>{cigarrete.community}</td>	
					<td>{cigarrete.year}</td>
					<td>{cigarrete.cigarrete_sale}</td>
					<td>{cigarrete.first_variation}</td>
					<td>{cigarrete.second_variation}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>