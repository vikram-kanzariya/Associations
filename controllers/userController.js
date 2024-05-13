const { where } = require("sequelize");
const db = require("../models/index");

const User = db.user;
const Contact = db.contact;
const Team = db.team;
const Player = db.player;
const Actor = db.actor;
const Profile = db.profile;

// Read Data
const getUsers = async(req , res) => {
  let users = await User.findAll();
  res.json({ data:users })
}

const getUser = async(req , res) => {
  let users = await User.findOne({
    where:{ id: req.params.id }
  });
  res.json({ data:users })
}


const createUser = async(req , res) => {
  const postdata = req.body;
  const users = await User.create(postdata);

  console.log("FullName is: " + users.fullName)
  
  return res.status(200).json({
    success:true,
    message:"User Created...",
    data:users, 
  });
}

const oneTooneUser = async(req , res) => {
  const postdata = req.body;
  const users = await User.create(postdata);

  if(users && users.id){
        
    await Contact.create({
      permanent_address:"Junagadh",
      current_address:"NavrangPura",
      UserId:users.id,
    })
  }
  console.log("FullName is: " + users.fullName)
  
  return res.status(200).json({
    success:true,
    message:"User Created...",
    data:users, 
  });
}


const getoneTooneUser = async(req , res) => {
  let user = await User.findAll({ 

    where:{ id:[6,7] },
    include:Contact , 
  });

  return res.json({ success:true , data:user })
}

const createOnetoMany = async(req , res) => {
  // const team_name = req.body
  // const teams = await Team.create(team_name);

  // if(teams && teams.id){
    let playerData = await Player.create({ name:"Rohit" , TeamId:1 })
  // }

  return res.status(200).json({
    success:true ,
    data:playerData
  })
}

const getOneToMany = async(req , res) => {
  let data = await Team.findAll({ include:Player });
  return res.json({ data : data });
}


const createManytoMany = async(req , res)=> {
  const actorData = await Actor.create({ actorName:"Hardev" , points:87 });
  const profileData = await Profile.create({ name:"hardev'sProfile" });

  const mappedData =  await actorData.addProfile(profileData , { through:{ selfGranted:false } });

  return res.json({ data:actorData , data2:profileData , data3:mappedData })
}

const getManytoMany = async(req , res) => {
  const result = await Actor.findAll({ where:{ actorName:"Hardev" } , include:Profile });

  return res.json({ success:true , data:result });
}

module.exports = { 
  getUsers , getUser,
  createUser,
  oneTooneUser,
  getoneTooneUser,
  createOnetoMany,
  getOneToMany,
  createManytoMany,
  getManytoMany
 };