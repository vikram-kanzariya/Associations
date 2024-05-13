const express= require('express');
require('dotenv').config();
require('./models/index');
const { createUser , getUsers , getUser , oneTooneUser , getoneTooneUser , createOnetoMany , getOneToMany , createManytoMany, getManytoMany} = require('./controllers/userController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get("/" , (req , res) => {
  res.send("Hello World")
});

app.post("/createuser" , createUser);
app.get("/getusers" , getUsers);
app.get("/getusers/:id" , getUser);


app.post("/one-to-one" , oneTooneUser);
app.get("/one-to-one" , getoneTooneUser);

app.post("/one-to-many" , createOnetoMany);
app.get("/one-to-many" , getOneToMany);


app.post("/many-to-many" , createManytoMany)
app.get("/many-to-many" , getManytoMany)

app.listen(process.env.PORT , () => {
  console.log(`Working on Port: ${process.env.PORT}`);
});