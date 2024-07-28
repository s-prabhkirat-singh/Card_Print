module.exports = (sequelize, DataTypes) => {
  const Product_Attributes_Values = sequelize.define(
    "Product_Attributes_Values",
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
          model: "product_attributes",
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
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "product_attributes_values",
      timestamps: true, // Enable timestamps for this model
    }
  );

  Product_Attributes_Values.associate = (models) => {
    Product_Attributes_Values.belongsTo(models.Product_Attributes, {
      foreignKey: "product_attribute_id",
      as: "parentAttribute",
    });
  };

  return Product_Attributes_Values;
};
