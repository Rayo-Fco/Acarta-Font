<script>
    import axios from 'axios'
    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    let email = "";
    let password = "";
    let errors = {}
    let isLoading = false;
    let isSuccess = false;
  
    async function  LoginIn() {
        const user = {
            email: email,
            password: password
        }
        return await axios.post('/login', user).then(res =>{
          console.log(res);
          if (res.data.error) {
            console.log("object");
            console.log(res.data.error);
            errors = res.data.error;
           
          }
           else
          {  
            console.log(res);
            $session.token = res.data.token;
            goto("/about");
          }
        })

    }

  </script>
  
  <!-- svelte-ignore non-top-level-reactive-declaration -->
  <!-- svelte-ignore non-top-level-reactive-declaration -->
  <style>
    form {
      background: #fff;
      padding: 50px;
      width: 250px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 20px 14px 8px rgba(0, 0, 0, 0.58);
    }
    label {
      margin: 10px 0;
      align-self: flex-start;
      font-weight: 500;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      transition: all 300ms ease-in-out;
      width: 100%;
    }
    input:focus {
      outline: 0;
      border-bottom: 1px solid #666;
    }
    button {
      margin-top: 20px;
      background: black;
      color: white;
      padding: 20px 0;
      width: 200px;
      border-radius: 25px;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: all 300ms ease-in-out;
    }
    button:hover {
      transform: translateY(-2.5px);
      box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
    }
    h1 {
      margin: 10px 20px 30px 20px;
      font-size: 40px;
    }
    .errors {
      list-style-type: none;
      padding: 10px;
      margin: 0;
      margin-top:10px;
      border: 2px solid #be6283;
      color: #be6283;
      background: rgba(190, 98, 131, 0.3);
      width: 90%;
    }
    .success {
      font-size: 24px;
      text-align: center;
    }
  </style>
  <form on:submit|preventDefault={LoginIn}>	
    {#if isSuccess}
        <div class="success">
        🔓
        <br />
        You've been successfully logged in.
        </div>
    {:else}
        <h1>Iniciar Session</h1>
    
        <label>Email</label>
        <input name="email" type='email' bind:value={email} placeholder="name@example.com" />
    
        <label>Password</label>
        <input name="password" bind:value={password} type="password" placeholder="password"  />
    
        <button type="submit"  >
            {#if isLoading}Ingresando....{:else}Ingresar 🔒{/if}
        </button>
        {#if Object.keys(errors).length > 0}
            <ul class="errors">
                {#each errors as error}
                <li>{error.message}</li>
                {/each}
            </ul>
        {/if}
  {/if}
  </form>

  
  