<script>
    	import {
		onMount
	} from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    export let params = {};
    let errorMsg = false;
    let successMsg = false;
    let traffic_accident = {};
    let updatedProvince;
    let updatedYear;
    let updatedAccidentWithVictims;
    let updatedMortalAccident;
    let updatedDeath;
    let updatedHospitalizedWounded;
    let updatedNotHospitalizedWounded;

    onMount(getTrafficAccident);

    async function getTrafficAccident() {

        console.log("Fetching traffic accidents...");
        const res = await fetch("/api/v1/traffic_accidents/" + params.traffic_accidentProvince+ "/"+ params.traffic_accidentYear);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
             traffic_accident = json;
            updatedProvince = params.traffic_accidentProvince;
            updatedYear = params.traffic_accidentYear;
            updatedAccidentWithVictims = traffic_accident.accidentWithVictims;
            updatedMortalAccident = traffic_accident.mortalAccident;
            updatedDeath = traffic_accident.death;
            updatedHospitalizedWounded = traffic_accident.hospitalizedWounded;
            updatedNotHospitalizedWounded = traffic_accident.notHospitalizedWounded;
            console.log("Received " + traffic_accident.length + " traffic accident.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    async function updateTrafficAccident() {
        
        console.log("Updating trafficc accident..." + JSON.stringify(params.traffic_accidentProvince) + JSON.stringify(params.traffic_accidentYear));
        
        updatedYear = parseInt(updatedYear);
        updatedAccidentWithVictims = parseInt(updatedAccidentWithVictims);
        updatedMortalAccident = parseInt(updatedMortalAccident);
        updatedDeath = parseInt(updatedDeath);
        updatedHospitalizedWounded = parseInt(updatedHospitalizedWounded);
        updatedNotHospitalizedWounded = parseInt(updatedNotHospitalizedWounded);

        if(isNaN(updatedYear) || isNaN(updatedAccidentWithVictims) || isNaN(updatedMortalAccident)
		|| isNaN(updatedDeath) || isNaN(updatedHospitalizedWounded)|| isNaN(updatedNotHospitalizedWounded)){
            errorMsg = "Alguno de los valores introducidos no es numérico";
            successMsg = false;
		}else{
            errorMsg=false;
            const res = await fetch("/api/v1/traffic_accidents/"+ params.traffic_accidentProvince + "/" + params.traffic_accidentYear, {
                method: "PUT",
                body: JSON.stringify({
                    province : params.traffic_accidentProvince,
                    year : updatedYear,
                    accidentWithVictims : updatedAccidentWithVictims,
                    mortalAccident : updatedMortalAccident,
                    death : updatedDeath,
                    hospitalizedWounded : updatedHospitalizedWounded,
                    notHospitalizedWounded : updatedNotHospitalizedWounded
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (res) {
                getTrafficAccident();
            });
            successMsg = "El dato se ha actualizado correctamente.";
        }
    };
</script>

<main>
    <h3><strong>Edita el dato de accidentes de tráfico asociado a {params.traffic_accidentProvince}</strong></h3>

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
                    <td>{updatedProvince}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedAccidentWithVictims}"></td>
                    <td><input bind:value="{updatedMortalAccident}"></td>
                    <td><input bind:value="{updatedDeath}"></td>
                    <td><input bind:value="{updatedHospitalizedWounded}"></td>
					<td><input bind:value="{updatedNotHospitalizedWounded}"></td>
					<td> <Button outline  color="primary" on:click={updateTrafficAccident}>Actualizar</Button> </td>
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
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>

</main>

