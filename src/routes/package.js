const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/package.controller');

const uploadImage = require("../utils/uploadImage");

router.get('/', findAll);
router.get('/:package_id', findOne);
router.post('/', uploadImage, create);
router.put('/:package_id', uploadImage, update);
router.delete('/', destroy);

module.exports = router;