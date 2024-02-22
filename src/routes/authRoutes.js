const express = require('express');
const { saveUser, login } = require('../controllers/user.controller');
const { sendCode, verifyCode, changePass } = require('../controllers/resetPass.controller');
const router = express.Router();
const racineProjet = process.cwd();

router.get("/login", (req, res)=>{
    res.sendFile(racineProjet+'/src/views/pages/login.html');
})

router.post("/login",login)


router.get("/register", (req, res)=>{
    res.sendFile(racineProjet+'/src/views/pages/register.html');
})

router.post("/register",saveUser)

router.post("/resetPass/sendCode", sendCode)
router.post("/resetPass/verifyCode", verifyCode)
router.get("/resetPass", (req, res)=>{
    res.sendFile(racineProjet+'/src/views/pages/resetPassword.html');
})

router.put("/changePassword", changePass)
router.get("/changePassword",(req, res)=>{
    if(!req.session.updatePass) res.redirect('/auth/login');
    else res.sendFile(racineProjet+'/src/views/pages/changePassword.html')
})

router.get("/logout", (req, res)=>{
    req.session.destroy();
    res.redirect('/auth/login');
})

module.exports = router;