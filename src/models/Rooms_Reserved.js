const room_reserved = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Room_Reserved = sequelize.define(
        'rooms_reserved',
        {
            room_reserved_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            booking_id:{
                type: DataTypes.STRING(60),
                allowNull: false
            },
            room_id:{
                type: DataTypes.STRING(60),
                allowNull: false
            },
            room_reserved_status:{
                type: DataTypes.STRING(60),
                allowNull: true
            },
            rate:{
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            no_of_guest:{
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            no_of_nights:{
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            date_from:{
                type:DataTypes.DATE,
                allowNull: false
            },
            date_to:{
                type:DataTypes.DATE,
                allowNull: false
            },
            package_id:{
                type: DataTypes.STRING(60),
                allowNull: true
            },
            checkIn:{
                type:DataTypes.DATE,
                allowNull: true
            },
            checkOut:{
                type:DataTypes.DATE,
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

    return Room_Reserved;
}

module.exports = room_reserved;

/* TODO
booking_id add fk
room_id add fk
package_id add fk
*/