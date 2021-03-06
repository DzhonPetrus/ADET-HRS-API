const amenity_room_type = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Amenity_room_type = sequelize.define(
        'amenity_room_types',
        {
            amenity_room_type_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            amenity_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'amenities',
                    key:'amenity_id'
                }
            },
           room_type_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'room_types',
                    key:'room_type_id'
                }
            },
            created_by: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key:'id'
                }
            },
            updated_by: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key:'id'
                }
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "Active"
            },
        },
        {
            defaultScope: {
                attributes: { exclude: PROTECTED_ATTRIBUTES }
            },
            timestamps: true,
            createdAt: "date_created",
            updatedAt: "date_updated"

        }
    );

    return Amenity_room_type;
}

module.exports = amenity_room_type;


//TODO
//FK > AMENITY_ROOM_TYPE_ID
//FK > ROOM_TYPE_ID