const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/housekeeping.controller');

router.get('/', findAll);
router.get('/:housekeeping_id', findOne);
router.post('/', create);
router.put('/:housekeeping_id', update);
router.delete('/', destroy);

module.exports = router;