function contadormas() {
    valor = document.getElementById("count");
    if (valor.value < 100) valor.value++;
}
function contadormenos() {
    valor = document.getElementById("count");
    if (valor.value > 01) valor.value--;
}