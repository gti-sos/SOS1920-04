<script>
	import {
		onMount
	} from "svelte";
	import {
        pop
    } from "svelte-spa-router";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let offset = 0;
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
	let searchRoad = {
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
		const res = await fetch("/api/v1/roads?limit=10&offset="+ offset);

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
		let road = {
			province: newRoads.province,
			year: parseInt(newRoads.year),
			oneway: parseInt(newRoads.oneway),
			multipleway: parseInt(newRoads.multipleway),
			dualCarriagewayAndHighway: parseInt(newRoads.dualCarriagewayAndHighway),
			highwayWithToll: parseInt(newRoads.highwayWithToll),
			total: parseInt(newRoads.total)
		};

		console.log("Inserting road..." + JSON.stringify(newRoads));
		if(isNaN(road.year) || isNaN(road.oneway) ||isNaN(road.multipleway) || isNaN(road.dualCarriagewayAndHighway) ||
		isNaN(road.highwayWithToll) || isNaN(road.total)) {
			errorMsg = "Alguno de los campos introducidos no son numericos";
			successMsg = false;
		}
		else {
			const dataBaseGet = await fetch("/api/v1/roads/" + road.province +"/"+ road.year);
			if (!dataBaseGet.ok){
				console.log("Inserting roads..." + JSON.stringify(road));
				const res = await fetch("/api/v1/roads", {
					method: "POST",
					body: JSON.stringify(road),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					getRoads();
				});
				errorMsg = false;
				successMsg = "Valores insertados correctamente";
				newRoads = {
					province: "",
					year: "",
					oneway: "",
					multipleway: "",
					dualCarriagewayAndHighway: "",
					highwayWithToll: "",
					total: ""
				};
			}
			else{
				successMsg = false;
				errorMsg = "Ya existe ese dato";
			}
		}

	}
	async function searchRoads(offset) {
		let url = "/api/v1/roads?limit=10&offset="+ offset;
		console.log("Searching roads...");

		let road = {
			province: searchRoad.province,
			year: parseInt(searchRoad.year),
			oneway: parseInt(searchRoad.oneway),
			multipleway: parseInt(searchRoad.multipleway),
			dualCarriagewayAndHighway: parseInt(searchRoad.dualCarriagewayAndHighway),
			highwayWithToll: parseInt(searchRoad.highwayWithToll),
			total: parseInt(searchRoad.total)
		};

		Object.entries(road).forEach(([x,y]) => {
			if(!isNaN(y)){
				url = url + "&" + x + "=" + y;
			}
		});
		if(!road.province == ""){
			url = url +"&province=" + road.province;
		};
		
		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			roads = json;
			console.log("Received " + roads.length + " roads.");
			if (roads.length > 0){
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
	async function siguientePagina() {
		const res = await fetch("/api/v1/roads");
		const json = await res.json();
		if(offset < json.length - 10 ){
			offset = offset + 10;
			getRoads(offset);
		}
	};

	async function anteriorPagina() {
		if (offset -10 >= 0){
			offset = offset - 10;
			getRoads(offset);
		}
	};

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
					<th>Un carril</th>
                    <th>Doble carril</th>
                    <th>Autovia</th>
                    <th>Autopista</th>
                    <th>Total</th>
                    <th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{searchRoad.province}"></td>
					<td><input bind:value="{searchRoad.year}"></td>
                    <td><input bind:value="{searchRoad.oneway}"></td>
                    <td><input bind:value="{searchRoad.multipleway}"></td>
					<td><input bind:value="{searchRoad.dualCarriagewayAndHighway}"></td>
					<td><input bind:value="{searchRoad.highwayWithToll}"></td>
					<td><input bind:value="{searchRoad.total}"></td>
					<td> <Button outline  color="primary" on:click={searchRoads}>Buscar</Button> </td>
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
	<p>
		<Button outline color="primary" on:click="{anteriorPagina}">Anterior página</Button>
		<Button outline color="primary" on:click="{siguientePagina}">Siguiente página</Button>
	</p>
	<p>
		<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
	</p>
</main>