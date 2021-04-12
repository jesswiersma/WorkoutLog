const {DataTypes} = require('sequelize');
const db = require('../db');

const Log = db.define('Log', {
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    defintion: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    result: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Log;