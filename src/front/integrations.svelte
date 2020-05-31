<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<h2><strong> Integraciones</strong></h2>
<p>
    <a href="#/vehicles/integrations">API de vehículos</a>
</p>
<p>
    <a href="#/roads/integrations">API de carreteras</a>
</p>
<p>
    <a href="#/traffic_accidents/integrations">API de accidentes de tráfico</a>
</p>
<p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</p>