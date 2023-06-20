const con=require("../database/connect");

const det=(req,res)=>{
        const email=req.query.id
        if(email==null)
        return;
        con.query("select * from employee where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        con.query("SELECT DISTINCT project.project_id,project.project_name,project.creator_id FROM project JOIN project_employee ON project.project_id = project_employee.project_id WHERE project_employee.employee_id =" +result[0].eid+" OR project.creator_id ="+result[0].eid, function(err,result1){
                                if(err) console.log(err);
                                else if(result1.length>0){
                                        const combinedResult={result,result1}
                                        const response=JSON.stringify(combinedResult);
                                        res.send(response);
                                }
                                else{
                                        res.statusMessage="No Projects Assigned!";
                                        res.send(result);
                                }
                        })
                }
        })
}

const mod=(req,res)=>{
        const email=req.query.id
        const project_id=req.query.pid;
        con.query("select * from employee where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        con.query("SELECT module.module_id, module.name, module.est_time, module.Completed_Time FROM module JOIN project ON module.project_id = project.project_id WHERE project.project_id ="+project_id, function(err,result1){
                                if(err) console.log(err);
                                else if(result1.length>0){
                                        const combinedResult={result,result1}
                                                const response=JSON.stringify(combinedResult);
                                                res.send(response);
                                }
                                else{
                                        res.statusMessage="No Modules!";
                                        res.send(result);
                                }
                        })
                }
        })
}

const saveTime=(req,res)=>{
        var mod_id=req.query.mod_id;
        var comp=req.body.Completed_Time;
        con.query("update module set Completed_time='"+comp+"' where module_id="+mod_id,function(err,result){
                if(err) console.log(err);
        })
}

const projects=(req,res)=>{
        var email=req.query.id;
        con.query("select * from employee where email='"+email+"'", function(err,result1){
                if(err) console.log(err);
                else{
                        con.query("select * from project where creator_id="+result1[0].eid, function(err,result2){
                                if(err) console.log(err);
                                else if(result2.length!=0){
                                        const combinedResult={result1,result2}
                                        const response=JSON.stringify(combinedResult);
                                        res.send(response);
                                }
                                else{
                                        res.statusMessage="No Projects!";
                                        res.send(result1);
                                }
                        })
                }
        })
}

const userData=(req,res)=>{
        var email=req.query.id;
        con.query("select * from employee where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        res.send(result);
                }
        })
}

const empList=(req,res)=>{
        con.query("select * from employee",function(err,result){
                if(err) console.log(err);
                else{
                        res.send(result);
                }
        })
}

const createProject=(req,res)=>{
        var email=req.query.id;
        con.query("select eid from employee where email='"+email+"'",function(err,result){
                if(err) console.log(err);
                else{
                        var creator_id=result[0].eid;
                        con.query("INSERT INTO `project`(`project_name`, `creator_id`) VALUES ('"+req.body.pname+"',"+creator_id+")",function(err1,result1){
                                if(err1) console.log(err);
                                else{
                                        const projectId = result1.insertId;
                                        if(req.body.modname!=null && req.body.time!=null){
                                                con.query("INSERT INTO `module`(`name`, `est_Time`,`project_id`) VALUES ('"+req.body.modname+"','"+req.body.time+"',"+projectId+")",function(err2,result2){
                                                        if(err2) console.log(err2);
                                                })
                                        }
                                        if(req.body.employeeList.length>0){
                                                employeeList=req.body.employeeList;
                                                employeeList.forEach(function (eid) {
                                                        const employeeQuery = "INSERT INTO `project_employee`(`project_id`, `employee_id`) VALUES ("+projectId+","+eid+")";
                                                        con.query(employeeQuery, function (err3, result3) {
                                                          if (err3) {
                                                            console.log(err3);
                                                            }
                                                        })
                                                });
                                        };
                                        res.send("Success");
                                }
                        })
                }
        })
}

const deleteProject=(req,res)=>{
        //console.log("not deleting");
        con.query("DELETE FROM `project` WHERE `project_id`="+req.query.id,function(err,result){
                if(err) console.log(err);
                else{
                        console.log("deleted");
                        res.send("Deleted");
                }
        })
}

const edit=(req,res)=>{
        var id=req.query.id;
       con.query("select * from project where project_id="+id,function(err,result){
        if(err) console.log(err);
        else{
                con.query("SELECT * FROM project_employee JOIN employee ON project_employee.employee_id = employee.eid WHERE project_employee.project_id = "+id,function(err1,result1){
                        if(err1) console.log(err1);
                        con.query("SELECT * FROM module WHERE project_id ="+id,function(err2,result2){
                                if(err2) console.log(err2);
                                const combinedResult={result,result1,result2}
                                const response=JSON.stringify(combinedResult);
                                res.send(response);
                        })
                })
        }
       })
}

