const express = require ('express')
const app = express ()
const path = require ('path')

app.use(express.static('Public'));

app.listen (3050, () => { 
console.log ('servidor corriendo')
})

app.get('/', (req, res) => {
    res.sendFile (path.resolve(__dirname,'./views/login.html'))
      });
