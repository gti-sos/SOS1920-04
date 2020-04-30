<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let successMsg = false;
	let errorMsg = false;
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
	async function loadInitialDataRoads() {

		console.log("Fetching roads...");
		const res = await fetch("/api/v1/roads/loadInitialData").then(function (res) {
			getRoads();
		});

		console.log("Ok:");
	
		successMsg = "Se han cargado los datos iniciales";
		errorMsg = false;
	}
    async function insertRoads() {
		newRoads.year = parseInt(newRoads.year);
		newRoads.oneway = parseInt(newRoads.oneway);
		newRoads.multipleway = parseInt(newRoads.multipleway);
		newRoads.dualCarriagewayAndHighway = parseInt(newRoads.dualCarriagewayAndHighway);
		newRoads.highwayWithToll = parseInt(newRoads.highwayWithToll);
		newRoads.total = parseInt(newRoads.total);
		console.log("Inserting road..." + JSON.stringify(newRoads));
		if(isNaN(newRoads.year) || isNaN(newRoads.oneway) ||isNaN(newRoads.multipleway) || isNaN(newRoads.dualCarriagewayAndHighway) ||
		isNaN(newRoads.highwayWithToll) || isNaN(newRoads.total)) {
			errorMsg = "Alguno de los campos introducidos no son numericos";
			successMsg = false;
		}
		else {
			const dataBaseGet = await fetch("/api/v1/roads/" + newRoads.province +"/"+ newRoads.year);
			if (!dataBaseGet.ok){
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
				errorMsg = false;
				successMsg = "Valores insertados correctos";
			}
			else{
				successMsg = false;
				errorMsg = "Ya existe ese dato";
			}
		}

    }
    async function deleteRoads(province,year) {
		const res = await fetch("/api/v1/roads/" + province + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			getRoads();
		});
		successMsg = "Se ha borrado el dato";
		errorMsg = false;
	}
	async function deleteAllRoads() {
		const res = await fetch("/api/v1/roads", {
			method: "DELETE"
		}).then(function (res) {
			getRoads();
		});
		successMsg = "Se han borrado todos los datos";
		errorMsg = false;
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
	{#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
	{/if}
	{#if successMsg}
        <p style="color: green">EXITO: {successMsg}</p>
    {/if}
	<Button outline color="secondary" on:click="{loadInitialDataRoads}">Cargar todo</Button>
	<Button outline color="danger" on:click="{deleteAllRoads}">Borrar todo</Button>
</main>