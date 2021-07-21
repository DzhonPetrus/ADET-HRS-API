const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/room_type.controller');

const uploadImage = require("../utils/uploadImage");

router.get('/', findAll);
router.get('/:room_type_id', findOne);
router.post('/', uploadImage, create);
router.put('/:room_type_id', uploadImage, update);
router.delete('/', destroy);

module.exports = router;