module.exports = (sequelize , DataTypes , Model) => {
  class User extends Model {}

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        // allowNull: false,
      }, 
      lastName: {
        type: DataTypes.STRING,
      },
      fullName:{ 
        type:DataTypes.VIRTUAL,
        get(){
          return `${this.firstName} ${this.lastName}`
        },
        set(value) {
          throw new Error('Do not try to set the `fullName` value!');
        },
       }
    },
    
    {
      sequelize, 
      modelName: 'User', 
    },  
  );
    return User;
}


