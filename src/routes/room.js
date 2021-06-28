const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/room.controller');

router.get('/', findAll);
router.get('/:room_id', findOne);
router.post('/', create);
router.put('/:room_id', update);
router.delete('/', destroy);

module.exports = router;