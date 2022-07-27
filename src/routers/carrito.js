const express= require ("express");

const router = express.Router();

const carritoController = require ("../controllers/controllerCarrito");

router.get("/", carritoController.Carrito);

module.exports= router;