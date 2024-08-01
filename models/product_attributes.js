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
        type: DataTypes.ENUM("checkbox", "radio", "select"),
        allowNull: true,
        defaultValue: "checkbox",
        validate: {
          isIn: [["checkbox", "radio", "select"]],
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
      tableName: "product_attributes",
      timestamps: true, // Enable timestamps for this model
    }
  );
  Product_Attributes.associate = function (models) {
    Product_Attributes.hasMany(models.Product_Attribute_Values, {
      foreignKey: "product_attribute_id",
      as: "attributeValues",
      onDelete: "CASCADE",
    });
  };

  return Product_Attributes;
};
