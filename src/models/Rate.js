const rate = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [

    ];


    const Rate = sequelize.define(
        'rates',
        {
            rate_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            price_per_qty:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false
            },
            startDate:{
                type: DataTypes.DATE,
                allowNull:false
            },
            endDate:{
                type: DataTypes.DATE,
                allowNull:false
            },
            room_id:{
                type: DataTypes.STRING(60),
                allowNull: true
            },
            room_type_id:{
                type: DataTypes.STRING(60),
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
                defaultalue: "Active"
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

    return Rate;
}

module.exports = rate;

/* TO DO 
1. room_id FK
2. room_type_id FK
*/