const pd_condition = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Pd_Condition = sequelize.define(
        'pd_conditions',
        {
            condition_code: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            min_duration: {
                type: DataTypes.DATE,
                allowNull:false,
                validate: {
                    notNull: { msg: "min_duration should not be null."},
                    notEmpty: { msg: "min_duration should not be empty."}
                }
            },
            duration: {
                type: DataTypes.DATE,
                allowNull:false,
                validate: {
                    notNull: { msg: "duration should not be null."},
                    notEmpty: { msg: "duration should not be empty."}
                }
            },
            min_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "min_guest should not be null."},
                    notEmpty: { msg: "min_guest should not be empty."}
                },
                defaultValue: 1
            },
            max_guest: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "max_guest should not be null."},
                    notEmpty: { msg: "max_guest should not be empty."}
                },
                defaultValue: 1
            },
            limit: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                validate: {
                    notNull: { msg: "limit should not be null."},
                    notEmpty: { msg: "limit should not be empty."}
                },
                defaultValue: 1
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

    return Pd_Condition;
}

module.exports = pd_condition;