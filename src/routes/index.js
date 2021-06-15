const user = require('./user');
const user_information = require('./user_information');
const amenity = require('./amenity');
const pricing = require('./pricing');
const payment = require('./payment');
const package = require('./package');
const room_type = require('./room_type');
const rate = require('./rate');
const housekeeping = require('./housekeeping');
const rooms = require('./rooms');
const rooms_reserved = require('./rooms_reserved');
const loyalty_point = require('./loyalty_point');
const loyalty_point_history = require('./loyalty_point_history');
const tax = require('./tax');
const booking = require('./booking');
const promo_and_discount = require('./promo_and_discount');
const pd_condition = require('./pd_condition');

const login = require('./login');


module.exports = {
    user,
    user_information,
    amenity,
    pricing,
    housekeeping,
    rooms,
    rooms_reserved,
    payment,
    package,
    room_type,
    rate,
    housekeeping,
    loyalty_point,
    loyalty_point_history,
    tax,
    booking,
    promo_and_discount,
    pd_condition,
    login
};