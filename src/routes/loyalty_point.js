const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/loyalty_point.controller');

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/', destroy);

module.exports = router;