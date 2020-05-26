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
    
	const url = "https://sos1920-07.herokuapp.com/api/v2/foodsImports";
	
	onMount(getFood);
    let foods = [];
	async function getFood() {
		console.log("Fetching foods...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			foods = json;
			console.log("Received " + foods.length + " foods stats.");
		} else {
			console.log("ERROR!");
		}
	}
</script>




<main>

	{#await foods}
		Loading foods...
	{:then foods}	
		<Table bordered>
			<thead>
				<tr>
				<th>País</th>
                <th>Año</th>
                <th>Vegetales y preparados</th>
                <th>Zumo de frutas</th>
                <th>Dulces y caramelos</th>
                <th>Animales vivos</th>
                <th>Filetes de pescado y desmenuzado</th>
                    
				</tr>
			</thead>
			<tbody>
				{#each foods as food}
				<tr>	
					<td>{food.name}</td>
					<td>{food.year}</td>
                    <td>{food.TVegANDPrep}</td>
                    <td>{food.fruitJuice}</td>
                    <td>{food.TSweANDCndy}</td>
                    <td>{food.TLiveAnimal}</td>
                    <td>{food.FishFilletANDMince}</td>
                </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	
</main>