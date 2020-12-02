<script>
  import { get } from "svelte/store";
  import { cart } from "../stores/stores.js";
  export let items


  let { img, name, price } = items;
  img = `img/${img}`;

  const cartItems = get(cart);
  let inCart = cartItems[name] ? cartItems[name].count : 0;

  function addToCart() {
    inCart++;
    cart.update(n => {
      return { ...n, [name]: { ...items, count: inCart } };
    });
  }
    
  </script>
{#if items.length > 0}
  {#each items as item}
    Nombre:{item.nombre}<br>
    precio:{item.precio}<br>
    stock:{item.stock}<br>
    <div class="button-group">
      <button on:click={addToCart}>
       Añadir al Carro
      </button>
      {#if inCart > 0}
        <span>
          <em>({inCart}En el Carro)</em>
        </span>
      {/if}
    </div>
  {/each}
{:else}
  <h1>La Categoria no contiene productos a mostrar</h1>
{/if}


  
  