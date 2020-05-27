<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<h2><strong> Integraciones</strong></h2>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-09">API grupo 09: Energías primarias</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-23">API grupo 23: Ventas de cigarrillos</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-01">API grupo 01: Estadísticas de pobreza</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-07">API grupo 07: Importaciones de comida</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-02">API grupo 02: Estadísiticas rutas turísticas rurales</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-05">API grupo 05: Estadísticas salud</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/sos1920-22">API grupo 22: Estadísticas natación</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/apiexternacontaminacionmadrid">API externa contaminación Madrid</a>
</p>
<p>
    <a href="#/traffic_accidentsI/integrations/apiexternapaises">API externa países</a>
</p>
<p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</p>
