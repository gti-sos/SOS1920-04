<script>
    	import {
		onMount
	} from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    export let params = {};
    let traffic_accident = {};
    let updatedProvince;
    let updatedYear;
    let updateAccidentWithVictims;
    let updateMortalAccident;
    let updatedDeath;
    let updateHospitalizedWounded;
    let updateNotHospitalizedWounded;

    onMount(getTrafficAccident);

    async function getTrafficAccident() {

        console.log("Fetching traffic accidents...");
        const res = await fetch("/api/v1/traffic_accidents" + params.traffic_accidentProvince+ "/"+ params.traffic_accidentYear);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            let traffic_accident = json;
            let updatedProvince = params.traffic_accidentProvince;
            let updatedYear = params.traffic_accidentYear;
            let updateAccidentWithVictims = traffic_accident.accidentWithVictims;
            let updateMortalAccident = traffic_accident.mortalAccident;
            let updatedDeath = traffic_accident.death;
            let updateHospitalizedWounded = traffic_accident.hospitalizedWounded;
            let updateNotHospitalizedWounded = traffic_accident.notHospitalizedWounded;
            console.log("Received " + traffic_accident.length + " traffic accident.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    async function updateTrafficAccident() {
        
		console.log("Updating trafficc accident..." + JSON.stringify(params.traffic_accidentProvince) + JSON.stringify(params.traffic_accidentYear));
        const res = await fetch("/api/v1/traffic_accidents"+ params.traffic_accidentProvince + params.traffic_accidentYear, {
            method: "PUT",
            body: JSON.stringify({
                province : params.traffic_accidentProvince,
                year : params.traffic_accidentYear,
                accidentWithVictims : updateAccidentWithVictims,
                mortalAccident : updateMortalAccident,
                death : updatedDeath,
                hospitalizedWounded : updateHospitalizedWounded,
                notHospitalizedWounded : updateNotHospitalizedWounded
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getTrafficAccident();
        });

    };
</script>

<main>
    <h3><strong>Edit Contact {params.traffic_accidentProvince}</strong></h3>

    {#await traffic_accident}
		Loading traffic accidents...
	{:then traffic_accident}
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
					<td><input bind:value="{updatedYear}"></td>
                    <td><input bind:value="{updateAccidentWithVictims}"></td>
                    <td><input bind:value="{updateMortalAccident}"></td>
                    <td><input bind:value="{updatedDeath}"></td>
                    <td><input bind:value="{updateHospitalizedWounded}"></td>
					<td><input bind:value="{updateNotHospitalizedWounded}"></td>
					<td> <Button outline  color="primary" on:click={updateTrafficAccident()}>Update</Button> </td>
				</tr>

			</tbody>
		</Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary"></Button>
</main>

