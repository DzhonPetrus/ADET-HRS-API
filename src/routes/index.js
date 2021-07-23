const amenity_room_type = require('./amenity_room_type');
const amenity = require('./amenity');
const booking = require('./booking');
const housekeeping = require('./housekeeping');
const loyalty_point_history = require('./loyalty_point_history');
const loyalty_point = require('./loyalty_point');
const package = require('./package');
const payment = require('./payment');
const pd_condition = require('./pd_condition');
const pricing = require('./pricing');
const promo_and_discount = require('./promo_and_discount');
const rate = require('./rate');
const room_reserves = require('./room_reserved');
const room_type = require('./room_type');
const room = require('./room');
const tax = require('./tax');

const user_information = require('./user_information');
const user = require('./user');

const login = require('./login');
const register = require('./register');


module.exports = {
  amenity_room_type,
  amenity,
  booking,
  housekeeping,
  login,
  loyalty_point_history,
  loyalty_point,
  package,
  payment,
  pd_condition,
  pricing,
  promo_and_discount,
  rate,
  room_type,
  room_reserves,
  room,
  tax,
  user_information,
  user,
  register
};