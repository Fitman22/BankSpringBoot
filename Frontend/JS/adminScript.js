const navMenu = document.getElementById('nav-menu');



document.addEventListener("DOMContentLoaded", () => {
  // Función para cargar el script dinámicamente
  function loadScript(scriptUrl) {
      const existingScript = document.getElementById('crudScript');
      if (existingScript) {
          existingScript.remove(); // Eliminar el script previo si existe
      }

      const script = document.createElement('script'); 
      script.src = scriptUrl; // Asignar la URL del script a cargar
      script.id = 'crudScript'; // Asignar un ID para poder referenciarlo más tarde
      document.body.appendChild(script); // Añadir el script al final del cuerpo del documento
  }


  function showCrud(crudName) {
    // Ocultar todos los CRUDs
    document.querySelectorAll(".crud-content").forEach(div => {
      console.log(div)
        div.classList.add('hidden');
        const btn = div.querySelector('button');
        btn.classList.add('hidden');
        const table = div.querySelector('table');
        console.log(table)
        if (table) {
          table.classList.add('hidden');
      }
         // Ocultar todos los CRUDs
    });

    // Mostrar el CRUD seleccionado
    const crudToShow = document.getElementById(`table-wrapper-${crudName}`);
    if (crudToShow) {
        crudToShow.classList.remove('hidden');
        const btn = crudToShow.querySelector('button');
        btn.classList.remove('hidden');
         // Mostrar el CRUD correspondiente
         const tableToShow = crudToShow.querySelector('table');
         if (tableToShow) {
             tableToShow.classList.remove('hidden'); // Mostrar la tabla correspondiente
         }
    }
}


navMenu.addEventListener('click', (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

  const clickedLink = e.target.closest('a');
   // Verificar si se hizo clic en un enlace
  if (clickedLink) {
      const crudName = clickedLink.dataset.crud;
   // Obtener el valor del atributo data-crud
      if(crudName) {
        console.log(crudName)
          // Mostrar el CRUD correspondiente
          showCrud(crudName);

          // Cargar el script correspondiente al CRUD seleccionado
          loadScript(`/Frontend/JS/crud${crudName}.js`);
      }
  }
});















/*   function showCrud(crudName) {
    // Ocultar todos los CRUDs
    document.querySelectorAll(".crud-content").forEach(div => {
        div.classList.add('hidden'); // Ocultar todos los CRUDs
    });

    // Mostrar el CRUD seleccionado
    const crudToShow = document.getElementById(`crud-${crudName}`);
    if (crudToShow) {
        crudToShow.classList.remove('hidden'); // Mostrar el CRUD correspondiente
    }
} */


  // Mostrar el CRUD de Usuarios por defecto
   //loadScript('/Frontend/JS/crudUsuarios.js'); // Cargar el script del CRUD de Usuarios
  //document.getElementById("table-wrapper-user").classList.add("active"); // Marcar el CRUD de Usuarios como activo

  /* navMenu.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
   
    if(e.target.dataset.crud==='usuarios'){
      loadScript('/Frontend/JS/crudUsuarios.js');
    }
    
    if(e.target.dataset.crud==='cuentas')loadScript('/Frontend/JS/crudCuentasBancarias.js');
    
    




  }) */





  // Manejar el clic en los enlaces del nav
  /* document.querySelectorAll("nav a").forEach(link => {
      console.log(link)
      link.addEventListener("click", function (e) {
          e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

          // Ocultar todos los CRUDs
          document.querySelectorAll(".crud-content").forEach(div => {
              console.log(div)
              div.classList.remove("active"); // Remover la clase activa de todos los CRUDs
          });

          // Obtener el CRUD a mostrar y mostrarlo
          const crudToShow = this.getAttribute("data-crud"); // Obtener el valor del atributo data-crud
          document.getElementById(`crud-${crudToShow}`).classList.add("active"); // Mostrar el CRUD correspondiente

          // Cargar el script correspondiente al CRUD seleccionado
          loadScript(`crud${crudToShow.charAt(0).toUpperCase() + crudToShow.slice(1)}.js`); // Cargar el script del CRUD seleccionado
      });
  }); */
});

//cargarCuentas

/* function cargarCuentas(){

  fetch('http://localhost:8094/listAccounts').then(response => response.json()).then(data => {
     
      let colorRow="bg-white";
      let htmlhead=`
      
        <tr>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Id</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Usuario_Id</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Numero_Cuenta</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Estado_Cuenta</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Fecha_Apertura</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Tipo_Cuenta_Id</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
    
            </tr>
      
      
      
      
      `
      let htmlbody = ` `;
  
      data.forEach(element => {
      
          htmlbody+=`
          <tr class="${colorRow}"> 
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.cuenta_id} </td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap "> ${element.usuario_id.usuario_id} </td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.numero_cuenta}</td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.estado_cuenta}</td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.fecha_apertura}</td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.tipo_cuenta.tipo_cuenta_id}</td>
  
          <td class="p-3 text-sm text-gray-700 flex  space-x-10 whitespace-nowrap">
  
            <button px-3> <i class="fa-regular fa-pen-to-square edit-btn"></i></button>
            <button "> <i class="fa-regular fa-trash-can delete-btn"></i></button>
          
          
          </td>
          </tr>
  
  
          `
          colorRow=(colorRow=="bg-white")?"bg-gray-50":"bg-white";
  
  
      })
      
      
      thead.innerHTML=htmlhead;
      tbody.innerHTML = htmlbody;
      table.classList.toggle('hidden');
      addUser.classList.toggle('hidden');
     /*  addUser.classList.toggle('hidden'); */
  
  
    /* Añadiendo evento al boton 
     
  
  } );
  
      
  }
   */



  /* cuentas nav seleccion */

/* cuentas.addEventListener('click', (e)=>{
  e.preventDefault()  
  
  

    cargarCuentas()
    
}) */


