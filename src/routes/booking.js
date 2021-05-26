const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/booking.controller');

router.get('/', findAll);
router.get('/:booking_id', findOne);
router.post('/', create);
router.put('/:booking_id', update);
router.delete('/', destroy);

module.exports = router;