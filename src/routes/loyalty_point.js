const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/loyalty_point.controller');

router.get('/', findAll);
router.get('/:loyalty_point_id', findOne);
router.post('/', create);
router.put('/:loyalty_point_id', update);
router.delete('/', destroy);

module.exports = router;