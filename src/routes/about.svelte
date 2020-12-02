<script context="module">
	import {goto} from "@sapper/app";
	export function preload(page, session) {
	    const { token } = session;
		if (!token) {
		return this.redirect(302, "");
		}
	}
  </script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>