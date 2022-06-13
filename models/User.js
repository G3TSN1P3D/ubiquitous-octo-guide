const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // TODO: create a check password using bcrypt
    checkPassword(LoginPw) {
        return bcrypt.compareSync(LoginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len:[4]}
        }
    },
    {
        hooks: {
            beforeCreate: async(newUserData) => {
                // This creates a new password that is encrypted using bcrypt
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async(updateUserData) => {
                // This updates 
                updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
                return updateUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
)

module.exports = User;