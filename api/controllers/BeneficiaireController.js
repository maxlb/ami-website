/**
 * BeneficiaireController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

function buildBenefFromParams(params){
    var typeProc;
    var dateProc;

    if(getBoolValue(params.demAdmin.demandeAsile.procAcceleree.check)) {
        typeProc = "Procédure accélérée";
        dateProc = params.demAdmin.demandeAsile.procAcceleree.date
    } else if (getBoolValue(params.demAdmin.demandeAsile.procNormale.check)) {
        typeProc = "Procédure normale";
        dateProc = params.demAdmin.demandeAsile.procNormale.date
    } else if (getBoolValue(params.demAdmin.demandeAsile.procDublin.check)) {
        typeProc = "Procédure Dublin";
        dateProc = params.demAdmin.demandeAsile.procDublin.date
    }

    var benef = {
        /* Contacts */
        numAvocat: getStringValue(params.contacts.avocat),
        numAssistSociale: getStringValue(params.contacts.assistanteSociale),
        numAsso: getStringValue(params.contacts.association),
        orientePar: getStringValue(params.contacts.orientePar),

        /* Situation */
        situation: getStringValue(params.situationFamiliale.situation),
        dateSituation: getDateValue(params.situationFamiliale.dateSituation),

        /* Inscription */
        inscritPar: getStringValue(params.inscription.inscripteur),
        dateInscription: getDateValue(params.inscription.dateInscription),

        /* Demande d'Asile */
        typeProcedure: getStringValue(typeProc),
        dateProcedure: getDateValue(dateProc),

        /* Avocats */
        avocatCNDA:  getStringValue(params.demAdmin.CNDA.avocat),
        avocatOQTF:  getStringValue(params.demAdmin.OQTF.avocat)
    }

    benef = setInfosPersos(benef, params.infosPersos);
    benef = setVieEnFrance(benef, params.vieEnFrance);
    
    return benef;
}

function setInfosPersos(benef, infos){
    /* Identité */
    benef.prenom = getStringValue(infos.identite.prenom);
    benef.nom = getStringValue(infos.identite.nom);
    benef.nomJeuneFille = getStringValue(infos.identite.nomJeuneFille);
    benef.genre = getStringValue(infos.identite.genre);
    benef.dateNaissance = getDateValue(infos.identite.dateNaissance);
    benef.nationalite = getStringValue(infos.identite.nationalite);
    benef.paysNaissance = getStringValue(infos.identite.paysNaissance);

    /* Coordonnées */
    benef.adresse = getStringValue(infos.coordonnees.adresse);
    benef.codePostal = getNumberValue(infos.coordonnees.codePostal);
    benef.ville = getStringValue(infos.coordonnees.ville);
    benef.telephone = getStringValue(infos.coordonnees.numTel);
    benef.mail = getStringValue(infos.coordonnees.mail);

    /* Études */
    benef.aLeBac = getBoolValue(infos.etudes.aLeBac);
    benef.etudesSup = getStringValue(infos.etudes.etudesSup);
    benef.comprendFr = getBoolValue(infos.etudes.comprendFR);

    /* Permis */
    benef.datePermis = getDateValue(infos.permis.date);
    benef.aUneVouture = getBoolValue(infos.permis.aUneVoiture);

    return benef;
}

