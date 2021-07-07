require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


const db = {};

const databases = Object.keys(config.databases);

for(let i = 0; i < databases.length; i++){
    let database = databases[i];
    let dbPath = config.databases[databases];
    db[database] = new Sequelize(
        dbPath.database,
        dbPath.username,
        dbPath.password,
        dbPath
    );
    db.sequelize = db[database];
}




//  Adding Models from HRS folder in Models folder
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(db.sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// MODEL ASSOCIATIONS
  // USERS
  db.users.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.users.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.users.hasOne(db.user_informations, {as:"user_info", foreignKey: 'user_info_id', constraints:false});

  // USERS INFORMATION
  db.user_informations.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.user_informations.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.user_informations.belongsTo(db.users, {as:"user", foreignKey: 'user_info_id', targetKey: 'id'});
  db.user_informations.hasOne(db.loyalty_points, {as:"loyalty_points", foreignKey: 'loyalty_point_id', constraints:false});
  db.loyalty_points.belongsTo(db.user_informations, {as:"user_info", foreignKey: 'loyalty_point_id', constraints:false});

  // TAXES
  db.taxes.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.taxes.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  // AMENITY
  db.amenities.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.amenities.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  //LOYALTY POINTS
  db.loyalty_points.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.loyalty_points.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  //BOOKING
  db.bookings.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.bookings.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.bookings.belongsTo(db.users, {as:"client", foreignKey: 'user_id'});
  db.users.hasMany(db.bookings, {as:"bookings", foreignKey: 'booking_id'});

  // AMENITY_ROOM_TYPES
  db.amenity_room_types.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.amenity_room_types.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.room_types.belongsToMany(db.amenities, {
    through: "amenity_room_types",
    as: "room_types",
    foreignKey: "room_type_id"
  });

  db.amenities.belongsToMany(db.room_types, {
    through: "amenity_room_types",
    as: "amenities",
    foreignKey: "amenity_id"
  });
  

  // HOUSEKEEPING
  db.housekeepings.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.housekeepings.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.housekeepings.belongsTo(db.rooms, {as:"room", foreignKey: 'room_id'});
  db.rooms.hasMany(db.housekeepings, {as:"housek", foreignKey: 'housekeeping_id'});

  //LOYALTY POINT HISTORY
  db.loyalty_point_histories.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.loyalty_point_histories.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.loyalty_point_histories.belongsTo(db.loyalty_points, {as:"loyalty_point", foreignKey: 'loyalty_point_id'});
  db.loyalty_points.hasMany(db.loyalty_point_histories, {as:"loyalty_point_history", foreignKey: 'lp_history_id'});
  db.loyalty_point_histories.belongsTo(db.bookings, {as:"booking", foreignKey: 'booking_id'});
  db.bookings.hasMany(db.loyalty_point_histories, {as:"loyalty_point_history", foreignKey: 'lp_history_id'});


  // PRICING
  db.pricings.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.pricings.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  // RATES
  db.rates.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.rates.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
 
  // ROOM TYPES
  db.room_types.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.room_types.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.room_types.belongsTo(db.pricings, {as:"price", foreignKey:'pricing_id'});
  db.pricings.hasMany(db.room_types, {as:"rooms", foreignKey:'room_type_id'});

  // PACKAGES
  db.packages.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.packages.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.packages.belongsTo(db.pricings, {as:"price", foreignKey: 'pricing_id'});
  db.pricings.hasMany(db.packages, {as:"packages", foreignKey: 'package_id'});
  db.packages.belongsTo(db.room_types, {as:"rooms", foreignKey: 'room_type_id'});
  db.room_types.hasMany(db.packages, {as:"packages", foreignKey: 'package_id'});

  // PD CONDITONS
  db.pd_conditions.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.pd_conditions.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  // PROMO AND DISCOUNTS
  db.promos_and_discounts.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.promos_and_discounts.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  
  db.promos_and_discounts.belongsTo(db.room_types, {as:"rooms", foreignKey: 'room_type_id'});
  db.room_types.hasMany(db.promos_and_discounts, {as:"promo_discount", foreignKey: 'pd_code'});
  db.promos_and_discounts.belongsTo(db.pd_conditions, {as:"conditions", foreignKey: 'condition_id'});
  db.pd_conditions.hasMany(db.promos_and_discounts, {as:"promo_discount", foreignKey: 'pd_code'});

  // ROOMS
  db.rooms.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.rooms.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  db.rooms.belongsTo(db.room_types, {as:"room_type", foreignKey: 'room_type_id'});
  db.room_types.hasMany(db.rooms, {as:"room", foreignKey: 'room_id'});
  db.rooms.belongsTo(db.pricings, {as:"price", foreignKey: 'pricing_id'});
  db.pricings.hasMany(db.rooms, {as:"room", foreignKey: 'room_id'});
  
  // ROOMS RESERVED
  db.room_reserves.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.room_reserves.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  db.room_reserves.belongsTo(db.bookings, {as:"booking", foreignKey: 'booking_id'});
  db.bookings.hasMany(db.room_reserves, {as:"room_reserve", foreignKey: 'room_reserved_id'});
  db.room_reserves.belongsTo(db.rooms, {as:"room", foreignKey: 'room_id'});
  db.rooms.hasMany(db.room_reserves, {as:"room_reserve", foreignKey: 'room_reserved_id'});
  db.room_reserves.belongsTo(db.packages, {as:"package", foreignKey: 'package_id'});
  db.packages.hasMany(db.room_reserves, {as:"room_reserve", foreignKey: 'room_reserved_id'});

  // PAYMENTS
  db.payments.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.payments.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});

  db.payments.belongsTo(db.bookings, {as:"booking", foreignKey: 'booking_id'});
  db.bookings.hasMany(db.payments, {as:"payment", foreignKey: 'payment_id'});
  db.payments.belongsTo(db.taxes, {as:"tax", foreignKey: 'tax_code'});
  db.taxes.hasMany(db.payments, {as:"payment", foreignKey: 'payment_id'});
  db.payments.belongsTo(db.promos_and_discounts, {as:"promo_discount", foreignKey: 'pd_code'});
  db.promos_and_discounts.hasMany(db.payments, {as:"payment", foreignKey: 'payment_id'});

  db.payments.belongsTo(db.users, {as:"processed_by", foreignKey: 'process_by'});
  db.payments.belongsTo(db.users, {as:"canceled_by", foreignKey: 'cancelled_refund_by'});





module.exports = db;