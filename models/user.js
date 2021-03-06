module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(40),
        unique: true,
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
