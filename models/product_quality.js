module.exports = (sequelize, DataTypes) => {
  const Product_Quality = sequelize.define(
    "Product_Quality",
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
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "product_quality",
      timestamps: true, // Enable timestamps for this model
    }
  );

  return Product_Quality;
};
