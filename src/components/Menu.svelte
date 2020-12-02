<script> 
	import Nav from 'sveltestrap/src/Nav.svelte';
	import NavLink from 'sveltestrap/src/NavLink.svelte'
	import { onMount } from 'svelte'
	import axios from 'axios'
	export let category
</script>

  <Nav>
	<NavLink href=".">Home</NavLink>
	<NavLink href="about">About</NavLink>
	{#if category}
		{#each category as cat }
			<NavLink href={cat.nombre}>{cat.nombre}</NavLink>
		{/each}
	{/if}
  </Nav>