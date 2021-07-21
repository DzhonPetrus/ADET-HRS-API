const user = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        // "password"
    ];


    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull:false,
                validate: {
                    isEmail: { msg: "Invalid email format."},
                    notNull: { msg: "email should not be null."},
                    notEmpty: { msg: "email should not be empty."}
                }
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "password should not be null."},
                    notEmpty: { msg: "password should not be empty."}
                }
            },
            // user_info_id: {
            //     type: DataTypes.UUID,
            //     references: {
            //         model: 'user_informations',
            //         key:'user_info_id'
            //     }
            // },
            user_type: {
                type: DataTypes.STRING(60),
                allowNull:false,
                validate: {
                    notNull: { msg: "user_type should not be null."},
                    notEmpty: { msg: "user_type should not be empty."}
                },
                defaultValue: "Customer"
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

    // User.belongsTo(User, {as:"created", foreignKey: 'created_by'});
    // User.belongsTo(User, {as:"updated", foreignKey: 'updated_by'});

    return User;
}

module.exports = user;