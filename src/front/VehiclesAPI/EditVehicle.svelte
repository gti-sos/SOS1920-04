<script>
    	import {
		onMount
	} from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    export let params = {};
    let contact = {};
    let updatedName = "pepe";
    let updatedPhone = "123456789";
    let updatedEmail = "hola@gmail.com";

    onMount(getContact);

    async function getContact() {

        console.log("Fetching contacts...");
        const res = await fetch("/api/v1/contacts" + params.contactName);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            contact = json;
            updatedName = contact.name;
            updatedEmail = contact.email;
            updatedPhone = contact.phone;
            console.log("Received " + contact.length + " contacts.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    async function updateContact() {
        
		console.log("Updating contact..." + JSON.stringify(params.contactName));
        const res = await fetch("/api/v1/contacts"+ params.contactName, {
            method: "PUT",
            body: JSON.stringify({
                name : params.contactName,
                phone : updatedPhone,
                email : updatedEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getContact();
        });

    };
</script>

<main>
    <h3><strong>Edit Contact {params.contactName}</strong></h3>

    {#await contacts}
		Loading contacts...
	{:then contacts}
		<Table bordered>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{updatedName}</td>
					<td><input bind:value="{updatedEmail}"></td>
					<td><input bind:value="{updatedPhone}"></td>
					<td> <Button outline  color="primary" on:click={updateContact}>Update</Button> </td>
				</tr>

			</tbody>
		</Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary"></Button>
</main>

