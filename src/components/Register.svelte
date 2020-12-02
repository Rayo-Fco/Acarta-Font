<script>
  import { 
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Button,
    Alert,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader 
  } from 'sveltestrap';

  import { goto } from '@sapper/app';
  import axios from 'axios'

    let email,password,phone,name,lastname,rut,pass
    let isLoading = false;
    let open = false;
    let yes = false;
    let isSuccess = false;
    let errors = {};


    function checkRut(e) {
          let valor,cuerpo,dv,suma,multiplo,index,dvEsperado
          let rut = e.target

          valor = clean(rut.value);
          cuerpo = valor.slice(0, -1);
          dv = valor.slice(-1).toUpperCase();
          rut.value = format(rut.value);
          if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false; }
          suma = 0;
          multiplo = 2;
          for (let i = 1; i <= cuerpo.length; i++) {
            index = multiplo * valor.charAt(cuerpo.length - i);
            suma = suma + index;
            if (multiplo < 7) {
              multiplo = multiplo + 1;
            } else {
              multiplo = 2;
            }
          }
          dvEsperado = 11 - (suma % 11);
          dv = dv == "K" ? 10 : dv;
          dv = dv == 0 ? 11 : dv;
          if (dvEsperado != dv) {
            rut.setCustomValidity("RUT Invalido");
            return false
          } 
            rut.setCustomValidity('')

            function format (rut) {
              rut = clean(rut)
              let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
              for (let i = 4; i < rut.length; i += 3) {
                result = rut.slice(-3 - i, -i) + '.' + result
              }
              return result
            }
            function clean (rut) {
              return typeof rut === 'string'
                ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
                : ''
            }



    }
    
    function validpassword(e){
        console.log("password:"+password.value+"__PAss:"+pass.value);
        if(password.value != pass.value){ e.target.setCustomValidity("Las password no coinciden"); return false; }
        e.target.setCustomValidity("");
    }

    async function  LoginIn(event) {
        event.preventDefault()
        const user = { email,password,phone,name,lastname,rut }
        errors = {};
        return await axios.post('http://localhost:3001/register', user)
        .then(res => {
            const { token } = res.data
            isSuccess = true;
            isLoading = true;
            console.log(token);
            
            return token
        })
        .catch(err => {
          errors = err.response.data.error
            isSuccess = false;
            isLoading = false;
            return null
        })
    }

    
    function toggle(){ open = !open};
  </script>

<Form on:submit={LoginIn}>
  <FormGroup>
    <FormGroup>
      <Label>Nombre</Label>
      <Input
        type="text"
        name="name"
        id="name"
        required
        bind:value={name}
        placeholder="Ingrese su Nombre" />
    </FormGroup>
    <FormGroup>
      <Label>Apellido</Label>
      <Input
        type="text"
        name="lastname"
        id="lastname"
        required
        bind:value={lastname}
        placeholder="Ingrese su Apellido" />
    </FormGroup>
    <FormGroup>
      <Label>Rut</Label>
      <Input 
        type="text"
        name="rut"
        id="rut"
        required
        bind:value={rut}
        on:input={checkRut} 
        on:change={checkRut}
        placeholder="Ingrese su Rut" />
    </FormGroup>
    <Label>Email</Label>
    <Input
      type="email"
      name="email"
      id="email"
      required
      bind:value={email}
      placeholder="Ingrese su Email" />
  </FormGroup>
  <FormGroup>
    <Label>Telefono</Label>
    <Input
      type="tel"
      name="phone"
      id="phone"
      required
      bind:value={phone}
      placeholder="Ingrese su Telefono" />
  </FormGroup>
  
  <FormGroup>
    <Label >Password</Label>
    <Input
      type="password"
      name="password"
      id="examplePassword"
      required
      bind:value={password}
      placeholder="Ingrese su Password" />
      <small id="passwordHelpBlock" class="form-text text-muted">
        Su password debe contener una letra y numeros con un minimo de 6 caracteres.
      </small>
  </FormGroup>
  <FormGroup>
    <Label >Repetir Password</Label>
    <Input
      type="password"
      name="password"
      id="examplePassword"
      bind:value={pass}
      on:input={validpassword} 
      required
      placeholder="Repita su Password" />
  </FormGroup>
  <FormGroup check>
    <Label check>
      <Input type="checkbox" id='condiciones' bind:checked={yes} required/>
      Acepta las condiciones del registro <a rel=external href={window.location+'#'} on:click={toggle} >Leer condiciones</a> 
    </Label>
    <br/>
    <br/>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Condiciones de Uso</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </ModalBody>
    </Modal>
  </FormGroup>

  {#if Object.keys(errors).length > 0}
    <Alert color='danger' id='alerta' tabindex="-1">
      {#each errors as error}
      *{error.message}<br>
      {/each}
    </Alert>
  {/if}

  <FormGroup>
    <Button
      type="submit"
      color='primary'
      disabled={!yes}> 
      {#if isLoading}Validando....{:else}Registrar {/if}
  </Button>
  </FormGroup>
 
</Form>



 
  
  