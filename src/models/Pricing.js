const pricing = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Pricing = sequelize.define(
        'pricings',
        {
            pricing_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            price_per_qty: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            date_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            date_end: {
                type: DataTypes.DATE,
                allowNull: false
            },
            room_id:{
                type: DataTypes.STRING(60),
                allowNull:true
            },
            room_type_id:{
                type: DataTypes.STRING(60),
                allowNull:true
            },
            created_by: {
                type: DataTypes.UUID,
            },
            updated_by: {
                type: DataTypes.UUID,
            },
            status: {
                type: DataTypes.STRING(60),
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

    return Pricing;
}

module.exports = pricing;

// !TODO room_id FK
// !TODO room_type_id FK
// !TODO created_by FK
// !TODO update_by FK 