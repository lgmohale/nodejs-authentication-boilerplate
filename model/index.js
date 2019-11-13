const Sequelize = require('sequelize');
const db = require('../config');

module.exports = db.define('person', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING,
        allownull: false
    },
    user_surname: {
        type: Sequelize.STRING,
        allownull: false
    },
    user_email: {
        type: Sequelize.STRING,
        allownull: false
    },
    user_password: {
        type: Sequelize.STRING,
        allownull: false
    },
    created_at: { 
        type: Sequelize.DATE,
        allowNull: true, 
        defaultValue: Sequelize.NOW 
    },
     updated_at: {
        type: Sequelize.DATE,
        allowNull: true, 
        defaultValue: Sequelize.NOW 
     },
     
    }, 
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    }
);