<script>
    import { scaleLinear } from 'd3-scale';
    import {
        onMount
    } from "svelte";

	let puntos = [];
	let years = [];
    async function loadData(){
		let MyData = [];

		const resData = await fetch("/api/v1/vehicles");
		MyData = await resData.json();

		MyData.forEach( (v) => {
			let data = {
				year: parseInt(v.year),
				total: parseInt(v.total)
			}
			years.push(v.year);
			puntos.push(data);
		});
	};

	onMount(loadData);
	const points = puntos.slice();
	console.log(points)
	const xTicks = years;
	const yTicks = [1000000, 2000000, 3000000, 4000000, 5000000];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200;

	function formatMobile(tick) {
		return "'" + tick % 100;
	}

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
    $: barWidth = innerWidth / xTicks.length;
	console.log(points,years);
</script>

<style>
	h2 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style>
<h2>Total de vehículos por año</h2>
<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis" transform="translate(0,{padding.top})">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
					<line x2="100%"></line>
					<text y="-5">{tick} {tick === 5000000 ? ' en número' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each points as point, i}
				<g class="tick" transform="translate({xScale(i)},{height})">
					<text x="{barWidth/2}" y="-4">{width > 380 ? point.year : formatMobile(point.year)}</text>
				</g>
			{/each}
		</g>

		<g class='bars'>
			{#each points as point, i}
				<rect
					x="{xScale(i) + 2}"
					y="{yScale(point.total)}"
					width="{barWidth - 4}"
					height="{height - padding.bottom - yScale(point.total)}"
				></rect>
			{/each}
		</g>
	</svg>
</div>