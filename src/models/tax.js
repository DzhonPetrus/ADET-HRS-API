const tax = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Tax = sequelize.define(
        'taxes',
        {
            taxCode: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            percentage: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "percentage should not be null."},
                    notEmpty: { msg: "percentage should not be empty."}
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

    return Tax;
}

module.exports = tax;