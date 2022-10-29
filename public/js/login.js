window.addEventListener('load', function () {
    let user_email = document.querySelector('#user_email')
    let user_password = document.querySelector('#user_password')
    let button= document.querySelector('.button')

    user_email.addEventListener('blur',function(e){
        user_email.style.backgroundColor='white'
        e.preventDefault()
        if((user_email.value.trim()=='')||(!user_email.value.includes('@'))){
            user_email.style.border='solid', '2px' 
            user_email.style.borderColor='red'
            user_email.style.color='black'
            user_email.style.opacity=0.5
            console.log('hola');         
        }
        
    })
    user_password.addEventListener('blur',function(e){
        e.preventDefault()
        user_password.style.backgroundColor='white'
        if(user_password.value.trim()==''){
            user_password.style.border='solid', '2px' 
            user_password.style.borderColor='red'
            user_password.style.color='black'
            user_password.style.opacity=0.5
            console.log('hola');
        }
    })
    user_password.addEventListener('keyup',function(e){
        if(user_password.value[0]){
            if(user_password.value[0] !== user_password.value[0].toUpperCase()){
                user_password.style.border='solid', '2px' 
                user_password.style.borderColor='red'
                user_password.style.color='black'
                user_password.style.opacity=0.5  
            }
        }
    })
    button.addEventListener('click', function(e){
        let errores=[];
        let ulErrors= document.querySelector('#ulErrors ul')

        if((user_email.value.trim()=='')||(!user_email.value.includes('@'))){
            user_email.style.border='solid', '2px' 
            user_email.style.borderColor='red'
            user_email.style.color='black'
            user_email.style.opacity=0.5        
            if (user_email.value.trim()==''){
                errores.push('Debes introducir tu email')
            }
            else{
                errores.push('No es un formato email')
            }
        }
        if(user_password.value.trim()==''){
            user_password.style.border='solid', '2px' 
            user_password.style.borderColor='red'
            user_password.style.color='black'
            user_password.style.opacity=0.5
            errores.push('Debes escribir una contraseña')
        }
        // if(user_password.value[0]){
        //     if(user_password.value[0] !== user_password.value[0].toUpperCase()){
        //         user_password.style.border='solid', '2px' 
                // user_password.style.borderColor='red'
                // user_password.style.color='black'
                // user_password.style.opacity=0.5
        //         errores.push('La contraseña es incorrecta')  
        //     }
        // }
        if(errores.length>0){
            e.preventDefault()
            ulErrors.innerHTML=''
            errores.map(function(error){
                ulErrors.innerHTML+=`<li>${error}</li>` 
            })
        }
    })
    
})