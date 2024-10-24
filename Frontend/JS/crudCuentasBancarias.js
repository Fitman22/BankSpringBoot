
const accountTable = document.getElementById('accounts-table');
const theadAccountTable = document.getElementById('thead-accounts');
const tbodyAccountTable = document.getElementById('tbody-accounts');
const userNav = document.getElementById('cuentas');







function cargarCuentas(){


    fetch('http://localhost:8094/all').then(response => response.json()).then(data => {
    
          
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