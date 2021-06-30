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

  // USERS INFORMATION
  db.user_informations.belongsTo(db.users, {as:"created", foreignKey: 'created_by'});
  db.user_informations.belongsTo(db.users, {as:"updated", foreignKey: 'updated_by'});
  db.user_informations.belongsTo(db.loyalty_points, {as:"loyalty_points", foreignKey: 'loyalty_point_id'});

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



module.exports = db;