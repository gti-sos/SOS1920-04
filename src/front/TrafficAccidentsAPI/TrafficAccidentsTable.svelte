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

		console.log("Inserting trafficAccident..." + JSON.stringify(newTraffic_accident));

		const res = await fetch("/api/v1/traffic_accidents", {
			method: "POST",
			body: JSON.stringify(newTraffic_accident),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getTrafficAccidents();
		});

	}
	async function deleteTrafficAccident(province, year) {
		const res = await fetch("/api/v1/traffic_accidents/" + province +"/" + year, {
			method: "DELETE"
		}).then(function (res) {
			getTrafficAccidents();
		});
	}
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
					<td> <Button outline  color="primary" on:click={insertTrafficAccident}>Insert</Button> </td>
				</tr>

				{#each trafficAccidents as traffic_accident}
					<tr>
						<td>
							<a href="#/vehicles/{traffic_accident.province}/{traffic_accident.year}">{traffic_accident.province}</a>
						</td>
						<td>{traffic_accident.year}</td>
                        <td>{traffic_accident.accidentWithVictims}</td>
                        <td>{traffic_accident.mortalAccident}</td>
                        <td>{traffic_accident.death}</td>
                        <td>{traffic_accident.hospitalizedWounded}</td>
						<td>{traffic_accident.notHospitalizedWounded}</td>
						<td><Button outline color="danger" on:click="{deleteTrafficAccident(traffic_accident.province, traffic_accident.year)}">Delete</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}


</main>