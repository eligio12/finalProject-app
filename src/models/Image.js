const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Image = sequelize.define('image', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Image;