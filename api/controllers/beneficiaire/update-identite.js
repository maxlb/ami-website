/**
 * BeneficiaireController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var setFormatDate = function(date) {
    if (!date) {
        return "";
    } else {
        var j = date.getDate();
        var m = date.getMonth() + 1;
        var a = date.getFullYear();

        j = (j < 10 ) ? "0" + j : j;
        m = (m < 10 ) ? "0" + m : m;

        return `${j}/${m}/${a}`;
    }
};

var getDateValue = function(date){
    if (date != "" && date != null) {
        var splitDate = date.split('/');
        return new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]);
    }
    return null;
}

module.exports = async function updateIdentite(req, res) {
    var params = req.allParams().benef;

    await Beneficiaire
            .updateOne({ id: params.id })
            .set({  prenom: params.prenom,
                    nom: params.nom,
                    nomJeuneFille: params.nomJeuneFille,
                    dateNaissance: getDateValue(params.dateNaissance),
                    nationalite: params.nationalite,
                    paysNaissance: params.paysNaissance
            })
            .then(benef => {
                sails.log.info(`BeneficiaireController - updateIdentite - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                var newIdentite = {
                    prenom: benef.prenom,
                    nom: benef.nom,
                    nomJeuneFille: benef.nomJeuneFille,
                    dateNaissance: setFormatDate(benef.dateNaissance),
                    nationalite: benef.nationalite,
                    paysNaissance: benef.paysNaissance
                }
                return res.json(newIdentite);
            })
            .catch(error => { 
                sails.log.error(`BeneficiaireController - updateIdentite - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
            });

};