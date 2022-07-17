const path=require("path");

const controller={
    home: (req, res)=>{
        res.render('index');
    }

};

module.exports=controller;