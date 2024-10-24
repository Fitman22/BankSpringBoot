const accountTable = document.getElementById('accounts-table');
const theadAccountTable = document.getElementById('thead-accounts');
const tbodyAccountTable = document.getElementById('tbody-accounts');
const addAccountBtn = document.getElementById('add-acc-btn');


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










