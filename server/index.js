const express=require('express');
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");

//middleware
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }))

//app.use(cookieParser())

//declaring a routes 
app.use(cors());
app.use('/', require('./routes/route'));

//Db Connection
const con = require("./database/connect");
con.connect(function(err) {
        if (err) console.log(err);
        else
                console.log("Connected!");
      });

const port = process.env.PORT || 3001;
app.listen(port,()=>{
        console.log(`Server listening at ${port}`);
})