function setVieEnFrance(benef, infos) {
    /* Vie en France */
    benef.dateEntreeFrance = getDateValue(infos.entree.dateEntreeFrance);

    /* Moyens entrée */
    benef.aVisa = getBoolValue(infos.moyens.visa.check);
    benef.dateValiditeVisa = getDateValue(infos.moyens.visa.date);
    benef.aPasseport = getBoolValue(infos.moyens.check);
    benef.dateValiditePasseport = getDateValue(infos.moyens.date);

    /* Carte séjour */
    benef.aCarteSejour = getBoolValue(infos.titreSejour.carteSejour.obtenu);
    benef.mentionCarteSejour = getStringValue(infos.titreSejour.carteSejour.info);
    benef.dateValiditeCarteSejour = getDateValue(infos.titreSejour.carteSejour.date);

    /* Carte Résident */
    benef.aCarteResident = getBoolValue(infos.titreSejour.carteResident.obtenu);
    benef.mentionCarteResident = getStringValue(infos.titreSejour.carteResident.info);
    benef.dateValiditeCarteResident = getDateValue(infos.titreSejour.carteResident.date);

    /* Carte EU */
    benef.aCarteEU = getBoolValue(infos.titreSejour.ressortissantEU.obtenu);
    benef.paysCarteEU = getStringValue(infos.titreSejour.ressortissantEU.info);
    benef.dateValiditeCarteEU = getDateValue(infos.titreSejour.ressortissantEU.date);

    /* Protection internationale */
    benef.aProtectionSubsidiaire = getBoolValue(infos.protectionInternationale.refugie.check);
    benef.dateValiditeStatutProtectionSubsidiaire = getDateValue(infos.protectionInternationale.refugie.date);
    benef.estRefugie = getBoolValue(infos.protectionInternationale.protectionSubsidiaire.check);
    benef.dateValiditeStatutRefugie = getDateValue(infos.protectionInternationale.protectionSubsidiaire.date);
    
    return benef;
}

function buildCotisationFromParams(params) {
    var date = null;
    
    if(params.payee){
        date = new Date();
    }

    var cotisation = {
        annee: new Date().getFullYear(),
        estPayee: getBoolValue(params.payee),
        montant: getNumberValue(params.montant),
        motif: getStringValue(params.motif),
        datePaiement: date
    };
    
    return cotisation;
}

function buildConjointFromParams(params) {

    if(params.prenom != ""){
        var conjoint = {
            /* Identité */
            prenom: getStringValue(params.prenom),
            nom: getStringValue(params.nom),
            dateNaissance: getDateValue(params.dateNaissance),

            /* Vie en France */
            resideEnFrance:  getBoolValue(params.resideFrance),
            dateEntreeFrance: getDateValue(params.dateEntreeFrance),
            situationAdlinistrative : getStringValue(params.situation),
        };

        return conjoint;
    }

    return -1;
}

function buildEnfantsFromParams(params) {
    var enfants = [];
    var i = 0;
    params.forEach(enfant => {
        if(enfant.prenom != ""){
            var elem = {
                prenom: getStringValue(enfant.prenom),
                nom: getStringValue(enfant.nom),
                dateNaissance: getDateValue(enfant.dateNaissance),
                nationalite: getStringValue(enfant.nationalite),
                paysNaissance: getStringValue(enfant.paysNaissance),
                resideEnFrance:  getBoolValue(enfant.resideFrance),
                dateEntreeFrance: getDateValue(enfant.dateEntreeFrance)
            }
            enfants[i] = elem;
            i++;
        }
    });

    return enfants;
}

