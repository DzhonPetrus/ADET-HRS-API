const router = require("express").Router();
const { register } = require('../controllers/register.controller');

const uploadImage = require("../utils/uploadImage");

router.post('/', uploadImage, register);

module.exports = router;