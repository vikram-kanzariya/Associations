module.exports = (sequelize , DataTypes) => {
  const Actor = sequelize.define(
    'Actor',
    {
      actorName: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    { timestamps: false },
  ); 
  return Actor;
}


