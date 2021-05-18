const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/package.controller');

router.get('/', findAll);
router.get('/:package_id', findOne);
router.post('/', create);
router.put('/:package_id', update);
router.delete('/', destroy);

module.exports = router;