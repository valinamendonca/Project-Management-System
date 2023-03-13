const con=require("../database/connect");

const det=(req,res)=>{
        const email=req.query.id
        //console.log(email);
        //console.log(req.query.id);
        con.query("select * from users where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        con.query("select * from project where emp1="+result[0].eid+" || emp2="+result[0].eid+" || emp3="+result[0].eid+" || emp4="+result[0].eid+" || emp5="+result[0].eid, function(err,result1){
                                console.log(result1[0].pid);
                                if(err) console.log(err);
                                else if(result1.length>0){
                                        //console.log(result1[0].name);
                                        const combinedResult={result,result1}
                                        const response=JSON.stringify(combinedResult);
                                        res.send(response);
                                }
                                else{
                                        //console.log("nil");
                                        res.statusMessage="No Projects Assigned!";
                                        res.send(result);
                                }
                        })
                        //console.log(result[0].eid);
                        //res.send(result);
                }
        })
}

const mod=(req,res)=>{
        const email=req.query.id
        const project_id=req.query.pid;
        con.query("select * from users where email='"+email+"'", function(err,result){
                if(err) console.log(err);
                else{
                        /*
                        con.query("select * from module_details where module_id in (select mod1,mod2,mod3,mod4,mod5 from project where pid="+project_id+")",function(err,result2){
                                console.log(result2);
                        })
                        */
                
                        con.query("select mod1,mod2,mod3,mod4,mod5 from project where pid="+project_id, function(err,result1){
                                //console.log();
                                if(err) console.log(err);
                                else if(result1[0].mod1!=null||result1[0].mod2!=null||result1[0].mod3!=null||result1[0].mod4!=null||result1[0].mod5!=null){
                                        con.query("select * from module_details where module_id in ("+result1[0].mod1+", "+result1[0].mod2+", "+result1[0].mod3+", "+result1[0].mod4+", "+result1[0].mod5+")",function(err,result2){
                                                if(err) console.log(err);
                                                //console.log(result2);
                                                const combinedResult={result,result2}
                                                const response=JSON.stringify(combinedResult);
                                                res.send(response);
                                        })
                                        //console.log(result1[0].name);
                                        
                                }
                                else{
                                        console.log("nil");
                                        res.statusMessage="No Modules!";
                                        res.send(result);
                                }
                        })
                        
                        //console.log(result[0].eid);
                        //res.send(result);
                }
        })
}


const saveTime=(req,res)=>{
        var mod_id=req.query.mod_id;
        //var Completed_Time=time(req.body.Completed_Time);
        console.log(mod_id);
        console.log(req.query);
        var comp=req.body.Completed_Time;
        //console.log(req.body);
        //console.log(comp);

        //var time=TIME(comp);
        //console.log(time);
        //console.log(mod_id);
        //console.log(Completed_Time);
        //console.log(req.body);
        //var updateTime=time('00:00:01');
        //console.log(updateTime);
        
        con.query("update module_details set Completed_time='"+comp+"' where module_id="+mod_id,function(err,result){
                if(err) console.log(err);
                else{
                        console.log("done");
                }
        })
        
}

module.exports={det,mod,saveTime}