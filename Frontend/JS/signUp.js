
const signUpForm = document.getElementById('signUpForm');



signUpForm.addEventListener('submit', (e)=>{
    e.preventDefault();
   /*  const userId=document.getElementById('userId'); */
    const userName=document.getElementById('userName');
    const userPassword=document.getElementById('userPassword');
    const userEmail=document.getElementById('userEmail');
    const userPhone=document.getElementById('userTelefono');
   


    let dataRequest = {
    /*     usuario_id: userId.value, */
        nombre_usuario: userName.value,
        password_hash: userPassword.value,
        email: userEmail.value,
        telefono: userPhone.value,
       
        
    }


    fetch(`http://localhost:8094/addUser`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
       },
       body: JSON.stringify(dataRequest)
     }).then(response => response.json()).then(data => {

   
       signUpForm.reset(); 
      
     

    
   }) })