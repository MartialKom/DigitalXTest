const express = require('express');
const router = express.Router();
const racineProjet = process.cwd();

router.get("/landing", (req, res)=>{
    if(req.session.idUtilisateur)
    res.sendFile(racineProjet+'/src/views/pages/landing.html');
    else res.redirect('/auth/login');
})

module.exports = router;