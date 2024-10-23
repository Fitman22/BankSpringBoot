const usuarios= document.getElementById("usuarios");

const cuentas= document.getElementById("cuentas");

const tbody= document.getElementById("tbody");

const thead= document.getElementById("thead");

const table =  document.getElementById("userTable");

const tableWrapper= document.getElementById("table-wrapper");

const addUser= document.getElementById("add-user-btn");
const addAcc= document.getElementById("add-acc-btn");

const canceladdUser= document.getElementById("cancel-add-user");

const enviarform= document.getElementById("enviarForm");

const newUserForm=document.getElementById("newUserForm");

const deleteModal= document.getElementById("modal-confirm-wrapper");

const modaladdUser=document.getElementById("modal-add-user");

const modalEditUser=document.getElementById("modal-edit-user");


let IdUserToDelete;

/* Cargar Usuarios */

function cargarUsuarios(){


fetch('http://localhost:8094/listar').then(response => response.json()).then(data => {

       console.log(data)
    let colorRow="bg-white";
    let htmlthead = `
    
       <tr>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Id</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Password</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Email</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Telefono</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Fecha_Registro</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Rol</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
    
            </tr>
  
    
    `;
    let htmltbody = ` `;

    data.forEach(element => {
    
        htmltbody+=`
      
        <tr class="${colorRow}"> 
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.usuario_id} </td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap "> ${element.nombre_usuario} </td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.password_hash}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.email}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.telefono}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.fecha_registro}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap"> ${element.rol}</td>

        <td class="p-3 text-sm text-gray-700 flex  space-x-10 whitespace-nowrap">

          <button px-3> <i class="fa-regular fa-pen-to-square edit-btn"></i></button>
          <button "> <i class="fa-regular fa-trash-can delete-btn"></i></button>
        
        
        </td>
        </tr>


        `
        colorRow=(colorRow=="bg-white")?"bg-gray-50":"bg-white";


    })

    thead.innerHTML=htmlthead;
    tbody.innerHTML = htmltbody;
    table.classList.toggle('hidden');
    addUser.classList.toggle('hidden');
   /*  addUser.classList.toggle('hidden'); */

       
  /* Añadiendo evento al boton */
   
} );
   
}


usuarios.addEventListener('click', (e)=>{e.preventDefault()
   
    
    cargarUsuarios()
    
});

//cargarCuentas

function cargarCuentas(){

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
  
  
    /* Añadiendo evento al boton */
     
  
  } );
  
      
  }
  

cuentas.addEventListener('click', (e)=>{
  e.preventDefault()  
  
  

    cargarCuentas()
    
})


/* Borrar Usuarios */



table.addEventListener('click', (e)=>{ 


    if(e.target.classList.contains('delete-btn')){
        e.preventDefault();
        const fila=e.target.closest('tr');
        const columnas=fila.querySelectorAll('td');
        const usuarioIdTd= fila ? columnas[0] : null;
        const userName= fila ? columnas[1] : null;
        IdUserToDelete=usuarioIdTd ? usuarioIdTd.textContent.trim() : null;
        
        

     html=`
     
    <div class="flex flex-col m-10 space-y-5 z-40 bg-white shadow-2xl rounded-2xl  md:space-y-5  items-center justify-center  md:p-10 md:w-[400px]    " id="log-in-card">


    <h2 class="font-semibold text-2xl p-4 text-black"> Esta seguro que desea eliminar al usuario : ${userName.textContent.trim()} </h2>
    
    <!-- Inputs -->
    
   
     <div>
        <button class="bg-black px-7 py-2 m-2 hover:opacity-70 text-white rounded-lg  btn-confirm" id="btn-log">Confirmar</button>
        <button class="bg-black px-7 py-2 m-2 hover:opacity-70 text-white rounded-lg btn-cancel " id="btn-log">Cancelar</button>
        </div>
        </div>
    
     `
     deleteModal.innerHTML=html;
     deleteModal.classList.toggle('hidden');
     table.classList.toggle('hidden');
     addUser.classList.toggle ('hidden')

     confirmDeleteBtn=document.querySelector('.btn-confirm');
     console.log(confirmDeleteBtn)

    
    
}})


