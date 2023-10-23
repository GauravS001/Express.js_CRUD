const express = require("express");
const app = express();
const path = require("path")
const mongo = require("mongoose")
const port = 3000;
var morgan = require("morgan")

DB_URL = 'mongodb://0.0.0.0/m'

mongo.connect(DB_URL);
const conn = mongo.connection;

conn.on('connected', ()=>{
  console.log("Connected to Mongo");
})
conn.on('error',()=>{
  console.log("Error connecting Mongo");
})

const userRoutes = require("./routes/UserRoutes");
const movieRoutes = require("./routes/MovieRoutes");

app.use(express.json());
app.use(morgan("short"));
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

var statPath = path.resolve(__dirname, "static");
app.use(express.static(statPath));













//Error Page not Found
app.use(function(req,res){
  res.status(404).send("Page not found!");
})
  

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})