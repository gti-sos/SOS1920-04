<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let trafficAccidents = [];
	let newTraffic_accident = {
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

	async function getTrafficAccidents() {

		console.log("Fetching trafficAccidents...");
		const res = await fetch("/api/v1/traffic_accidents");

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

		newTraffic_accident.year = parseInt(newTraffic_accident.year);
		newTraffic_accident.accidentWithVictims = parseInt(newTraffic_accident.accidentWithVictims);
		newTraffic_accident.mortalAccident = parseInt(newTraffic_accident.mortalAccident);
		newTraffic_accident.death = parseInt(newTraffic_accident.death);
		newTraffic_accident.hospitalizedWounded = parseInt(newTraffic_accident.hospitalizedWounded);
		newTraffic_accident.notHospitalizedWounded = parseInt(newTraffic_accident.notHospitalizedWounded);
		console.log("Inserting trafficAccident..." + JSON.stringify(newTraffic_accident));

		if(isNan(newTraffic_accident.year) || isNan(newTraffic_accident.accidentWithVictims) || isNan(newTraffic_accident.mortalAccident)
		|| isNan(newTraffic_accident.death) || isNan(newTraffic_accident.hospitalizedWounded)|| isNan(newTraffic_accident.notHospitalizedWounded)){
			errorMsg = "Alguno de los valores introducidos no es numérico";
			successMsg = false;
		}else{
		
			const dataBaseGet = await fetch("/api/v1/traffic_accidents/" + newTraffic_accident.province +"/" + newTraffic_accident.year);
			if(!dataBaseGet.ok){
				errorMsg = false;
				const res = await fetch("/api/v1/traffic_accidents", {
				method: "POST",
				body: JSON.stringify(newTraffic_accident),
				headers: {
					"Content-Type": "application/json"
				}
					}).then(function (res) {
						getTrafficAccidents();
					});
				successMsg = "El dato ha sido insertado correctamente."
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
			getTrafficAccidents();
		});
		successMsg = "El dato ha sido borrado correctamente.";
	};

	async function deleteAllTrafficAccidents() {
		errorMsg = false;
		const res = await fetch("/api/v1/traffic_accidents/", {
			method: "DELETE"
		}).then(function (res) {
			getTrafficAccidents();
		});
		successMsg = "Se han borrado todos los datos correctamente.";
	};

	async function loadInitialDataTrafficAccidents(){
		errorMsg = false;
		console.log("Loading trafficAccidents...");
		const res = await fetch("/api/v1/traffic_accidents/loadInitialData", {
		}).then(function (res) {
			getTrafficAccidents();
		});
		successMsg = "Se han cargado los datos iniciales correctamente.";

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
					<td><input bind:value="{newTraffic_accident.province}"></td>
					<td><input bind:value="{newTraffic_accident.year}"></td>
                    <td><input bind:value="{newTraffic_accident.accidentWithVictims}"></td>
                    <td><input bind:value="{newTraffic_accident.mortalAccident}"></td>
					<td><input bind:value="{newTraffic_accident.death}"></td>
                    <td><input bind:value="{newTraffic_accident.hospitalizedWounded}"></td>
                    <td><input bind:value="{newTraffic_accident.notHospitalizedWounded}"></td>
					<td> <Button outline  color="primary" on:click={insertTrafficAccident}>Insertar</Button> </td>
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
	<Button outline color="danger" on:click="{loadInitialDataTrafficAccidents}">Cargar datos iniciales</Button>

</main>