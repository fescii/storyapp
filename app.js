const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')

let corsOptions = {
  origin: "http://localhost:${process.env.PORT}"
};

const db = require("./models");
const Role = db.Role;

//SyncDb
syncDb().then(() => {
  console.log('Database Synchronized!')
} )

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Start all routes
require('./routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Creating Initial Roles
function initial() {
  Role.create({
    id: 1,
    name: "user"
  }).then(() => {
    console.log('role-created successfully!')
  });
  
  Role.create({
    id: 2,
    name: "moderator"
  }).then(() => {
    console.log('role-created successfully!')
  });
  
  Role.create({
    id: 3,
    name: "admin"
  }).then(() => {
    console.log('role-created successfully!')
  });
}

//Checks and Create Role Data Preventing Duplication
async function syncDb(alter){
  try {
    const roles = await Role.findAll()
    
    if (roles.length === 0){
      console.log('Syncing Fresh Db...');
      db.sequelize.sync().then(() => {
        initial();
      });
    }
    else{
      if (alter){
        console.log('Altering Db Changes...');
        db.sequelize.sync({alter: true}).then(() => {
          console.log('All Changes Synced!');
        });
      }
      else {
        console.log('No Db Changes detected, Everything is Synced!');
        // console.log('Syncing Db Changes...');
        // db.sequelize.sync().then(() => {
        //   console.log('All Changes Synced!');
        // });
      }
      
    }
  } catch (e) {
    console.log("Database isn't created, Creating & Syncing Db...");
    db.sequelize.sync().then(() => {
      initial();
    });
  }
}
