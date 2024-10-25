const accountTable = document.getElementById('accounts-table');
const theadAccountTable = document.getElementById('thead-accounts');
const tbodyAccountTable = document.getElementById('tbody-accounts');
const addAccountBtn = document.getElementById('add-acc-btn');

const modalDeleteAcc= document.getElementById('modal-delete-acc');

const modalAddAccount = document.getElementById('modal-add-acc');
const newAccForm = document.getElementById('newAccForm');
const modalEditAccount = document.getElementById('modal-edit-acc');
const editAccForm = document.getElementById('editAccForm');

const cancelAddAcc = document.getElementById('cancel-add-acc');


let allEditInfo={};

let accIdToDelete;


cargarCuentas();

function cargarCuentas(){


    fetch('http://localhost:8094/cuentas/all').then(response => response.json()).then(data => {
    
          
        let colorRow="bg-white";
        let htmlthead = `
        
           <tr>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Id</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Usuario_Id</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Numero_Cuenta</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Estado_Cuenta</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Fecha_Apertura</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Tipo_Cuenta_Id</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
        
                </tr>
      
        `;
        let htmltbody = ` `;

        
    
        data.forEach(element => {
        
            htmltbody+=`
          
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

        
        theadAccountTable.innerHTML=htmlthead;
        tbodyAccountTable.innerHTML = htmltbody;
        
        
        
         
      
    } );
       
    }






    //Añadir Cuentas 

    newAccForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const userId=document.getElementById('user_id');
        const accNumber=document.getElementById('accountNumber');
        const accState=document.getElementById('accountState');
        const typeAccId=document.getElementById('idAccType');
       
    
    
        let dataRequest = {
            
            usuario_id:{usuario_id:userId.value},
            numero_cuenta: accNumber.value,
            estado_cuenta: accState.value,
            tipo_cuenta:{tipo_cuenta_id:typeAccId.value},
            
        }

        console.log(dataRequest);
    
    
        fetch(`http://localhost:8094/cuentas/crear`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
           },
           body: JSON.stringify(dataRequest)
         }).then(response => response.json()).then(data => {
    
       
           
           newAccForm.reset(); 
           modalAddAccount.classList.toggle('hidden');
           cargarCuentas();
    
    
       }) 
    
    
    })


    cancelAddAcc.addEventListener('click', (e)=>{
        modalAddAccount.classList.toggle('hidden');
        
       
       })


    //Borrar Cuenta por ID


 accountTable.addEventListener('click', (e)=>{ 

    if(e.target.classList.contains('delete-btn')){
        e.preventDefault();
        const fila=e.target.closest('tr');
        const columnas=fila.querySelectorAll('td');
         accIdToDelete= fila ? columnas[0] : null;
        const userName= fila ? columnas[1] : null;
        accIdToDelete=accIdToDelete ? accIdToDelete.textContent.trim() : null;
        
        

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
      
       modalDeleteAcc.innerHTML=html; 
       modalDeleteAcc.classList.toggle('hidden'); 
       addAccountBtn.classList.toggle('hidden');
       accountTable.classList.toggle('hidden');
       
}})

//Modal confirmacion Borrar urusuarios
modalDeleteAcc.addEventListener('click', (e)=>{
    
    
    if(e.target.classList.contains('btn-confirm')){


    fetch(`http://localhost:8094/cuentas/${accIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
        },
      }).then(response => {
        modalDeleteAcc.classList.toggle('hidden');
        cargarCuentas();
      })

   

    
}

if(e.target.classList.contains('btn-cancel')){
    modalDeleteAcc.classList.toggle('hidden');
    
  }

}) 







//Editar cuenta 



accountTable.addEventListener('click', (e)=>{ 

    let html;


   if(e.target.classList.contains('edit-btn')){
       e.preventDefault();
       const fila=e.target.closest('tr');
       const columnas=fila.querySelectorAll('td');

         allEditInfo.cuenta_id= fila ? columnas[0].textContent : null;
         allEditInfo.usuario_id= fila ? columnas[1].textContent : null;
         allEditInfo.fecha_apertura= fila ? columnas[4].textContent : null;
         allEditInfo.tipo_cuenta_id= fila ? columnas[5].textContent : null;

        console.log(allEditInfo);

       console.log(columnas[0].textContent)
       columnas.forEach(columna=>{
           console.log(columna.textContent)
       }) 

       html=`
      
    <div class="flex flex-col m-10 space-y-5 z-40 bg-white shadow-2xl rounded-2xl  md:space-y-5  items-center justify-center  md:p-10 md:w-[400px]    " id="log-in-card">

        <h2 class="text-center font-semibold font-Roboto" >Editar Usuario</h2>
        
        
        
        <label for="userPassword">Account Number :</label>
        <input class=" w-full border p-2 rounded-md" type="text" id="numeroCuenta" name="numeroCuenta" required value=${columnas[2].textContent}>
        
        <label for="userEmail">Account Status:</label>
        <input class=" w-full border p-2 rounded-md" type="number" id="estadoCuenta" name="estadoCuenta" required value=${columnas[3].textContent}>
        
    
         

        <button type="submit" class="p-2 bg-black text-white rounded-2xl  hover:opacity-60 editForm " id="editForm">Editar Usuario</button>
        <button class="p-2 bg-black text-white rounded-2xl  hover:opacity-60 " id="cancel-add-user">Cancelar</button>

    </div>  
 
       `

    editAccForm.innerHTML=html;
    
    modalEditAccount.classList.toggle('hidden');
    addAccountBtn.classList.toggle('hidden');
    accountTable.classList.toggle('hidden');
    

}}) 

editAccForm.addEventListener('submit', (e)=>{
     e.preventDefault();
    
      let dataedited = {
        "cuenta_id": allEditInfo.cuenta_id,
        "usuario_id": {usuario_id:allEditInfo.usuario_id},
        "numero_cuenta": document.getElementById('numeroCuenta').value,
        "estado_cuenta": document.getElementById('estadoCuenta').value,
        "fecha_apertura": allEditInfo.fecha_apertura,
        "tipo_cuenta": {tipo_cuenta_id:allEditInfo.tipo_cuenta_id}

      }

      console.log(dataedited);
    fetch(`http://localhost:8094/cuentas/${allEditInfo.cuenta_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
        },
        body: JSON.stringify(dataedited)
      }).then(response => response.json()).then(data => {

      modalEditAccount.classList.toggle('hidden');
      cargarCuentas();
        
})

if(e.target.classList.contains('btn-cancel')){
    modalEditAccount.classList.toggle('hidden');
    
  }

}) 
















































    //add-acc-btn click


    addAccountBtn.addEventListener('click', (e)=>{ 
     
     e.preventDefault();
     addAccountBtn.classList.toggle('hidden');
     accountTable.classList.toggle('hidden');
     modalAddAccount.classList.toggle('hidden');


    })