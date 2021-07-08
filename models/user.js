module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(40),
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      birth: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
