const path=require("path");

const controller={
    detail: (req, res)=>{
        res.sendFile(path.resolve(__dirname , "../views/productDetail.html"));
    }

};

module.exports=controller;