const user = (sequelize, DataTypes) => {
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
                allowNull:false
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull:false
            },
            userType: {
                type: DataTypes.STRING(60),
                allowNull:false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
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
                type: DataTypes.STRING
            },
        },
        {
            timestamps: true
        }
    );

    User.sync();
    return User;
}

module.exports = user;