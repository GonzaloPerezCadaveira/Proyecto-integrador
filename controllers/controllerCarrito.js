const path=require("path");

const controller={
    carro: (req, res)=>{
        res.sendFile(path.resolve(__dirname , "../views/Carrito.html"));
    }

};

module.exports=controller;