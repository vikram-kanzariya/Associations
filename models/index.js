const { Sequelize, DataTypes, Model } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE , process.env.DB_USER , process.env.DB_PASSWORD , {
  host: process.env.DB_HOST,
  dialect:'mysql',
  logging:false
});


    try {
      sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require('./user')(sequelize , DataTypes , Model);
db.contact = require('./contact')(sequelize , DataTypes);


db.user.hasOne(db.contact);
db.contact.belongsTo(db.user);


db.player = require('./player')(sequelize , DataTypes , Model);
db.team = require('./team')(sequelize , DataTypes , Model);

db.team.hasMany(db.player);
db.player.belongsTo(db.team);

db.actor = require('./actor')(sequelize , DataTypes);
db.profile = require('./profile')(sequelize , DataTypes);

db.actor.belongsToMany(db.profile , { through:'Actor_Profiles' });
db.profile.belongsToMany(db.actor , { through:'Actor_Profiles' });

db.sequelize.sync({ alter:true });
console.log('Database Sync..');

module.exports = db;