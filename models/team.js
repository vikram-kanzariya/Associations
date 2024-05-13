
module.exports = (sequelize , DataTypes , Model) => {
  class Team extends Model {}

  Team.init(
    {
      team_name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize, 
      modelName: 'Team', 
    },  
  );
    return Team;
}


