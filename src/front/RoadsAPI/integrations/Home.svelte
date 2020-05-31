<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<h2><strong> Integraciones</strong></h2>
<p>
    <a href="#/roads2/integrations/sos1920-02">API de la evolución de las rutas ciclistas (PROXY)</a>
</p>
<p>
    <a href="#/roads2/integrations/sos1920-06">API de estadísticas de no hospitalizados (PROXY)</a>
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
<h2><strong> Integraciones externas</strong></h2>
<p>
    <a href="#/roads2/integrations/mercados">API de mercados del mundo (integrada con mis datos)</a>
</p>
<p>
    <a href="#/roads2/integrations/covid">API del coronavirus en la India (integrada con mis datos)</a>
</p>
<p>
    <a href="#/roads2/integrations/bitcoin">API de valores de los bitcoins </a>
</p>
<p>
    <a href="#/roads2/integrations/football">API de número de partidos de entrenador de futbol</a>
</p>
<p>
    <a href="#/roads2/integrations/aeropuertos">API de aeropuertos del mundo</a>
</p>
<p>
    <a href="#/roads2/integrations/poblacion">API del población de las ciudades de Estados Unidos</a>
</p>
<p>
    <a href="#/roads2/integrations/notas">API de las notas de corte (integrada con mis datos)</a>
</p>
<p>
    <a href="#/roads2/integrations/gasolina">API de los precios de la gasolina (integrada con mis datos)</a>
</p>
<p>
    <a href="#/roads2/integrations/terremotos">API de los terremotos de EEUU (integrada con mis datos)</a>
</p>
<p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</p>