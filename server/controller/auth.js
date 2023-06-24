const con=require("../database/connect");
const bcrypt= require("bcrypt");

//register
const reg=()=>{

}

//login 
const login=(req,res)=>{
        console.log(req.body);
        const {email,pass}=req.body;
        //console.log(password);
        con.query("SELECT password FROM employee where email='"+email+"'", function (err, result1, fields) {
                //console.log(result1);
                if (err) throw err;
                else if(result1.length>0){
                        const hashedPassword = result1[0].password;
                        // Compare the entered password with the hashed password
                        //console.log(password);
                        //console.log(hashedPassword);
                        bcrypt.compare(pass, hashedPassword, function(err, match) {
                                //console.log(password);
                                //console.log(hashedPassword);
                                if (err) {
                                console.error('Error comparing passwords:', err);
                                res.statusMessage = "Error";
                                return res.send();
                                }

                                if (match) {
                                // Passwords match, login successful
                                res.statusMessage = "Logged in successfully!!!";
                                res.send();
                                } else {
                                // Passwords don't match, login failed
                                res.statusMessage = "Wrong credentials!";
                                res.send();
                                }
                        });
                        /*
                        con.query("select * from employee where email='"+email+"' and password='"+pass+"'",function(err,result2){
                                if (err) throw err;
                                else if(result2!=0){
                                        res.statusMessage="Logged in successfully!!!";
                                        res.send();
                                }
                                else{
                                        res.statusMessage="Wrong credentials!";
                                        res.send();
                                }
                        })
                        */
                        
                }
                else if(email=="admin" && pass=="admin"){
                        res.statusMessage="Admin";
                        res.send();
                }
                else{
                        res.statusMessage="User does not exist!!!";
                        res.send();
                }
        })
}

//verify email
const emailSend=(req,res)=>{

        //function to send mail
        const mailer=(email,otp)=>{
                var nodemailer=require('nodemailer');
                var transporter=nodemailer.createTransport({
                        service: process.env.EMAIL_PROVIDER,
                        port:587,
                        secure:false,
                        auth:{
                                user:process.env.API_EMAIL,
                                pass:process.env.API_KEY
                        }
                });
                var mailOptions={
                        from:process.env.API_EMAIL,
                        to:email,
                        subject:'Otp for Reseting Password',
                        text:'Use this Otp: '+otp
                };
                transporter.sendMail(mailOptions,function(error,info){
                        if(error)
                                console.log(error);
                        else
                                console.log('Email send to '+email);
                });
        }

        const email=req.body.email;
        con.query("SELECT * FROM employee where email='"+email+"'", function (err, result, fields) {
                if(err) console.log(err);
                else if(result!=0){
                        let otpCode=Math.floor((Math.random()*10000+1));
                        con.query("insert into otp (email,code,expiry) values ('"+email+"',"+otpCode+","+new Date().getTime()+300*1000+")",function (err, result, fields){
                                if(err) console.log(err);
                                else{
                                        mailer(email,otpCode)
                                        res.statusMessage="Email Found!"
                                        res.send();
                                }
                        })
                }
                else{
                        res.statusMessage="Email Not Found!"
                        res.send()
                }
        })
} 

//verify otp
const verifyOtp=async(req,res)=>{
        con.query("SELECT * FROM otp where email='"+req.body.email+"' and code="+req.body.otp, function (err, result, fields) {
                if(err) console.log(err);
                else if(result!=0){
                        let currentTime=new Date().getTime();
                        let diff=result.expiry-currentTime;
                        if(diff<0){
                                res.statusMessage="Expired!"
                                res.send();
                        }
                        else{
                                res.statusMessage="Otp Verified!"
                                res.send();
                        }
                }
                else{
                        res.statusMessage="Incorrect!"
                        res.send();
                }
        })
}
        

//changing password
const changePassword=async(req,res)=>{
        if(req.body.pass!=req.body.confirm){
                res.statusMessage="Different"
                res.send();
        };
        // Generate a salt with a cost factor of 10
        bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                console.error('Error generating salt:', err);
                res.statusMessage = "Error";
                return res.send();
                }
                // Hash the password using the salt
                bcrypt.hash(req.body.pass, salt, function(err, hash) {
                        if (err) {
                                console.error('Error hashing password:', err);
                                res.statusMessage = "Error";
                                return res.send();
                        }
                        con.query("UPDATE employee SET password ='"+hash+"' WHERE email ='"+req.body.email+"'",function(err,result){
                                if(err) console.log(err);
                                else if(result!=0){
                                        res.statusMessage="Successful"
                                        res.send();
                                }
                                else{
                                        res.statusMessage="Error"
                                        res.send();
                                }
                        })
                })
        })
}

module.exports={login,emailSend,verifyOtp,changePassword,reg}