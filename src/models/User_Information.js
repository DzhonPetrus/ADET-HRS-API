const user_information = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
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
               
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull:false,
                 validate: {
                    notNull: { msg: "First Name should not be null."},
                    notEmpty: { msg: "First Name should not be empty."}
                }
               
            },
            middle_name: {
                type: DataTypes.STRING(255),
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull:false,
                 validate: {
                    notNull: { msg: "Last Name should not be null."},
                    notEmpty: { msg: "Last Name should not be empty."}
                }
                
            },
            contact_no: {
                type: DataTypes.STRING(11),
                allowNull:false, 
                validate: {
                    notNull: { msg: "Contact Number should not be null."},
                    notEmpty: { msg: "Contact Number should not be empty."}
                }
            
            },
            street1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "Street should not be null."},
                    notEmpty: { msg: "Street should not be empty."}
                }
                
               
            },
            city1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "City should not be null."},
                    notEmpty: { msg: "City should not be empty."}
                }
              },
            zip1: {
                type: DataTypes.STRING(15),
                allowNull:false,
                validate: {
                    notNull: { msg: "Zip Code should not be null."},
                    notEmpty: { msg: "Zip Code should not be empty."}
                }
              },
            state1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "State should not be null."},
                    notEmpty: { msg: "State should not be empty."}
                }
              
            },
            country1: {
                type: DataTypes.STRING(255),
                allowNull:false,
                validate: {
                    notNull: { msg: "Country should not be null."},
                    notEmpty: { msg: "Country should not be empty."}
                }
                
            },
            street2: {
                type: DataTypes.STRING(255),
                allowNull:true,
     
            },
            city2: {
                type: DataTypes.STRING(255),
                allowNull:true,

            },
            zip2: {
                type: DataTypes.STRING(15),
                allowNull:true,

            },
            state2: {
                type: DataTypes.STRING(255),
                allowNull:true,
            },
            country2: {
                type: DataTypes.STRING(255),
                allowNull:true,
                
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

    return User_Information;
}

module.exports = user_information;