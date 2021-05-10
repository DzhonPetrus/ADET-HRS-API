const amenity = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Amenity = sequelize.define(
        'amenities',
        {
            amenity_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            type: {
                type: DataTypes.STRING(60),
                unique: true,
                allowNull:false,
                validate: {
                    isEmail: { msg: "Invalid email format."},
                    notNull: { msg: "email should not be null."},
                    notEmpty: { msg: "email should not be empty."}
                }
            },
            description: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull:false,
                validate: {
                    notNull: { msg: "description should not be null."},
                    notEmpty: { msg: "description should not be empty."}
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

    return Amenity;
}

module.exports = amenity;