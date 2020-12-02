<script>
  import Menu from './Menu.svelte'
  export let store
  export let category
</script>


<style>
  header {
    width: 100%;
    height: 100px;
    margin: 0;
    padding: 8px;
    top: 0;
    color: black;
  }
  img{
    float: left;
    width: 400px;
    height: 95px;
  }


</style>


<header style="background: #{store.style_header} none repeat scroll 0% 0%;">
  <div>
    <img src="{store.logo}" alt="log">
    <h1>Menu Digital {store.name}</h1>
  </div>
  <div>
    <Menu {category}/>
  </div>
</header>
  
 
 
  