const user = require('./user');
const amenity = require('./amenity');
const payment = require('./payment');
const package = require('./package');
const room_type = require('./room_type');
const rate = require('./rate');
const housekeeping = require('./housekeeping');
const rooms = require('./rooms');
const rooms_reserved = require('./rooms_reserved');
const loyalty_point = require('./loyalty_point');
const tax = require('./tax');
const booking = require('./booking');
const loyalty_point_history = require('./loyalty_point_history');


module.exports = {
    user,
    amenity,
    housekeeping,
    rooms,
    rooms_reserved,
    payment,
    package,
    room_type,
    rate,
    housekeeping,
    loyalty_point,
    tax,
    booking,
    loyalty_point_history
};