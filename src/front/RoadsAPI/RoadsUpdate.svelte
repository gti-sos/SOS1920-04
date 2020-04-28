<script>
	import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

	let roads = [];
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
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }

    async function updateRoad() {

    console.log("Updating road..." + JSON.stringify(params.roadProvince) + " de " + JSON.stringify(params.roadProvince) );

    const res = await fetch("/api/v1/roads/" + params.roadProvince + "/" + params.roadYear, {
        method: "PUT",
        body: JSON.stringify({
            province: params.roadProvince,
            year: params.roadYear,
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
        getContact();
    });
}
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
					<th>Unico Sentido</th>
                    <th>Doble sentido</th>
                    <th>Autovia</th>
                    <th>Autopista</th>
                    <th>Total</th>
                    <th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each roads as road}
					<tr>
					<td><input bind:value="{updatedProvince}"></td>
					<td><input bind:value="{updatedYear}"></td>
                    <td><input bind:value="{updatedOneway}"></td>
                    <td><input bind:value="{updatedMultipleway}"></td>
					<td><input bind:value="{updatedDualCarriagewayAndHighway}"></td>
					<td><input bind:value="{updatedHighwayWithToll}"></td>
					<td><input bind:value="{updatedTotal}"></td>
                    <td> <Button outline  color="primary" on:click={updateRoad()}>Actualizar</Button> </td>
                    </tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>