const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provider = require('./provider'); // Notice: lowercase 'provider' from pull

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Item name cannot be empty"
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: 'id'
    },
    validate: {
      notNull: {
        msg: "providerId is required"
      }
    }
  }
});

// Associations
Provider.hasMany(Item, { foreignKey: 'providerId' });
Item.belongsTo(Provider, { foreignKey: 'providerId' });

module.exports = Item;