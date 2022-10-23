window.addEventListener('load', function(){
    let btnMenu = document.getElementById('btn-menu');
    let mainNav = document.getElementById('main-nav');
    btnMenu.addEventListener('click', function(){
        mainNav.classList.toggle('mostrar')
    });
})