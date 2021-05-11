const router = require("express").Router();
const { findAll, findOne, create, update, destroy } = require('../controllers/amenity.controller');

router.get('/', findAll);
router.get('/:amenity_id', findOne);
router.post('/', create);
router.put('/:amenity_id', update);
router.delete('/', destroy);

module.exports = router;