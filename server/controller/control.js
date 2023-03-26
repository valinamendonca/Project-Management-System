const con=require("../database/connect");

const det=(req,res)=>{
        const email=req.query.id
        if(email==null)
        return;
        con.query("select * from users where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        con.query("select * from project where emp1="+result[0].eid+" || emp2="+result[0].eid+" || emp3="+result[0].eid+" || emp4="+result[0].eid+" || emp5="+result[0].eid, function(err,result1){
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
        con.query("select * from users where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        con.query("select mod1,mod2,mod3,mod4,mod5 from project where pid="+project_id, function(err,result1){
                                if(err) console.log(err);
                                else if(result1[0].mod1!=null||result1[0].mod2!=null||result1[0].mod3!=null||result1[0].mod4!=null||result1[0].mod5!=null){
                                        con.query("select * from module_details where module_id in ("+result1[0].mod1+", "+result1[0].mod2+", "+result1[0].mod3+", "+result1[0].mod4+", "+result1[0].mod5+")",function(err,result2){
                                                if(err) console.log(err);
                                                const combinedResult={result,result2}
                                                const response=JSON.stringify(combinedResult);
                                                res.send(response);
                                        })                                        
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
        con.query("update module_details set Completed_time='"+comp+"' where module_id="+mod_id,function(err,result){
                if(err) console.log(err);
                else{
                        console.log("done");
                }
        })
}

const projects=(req,res)=>{
        var email=req.query.id;
        con.query("select * from users where email='"+email+"'", function(err,result1){
                if(err) console.log(err);
                else{
                        con.query("select * from project where creator="+result1[0].eid, function(err,result2){
                                if(err) console.log(err);
                                else if(result2.length!=0){
                                        //console.log(result2.length);
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
        con.query("select * from users where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        res.send(result);
                }
        })
}

const empList=(req,res)=>{
        con.query("select * from users",function(err,result){
                if(err) console.log(err);
                else{
                        console.log(result);
                        res.send(result);
                }
        })
}
module.exports={det,mod,saveTime,projects,userData,empList}