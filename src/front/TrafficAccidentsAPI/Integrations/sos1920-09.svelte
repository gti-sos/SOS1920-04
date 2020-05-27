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
    
	const url = "/api/v2/oil-coal-nuclear-energy-consumption-stats/";
	
	onMount(getOilEnergy);
    let oilEnergy = [];
	async function getOilEnergy() {
		console.log("Fetching oil energy stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			oilEnergy = json;
			console.log("Received " + oilEnergy.length + " oil energy stats.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await oilEnergy}
		Loading oil energy...
	{:then oilEnergy}	
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Consumo de Gasolina</th>
					<th>Consumo de Carbón</th>
                    <th>Consumo de Energía Nuclear</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each oilEnergy as oilEnergyStat}
				<tr>	
					<td>{oilEnergyStat.country}</td>
                    <td>{oilEnergyStat.year}</td>			
                    <td>{oilEnergyStat['oil-consumption']}</td>
                    <td>{oilEnergyStat['coal-consumption']}</td>
                    <td>{oilEnergyStat['nuclear-energy-consumption']}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>