module.exports = (sequelize, DataTypes) => {
  const Product_Variants = sequelize.define(
    "Product_Variants",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extra_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_attribute_value_id: {
        type: DataTypes.INTEGER,
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
      tableName: "product_variants",
      timestamps: true, // Enable timestamps for this model
    }
  );
  Product_Variants.associate = function (models) {
    Product_Variants.belongsTo(models.Product_Attribute_Values, {
      foreignKey: "product_attribute_value_id",
    });
  };

  return Product_Variants;
};
