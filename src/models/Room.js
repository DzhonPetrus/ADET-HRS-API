const room = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Room = sequelize.define(
        'rooms',
        {
            room_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            room_type_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'room_types',
                    key:'room_type_id'
                }
            },
            room_no: {
                type:DataTypes.INTEGER.UNSIGNED,
                unique: true,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            min_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
            max_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
            pricing_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'pricings',
                    key:'pricing_id'
                }
            },
            room_status: {
                type: DataTypes.STRING(60),
                allowNull: true
            },
            additional_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            rate_additional_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
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

    return Room;
}

module.exports = room;

/* TODO 
room_type_id add fk
pricing_id add fk
min_guest add min validation
max_guest add max validation

*/