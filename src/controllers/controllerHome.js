const path=require("path");
const fs= require('fs');

const productoData= path.join(__dirname, '../database/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const controller={
    home: (req, res)=>{
        res.render('index', {
            productoBase,
            titulo:'Carpincho Drinks',
            enlace:'css/style_index.css'
        });
    }

};

module.exports=controller;