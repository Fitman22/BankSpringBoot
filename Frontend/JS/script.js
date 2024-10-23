const btn= document.getElementById('hamburger-menu-btn');
const menu=document.getElementById('mobile-menu')
const loginBtn=document.getElementById('login-btn')
const backdrop=document.getElementById('backdrop')
const cardLog= document.getElementById('log-in-card')

const loginRequest= document.getElementById('btn-log')





/* Hamburger Event Listener */
btn.addEventListener('click',navToggle)
 

function navToggle(){
btn.classList.toggle('open')
menu.classList.toggle('flex')
menu.classList.toggle('hidden')

}

/*  Log-in BTN  */



loginBtn.addEventListener('click',()=>cardLog.classList.toggle('hidden'))



//Validar Loggin Function

function validarLogin(){

const username=document.getElementById('username');
const password=document.getElementById('password');

let dataRequest= {
    nombre_usuario: username.value,
    password_hash: password.value
}

fetch('http://localhost:8095/login',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataRequest)

}).then(response=>response.json()).then(response=>{

    console.log(response)
    console.log(response.statusCode)
    if(response.statusCode==200 && response.Usuario.rol=='USER'){
        console.log(response)
        localStorage.setItem('userData',JSON.stringify(response))
        window.location.href="/Frontend/html/usuario.html" 

    }

    if(response.statusCode==200 && response.Usuario.rol=='ADMIN'){
        console.log(response)
        localStorage.setItem('userData',JSON.stringify(response))
        window.location.href="/Frontend/html/admin.html" 

    }

    if(response.statusCode!==200){
       alert(response.Mensaje) 
    }
    

   // window.location.href="/html/usuario.html"
   


  
})

}


loginRequest.addEventListener('click',validarLogin);