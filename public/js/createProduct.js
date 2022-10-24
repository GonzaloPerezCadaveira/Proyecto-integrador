window.addEventListener('load', function () {
    let errores=[];
    let form = document.querySelector('form')
    let name_product = document.querySelector('#name_product')
    let description_product = document.querySelector('#description_product')
    let price_product = document.querySelector('#price_product')
    let discount_product= document.querySelector('#discount_product')
    let cat_id= document.querySelector('#cat_id')
    let button_enviar= document.querySelector('#button-register')
    

    name_product.addEventListener('blur',function(e){
        name_product.style.backgroundColor='white'
        if(name_product.value.trim()==''){
            name_product.style.border='solid', '2px'
            name_product.style.borderColor='red'
            name_product.style.color='black'
            name_product.style.opacity=0.5
            errores.push('Debes asignarle un nombre al producto')
        }else if (name_product.value.length<=5){
            name_product.style.border='solid', '2px'
            name_product.style.borderColor='red'
            name_product.style.color='black'
            name_product.style.opacity=0.5
            errores.push('Debe tener al menos 5 caracteres')
        }
    })
    description_product.addEventListener('blur',function(e){
        description_product.style.backgroundColor='white'
        if(description_product.value.trim()==''){
            description_product.style.border='solid', '2px'
            description_product.style.borderColor='red'
            description_product.style.color='black'
            description_product.style.opacity=0.5  
        } 
    })
    price_product.addEventListener('blur',function(e){
        e.preventDefault()
        price_product.style.backgroundColor='white'
        if(price_product.value.trim()==''){
            price_product.style.border='solid', '2px'
            price_product.style.color='black'
            price_product.style.borderColor='red'
            price_product.style.opacity=0.5  
        }

    })
    discount_product.addEventListener('blur',function(e){
        e.preventDefault()
        discount_product.style.backgroundColor='white'
        if(discount_product.value.trim()==''){
            discount_product.style.border='solid', '2px'
            discount_product.style.borderColor='red'
            discount_product.style.color='black'
            discount_product.style.opacity=0.5  
        }

    })
    
    button_enviar.addEventListener('click',function(e){
        let errores=[];
        let ulErrors= document.querySelector('#ulErrors ul')
        if((name_product.value.trim()=='')||(name_product.length<2)){
            name_product.style.border='solid', '2px'
            name_product.style.borderColor='red'
            name_product.style.color='black'
            name_product.style.opacity=0.5
            console.log('hola estoy aca !!!');
            if(name_product.length<2){
                errores.push('Debe tener al menos 2 caracteres')              
            }
            else{
                errores.push('Debes escribir un nombre y apellido completo')              
            }
        }
        if(description_product.value.trim()==''){
            description_product.style.border='solid', '2px'
            description_product.style.borderColor='red'
            description_product.style.color='black'
            description_product.style.opacity=0.5 
            errores.push('Debes completar con tu email')
        }
        if(price_product.value.trim()==''){
            price_product.style.border='solid', '2px'
            price_product.style.color='black'
            price_product.style.borderColor='red'
            price_product.style.opacity=0.5 
            errores.push('Debes escribir una contraseña') 
             
        }
        if(errores.length>0){
            e.preventDefault()
            ulErrors.innerHTML=''
            errores.map(function(error){
                ulErrors.innerHTML+=`<li>${error}</li>` 
            })
            
            // for(let i=0; i <errores.length;i++ ){
            //     ulErrors.innerHTML+=`<li>${errores[i]}</li>` 
            // }
            console.log(errores)
        }
    })
})