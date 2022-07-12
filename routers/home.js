const router = exporess.Router();

const homeController = require ("./controllers/controllerHome");

router.get("/", homeController.home);

module.exports= router;