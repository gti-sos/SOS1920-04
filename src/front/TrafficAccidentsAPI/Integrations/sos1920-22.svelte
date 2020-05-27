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
    
	const url = "http://sos1920-22.herokuapp.com/api/v1/swim-stats";
	
	onMount(getSwimmers);
    let swimmers = [];
	async function getSwimmers() {
		console.log("Fetching swimmers stats...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			swimmers = json;
			console.log("Received " + swimmers.length + " swimmers stats.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await swimmers}
		Loading swimmers...
	{:then swimmers}	
		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
                    <th>Año</th>
                    <th>Año de nacimiento</th>
                    <th>Posición</th>
                    <th>Tiempo</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each swimmers as swimmer}
				<tr>	
					<td> {swimmer.country} </td>
					<td> {swimmer.year} </td>
					<td> {swimmer.yearofbirth} </td>
                    <td> {swimmer.position}</td>
					<td> {swimmer.time} </td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>