async function buildEventsFromParams(params, idBenef) {
    var etapes = ["OFPRA", "CNDA", "OQTF"];

    etapes.forEach(async function (etape) {
        // Lettre d'enregistrement
        if ( isDefined(params.lettreEnregistrement) ) {
            await Evenement.buildEvenementDA(idBenef, getDateValue(params.lettreEnregistrement), etape, "enregistrement");
        }

        // Convocation
        if ( isDefined(params.convocation) ) {
            await Evenement.buildEvenementDA(idBenef, getDateValue(params.convocation), etape, "convocation");
        }

        // Réponse
        if ( isDefined(params.reponse) && isDefined(params.dateReponse) ) {
            await Evenement.buildEvenementDA(idBenef, getDateValue(params.dateReponse), etape, "reponse", getStringValue(params.reponse));
        }

        // Convocation en Appel
        if ( isDefined(params.convocationAppel) ) {
            await Evenement.buildEvenementDA(idBenef, getDateValue(params.convocationAppel), etape , "convocationAppel");
        }

        // Réponse de l'Appel
        if ( isDefined(params.reponseAppel) && isDefined(params.dateReponseAppel) ) {
            await Evenement.buildEvenementDA(idBenef, getDateValue(params.dateReponseAppel), etape + "Appel", "reponseAppel", getStringValue(params.reponseAppel));
        }

        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : ${etape}`);
    })
    
    return 1

}

function isDefined(value) {
    return typeof value !== "undefined" && value !== null && value !== ""
}

function getStringValue(value){
    return (value != "") ? value : "";
}

function getBoolValue(value){
    var res;
    switch(value){
        case 'false':
            res = false;
            break;
        case 'true':
            res = true;
            break;
        default:
            res = false;
            break;
    }

    return res;
}

function getDateValue(value){
    if (value != "" && value != null) {
        var splitDate = value.split('/');
        return new Date(splitDate[2], splitDate[1], splitDate[0]);
    }
    return null;
}

function getNumberValue(value){
    return (value != "") ? parseInt(value) : 0;
}

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

    var events = await Evenement.find({beneficiaireConcerne: idBenef}).sort('date ASC');
        
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

module.exports = {
    
    async inscrire(req, res) {
        
        sails.log.info('BeneficiaireController - inscrire - Inscrption commencée');
        let params = req.allParams();

        /* Infomrations générales du bénéficiaire */
        var benefJSON = buildBenefFromParams(params);
        var benefObj = await Beneficiaire.create(benefJSON).fetch();
        sails.log.debug('BeneficiaireController - inscrire - Bénéficiaire inséré');

        /* Cotisation du bénéficiaire */
        var cotisationJSON = buildCotisationFromParams(params.cotisation);
        cotisationJSON.payeur = benefObj.id;
        await Cotisation.create(cotisationJSON);
        sails.log.debug('BeneficiaireController - inscrire - Cotisation insérée');

        /* Conjoint du bénéficiaire */
        var conjointJSON = buildConjointFromParams(params.situationFamiliale.conjoint);
        if(conjointJSON != -1){
            conjointJSON.beneficiaireLie = benefObj.id;
            await Conjoint.create(conjointJSON);
            sails.log.debug('BeneficiaireController - inscrire - Conjoint inséré');
        }
        
        /* Enfants du bénéficiaire */
        var enfantsJSON = buildEnfantsFromParams(params.situationFamiliale.enfants);
        enfantsJSON.forEach(async function(enfantJSON) {
            enfantJSON.parent = benefObj.id;
            await Enfant.create(enfantJSON);
            sails.log.debug('BeneficiaireController - inscrire - Enfant inséré');
        });
        
        /* Evènements du bénéficiaires */
        await buildEventsFromParams(params.demAdmin.OFPRA, benefObj.id);

        sails.log.info('BeneficiaireController - inscrire - Inscription terminée');

        return res.ok();
    },

    async getAll(req, res) {

        // Fonctionq
        

        var data = {};
        data.benefs = [];
        var annee = new Date().getFullYear();

        var beneficiaires = await Beneficiaire.find().sort('id ASC');
        sails.log.info(`BeneficiaireController - getAll - ${beneficiaires.length} bénéficiaires récupérés`);

        beneficiaires.forEach(async function(benef, i) {
            sails.log.debug(`BeneficiaireController - getAll - Traitement du bénéficiaire d'ID : ${benef.id}`);
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
            benefObj.cotisation = (await Cotisation.find({annee: annee, payeur: benefObj.numCarte}))[0].montant;
            sails.log.debug(`BeneficiaireController - getAll - Cotisation du bénéficiaire ${benefObj.cotisation}`);
                   
            // Situation Administrative 
            benefObj.situationAdministrative = await getSituation(benefObj.numCarte, (benefObj.dateNaissance.getFullYear() >= annee - 18 ), (benefObj.nationalite == "Française"))
            sails.log.debug(`BeneficiaireController - getAll - Situation du bénéficiaire ${benefObj.situationAdministrative}`);

            data.benefs[i] = benefObj;
    
            if (i == beneficiaires.length-1) {
                // Fonction de mise en forme de la date envoyée à la vue
                data.setFormatDate = setFormatDate;

                return res.view('pages/allBeneficiaires', { data });
            }
            
        });
    }

};