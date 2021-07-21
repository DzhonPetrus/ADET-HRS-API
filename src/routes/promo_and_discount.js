const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/promo_and_discount.controller');

const uploadImage = require("../utils/uploadImage");

router.get('/', findAll);
router.get('/:pd_code', findOne);
router.post('/', uploadImage, create);
router.put('/:pd_code', uploadImage, update);
router.delete('/', destroy);

module.exports = router;