deleteModal.addEventListener('click', (e)=>{
    
    


    if(e.target.classList.contains('btn-confirm')){


    fetch(`http://localhost:8094/userDelete/${IdUserToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
        },
      }).then(response => response.json()).then(data => {

      deleteModal.classList.toggle('hidden');
      cargarUsuarios();
  
        
      });

      
}



if(e.target.classList.contains('btn-cancel')){
    deleteModal.classList.toggle('hidden');
    cargarUsuarios();
  }




})
  



//Añadir Usuarios 


newUserForm.addEventListener('submit', (e)=>{
     e.preventDefault();
    /*  const userId=document.getElementById('userId'); */
     const userName=document.getElementById('userName');
     const userPassword=document.getElementById('userPassword');
     const userEmail=document.getElementById('userEmail');
     const userPhone=document.getElementById('userTelefono');
     let selectedRol=document.getElementById('userRole')


     let dataRequest = {
     /*     usuario_id: userId.value, */
         nombre_usuario: userName.value,
         password_hash: userPassword.value,
         email: userEmail.value,
         telefono: userPhone.value,
         rol: selectedRol.value.toUpperCase()
         
     }


     fetch(`http://localhost:8094/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
        },
        body: JSON.stringify(dataRequest)
      }).then(response => response.json()).then(data => {

    
        cargarUsuarios();
        newUserForm.reset(); 
       
        modaladdUser.classList.toggle('hidden');

     

    }) 



})

canceladdUser.addEventListener('click', (e)=>{
  modaladdUser.classList.toggle('hidden');


})















addUser.addEventListener('click', (e)=>{
    
  table.classList.toggle('hidden');
  addUser.classList.toggle('hidden');
  modaladdUser.classList.toggle('hidden');


})



//Editar Usuarios


table.addEventListener('click', (e)=>{ 

     let html;


    if(e.target.classList.contains('edit-btn')){
        e.preventDefault();
        const fila=e.target.closest('tr');
        const columnas=fila.querySelectorAll('td');

        columnas.forEach(columna=>{
            console.log(columna.textContent)
        })


        html=`
        



    <div class="flex flex-col m-10 space-y-5 z-40 bg-white shadow-2xl rounded-2xl  md:space-y-5  items-center justify-center  md:p-10 md:w-[400px]    " id="log-in-card">


    <form  class=" w-fullflex flex-col space-y-4 " id="newUserForm">
        <h2 class="text-center font-semibold font-Roboto" >Añadir Usuario</h2>
        
        <!-- <label for="userId">User Id:</label>
        <input class=" w-full border p-2 rounded-md  outline-none" type="number" id="userId" name="userId"  placeholder="Enter User Id">  -->
        
        <label for="userName">Nombre:</label>
        <input class=" w-full border p-2 rounded-md" type="text" id="userName" name="userName" required>
        
        <label for="userPassword">Password:</label>
        <input class=" w-full border p-2 rounded-md" type="password" id="userPassword" name="userPassword" required>
        
        <label for="userEmail">Email:</label>
        <input class=" w-full border p-2 rounded-md" type="email" id="userEmail" name="userEmail" required>
        
        <label for="userTelefono">Teléfono:</label>
        <input class=" w-full border p-2 rounded-md" type="tel" id="userTelefono" name="userTelefono" required>
                
        <label for="userRole">Rol:</label>
        <select class="w-full border p-2 rounded-md" id="userRole" name="userRole" required >
            <option value="admin">ADMIN</option>
            <option value="user">USER</option>
            
        </select>

        
        <button type="submit" class="p-2 bg-black text-white rounded-2xl  hover:opacity-60 " id="enviarForm">Editar Usuario</button>
    </form>

    </div>  
    


        
        
        
        `

        modalEditUser.innerHTML=html;
        
       /*  const usuarioIdTd= fila ? columnas[0] : null;
        const userName= fila ? columnas[1] : null;
        IdUserToDelete=usuarioIdTd ? usuarioIdTd.textContent.trim() : null; */
        
        

  /*    html=`
     
    <div class="flex flex-col m-10 space-y-5 z-40 bg-white shadow-2xl rounded-2xl  md:space-y-5  items-center justify-center  md:p-10 md:w-[400px]    " id="log-in-card">


    <h2 class="font-semibold text-2xl p-4 text-black"> Esta seguro que desea eliminar al usuario : ${userName.textContent.trim()} </h2>
    
    <!-- Inputs -->
    
   
     <div>
        <button class="bg-black px-7 py-2 m-2 hover:opacity-70 text-white rounded-lg  btn-confirm" id="btn-log">Confirmar</button>
        <button class="bg-black px-7 py-2 m-2 hover:opacity-70 text-white rounded-lg btn-cancel " id="btn-log">Cancelar</button>
        </div>
        </div>
    
     ` */
     /* deleteModal.innerHTML=html;
     deleteModal.classList.toggle('hidden');
     table.classList.toggle('hidden');
     addUser.classList.toggle ('hidden')

     confirmDeleteBtn=document.querySelector('.btn-confirm');
     console.log(confirmDeleteBtn) */

    
    
}})