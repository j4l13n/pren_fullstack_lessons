export default (sequelize, DataTypes) => {
  const Businesses = sequelize.define('Businesses', {
    name: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER
    },
  }, {});
  Businesses.associate = function(models) {
    // associations can be defined here
    Businesses.hasMany(models.Products, {
      foreignKey: "businessId",
      onDelete: "CASCADE"
    });
    Businesses.belongTo(models.Users, {
      as: "user",
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Businesses;
};