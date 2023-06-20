const express=require("express");
const router=express.Router();
const auth=require("../controller/auth");
const contr=require("../controller/control");
const admin = require("../controller/admin")
const app=express();
const cors=require("cors");

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

//admin
router.get("/users",admin.users)
router.delete("/deleteEmp",admin.deleteEmp)
router.put("/editUser",admin.editUser)
router.post("/addUser",admin.addUser)
router.get("/stats",admin.stats)

//authentication
router.post("/reg",auth.reg)
router.post("/login",auth.login)
router.post("/emailSend",auth.emailSend)
router.post("/verifyOtp",auth.verifyOtp)
router.post("/changePassword",auth.changePassword)


module.exports=router