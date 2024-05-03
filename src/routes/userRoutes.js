const express = require('express');
const router = express.Router();
const racineProjet = process.cwd();

router.get("/landing", (req, res)=>{
    if(req.session.idUtilisateur)
    res.sendFile(racineProjet+'/src/views/pages/landing.html');
    else res.redirect('/auth/login');
})

router.get("/", (req, res)=>{
    res.redirect('/auth/login');
})

router.get("/school", (req, res)=>{
    res.sendFile(racineProjet+'/src/views/pages/index-course.html');
})
router.get("/course-detail", (req, res)=>{
    res.sendFile(racineProjet+'/src/views/pages/course-details.html');
})

module.exports = router;