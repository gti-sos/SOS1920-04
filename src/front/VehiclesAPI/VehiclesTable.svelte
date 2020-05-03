<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let offset = 0;
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

	let searchVehicle = {
		province: "",
		year: "",
		car: "",
		bus: "",
		motorcycle: "",
		truck: "",
		total: ""
	};

	let errorMsg = false;
	let successMsg = false;

	onMount(getVehicles);

	async function getVehicles(offset) {
		console.log("Fetching vehicles...");
		const res = await fetch("/api/v1/vehicles?limit=10&offset="+ offset);

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

		let vehicle = {
			province: newVehicle.province,
			year: parseInt(newVehicle.year),
			car: parseInt(newVehicle.car),
			bus: parseInt(newVehicle.bus),
			motorcycle: parseInt(newVehicle.motorcycle),
			truck: parseInt(newVehicle.truck),
			total: parseInt(newVehicle.total)
		};

		console.log("Inserting vehicle..." + JSON.stringify(newVehicle));

		if (isNaN(vehicle.year) || isNaN(vehicle.car) || isNaN(vehicle.bus) || isNaN(vehicle.motorcycle)
		|| isNaN(vehicle.truck) || isNaN(vehicle.total)){
			errorMsg = "Alguno de los atributos no es numérico";
			successMsg = false;
		}else{
			const dataBaseGet = await fetch("/api/v1/vehicles/" + vehicle.province +"/"+ vehicle.year);
			if (!dataBaseGet.ok){
				errorMsg = false;
				const res = await fetch("/api/v1/vehicles", {
					method: "POST",
					body: JSON.stringify(vehicle),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					getVehicles(offset);
				});
				successMsg = "El dato ha sido insertado correctamente."
			}else{
				errorMsg = "Ya existe ese dato";
				successMsg = false;
			}
		}

	}

	async function deleteVehicle(province, year) {
		const res = await fetch("/api/v1/vehicles/" + province +"/"+ year, {
			method: "DELETE"
		}).then(function (res) {
			getVehicles(offset);
		});
		successMsg = "El dato ha sido borrado correctamente.";
		errorMsg = false;
	};

	async function deleteAllVehicles() {
		const res = await fetch("/api/v1/vehicles", {
			method: "DELETE"
		}).then(function (res) {
			getVehicles(offset);
		});
		successMsg = "Se han borrado todos los datos correctamente.";
		errorMsg = false;
	};

	async function loadInitialDataVehicles() {
		
		console.log("Loading vehicles...");
		const res = await fetch("/api/v1/vehicles/loadInitialData").then(function (res) {
			getVehicles(offset);
		});;
		successMsg = "Se han cargado los datos iniciales correctamente.";
		errorMsg = false;
	};

	async function siguientePagina() {
		const res = await fetch("/api/v1/vehicles");
		const json = await res.json();
		if(offset < json.length - 10 ){
			offset = offset + 10;
			getVehicles(offset);
		}
	};

	async function anteriorPagina() {
		if (offset - 10 >= 0){
			offset = offset - 10;
			getVehicles(offset);
		}
	};

	async function searchVehicles(offset) {
		let url = "/api/v1/vehicles?limit=10&offset="+ offset;
		console.log("Searching vehicles...");

		let vehicle = {
			province: searchVehicle.province,
			year: parseInt(searchVehicle.year),
			car: parseInt(searchVehicle.car),
			bus: parseInt(searchVehicle.bus),
			motorcycle: parseInt(searchVehicle.motorcycle),
			truck: parseInt(searchVehicle.truck),
			total: parseInt(searchVehicle.total)
		};

		Object.entries(vehicle).forEach(([x,y]) => {
			if(!isNaN(y)){
				url = url + "&" + x + "=" + y;
			}
		});
		if(!vehicle.province == ""){
			url = url +"&province=" + vehicle.province;
		};
		
		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			vehicles = json;
			console.log("Received " + vehicles.length + " vehicles.");
			if (vehicles.length > 0){
				successMsg = "Se ha realizado la búsqueda.";
				errorMsg = false;
			}else{
				successMsg = false;
				errorMsg = "La búsqueda no ha obtenido resultados.";
			};
			
		} else {
			console.log("ERROR!");
			successMsg = false;
			errorMsg = "La búsqueda no ha obtenido resultados.";
		};
	};

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
					<td><input bind:value="{searchVehicle.province}"></td>
					<td><input bind:value="{searchVehicle.year}"></td>
					<td><input bind:value="{searchVehicle.car}"></td>
					<td><input bind:value="{searchVehicle.bus}"></td>
					<td><input bind:value="{searchVehicle.motorcycle}"></td>
					<td><input bind:value="{searchVehicle.truck}"></td>
					<td><input bind:value="{searchVehicle.total}"></td>
					<td> <Button outline  color="primary" on:click={searchVehicles}>Buscar</Button> </td>
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
			</tbody>
		</Table>
	{/await}
	{#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
	{/if}
	{#if successMsg}
		<p style="color: green">ÉXITO: {successMsg}</p>
	{/if}
	<Button outline color="danger" on:click="{deleteAllVehicles}">Borrar todo</Button>
	<Button outline color="primary" on:click="{loadInitialDataVehicles}">Cargar datos iniciales</Button>
	<p>
		<Button outline color="primary" on:click="{anteriorPagina}">Anterior página</Button>
		<Button outline color="primary" on:click="{siguientePagina}">Siguiente página</Button>
	</p>
</main>