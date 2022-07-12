const router = exporess.Router();

const detailController = require ("./controllers/controllerDetail");

router.get("/", detailController.detail);

module.exports= router;