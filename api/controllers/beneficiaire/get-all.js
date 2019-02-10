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

async function getSituation(idBenef, isMineur, isFr) {
    var situationDetectee = "";
    var lastDecision = "";

    var events = await Evenement
                        .find({beneficiaireConcerne: idBenef})
                        .sort('date ASC')
                        .catch(error => {  
                            sails.log.error(`BeneficiaireController - getSituation - ERREUR : Bénéficiaire ID : ${idBenef} - ${error.message}`);
                            throw Error(error);
                        });
        
    if(events.length == 0) {
        situationDetectee = "Inconnu - Autre";
    } else {
        events.forEach(event => {
            if (event.decision !== null && event.decision !== "") {
                lastDecision = event.decision;
            }
        });

        switch (lastDecision) {
            case "Rejet":
                situationDetectee = "Débouté du droit d'asile";
                break;
            case "Statut de réfugié":
                situationDetectee = "Réfugié";
                break;
            case "Protection subsidiaire":
                situationDetectee = "Protection subsidiaire";
                break;
            case "Confirmation de l’OQTF":
                situationDetectee = "Débouté - OQTF confirmée";
                break;
            case "Annulation de l’OQTF":
                situationDetectee = "Débouté - OQTF annulée";
                break;
            case "Annulation de l’OQTF et condamnation de la préfecture":
                situationDetectee = "Demandeur d'asile - En attente de réexamen";
                break;
            default:
                situationDetectee = "Demandeur d'asile";
                break;
        }
    }

    if(isMineur) {
        situationDetectee = "Mineur";
    } else if (isFr) {
        situationDetectee = "Nationalité Française";
    }
    
    return situationDetectee;
}

module.exports = async function getAll(req, res) {

    var data = {};
    data.benefs = [];
    var annee = new Date().getFullYear();

    // Récupération des bénéficiaires
    var beneficiaires = await Beneficiaire
                                .find()
                                .sort('id ASC')
                                .catch(error => {  
                                    sails.log.error(`BeneficiaireController - getAll - ERREUR : Impossible de récupérer les bénéficiaires - ${error.message}`); 
                                    return res.view('pages/allBeneficiaires', { data });
                                });
    sails.log.info(`BeneficiaireController - getAll - ${beneficiaires.length} bénéficiaires récupérés`);

    // Mise en forme des bénéficiaires pour la vue
    for (let i = 0 ; i < beneficiaires.length ; i++) {
        var benef = beneficiaires[i];
        sails.log.debug(`BeneficiaireController - getAll - Bénéficiaire ID : ${benef.id}`);
        var benefObj= {
            numCarte: benef.id,
            nom: benef.nom,
            prenom: benef.prenom,
            dateNaissance: benef.dateNaissance,
            nationalite: benef.nationalite,
            sexe: benef.genre,
            telephone: benef.telephone,
            entreeFrance: benef.dateEntreeFrance,
            inscription: benef.dateInscription,
            cotisation: 0,
            situationAdministrative: "Demandeur d'asile"
        };

        // Cotisation
        await Cotisation
                .find({annee: annee, payeur: benef.id})
                .then(cot => {
                    if(!cot[0]) {
                        throw Error(`Cotisation inexistante pour ${annee}.`)
                    } else {
                        benefObj.cotisation = cot[0].montant;
                        sails.log.debug(`BeneficiaireController - getAll - Cotisation OK`);
                    }
                })
                .catch(error => {  
                    sails.log.error(`BeneficiaireController - getAll - ERREUR - Cotisation KO - ${error.message}`); 
                    benefObj.cotisation = 'NP -';
                });

        // Situation Administrative 
        await getSituation(benefObj.numCarte, (benefObj.dateNaissance.getFullYear() >= annee - 18 ), (benefObj.nationalite == "Française"))
                .then(sit => {
                    benefObj.situationAdministrative = sit;
                    sails.log.debug(`BeneficiaireController - getAll - Situation OK`);
                })
                .catch(error => {  
                    sails.log.error(`BeneficiaireController - getAll - ERREUR - Situation KO - ${error.message}`); 
                    benefObj.situationAdministrative = '?';
                });

        // On les ajoute à la liste
        data.benefs.push(benefObj);
        
    }

    // Fonction de mise en forme de la date envoyée à la vue
    data.setFormatDate = setFormatDate;

    return res.view('pages/allBeneficiaires', { data });
};