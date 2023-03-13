const express=require("express");
const router=express.Router();
const auth=require("../controller/auth");
const contr=require("../controller/control");
const app=express();
const bodyParser=require("body-parser")
const cors=require("cors");

//router.post("/reg",contr.register)
app.use(cors());

router.get("/dashboard",contr.det)
router.get("/module",contr.mod)

router.post("/login",auth.login)
router.post("/emailSend",auth.emailSend)
router.post("/verifyOtp",auth.verifyOtp)
router.post("/changePassword",auth.changePassword)

router.post("/module",contr.saveTime)


module.exports=router