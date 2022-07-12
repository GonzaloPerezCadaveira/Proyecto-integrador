const router = exporess.Router();

const loginController = require ("./controllers/controllerLogin");

router.get("/", loginController.login);

module.exports= router;