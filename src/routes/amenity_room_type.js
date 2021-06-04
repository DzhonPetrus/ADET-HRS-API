const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/amenity_room_type.controller');

router.get('/', findAll);
router.get('/:amenity_room_type_id', findOne);
router.post('/', create);
router.put('/:amenity_room_type_id', update);
router.delete('/', destroy);

module.exports = router;