const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/pd_condition.controller');

router.get('/', findAll);
router.get('/:condition_code', findOne);
router.post('/', create);
router.put('/:condition_code', update);
router.delete('/', destroy);

module.exports = router;