const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/tax.controller');

router.get('/', findAll);
router.get('/:taxCode', findOne);
router.post('/', create);
router.put('/:taxCode', update);
router.delete('/', destroy);

module.exports = router;