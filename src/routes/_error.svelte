<script>
	import { onMount } from 'svelte';
	import { goto } from '@sapper/app';

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
	onMount(() => {
		
		setTimeout(function(){ goto('/') }, 2000);
	});
	

</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 6.1em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
	#pagi{
		text-align: center;
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>
<div id='pagi' >
	<h2>Pagina No Disponible</h2>
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}


</div>
