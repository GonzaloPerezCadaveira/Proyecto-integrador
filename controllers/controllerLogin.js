const path=require("path");

const controller={
    login: (req, res)=>{
        res.sendFile(path.resolve(__dirname , "../views/login.html"));
    }

};

module.exports=controller;