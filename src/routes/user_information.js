const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/user_information.controller');

router.get('/', findAll);
router.get('/:user_info_id', findOne);
router.post('/', create);
router.put('/:user_info_id', update);
router.delete('/', destroy);

module.exports = router;