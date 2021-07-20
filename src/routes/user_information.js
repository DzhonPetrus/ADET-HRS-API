const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/user_information.controller');

const uploadImage = require("../utils/uploadImage");

router.get('/', findAll);
router.get('/:user_info_id', findOne);
router.post('/', uploadImage, create);
router.put('/:user_info_id', uploadImage, update);
router.delete('/', destroy);

module.exports = router;