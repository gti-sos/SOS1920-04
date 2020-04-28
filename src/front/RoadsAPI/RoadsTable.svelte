<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let roads = [];
	let newRoads = {
        province: "",
        year: "",
        oneway: "",
		multipleway: "",
		dualCarriagewayAndHighway: "",
		highwayWithToll: "",
		total: ""
    };
    onMount(getRoads);

	async function getRoads() {

		console.log("Fetching roads...");
		const res = await fetch("/api/v1/roads");

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			roads = json;
			console.log("Received " + roads.length + " roads.");
		} else {
			console.log("ERROR!");
		}
    }
    async function insertRoads() {

    console.log("Inserting roads..." + JSON.stringify(newRoads));

    const res = await fetch("/api/v1/contacts", {
        method: "POST",
        body: JSON.stringify(newRoads),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        getRoads();
    });

    }
    async function deleteRoads(name) {
		const res = await fetch("/api/v1/roads/" + province + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			getRoads();
		});
	}

</script>

<main>

	{#await roads}
		Cargando carreteras...
	{:then roads}
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
					<th>Año</th>
					<th>Unico Sentido</th>
                    <th>Doble sentido</th>
                    <th>Autovia</th>
                    <th>Autopista</th>
                    <th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newRoads.province}"></td>
					<td><input bind:value="{newRoads.year}"></td>
                    <td><input bind:value="{newRoads.oneway}"></td>
                    <td><input bind:value="{newRoads.multipleway}"></td>
					<td><input bind:value="{newRoads.dualCarriagewayAndHighway}"></td>
					<td><input bind:value="{newRoads.highwayWithToll}"></td>
					<td><input bind:value="{newRoads.total}"></td>

					<td> <Button outline  color="primary" on:click={insertRoads}>Insertar</Button> </td>
				</tr>

				{#each roads as road}
					<tr>
                        <td>{roads.year}</td>
                        <td>{roads.oneway}</td>
						<td>{roads.multipleway}</td>
						<td>{roads.dualCarriagewayAndHighway}</td>
                        <td>{roads.highwayWithToll}</td>
                        <td>{roads.total}</td>

¡						<td><Button outline color="danger" on:click="{deleteRoads(roads.province)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}


</main>