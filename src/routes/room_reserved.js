const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/room_reserved.controller');

router.get('/', findAll);
router.get('/:room_reserved_id', findOne);
router.post('/', create);
router.put('/:room_reserved_id', update);
router.delete('/', destroy);

module.exports = router;