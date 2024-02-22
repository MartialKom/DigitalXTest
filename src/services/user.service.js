const bcrypt = require("bcrypt");
const { Utilisateur } = require("../entities/user.model");

//******************Enregistrer un utilisateur********************
module.exports.save = async (username, email, password) => {
  // Générer un sel pour le hachage
  const sel = await bcrypt.genSalt(10);

  // Hacher le mot de passe avec le sel et retourner la valeur hachée
  const hash = await bcrypt.hash(password, sel);

  return await Utilisateur.create({
    username: username,
    email: email,
    password: hash,
  });
};

//******************Authentifier un utilisateur********************
module.exports.loginService = async (username, password) => {
  var utilisateur = await Utilisateur.findOne({
    where: { username: username },
  });

  if (utilisateur) {
    const isAuth = await bcrypt.compare(password, utilisateur.password);

    if (isAuth) return utilisateur;
    else return undefined;
  } else return undefined;
};

module.exports.findByEmail = async (email) => {
  var utilisateur = await Utilisateur.findOne({
    where: {email: email},
  });

  return utilisateur;
}

module.exports.updatePassword = async(id, password) => {

  const utilisateur = await Utilisateur.findByPk(id);

  if(!utilisateur){
    return utilisateur;
  }

  const sel = await bcrypt.genSalt(10);

  // Hacher le mot de passe avec le sel et retourner la valeur hachée
  const hash = await bcrypt.hash(password, sel);

  utilisateur.password = hash;

  return await utilisateur.save();
}
