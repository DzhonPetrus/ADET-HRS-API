const booking = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [

    ];


    const Booking = sequelize.define(
        'bookings',
        {
            booking_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            user_id:{
                type: DataTypes.UUID,
                references:{
                     model: 'user_informations',
                     key: 'user_info_id'
                 }
            },
            total_no_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "total numeber of guest should not be null."},
                    notEmpty: { msg: "total numeber of guest should not be empty."}
                }
            },
            total_no_night: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "total night should not be null."},
                    notEmpty: { msg: "total night should not be empty."}
                }
            },
            total_price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "total price should not be null."},
                    notEmpty: { msg: "total price should not be empty."}
                }
            },
            discount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:true,
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

    return Booking;
}

module.exports = booking;