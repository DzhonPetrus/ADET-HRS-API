const package = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Package = sequelize.define(
        'packages',
        {
            package_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            min_guest:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            max_guest:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            pricing_id:{
                type: DataTypes.STRING(60),
                allowNull: false
            },
            roomType:{
                type: DataTypes.STRING(60),
                allowNull: false
            },
            description:{
                type: DataTypes.STRING(60),
                allowNull: false
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

    return Package;
}

module.exports = package;

/*TODO
1.Priceid and roomtypeid FK */