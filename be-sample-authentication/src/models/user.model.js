'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      user_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      update_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
        timestamps: true, 
      modelName: 'user',
      tableName: 'user', 
      freezeTableName: true, 
      timestamps: false, 
    }
  );

  return User;
};
