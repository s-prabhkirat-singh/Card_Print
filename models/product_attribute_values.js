module.exports = (sequelize, DataTypes) => {
  const Product_Attribute_Values = sequelize.define(
    "Product_Attribute_Values",
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
      product_attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "product_Attribute",
          key: "id",
        },
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
      tableName: "product_attribute_values",
      timestamps: true, // Enable timestamps for this model
    }
  );

  Product_Attribute_Values.associate = (models) => {
    Product_Attribute_Values.belongsTo(models.Product_Attributes, {
      foreignKey: "product_attribute_id",
      as: "attribute",
    });
  };

  return Product_Attribute_Values;
};
