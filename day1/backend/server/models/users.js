import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hashSync(user.password, 8);
      }
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Businesses, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Users;
};