/**
 * BeneficiaireController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function updateCoordonnees(req, res) {
    var params = req.allParams().benef;

    await Beneficiaire
            .updateOne({ id: params.id })
            .set({  adresse: params.adresse,
                    codePostal: params.codePostal,
                    ville: params.ville,
                    mail: params.mail,
                    telephone: params.telephone,
                    numAvocat: params.numAvocat,
                    numAssistSociale: params.numAssistSociale,
                    numAsso: params.numAsso
            })
            .then(benef => {
                sails.log.info(`BeneficiaireController - updateCoordonnees - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                var newCoordonnees = {
                    adresse: benef.adresse,
                    codePostal: benef.codePostal,
                    ville: benef.ville,
                    mail: benef.mail,
                    telephone: benef.telephone,
                    numAvocat: benef.numAvocat,
                    numAssistSociale: benef.numAssistSociale,
                    numAsso: benef.numAsso
                }
                return res.json(newCoordonnees);
            })
            .catch(error => { 
                sails.log.error(`BeneficiaireController - updateCoordonnees - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
            });

};