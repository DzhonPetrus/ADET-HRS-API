const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/payment.controller');

router.get('/', findAll);
router.get('/:payment_id', findOne);
router.post('/', create);
router.put('/:payment_id', update);
router.delete('/', destroy);

module.exports = router;