const con=require("../database/connect");

//login 
const login=(req,res)=>{
        const {email,pass}=req.body;
        con.query("SELECT * FROM users where email='"+email+"'", function (err, result1, fields) {
                if (err) throw err;
                else if(result1!=0){
                        con.query("select * from users where email='"+email+"' and password='"+pass+"'",function(err,result2){
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
                        service:"gmail",
                        port:587,
                        secure:false,
                        auth:{
                                user:'letsscodeit@gmail.com',
                                pass:'qadmmaocnpxswqfn'
                        }
                });
                var mailOptions={
                        from:'letsscodeit@gmail.com',
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
        con.query("SELECT * FROM users where email='"+email+"'", function (err, result, fields) {
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
        con.query("UPDATE users SET password ='"+req.body.pass+"' WHERE email ='"+req.body.email+"'",function(err,result){
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
}

module.exports={login,emailSend,verifyOtp,changePassword}