const { redisClient } = require("../server");
const { sendMail } = require("../services/mail.service");
const { findByEmail, updatePassword } = require("../services/user.service");

module.exports.sendCode = async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({
      errorMessage: "Tous les champs sont obligatoires",
    });

  const email = req.body.email;

  const utilisateur = await findByEmail(email);

  if (utilisateur) {
    const code = genererCodeVerification();
    await redisClient.setEx("code_" + email, 120, code, (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion du code de vérification dans Redis :",
          err
        );
        res.status(500).json({
          errorMessage: "Impossible de génerer le code de verification",
        });
      } else {
        console.log(
          "Code de vérification inséré avec succès dans Redis :",
          codeVerification
        );
      }
    }),
      await sendMail(email, code)
        .then(
          (req.session.updatePass = utilisateur.id),
          res.status(200).json({
            message: "Envoi réussi, saisissez le code pour la validation!",
          })
        )
        .catch((err) => {
          console.log("Erreur: ", err);
          res.status(400).json({
            errorMessage: "Echec de l'envoi du mail",
          });
        });
  } else
    res.status(404).json({
      errorMessage: "Utilisateur non trouvé",
    });
};

function genererCodeVerification() {
  // Générer six chiffres aléatoires
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += Math.floor(Math.random() * 10); // Chaque chiffre est compris entre 0 et 9
  }
  return code;
}

module.exports.verifyCode = async (req, res) => {
  if (!req.body.email || !req.body.code)
    return res.status(400).json({
      errorMessage: "Tous les champs sont obligatoires",
    });

  const code = await redisClient.get("code_" + req.body.email);
  console.log("code: ", code);

  if (code && code === req.body.code) {
    res.status(200).json({
      message: "Code vérifié",
    });
  } else {
    res.status(400).json({
      errorMessage: "Code non valide",
    });
  }
};

module.exports.changePass = async (req, res) => {
  if (!req.body.password)
    return res.status(400).json({
      errorMessage: "Tous les champs sont obligatoires",
    });

  const utilisateur = await updatePassword(
    req.session.updatePass,
    req.body.password
  );

  if (utilisateur) {
    res.status(200).json({
      message: "Modification réussie",
    });
  } else
    res.status(400).json({
      errorMessage: "Echec de la modification",
    });
};
