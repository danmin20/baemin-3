module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
