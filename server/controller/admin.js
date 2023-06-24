const con=require("../database/connect");
const bcrypt=require("bcrypt");

const users=(req,res)=>{
        con.query("select * from employee", function(err,res1){
                if(err) console.log(err);
                else if(res1.length>0){
                        res.send(res1);                
                }
                else{
                        res.statusMessage="None";
                        res.send();
                }
        })
}

const deleteEmp=(req,res)=>{
        //console.log(req.query.id);
        con.query("DELETE FROM `employee` WHERE eid="+req.query.id,function(err3,res3){
                if(err3) console.log(err3);
                else{
                        res.send("Deleted");
                }
        })
}

const editUser=(req,res)=>{
        //console.log(req.body.project_manager);
        con.query("UPDATE `employee` SET `email`='"+req.body.email+"',`Name`='"+req.body.Name+"',`Contact_no`="+req.body.Contact_no+",`Designation`='"+req.body.Designation+"',`project_manager`="+req.body.project_manager+" WHERE eid="+req.body.eid,function(err,result){
                if(err) console.log(err);
                else{
                        res.send("updated");
                }
        })
}

const addUser=(req,res)=>{
        const roleValue = req.body.role === "project_manager" ? 1 : 0;
        // Generate a salt with a cost factor of 10
        bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                console.error('Error generating salt:', err);
                res.statusMessage = "Error";
                return res.send();
                }
                // Hash the password using the salt
                bcrypt.hash("demo", salt, function(err, hash) {
                        if (err) {
                                console.error('Error hashing password:', err);
                                res.statusMessage = "Error";
                                return res.send();
                        }
                        con.query("INSERT INTO `employee`(`email`, `password`, `Name`, `Dob`, `Gender`, `Contact_no`, `Designation`, `project_manager`) VALUES ('"+req.body.email+"','"+hash+"','"+req.body.name+"','"+req.body.dob+"','"+req.body.gender+"',"+req.body.contact+",'"+req.body.designation+"',"+roleValue+")",function(err,result){
                                if(err) console.log(err);
                                else{
                                        res.send("added");
                                }
                        })
                })
        })
}

const stats=(req,res)=>{
        con.query("SELECT COUNT(*) as employeeCount  from `employee` WHERE 1",function(err1,res1){
                if(err1) console.log(err1);
                else{
                        const employeeCount = res1[0].employeeCount;
                        //console.log("Employee Count:", employeeCount);                        
                        con.query("SELECT COUNT(*) AS totalProjects FROM `project`", function (err2, res2) {
                                if (err2) {
                                  console.log(err2);
                                } else {
                                  const totalProjects = res2[0].totalProjects;
                                  //console.log("Total Projects:", totalProjects);
                        
                                  con.query("SELECT COUNT(*) AS completedProjects FROM `project` WHERE Completed = '1'", function (err3, res3) {
                                    if (err3) {
                                      console.log(err3);
                                    } else {
                                      const completedProjects = res3[0].completedProjects;
                                      //console.log("Completed Projects:", completedProjects);
                        
                                      const ongoingProjects = totalProjects - completedProjects;
                                      //console.log("Ongoing Projects:", ongoingProjects);

                                      const combinedResult={employeeCount,totalProjects,completedProjects,ongoingProjects}
                                      const response=JSON.stringify(combinedResult);
                                      
                                      res.send(response);
                                    }
                                  });
                                }
                              });
                }
        })
}

module.exports={users,deleteEmp,editUser,addUser,stats}