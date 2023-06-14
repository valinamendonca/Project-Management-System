const express=require("express");
const router=express.Router();
const auth=require("../controller/auth");
const contr=require("../controller/control");
const app=express();
const cors=require("cors");

//router.post("/reg",contr.register)
app.use(cors());

//employee
router.get("/dashboard",contr.det)
router.get("/module",contr.mod)
router.post("/module",contr.saveTime)

//project-manager
router.get("/projects",contr.projects)
router.get("/userData",contr.userData)
router.get("/empList",contr.empList)
router.post("/createProject",contr.createProject)
router.delete("/deleteProject",contr.deleteProject)
router.get("/editProject",contr.edit)
router.put("/editProjects",contr.editProject)


//authentication
router.post("/login",auth.login)
router.post("/emailSend",auth.emailSend)
router.post("/verifyOtp",auth.verifyOtp)
router.post("/changePassword",auth.changePassword)


module.exports=router