const promo_and_discount = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Promo_and_Discount = sequelize.define(
        'promos_and_discounts',
        {
            pd_code: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            type: {
                type: DataTypes.STRING(60),
                allowNull:false,
                validate: {
                    notNull: { msg: "type should not be null."},
                    notEmpty: { msg: "type should not be empty."}
                }
            },
            room_type_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'room_types',
                    key:'room_type_id'
                }
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "description should not be null."},
                    notEmpty: { msg: "description should not be empty."}
                }
            },
            discount_percentage_amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "discount_percentage_amount should not be null."},
                    notEmpty: { msg: "discount_percentage_amount should not be empty."}
                }
            },
            valid_from: {
                type: DataTypes.DATE,
                allowNull:false,
                validate: {
                    notNull: { msg: "valid_from should not be null."},
                    notEmpty: { msg: "valid_from should not be empty."}
                }
            },
            valid_until: {
                type: DataTypes.DATE,
                allowNull:false,
                validate: {
                    notNull: { msg: "valid_until should not be null."},
                    notEmpty: { msg: "valid_until should not be empty."}
                }
            },
            condition_code: {
                type: DataTypes.UUID,
                references: {
                    model: 'pd_conditions',
                    key:'condition_code'
                }
            },
            photo_url: {
                type: DataTypes.STRING,
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

    return Promo_and_Discount;
}

module.exports = promo_and_discount;