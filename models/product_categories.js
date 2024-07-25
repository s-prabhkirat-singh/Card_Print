module.exports = (sequelize, DataTypes) => {
  const Product_Categories = sequelize.define(
    "Product_Categories",
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
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sequence: {
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
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "product_categories",
      timestamps: true, // Enable timestamps for this model
    }
  );

  // Define the self-referential association with unique aliases
  Product_Categories.hasMany(Product_Categories, { as: 'Children', foreignKey: 'parent_id' });
  Product_Categories.belongsTo(Product_Categories, { as: 'Parent', foreignKey: 'parent_id' });

  return Product_Categories;
};
