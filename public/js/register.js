
window.addEventListener('load', function () {
    let errores=[];
    let user_name = document.querySelector('#user_name')
    let user_email = document.querySelector('#user_email')
    let user_password = document.querySelector('#user_password')
    let button_enviar= this.document.querySelector('#button-register')
    
    

    user_name.addEventListener('blur',function(e){
        user_name.style.backgroundColor='white'
        if(user_name.value.trim()==''){
            user_name.style.backgroundColor='red'
            user_name.style.color='black'
            user_name.style.opacity=0.5
            console.log('hola estoy aca !!!');
            errores.push('Debes escribir un nombre y apellido completo')
        }else if (user_name.value.length<=2){
            user_name.style.backgroundColor='red'
            user_name.style.color='black'
            user_name.style.opacity=0.5
            console.log('hola estoy aca por la cantidad de letras !!!');
            errores.push('Debe tener al menos 2 caracteres')
        }

    })
    user_email.addEventListener('blur',function(e){
        user_email.style.backgroundColor='white'
        if(user_email.value.trim()==''){
            user_email.style.backgroundColor='red'
            user_email.style.color='black'
            user_email.style.opacity=0.5  
        } 
    })
    user_password.addEventListener('blur',function(e){
        e.preventDefault()
        user_password.style.backgroundColor='white'
        if(user_password.value.trim()==''){
            user_password.style.backgroundColor='red'
            user_password.style.color='black'
            user_password.style.opacity=0.5  
        }

    })
 
    
    button_enviar.addEventListener('click',function(e){
        let errores=[];
        let ulErrors= document.querySelector('#ulErrors ul')
        if(user_name.value.trim()==''){
            user_name.style.backgroundColor='red'
            user_name.style.color='black'
            user_name.style.opacity=0.5
            console.log('hola estoy aca !!!');
            errores.push('Debes escribir un nombre y apellido completo')
        }else if (user_name.value.length<=2){
            user_name.style.backgroundColor='red'
            user_name.style.color='black'
            user_name.style.opacity=0.5
            console.log('hola estoy aca por la cantidad de letras !!!');
            errores.push('Debe tener al menos 2 caracteres')
        }
        if(user_email.value.trim()==''){

            user_email.style.backgroundColor='red'
            user_email.style.color='black'
            user_email.style.opacity=0.5  
            errores.push('Debes completar con tu email')
        }
        if(user_password.value.trim()==''){

            user_password.style.backgroundColor='red'
            user_password.style.color='black'
            user_password.style.opacity=0.5
            errores.push('Debes escribir una contraseña') 
             
        }
        if(errores.length>0){
            e.preventDefault()
            ulErrors.innerHTML=''
            errores.map(function(error){
                ulErrors.innerHTML+=`<li>${error}</li>`; 
            })
            console.log(errores)
        }
    })
})