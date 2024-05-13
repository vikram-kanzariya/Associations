
module.exports = (sequelize , DataTypes , Model) => {
  class Player extends Model {}

  Player.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize, 
      modelName: 'Player', 
    },  
  );
    return Player;
}


