const { save, loginService } = require("../services/user.service");


module.exports.saveUser = async (req, res) => {

    if(!req.body.username || !req.body.email || !req.body.password ) return res.status(400).json({
        errorMessage: "Tous les champs sont obligatoires"
    });

    console.log("Email: "+req.body.email);

    await save(req.body.username, req.body.email, req.body.password).then((utilisateur)=>{
        console.log("Enregistrement réussie");
        req.session.idUtilisateur = utilisateur.id;
        return res.status(201).json(utilisateur);
    }).catch((err)=>{
        console.log("Echec de l'enregistrement..."+err);
        res.status(400).json({
            errorMessage: err
        })
    });
    
};

module.exports.login = async (req, res) => {
    console.log("request", req.body)
    if(!req.body.username || !req.body.password ) return res.status(400).json({
        errorMessage: "Tous les champs sont obligatoires"
    }); 

    res.setHeader('Content-Type', 'application/json');
    loginService(req.body.username, req.body.password).then((utilisateur)=>{
        if(utilisateur){
            console.log("Utilisateur trouvé");
            req.session.idUtilisateur = utilisateur.id;
            res.status(200).json(utilisateur);
        } else {
            console.log("l'utilisateur n'existe pas");
            res.status(404).json({
                errorMessage: "l'utilisateur n'existe pas"
            })
        }

    }).catch((err)=>{
        console.log("Utilisateur non trouvé: "+err);
        res.status(400).json({
            errorMessage: err
        })
    });

};

