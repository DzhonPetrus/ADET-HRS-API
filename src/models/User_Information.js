const user_information = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "first_name"
    ];


    const User_Information = sequelize.define(
        'user_informations',
        {
            user_info_id: {
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
            first_name: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "first_name should not be null."},
                    notEmpty: { msg: "first_name should not be empty."}
                }
            },
            middle_name: {
                type: DataTypes.STRING(255),
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "last_name should not be null."},
                    notEmpty: { msg: "last_name should not be empty."}
                }
            },
            contact_no: {
                type: DataTypes.STRING(11),
                allowNull:false,
                validate: {
                    notNull: { msg: "contact_no should not be null."},
                    notEmpty: { msg: "contact_no should not be empty."}
                }
            },
            street1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "street1 should not be null."},
                    notEmpty: { msg: "street1 should not be empty."}
                }
            },
            city1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "city1 should not be null."},
                    notEmpty: { msg: "city1 should not be empty."}
                }
            },
            zip1: {
                type: DataTypes.STRING(15),
                allowNull:false,
                validate: {
                    notNull: { msg: "zip1 should not be null."},
                    notEmpty: { msg: "zip1 should not be empty."}
                }
            },
            state1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "state1 should not be null."},
                    notEmpty: { msg: "state1 should not be empty."}
                }
            },
            country1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "country1 should not be null."},
                    notEmpty: { msg: "country1 should not be empty."}
                }
            },
            street2: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "street2 should not be null."},
                    notEmpty: { msg: "street2 should not be empty."}
                }
            },
            city2: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "city2 should not be null."},
                    notEmpty: { msg: "city2 should not be empty."}
                }
            },
            zip2: {
                type: DataTypes.STRING(15),
                allowNull:false,
                validate: {
                    notNull: { msg: "zip2 should not be null."},
                    notEmpty: { msg: "zip2 should not be empty."}
                }
            },
            state2: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "state2 should not be null."},
                    notEmpty: { msg: "state2 should not be empty."}
                }
            },
            country2: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "country2 should not be null."},
                    notEmpty: { msg: "country2 should not be empty."}
                }
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull:false,
                validate: {
                    notNull: { msg: "birth_date should not be null."},
                    notEmpty: { msg: "birth_date should not be empty."}
                }
            },
            nationality: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "nationality should not be null."},
                    notEmpty: { msg: "nationality should not be empty."}
                }
            },
            photo_url: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "photo_url should not be null."},
                    notEmpty: { msg: "photo_url should not be empty."}
                }
            },
            loyalty_point_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'loyalty_points',
                    key:'loyalty_point_id'
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

    return User_Information;
}

module.exports = user_information;