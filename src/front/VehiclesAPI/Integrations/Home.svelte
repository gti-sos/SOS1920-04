<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<h2><strong> Integraciones</strong></h2>
<p>
    <a href="#/vehiclesI/integrations/overdose_deaths">API de muertes por sobredosis, grupo 12</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/renewable_sources">API de energías renovables, grupo 09</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/life_expectancies">API de vida, grupo 05</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/lq_stats">API de calidad de vida, grupo 27</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/traffic_accidents">API de accidentes de tráfico, grupo 02</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/natality_stats">API de natalidad, grupo 01</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/lottery_sales">API de loterías, grupo 06</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/gce">API de gasto común europeo, grupo 28</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/formula_stats">API de formula 1, grupo 22</a>
</p>

<p>
    <a href="#/vehiclesI/integrations/incidents">API externa de incidentes</a>
</p>
<p>
    <a href="#/vehiclesI/integrations/university">API externa de universidades</a>
</p>
<p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</p>