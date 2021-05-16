const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/pricing.controller');

router.get('/', findAll);
router.get('/:pricing_id', findOne);
router.post('/', create);
router.put('/:pricing_id', update);
router.delete('/', destroy);

module.exports = router;