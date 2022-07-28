const express= require ("express");

const router = express.Router();

const detailController = require ("../controllers/controllerDetail");



router.get("/:id", detailController.detail);

router.get('/:id/create',detailController.create);

router.post('/:id/create',detailController.store);


module.exports= router;