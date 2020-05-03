<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let trafficAccidents = [];
	let offset = 0;
	let newTraffic_accident = {
		province: "",
		year: "",
        accidentWithVictims: "",
        mortalAccident: "",
        death: "",
        hospitalizedWounded: "",
        notHospitalizedWounded: ""
	};

	let searchTraffic_accident = {
		province: "",
		year: "",
        accidentWithVictims: "",
        mortalAccident: "",
        death: "",
        hospitalizedWounded: "",
        notHospitalizedWounded: ""
	};

	let errorMsg = false;
	let successMsg = false;
	onMount(getTrafficAccidents);

	async function getTrafficAccidents(offset) {

		console.log("Fetching trafficAccidents...");
		const res = await fetch("/api/v1/traffic_accidents?limit=10&offset="+ offset);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			trafficAccidents = json;
			console.log("Received " + trafficAccidents.length + " trafficAccidents.");
		} else {
			console.log("ERROR!");
		}
	}

	async function insertTrafficAccident() {
		let traffic_accident = {
		province: newTraffic_accident.province,
		year: parseInt(newTraffic_accident.year),
		accidentWithVictims: parseInt(newTraffic_accident.accidentWithVictims),
		mortalAccident: parseInt(newTraffic_accident.mortalAccident),
		death: parseInt(newTraffic_accident.death),
		hospitalizedWounded: parseInt(newTraffic_accident.hospitalizedWounded),
		notHospitalizedWounded: parseInt(newTraffic_accident.notHospitalizedWounded),
		};
		console.log("Inserting trafficAccident..." + JSON.stringify(newTraffic_accident));
		if(isNaN(newTraffic_accident.year) || isNaN(newTraffic_accident.accidentWithVictims) || isNaN(newTraffic_accident.mortalAccident)
		|| isNaN(newTraffic_accident.death) || isNaN(newTraffic_accident.hospitalizedWounded)|| isNaN(newTraffic_accident.notHospitalizedWounded)){
			errorMsg = "Alguno de los valores introducidos no es numérico";
			successMsg = false;
		}else{
		
			const dataBaseGet = await fetch("/api/v1/traffic_accidents/" + newTraffic_accident.province +"/" + newTraffic_accident.year);
			if(!dataBaseGet.ok){
				errorMsg = false;
				const res = await fetch("/api/v1/traffic_accidents", {
				method: "POST",
				body: JSON.stringify(traffic_accident),
				headers: {
					"Content-Type": "application/json"
				}
					}).then(function (res) {
						getTrafficAccidents(offset);
					});
				successMsg = "El dato ha sido insertado correctamente.";
				errorMsg = false;
				newTraffic_accident = {
					province: "",
					year: "",
					accidentWithVictims: "",
					mortalAccident: "",
					death: "",
					hospitalizedWounded: "",
					notHospitalizedWounded: ""
				};
			}else{
				errorMsg = "Ya existe ese dato";
				successMsg = false;	
			}
		}

	}
	async function deleteTrafficAccident(province, year) {
		errorMsg = false;
		const res = await fetch("/api/v1/traffic_accidents/" + province +"/" + year, {
			method: "DELETE"
		}).then(function (res) {
			getTrafficAccidents(offset);
		});
		successMsg = "El dato ha sido borrado correctamente.";
		errorMsg = false;
	};

	async function deleteAllTrafficAccidents() {
		errorMsg = false;
		const res = await fetch("/api/v1/traffic_accidents/", {
			method: "DELETE"
		}).then(function (res) {
			getTrafficAccidents(offset);
		});
		successMsg = "Se han borrado todos los datos correctamente.";
		errorMsg = false;
	};

	async function loadInitialDataTrafficAccidents(){
		
		console.log("Loading trafficAccidents...");
		const res = await fetch("/api/v1/traffic_accidents/loadInitialData", {
		}).then(function (res) {
			getTrafficAccidents(offset);
		});
		successMsg = "Se han cargado los datos iniciales correctamente.";
		errorMsg = false;
	};

	async function siguientePagina() {
		const res = await fetch("/api/v1/traffic_accidents");
		const json = await res.json();
		if(offset < json.length - 10 ){
			offset = offset + 10;
			getTrafficAccidents(offset);
		}
	};

	async function anteriorPagina() {
		if (offset -10 >= 0){
			offset = offset - 10;
			getTrafficAccidents(offset);
		}
	};

	async function searchTraffic_accidents(offset) {
		let url = "/api/v1/traffic_accidents?limit=10&offset="+ offset;
		console.log("Searching traffic accidents...");

		let traffic_accident = {
			province: searchTraffic_accident.province,
			year: parseInt(searchTraffic_accident.year),
			accidentWithVictims: parseInt(searchTraffic_accident.accidentWithVictims),
			mortalAccident: parseInt(searchTraffic_accident.mortalAccident),
			death: parseInt(searchTraffic_accident.death),
			hospitalizedWounded: parseInt(searchTraffic_accident.hospitalizedWounded),
			notHospitalizedWounded: parseInt(searchTraffic_accident.notHospitalizedWounded)
		};

		Object.entries(traffic_accident).forEach(([x,y]) => {
			if(!isNaN(y)){
				url = url + "&" + x + "=" + y;
			}
		});
		if(!traffic_accident.province == ""){
			url = url +"&province=" + traffic_accident.province;
		};
		console.log(url);
		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			trafficAccidents = json;
			console.log("Received " + trafficAccidents.length + " traffic accidents.");
			if (trafficAccidents.length > 0){
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

	{#await trafficAccidents}
		Cargando Accidentes de Tráfico...
	{:then trafficAccidents}
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
					<th>Año</th>
					<th>Accidentes con víctimas</th>
                    <th>Accidentes mortales</th>
                    <th>Muertes</th>
                    <th>Hospitalizados</th>
                    <th>No hospitalizados</th>
                    <th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr>						
					<td><input bind:value="{searchTraffic_accident.province}"></td>
					<td><input bind:value="{searchTraffic_accident.year}"></td>
                    <td><input bind:value="{searchTraffic_accident.accidentWithVictims}"></td>
                    <td><input bind:value="{searchTraffic_accident.mortalAccident}"></td>
					<td><input bind:value="{searchTraffic_accident.death}"></td>
                    <td><input bind:value="{searchTraffic_accident.hospitalizedWounded}"></td>
                    <td><input bind:value="{searchTraffic_accident.notHospitalizedWounded}"></td>
					<td> <Button outline  color="primary" on:click={searchTraffic_accidents(offset)}>Buscar</Button> </td>
				</tr>

				{#each trafficAccidents as traffic_accident}
					<tr>
						<td>
							<a href="#/traffic_accidents/{traffic_accident.province}/{traffic_accident.year}">{traffic_accident.province}</a>
						</td>
						<td>{traffic_accident.year}</td>
                        <td>{traffic_accident.accidentWithVictims}</td>
                        <td>{traffic_accident.mortalAccident}</td>
                        <td>{traffic_accident.death}</td>
                        <td>{traffic_accident.hospitalizedWounded}</td>
						<td>{traffic_accident.notHospitalizedWounded}</td>
						<td><Button outline color="danger" on:click="{deleteTrafficAccident(traffic_accident.province, traffic_accident.year)}">Borrar</Button></td>
					</tr>
				{/each}
				<tr>						
					<td><input bind:value="{newTraffic_accident.province}"></td>
					<td><input bind:value="{newTraffic_accident.year}"></td>
                    <td><input bind:value="{newTraffic_accident.accidentWithVictims}"></td>
                    <td><input bind:value="{newTraffic_accident.mortalAccident}"></td>
					<td><input bind:value="{newTraffic_accident.death}"></td>
                    <td><input bind:value="{newTraffic_accident.hospitalizedWounded}"></td>
                    <td><input bind:value="{newTraffic_accident.notHospitalizedWounded}"></td>
					<td> <Button outline  color="primary" on:click={insertTrafficAccident}>Insertar</Button> </td>
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
	<Button outline color="danger" on:click="{deleteAllTrafficAccidents}">Borrar todo</Button>
	<Button outline color="primary" on:click="{loadInitialDataTrafficAccidents}">Cargar datos iniciales</Button>
	<p>
		<Button outline color="primary" on:click="{anteriorPagina}">Anterior página</Button>
		<Button outline color="primary" on:click="{siguientePagina}">Siguiente página</Button>
	</p>
</main>