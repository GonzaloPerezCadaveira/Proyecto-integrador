const express= require ("express");

const router = express.Router();

const homeController = require ("../controllers/controllerHome");

router.get("/", homeController.home);

module.exports= router;