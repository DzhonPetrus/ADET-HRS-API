const router = require("express").Router();
const { findDataTable, findAll, findOne, create, update, destroy } = require('../controllers/user.controller');

router.get('/dataTable', findDataTable);
router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/', destroy);

module.exports = router;