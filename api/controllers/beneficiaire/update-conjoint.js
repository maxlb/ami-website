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

module.exports = async function updateConjoint(req, res) {

    var situationSansConjointValues = ['Célibataire', 'Veuf.ve' ];
    var situationAvecConjointValues = ['Marié.e', 'Pacsé.e', 'Concubin.e'];

    var params = req.allParams().benef;

    // Récupération du bénéficiaire et ses liaisons
    await Beneficiaire
            .findOne(params.id)
            .then(async function(benef) {
                if(benef == undefined || benef == null) {
                    throw Error(`Bénéficiaire de N° de carte ${params.id} inexistant.`)
                } else {
                    sails.log.info(`BeneficiaireController - updateConjoint - Mise à jour de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id})...`);
                    
                    var conjointAvant = situationAvecConjointValues.includes(benef.situation);
                    var pasConjointAvant = situationSansConjointValues.includes(benef.situation);
                    var conjointApres = situationAvecConjointValues.includes(params.situation);
                    var pasConjointApres = situationSansConjointValues.includes(params.situation);

                    // Pas de conjoint --> Pas de conjoint
                    if ( pasConjointAvant && pasConjointApres ) {
                        await Beneficiaire
                                .updateOne({ id: params.id })
                                .set({  situation: params.situation,
                                        dateSituation: null
                                })
                                .then(benef => {
                                    sails.log.info(`BeneficiaireController - updateConjoint - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                                    var newConjoint = {
                                        situation: benef.situation,
                                        dateSituation: '',
                                        prenomConjoint: '',
                                        nomConjoint: '',
                                        dateNaissanceConjoint: '',
                                        resideEnFranceConjoint: '',
                                        dateEntreeFranceConjoint: '',
                                        situationAdministrativeConjoint: ''
                                    }
                                    return res.json(newConjoint);
                                })
                                .catch(error => { 
                                    sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                                    return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                });

                    // Avec conjoint --> Avec conjoint
                    } else if ( conjointAvant && conjointApres ) {
                        sails.log.info(`BeneficiaireController - updateConjoint - Conjoint déjà existant : mise à jour du conjoint...`);
                        await Conjoint
                                .updateOne({ beneficiaireLie: params.id })
                                .set({  prenom: params.prenomConjoint,
                                        nom: params.nomConjoint,
                                        dateNaissance: getDateValue(params.dateNaissanceConjoint),
                                        resideEnFrance: params.resideEnFranceConjoint,
                                        dateEntreeFrance: getDateValue(params.dateEntreeFranceConjoint),
                                        situationAdministrative: params.situationAdministrativeConjoint
                                })
                                .then(async function(conjoint) {
                                    sails.log.info(`BeneficiaireController - updateConjoint - Mise à jour réussie de ${conjoint.prenom} ${conjoint.nom} (Conjoint de ${conjoint.beneficiaireLie}).`);
                                    await Beneficiaire
                                            .updateOne({ id: params.id })
                                            .set({  situation: params.situation,
                                                    dateSituation: getDateValue(params.dateSituation)
                                            })
                                            .then(benef => {
                                                sails.log.info(`BeneficiaireController - updateConjoint - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                                                var newConjoint = {
                                                    situation: benef.situation,
                                                    dateSituation: setFormatDate(benef.dateSituation),
                                                    prenomConjoint: conjoint.prenom,
                                                    nomConjoint: conjoint.nom,
                                                    dateNaissanceConjoint: setFormatDate(conjoint.dateNaissance),
                                                    resideEnFranceConjoint: conjoint.resideEnFrance,
                                                    dateEntreeFranceConjoint: setFormatDate(conjoint.dateEntreeFrance),
                                                    situationAdministrativeConjoint: conjoint.situationAdministrative
                                                }
                                                return res.json(newConjoint);
                                            })
                                            .catch(error => { 
                                                sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                                                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                            });
                                })
                                .catch(error => { 
                                    sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de mettre à jour un conjoint (N°Carte ${params.id}) - ${error}`); 
                                    return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                });

                    // Avec conjoint --> Sans conjoint
                    } else if ( conjointAvant && pasConjointApres ) {
                        await Conjoint
                                .destroyOne({ beneficiaireLie: params.id })
                                .then(async function(conjoint) {
                                    sails.log.info(`BeneficiaireController - updateConjoint - Suppression réussie de ${conjoint.prenom} ${conjoint.nom} (Conjoint de ${conjoint.beneficiaireLie}).`);
                                    await Beneficiaire
                                            .updateOne({ id: params.id })
                                            .set({  situation: params.situation,
                                                    dateSituation: null
                                            })
                                            .then(benef => {
                                                sails.log.info(`BeneficiaireController - updateConjoint - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                                                var newConjoint = {
                                                    situation: benef.situation,
                                                    dateSituation: '',
                                                    prenomConjoint: '',
                                                    nomConjoint: '',
                                                    dateNaissanceConjoint: '',
                                                    resideEnFranceConjoint: '',
                                                    dateEntreeFranceConjoint: '',
                                                    situationAdministrativeConjoint: ''
                                                }
                                                return res.json(newConjoint);
                                            })
                                            .catch(error => { 
                                                sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                                                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                            });
                                })
                                .catch(error => { 
                                    sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de supprimer un conjoint (N°Carte ${params.id}) - ${error}`); 
                                    return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                });
                    
                    // Sans conjoint --> Avec conjoint
                    } else if ( pasConjointAvant && conjointApres ) {
                        
                        await Conjoint
                                .create({   
                                    beneficiaireLie: params.id,
                                    prenom: params.prenomConjoint,
                                    nom: params.nomConjoint,
                                    dateNaissance: getDateValue(params.dateNaissanceConjoint),
                                    resideEnFrance: params.resideEnFranceConjoint,
                                    dateEntreeFrance: getDateValue(params.dateEntreeFranceConjoint),
                                    situationAdministrative: params.situationAdministrativeConjoint 
                                })
                                .fetch()
                                .then(async function(conjoint) {
                                    sails.log.info(`BeneficiaireController - updateConjoint - Création réussie de ${conjoint.prenom} ${conjoint.nom} (Conjoint de ${conjoint.beneficiaireLie}).`);
                                    await Beneficiaire
                                            .updateOne({ id: params.id })
                                            .set({  situation: params.situation,
                                                    dateSituation: getDateValue(params.dateSituation)
                                            })
                                            .then(benef => {
                                                sails.log.info(`BeneficiaireController - updateConjoint - Mise à jour réussie de ${benef.prenom} ${benef.nom} (N°Carte ${benef.id}).`);
                                                var newConjoint = {
                                                    situation: benef.situation,
                                                    dateSituation: setFormatDate(benef.dateSituation),
                                                    prenomConjoint: conjoint.prenom,
                                                    nomConjoint: conjoint.nom,
                                                    dateNaissanceConjoint: setFormatDate(conjoint.dateNaissance),
                                                    resideEnFranceConjoint: conjoint.resideEnFrance,
                                                    dateEntreeFranceConjoint: setFormatDate(conjoint.dateEntreeFrance),
                                                    situationAdministrativeConjoint: conjoint.situationAdministrative
                                                }
                                                return res.json(newConjoint);
                                            })
                                            .catch(error => { 
                                                sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de mettre à jour un bénéficiaire (N°Carte ${params.id}) - ${error}`); 
                                                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                            });
                                })
                                .catch(error => { 
                                    sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de créer un conjoint (N°Carte ${params.id}) - ${error}`); 
                                    return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                                });
                    }
                }
            })
            .catch(error => {  
                sails.log.error(`BeneficiaireController - updateConjoint - ERREUR : Impossible de récupérer le bénéficiaire - ${error.message}`); 
                return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error.message}` });
            });



};