<script>
    	import {
		onMount
	} from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    export let params = {};
    let vehicle = {};
    let updatedProvince;
    let updatedYear;
    let updatedCar;
    let updatedBus;
    let updatedMotorcycle;
    let updatedTruck;
    let updatedTotal;
    let errorMsg = false;
    onMount(getVehicle);

    async function getVehicle() {

        console.log("Fetching vehicles...");
        const res = await fetch("/api/v1/vehicles/" + params.vehicleProvince +"/" + params.vehicleYear);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            vehicle = json;
            updatedProvince = params.vehicleProvince;
            updatedYear = params.vehicleYear;
            updatedCar = vehicle.car;
            updatedBus = vehicle.bus;
            updatedMotorcycle = vehicle.motorcycle;
            updatedTruck = vehicle.truck;
            updatedTotal = vehicle.total;
            console.log("Received " + vehicle.length + " vehicle.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    async function updateVehicle() {
        
		console.log("Updating vehicle..." + JSON.stringify(params.vehicleProvince) + JSON.stringify(params.vehicleYear));
        const res = await fetch("/api/v1/vehicles/"+ params.vehicleProvince +"/"+ params.vehicleYear, {
            method: "PUT",
            body: JSON.stringify({
                province : params.vehicleProvince,
                year : parseInt(params.vehicleYear),
                car : parseInt(updatedCar),
                bus : parseInt(updatedBus),
                motorcycle : parseInt(updatedMotorcycle),
                truck : parseInt(updatedTruck),
                total : parseInt(updatedTotal)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getVehicle();
        });

    };
</script>

<main>
    <h3><strong>Edita el dato de vehículos asociado a {params.vehicleProvince} y {params.vehicleYear}</strong></h3>

    {#await vehicle}
		Cargando vehículo...
	{:then vehicle}
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
                    <td>{updatedProvince}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedCar}"></td>
                    <td><input bind:value="{updatedBus}"></td>
                    <td><input bind:value="{updatedMotorcycle}"></td>
                    <td><input bind:value="{updatedTruck}"></td>
                    <td><input bind:value="{updatedTotal}"></td>
					<td> <Button outline  color="primary" on:click={updateVehicle}>Actualizar</Button> </td>
				</tr>

			</tbody>
		</Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

