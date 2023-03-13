const express=require('express');
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(cookieParser())

//declaring a routes 
app.use(cors());
app.use('/', require('./routes/route'));

//Db Connection
const con = require("./database/connect");
con.connect(function(err) {
        if (err) console.log(err);;
        console.log("Connected!");
      });

app.listen(3001,()=>{
        console.log(`Server listening at http://localhost:3001`);
})