const router = exporess.Router();

const carritoController = require ("./controllers/controllerCarrito");

router.get("/", carritoController.carro);

module.exports= router;