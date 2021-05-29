const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/promo_and_discount.controller');

router.get('/', findAll);
router.get('/:pd_code', findOne);
router.post('/', create);
router.put('/:pd_code', update);
router.delete('/', destroy);

module.exports = router;