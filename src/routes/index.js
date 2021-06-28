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
const rooms_reserved = require('./room_reserved');
const room_type = require('./room_type');
const rooms = require('./room');
const tax = require('./tax');

const user_information = require('./user_information');
const user = require('./user');

const login = require('./login');


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
  rooms_reserved,
  rooms,
  tax,
  user_information,
  user
};