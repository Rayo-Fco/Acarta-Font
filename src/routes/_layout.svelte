<script context="module">
	export async function preload() {
		const res_store = await axios.get('http://localhost:3001/store')
		const res_category = await axios.get('http://localhost:3001/category')

		if (res_store.status === 200 && res_category.status === 200) {
			return { 
				store: res_store.data,
				category: res_category.data
			};
		} else {
			this.error(res_store.status, data.message);
		}

		
	}
</script>


<script>
	import Nav from '../components/Nav.svelte';
	import axios from 'axios'
	import Header from '../components/Header.svelte';
	export let category;
	export let store;
	
</script>



<style>
	:global(html){
		min-height: 100%;
	}
	main {
		position: relative;
		max-width: 100%;
		width: 100%;
		padding: 2em;
		margin: 0 auto;
		min-height: 600px;
		box-sizing: border-box;
	}
</style>

<Header {store}{category} ></Header>

<main style="background: #{store.style_body};" >
	
	<slot></slot>
</main>