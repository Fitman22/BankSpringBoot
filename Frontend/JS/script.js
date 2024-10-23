const btn= document.getElementById('menu-btn');
const menu=document.getElementById('mobile-menu')
const loginBtn=document.getElementById('backdrop-btn')
const backdrop=document.getElementById('backdrop')





/* Hamburger Event Listener */
btn.addEventListener('click',navToggle)
 

function navToggle(){
btn.classList.toggle('open')
menu.classList.toggle('flex')
menu.classList.toggle('hidden')

}

/* Close Mobile Menu When resize to MD   */



/* Backdrop */


loginBtn.addEventListener('click', showModal)


function showModal(e){
    backdrop.classList.toggle('hidden')

    
}