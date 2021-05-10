const loyalty_point = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Loyalty_point = sequelize.define(
        'loyalty_points',
        {
            loyalty_point_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            points: {
                type: DataTypes.INTEGER.UNSIGNED,
                unique: true,
                allowNull:false,
                validate: {
                    notNull: { msg: "loyalty_points should not be null."},
                    notEmpty: { msg: "loyalty_points should not be empty."}
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

    return Loyalty_point;
}

module.exports = loyalty_point;