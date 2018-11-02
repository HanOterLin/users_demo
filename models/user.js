module.exports = (sequelize, DataTypes) =>
    sequelize.define('User', {

        user_id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_pwd: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_is_online: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        user_is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

    }, {
        tableName: 'users',
    });