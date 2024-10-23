const userData=localStorage.getItem('userData')
const containerMsj=document.getElementById('msj-container')
const usuario=JSON.parse(userData)

const fechaRegistro=new Date(usuario.Usuario.fecha_registro)
console.log(fechaRegistro.toLocaleString('es-ES'))

let html =`


<h2 class=" text-2xl font-bold"> Bienvenido ${usuario.Usuario.nombre_usuario}</h2>

<h2 class=" ">Usuario Activo desde : ${fechaRegistro.toLocaleString('es-ES')}</h2>
`
containerMsj.innerHTML='';
containerMsj.insertAdjacentHTML('beforeend',html);




console.log(usuario.Usuario.nombre_usuario)



