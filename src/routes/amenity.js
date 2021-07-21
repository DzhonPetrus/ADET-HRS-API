const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/amenity.controller');

const uploadImage = require("../utils/uploadImage");

router.get('/', findAll);
router.get('/:amenity_id', findOne);
router.post('/', uploadImage, create);
router.put('/:amenity_id', uploadImage, update);
router.delete('/', destroy);

module.exports = router;