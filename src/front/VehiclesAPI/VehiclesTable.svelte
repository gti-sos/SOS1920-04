<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let vehicles = [];
	let newVehicle = {
		province: "",
		year: "",
		car: "",
		bus: "",
		motorcycle: "",
		truck: "",
		total: ""
	};

	onMount(getVehicles);

	async function getVehicles() {

		console.log("Fetching vehicles...");
		const res = await fetch("/api/v1/vehicles");

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			vehicles = json;
			console.log("Received " + vehicles.length + " vehicles.");
		} else {
			console.log("ERROR!");
		}
	}

	async function insertVehicle() {

		newVehicle.year = parseInt(newVehicle.year);
		newVehicle.car = parseInt(newVehicle.car);
		newVehicle.bus = parseInt(newVehicle.bus);
		newVehicle.motorcycle = parseInt(newVehicle.motorcycle);
		newVehicle.truck = parseInt(newVehicle.truck);
		newVehicle.total = parseInt(newVehicle.total);

		console.log("Inserting vehicle..." + JSON.stringify(newVehicle));

		const res = await fetch("/api/v1/vehicles", {
			method: "POST",
			body: JSON.stringify(newVehicle),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getVehicles();
		});

	}

	async function deleteVehicle(province, year) {
		const res = await fetch("/api/v1/vehicles/" + province +"/"+ year, {
			method: "DELETE"
		}).then(function (res) {
			getVehicles();
		});
	}

</script>

<main>

	{#await vehicles}
		Cargando vehículos...
	{:then vehicles}
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
					<th>Año</th>
					<th>Coches</th>
					<th>Buses</th>
					<th>Motos</th>
					<th>Camiones</th>
					<th>Total</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newVehicle.province}"></td>
					<td><input bind:value="{newVehicle.year}"></td>
					<td><input bind:value="{newVehicle.car}"></td>
					<td><input bind:value="{newVehicle.bus}"></td>
					<td><input bind:value="{newVehicle.motorcycle}"></td>
					<td><input bind:value="{newVehicle.truck}"></td>
					<td><input bind:value="{newVehicle.total}"></td>
					<td> <Button outline  color="primary" on:click={insertVehicle}>Insertar</Button> </td>
				</tr>

				{#each vehicles as vehicle}
					<tr>
						<td>
							<a href="#/vehicles/{vehicle.province}/{vehicle.year}">{vehicle.province}</a>
						</td>
						<td>{vehicle.year}</td>
						<td>{vehicle.car}</td>
						<td>{vehicle.bus}</td>
						<td>{vehicle.motorcycle}</td>
						<td>{vehicle.truck}</td>
						<td>{vehicle.total}</td>
						<td><Button outline color="danger" on:click="{deleteVehicle(vehicle.province,vehicle.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>