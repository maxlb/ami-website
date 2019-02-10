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

module.exports = async function getByID(req, res) {
    let params = req.allParams();
    var data = {}

    // Récupération du bénéficiaire et ses liaisons
    await Beneficiaire
            .findOne(params.id)
            .populate('conjoint')
            .populate('enfants')
            .populate('cotisation', { sort: 'annee DESC' })
            .populate('evenement', { sort: 'date DESC' })
            .then(benef => {
                if(benef == undefined || benef == null) {
                    throw Error(`Bénéficiaire de N° de carte ${params.id} inexistant.`)
                } else {
                    data.benefObj = benef;
                    sails.log.debug(`BeneficiaireController - getByID - Bénéficiaire ${benef.id} OK`);
                }  
            })
            .catch(error => {  
                sails.log.error(`BeneficiaireController - getByID - ERREUR : Impossible de récupérer le bénéficiaire - ${error.message}`); 
                data.error = error.message;
                return res.view('pages/profile', { data });
            });
    
    // Fonction de mise en forme de la date envoyée à la vue
    data.setFormatDate = setFormatDate;

    return res.view('pages/profile', { data });
};