const express= require ("express");

const router = express.Router();

const detailController = require ("../controllers/controllerDetail");

router.get("/", detailController.detail);


module.exports= router;