const housekeeping = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Housekeeping = sequelize.define(
        'housekeepings',
        {
            housekeeping_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            room_id: {
                type: DataTypes.UUID,
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

    return Housekeeping;
}

module.exports = housekeeping;


// !@TODO Foreign keys room_id