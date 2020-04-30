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
		newRoads.year = parseInt(newRoads.year);
		newRoads.oneway = parseInt(newRoads.oneway);
		newRoads.multipleway = parseInt(newRoads.multipleway);
		newRoads.dualCarriagewayAndHighway = parseInt(newRoads.dualCarriagewayAndHighway);
		newRoads.highwayWithToll = parseInt(newRoads.highwayWithToll);
		newRoads.total = parseInt(newRoads.total);

    console.log("Inserting roads..." + JSON.stringify(newRoads));
    const res = await fetch("/api/v1/roads", {
		method: "POST",
        body: JSON.stringify(newRoads),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        getRoads();
    });

    }
    async function deleteRoads(province,year) {
		const res = await fetch("/api/v1/roads/" + province + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			getRoads();
		});
	}
	async function deleteAllRoads() {
		const res = await fetch("/api/v1/roads", {
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
                    <th>Acciones</th>
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
						<td><a href="#/roads/{road.province}/{road.year}">{road.province}</a></td>
                        <td>{road.year}</td>
                        <td>{road.oneway}</td>
						<td>{road.multipleway}</td>
						<td>{road.dualCarriagewayAndHighway}</td>
                        <td>{road.highwayWithToll}</td>
                        <td>{road.total}</td>
						<td><Button outline color="danger" on:click="{deleteRoads(road.province, road.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	<Button outline color="danger" on:click="{deleteAllRoads}">Borrar todo</Button>
</main>