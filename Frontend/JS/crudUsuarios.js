const userTable = document.getElementById('user-table');
const theadUserTable=document.getElementById('thead-user');
const tbodyUserTable=document.getElementById('tbody-user');
const userNav = document.getElementById('usuarios');
const deleteModal=document.getElementById('modal-delete-user');
const addUserBtn=document.getElementById('add-user-btn');

const modalAddUser = document.getElementById('modal-add-user');
const modalEditUser=document.getElementById('modal-edit-user');
const addUserBtnForm=document.getElementById('enviarForm');
const canceladdUser=document.getElementById('cancel-add-user');


const editUserForm=document.getElementById('editUserForm');
const dataEdit = {};


let idUsertoDelete;

//CargarUsuarios

function cargarUsuarios(){


    fetch('http://localhost:8094/listar').then(response => response.json()).then(data => {
    
          
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

        theadUserTable.innerHTML=htmlthead;
        tbodyUserTable.innerHTML = htmltbody;
        userTable.classList.toggle('hidden');
        addUserBtn.classList.toggle('hidden'); 
         
      
    } );
       
    }

//Borrar Usuarios
 userTable.addEventListener('click', (e)=>{ 

    if(e.target.classList.contains('delete-btn')){
        e.preventDefault();
        const fila=e.target.closest('tr');
        const columnas=fila.querySelectorAll('td');
        const usuarioIdTd= fila ? columnas[0] : null;
        const userName= fila ? columnas[1] : null;
        idUsertoDelete=usuarioIdTd ? usuarioIdTd.textContent.trim() : null;
        
        

     html=`
     
    <div class="flex flex-col m-10 space-y-5 z-40 bg-white shadow-2xl rounded-2xl  md:space-y-5  items-center justify-center  md:p-10 md:w-[400px]    " >


    <h2 class="font-semibold text-2xl p-4 text-black"> Esta seguro que desea eliminar al usuario : ${userName.textContent.trim()} </h2>
    
    <!-- Inputs -->
    
   
     <div>
        <button class="bg-black px-7 py-2 m-2 hover:opacity-70 text-white rounded-lg  btn-confirm" id="btn-log">Confirmar</button>
        <button class="bg-black px-7 py-2 m-2 hover:opacity-70 text-white rounded-lg  btn-cancel " id="btn-log">Cancelar</button>
        </div>
        </div>
    
     `
       userTable.classList.toggle('hidden');
       addUserBtn.classList.toggle('hidden');
       deleteModal.innerHTML=html; 
       deleteModal.classList.toggle('hidden'); 
       
}})

//Modal confirmacion Borrar urusuarios
deleteModal.addEventListener('click', (e)=>{
    
    
    if(e.target.classList.contains('btn-confirm')){


    fetch(`http://localhost:8094/userDelete/${idUsertoDelete}`, {
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
    
  }

}) 


//Añadir Usuarios 

newUserForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const userName=document.getElementById('userName');
    const userPassword=document.getElementById('userPassword');
    const userEmail=document.getElementById('userEmail');
    const userPhone=document.getElementById('userTelefono');
    let selectedRol=document.getElementById('userRole')


    let dataRequest = {
        
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

   
       
       newUserForm.reset(); 
       modalAddUser.classList.toggle('hidden');
       cargarUsuarios();

  


    

   }) 


})

//Cancel addd new user btn

 canceladdUser.addEventListener('click', (e)=>{
 modalAddUser.classList.toggle('hidden');


})




//Editar Usuarios

userTable.addEventListener('click', (e)=>{ 

    let html;


   if(e.target.classList.contains('edit-btn')){
       e.preventDefault();
       const fila=e.target.closest('tr');
       const columnas=fila.querySelectorAll('td');
       /* console.log(columnas[0].textContent)
       columnas.forEach(columna=>{
           console.log(columna.textContent)
       }) */


       html=`
      

    <div class="flex flex-col m-10 space-y-5 z-40 bg-white shadow-2xl rounded-2xl  md:space-y-5  items-center justify-center  md:p-10 md:w-[400px]    " id="log-in-card">


    
        <h2 class="text-center font-semibold font-Roboto" >Editar Usuario</h2>
        
         <label for="userId">User Id:</label>
        <input class=" w-full border p-2 rounded-md  outline-none" type="number" id="userIde" name="userIde "  placeholder="Enter User Id" value=${columnas[0].textContent} >  
        
        <label for="userName">Nombre:</label>
        <input class=" w-full border p-2 rounded-md" type="text" id="userNamee" name="userNamee" required  value=${columnas[1].textContent}>
        
        <label for="userPassword">Password:</label>
        <input class=" w-full border p-2 rounded-md" type="password" id="userPassworde" name="userPassworde" required value=${columnas[2].textContent}>
        
        <label for="userEmail">Email:</label>
        <input class=" w-full border p-2 rounded-md" type="email" id="userEmaile" name="userEmaile" required value=${columnas[3].textContent}>
        
        <label for="userTelefono">Teléfono:</label>
        <input class=" w-full border p-2 rounded-md" type="tel" id="userTelefonoe" name="userTelefonoe" required value=${columnas[4].textContent}>
                
        <label for="userRole">Rol:</label>
        <select class="w-full border p-2 rounded-md" id="userRolee" name="userRole" required  >
            <option value="admin">ADMIN</option>
            <option value="user">USER</option>
            
        </select>

        
        <button type="submit" class="p-2 bg-black text-white rounded-2xl  hover:opacity-60 editForm " id="editForm">Editar Usuario</button>
        <button class="p-2 bg-black text-white rounded-2xl  hover:opacity-60 " id="cancel-add-user">Cancelar</button>

    

    </div>  


       
       `

    editUserForm.innerHTML=html;
    modalEditUser.classList.toggle('hidden');
    addUserBtn.classList.toggle('hidden');
    userTable.classList.toggle('hidden');
    
  

   
   
}}) 

editUserForm.addEventListener('submit', (e)=>{
    
    
      let dataedited = {
        "usuario_id": document.getElementById('userIde').value,
        "nombre_usuario": document.getElementById('userNamee').value,
        "password_hash": document.getElementById('userPassworde').value,
        "email": document.getElementById('userEmaile').value,
        "telefono": document.getElementById('userTelefonoe').value,
        "rol": document.getElementById('userRolee').value

      }
    fetch(`http://localhost:8094/editUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
        },
        body: JSON.stringify(dataedited)
      }).then(response => response.json()).then(data => {

      deleteModal.classList.toggle('hidden');
      cargarUsuarios();
  
        
      
    
})

if(e.target.classList.contains('btn-cancel')){
    deleteModal.classList.toggle('hidden');
    
  }

}) 















































    //User Nav Event 

    usuarios.addEventListener('click', (e)=>{e.preventDefault()
   
    
        cargarUsuarios()
        
    });



// + User

    addUserBtn.addEventListener('click', (e)=>{e.preventDefault()
        addUserBtn.classList.toggle('hidden');
        userTable.classList.toggle('hidden');
        modalAddUser.classList.toggle('hidden');
       
    
    })