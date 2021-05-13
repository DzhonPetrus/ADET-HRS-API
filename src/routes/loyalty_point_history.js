const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/loyalty_point_history.controller');

router.get('/', findAll);
router.get('/:lp_history_id', findOne);
router.post('/', create);
router.put('/:lp_history_id', update);
router.delete('/', destroy);

module.exports = router;