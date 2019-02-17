/**
 * BeneficiaireController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function updateNiveauEtudes(req, res) {
    var params = req.allParams().benef;

    await Beneficiaire
            .updateOne({ id: params.id })
            .set({  comprendFr: params.comprendFr,
                    aLeBac: params.aLeBac,
                    etudesSup: params.etudesSup
            })
            .then(benef => {
                sails.log.info(`BeneficiaireController - updateNiveauEtudes - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                var newNiveauEtudes = {
                    comprendFr: benef.comprendFr,
                    aLeBac: benef.aLeBac,
                    etudesSup: benef.etudesSup
                }
                return res.json(newNiveauEtudes);
            })
            .catch(error => { 
                sails.log.error(`BeneficiaireController - updateNiveauEtudes - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
            });

};