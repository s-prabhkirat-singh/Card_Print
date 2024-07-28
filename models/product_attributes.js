module.exports = (sequelize, DataTypes) => {
  const Product_Attributes = sequelize.define(
    "Product_Attributes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      display_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "product_attributes",
      timestamps: true, // Enable timestamps for this model
    }
  );

  return Product_Attributes;
};
