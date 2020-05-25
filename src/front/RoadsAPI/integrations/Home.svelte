<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<h2><strong> Integraciones</strong></h2>
<p>
    <a href="#/roads2/integrations/sos1920-02">API de la evolución de las rutas ciclistas</a>
</p>
<p>
    <a href="#/roads2/integrations/sos1920-06">API de estadísticas de no hospitalizados</a>
</p>
<p>
    <a href="#/roads2/integrations/sos1920-07">API de importaciones</a>
</p>
<p>
    <a href="#/roads2/integrations/sos1920-09">API de vehiculos eléctricos</a>
</p>
<p>
    <a href="#/roads2/integrations/sos1920-27">API de estadísticas SPC</a>
</p>
<p>
    <a href="#/roads2/integrations/sos1920-30">API de consumo de azucar</a>
</p>
<p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</p>