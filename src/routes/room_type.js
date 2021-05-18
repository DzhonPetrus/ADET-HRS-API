const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/room_type.controller');

router.get('/', findAll);
router.get('/:room_type_id', findOne);
router.post('/', create);
router.put('/:room_type_id', update);
router.delete('/', destroy);

module.exports = router;