const editProject=(req,res)=>{
        //console.log(req.body.project.project_id);
        const data=req.body;
        //console.log(data);
        const id=req.body.project.project_id;
        //console.log(id);
        //console.log("new data: "+data.modules);
        //const fieldsToUpdate={};
        con.query("SELECT * FROM project LEFT JOIN module ON project.project_id = module.project_id LEFT JOIN project_employee ON project.project_id = project_employee.project_id WHERE project.project_id ="+id,function(err1,res1){
                if(err1) console.log(err1);
                else{
                        console.log(res1);
                        console.log(res1[0].project_name);
                        //console.log("old data:"+res1[0]);
                        if (data.project.project_name && data.project.project_name !== res1[0].project_name) {
                                con.query("UPDATE `project` SET `project_name`='"+data.project.project_name+"' WHERE `project_id`="+id,function(err2,res2){
                                        if(err2) console.log(err2);
                                })
                        }
                        const newEmp = data.employees.map((employee) => employee.eid);
                        const prvsEmp = res1.map((row) => row.employee_id);
                        const newEmployeeList = [...new Set(newEmp.filter((eid) => !prvsEmp.includes(eid)))];
                        //console.log("To be added: "+newEmployeeList);
                        const prvsEmployeeList = [...new Set(prvsEmp.filter((employeeId) => !newEmp.includes(employeeId)))];
                        //console.log("To be deleted: "+prvsEmployeeList);
                        prvsEmployeeList.map((emp)=>{
                                con.query("DELETE FROM `project_employee` WHERE `employee_id`="+emp,function(err3,res3){
                                        if(err3) console.log(err3);
                                })
                        })
                        newEmployeeList.map((emp)=>{
                                con.query("INSERT INTO `project_employee`(`project_id`, `employee_id`) VALUES ("+id+","+emp+")",function(err4,res4){
                                        if(err4) console.log(err4);
                                })
                        })
                        const changedData = [];
                        const newDataWithoutModuleId = [];
                        const removedData=[];

                        for (const newItem of data.modules) {
                                // Check if the newItem has module_id property
                                //console.log(newItem);
                                if ('module_id' in newItem) {
                                  // Find the corresponding item in res1 based on module_id
                                  const oldItem = res1.find(
                                    (item) => item.module_id === newItem.module_id
                                  );
                              
                                  // If oldItem exists, compare properties
                                  if (oldItem) {
                                    const changedProperties = {};
                              
                                    // Compare each property of the newItem with oldItem
                                    for (const key in newItem) {
                                      if (newItem[key] !== oldItem[key]) {
                                        changedProperties[key] = newItem[key];
                                      }
                                    }
                              
                                    // If any properties have changed, add them to the changedData list
                                    if (Object.keys(changedProperties).length > 0) {
                                      changedData.push({
                                        newItem
                                      });
                                    }
                                  }
                                  else{
                                        console.log();
                                  } 
                                }
                                else{
                                        newDataWithoutModuleId.push(newItem);
                                }
                              }
                              for (const oldItem of res1) {
                                const removedItem = data.modules.find((item) => item.module_id === oldItem.module_id);
                              
                                if (!removedItem) {
                                  removedData.push({
                                    module_id: oldItem.module_id,
                                    status: 'removed'
                                  });
                                }
                              }
                              const distinctModuleIds = [...new Set(removedData.map(item => item.module_id))];                        
                        console.log('Removed Data:', distinctModuleIds);
                        console.log('Changed Data:', changedData);
                        console.log('New Data without module_id:', newDataWithoutModuleId);

                        distinctModuleIds.map((item)=>{
                                con.query("DELETE FROM `module` WHERE `module_id`="+item,function(err5,res5){
                                        if(err5) console.log(err5);
                                })
                        })
                        
                        newDataWithoutModuleId.map((item)=>{
                                con.query("INSERT INTO `module`(`name`, `est_Time`, `Completed_Time`, `Completed`, `project_id`) VALUES ('"+item.name+"','"+item.est_Time+"','"+item.Completed_Time+"',"+item.Completed+","+id+")",function(err6,res6){
                                        if(err6) console.log(err6);
                                })
                        })
                        changedData.map((item)=>{
                                console.log(item);
                                con.query("UPDATE `module` SET `name`='"+item.newItem.name+"',`est_Time`='"+item.newItem.est_Time+"',`Completed_Time`='"+item.newItem.Completed_Time+"',`Completed`="+item.newItem.Completed+",`project_id`="+item.newItem.project_id+" WHERE `module_id`="+item.newItem.module_id,function(err7,res7){
                                        if(err7) console.log(err7);
                                })
                        })
                }
                //console.log("working");
                res.statusMessage="Success";
                res.send();
        })
        res.send();
}

module.exports={det,mod,saveTime,projects,userData,empList,createProject,deleteProject,edit,editProject}