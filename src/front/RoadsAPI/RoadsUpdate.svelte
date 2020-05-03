<script>
	import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let successMsg = false;;
    let errorMsg = false;
    let oneRoad = true;

	let roads = {};
    let updatedProvince = "";
    let updatedYear = "";
    let updatedOneway = "";
	let updatedMultipleway = "";
	let updatedDualCarriagewayAndHighway = "";
	let updatedHighwayWithToll = "";
	let updatedTotal = "";
    onMount(getRoads);

	async function getRoads() {
        console.log("Fetching road...");
        const res = await fetch("/api/v1/roads/" + params.roadProvince + "/" + params.roadYear);
        console.log(res);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            roads = json;
            updatedProvince = roads.province;
            updatedYear = roads.year;
            updatedOneway = roads.oneway;
            updatedMultipleway = roads.multipleway;
            updatedDualCarriagewayAndHighway = roads.dualCarriagewayAndHighway;
            updatedHighwayWithToll = roads.highwayWithToll;
            updatedTotal = roads.total;
            console.log("Received road.");
        } else {
            oneRoad = false;
            errorMsg = "El dato asociado a " + params.roadProvince + " y " + params.roadYear + " no existe.";
            console.log("ERROR!" + errorMsg);
        }
    }

    async function updateRoad() {
        updatedYear = parseInt(updatedYear);
		updatedOneway = parseInt(updatedOneway);
		updatedMultipleway = parseInt(updatedMultipleway);
		updatedDualCarriagewayAndHighway = parseInt(updatedDualCarriagewayAndHighway);
		updatedHighwayWithToll = parseInt(updatedHighwayWithToll);
		updatedTotal = parseInt(updatedTotal);
        console.log("Updating road..." + JSON.stringify(params.roadProvince) + " de " + JSON.stringify(params.roadYear));

        if(isNaN(updatedYear) || isNaN(updatedOneway) ||isNaN(updatedMultipleway) || isNaN(updatedDualCarriagewayAndHighway) ||
		isNaN(updatedHighwayWithToll) || isNaN(updatedTotal)) {
            errorMsg = "Alguno de los campos introducidos no son numericos";
            successMsg = false;
		}
        else {
            const res = await fetch("/api/v1/roads/" + params.roadProvince + "/" + params.roadYear, {
                method: "PUT",
                body: JSON.stringify({
                    province: params.roadProvince,
                    year: updatedYear,
                    oneway : updatedOneway,
                    multipleway : updatedMultipleway,
                    dualCarriagewayAndHighway : updatedDualCarriagewayAndHighway,
                    highwayWithToll : updatedHighwayWithToll,
                    total : updatedTotal
                
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (res) {
                getRoads();
            });
            errorMsg = false;
            successMsg = "Se han actualizado los datos";
        }
    }
</script>

<main>
    <h3><strong>Edita el dato de carreteras asociado a {params.roadProvince} y {params.roadYear}</strong></h3>
	{#await roads}
		Cargando carreteras...
    {:then roads}
    {#if oneRoad}
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
                    <td>{updatedProvince}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedOneway}"></td>
                    <td><input bind:value="{updatedMultipleway}"></td>
					<td><input bind:value="{updatedDualCarriagewayAndHighway}"></td>
					<td><input bind:value="{updatedHighwayWithToll}"></td>
					<td><input bind:value="{updatedTotal}"></td>
                    <td> <Button outline  color="primary" on:click={updateRoad}>Actualizar</Button> </td>
                </tr>
			</tbody>
        </Table>
    {/if}
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if successMsg}
        <p style="color: green">EXITO: {successMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atras</Button>
</main>