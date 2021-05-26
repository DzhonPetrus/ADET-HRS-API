const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/rate.controller');

router.get('/', findAll);
router.get('/:rate_id', findOne);
router.post('/', create);
router.put('/:rate_id', update);
router.delete('/', destroy);

module.exports = router;