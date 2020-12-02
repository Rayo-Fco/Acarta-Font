<script>
	import Products from '../components/Products.svelte'
	export let items;
	export let title
</script>

<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`http://localhost:3001/products/category/${params.slug}`)
		const data = await res.json();
		if (res.status === 200) {
			return { 
				items: data,
				title:params.slug 
			}; 
		}else {
			this.error(res.status, data.message);
		} 
	}
</script>


<svelte:head>
	<title>{title}</title>
</svelte:head>

<Products {items}></Products>
