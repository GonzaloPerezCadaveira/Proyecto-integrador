const express = require ('express')
const app = express ()
const path = require ('path')

app.use(express.static('public'));

app.listen (3050, () => { 
console.log ('servidor corriendo')
})

app.get('/', (req, res) => {
  res.sendFile (path.resolve(__dirname,'./views/index.html'))
});

app.get('/Carrito', (req, res) => {
  res.sendFile (path.resolve(__dirname,'./views/Carrito.html'))
});

app.get('/login', (req, res) => {
  res.sendFile (path.resolve(__dirname,'./views/login.html'))
}); 

app.get('/productDetail', (req, res) => {
  res.sendFile (path.resolve(__dirname,'./views/productDetail.html'))
});