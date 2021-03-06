const room_type = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Room_type = sequelize.define(
        'room_types',
        {
            room_type_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            type:{
                type: DataTypes.STRING(60),
                allowNull: false
            },
            min_guest:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,

            },
            max_guest:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            pricing_id:{
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'pricings',
                    key:'pricing_id'
                }
            },
            additional_guest:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            rate_additional:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            description:{
                type: DataTypes.STRING(60),
                allowNull: false
            },
            photo_url: {
                type:DataTypes.STRING
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

    return Room_type;
}

module.exports = room_type;

/*TODO
1.Pricing FK
2. Validation of Min Max */