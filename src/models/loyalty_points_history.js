const loyalty_point_history = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [

    ];


    const Loyalty_Point_History = sequelize.define(
        'loyalty_point_histories',
        {
            lp_history_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            loyalty_point_id:{
                type: DataTypes.UUID,
                references:{
                    model: 'users',
                    key: 'id'
                }
            },
            booking_id:{
                type: DataTypes.UUID,
                references:{
                    model: 'bookings',
                    key: 'booking_id'
                }
            },
            type:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            points:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
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

    return Loyalty_Point_History;
}

module.exports = loyalty_point_history;

//TO DO !!! CONNECT LOYALTY POINTS ID TO LOYALTY TABLE