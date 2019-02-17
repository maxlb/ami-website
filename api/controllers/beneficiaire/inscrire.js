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
    benef.aUneVoiture = getBoolValue(infos.permis.aUneVoiture);

    return benef;
}

function setVieEnFrance(benef, infos) {
    /* Vie en France */
    benef.dateEntreeFrance = getDateValue(infos.entree.dateEntreeFrance);

    /* Moyens entrée */
    benef.aVisa = getBoolValue(infos.moyens.visa.check);
    benef.dateValiditeVisa = getDateValue(infos.moyens.visa.date);
    benef.aPasseport = getBoolValue(infos.moyens.passeport.check);
    benef.dateValiditePasseport = getDateValue(infos.moyens.passeport.date);

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
            situationAdministrative : getStringValue(params.situation),
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
    
    // Lettre d'enregistrement OFPRA
    if ( isDefined(params.OFPRA.lettreEnregistrement) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OFPRA.lettreEnregistrement), "OFPRA", "enregistrement");
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OFPRA - enregistrement`);
    }

    // Convocation OFPRA
    if ( isDefined(params.OFPRA.convocation) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OFPRA.convocation), "OFPRA", "convocation");
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OFPRA - convocation`);
    }

    // Réponse OFPRA
    if ( isDefined(params.OFPRA.reponse) && isDefined(params.OFPRA.dateReponse) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OFPRA.dateReponse), "OFPRA", "reponse", getStringValue(params.OFPRA.reponse));
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OFPRA - reponse`);
    }

    // Lettre d'enregistrement CNDA
    if ( isDefined(params.CNDA.lettreEnregistrement) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.CNDA.lettreEnregistrement), "CNDA", "enregistrement");
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : CNDA - enregistrement`);
    }

    // Convocation CNDA
    if ( isDefined(params.CNDA.convocation) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.CNDA.convocation), "CNDA", "convocation");
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : CNDA - convocation`);
    }

    // Réponse CNDA
    if ( isDefined(params.CNDA.reponse) && isDefined(params.CNDA.dateReponse) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.CNDA.dateReponse), "CNDA", "reponse", getStringValue(params.CNDA.reponse));
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : CNDA - reponse`);
    }

    // Convocation OQTF
    if ( isDefined(params.OQTF.convocation) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OQTF.convocation), "OQTF", "convocation");
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OQTF - convocation`);
    }

    // Réponse OQTF
    if ( isDefined(params.OQTF.reponse) && isDefined(params.OQTF.dateReponse) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OQTF.dateReponse), "OQTF", "reponse", getStringValue(params.OQTF.reponse));
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OQTF - reponse`);
    }

    // Convocation en Appel
    if ( isDefined(params.OQTF.convocationAppel) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OQTF.convocationAppel), "OQTFAppel" , "convocation");
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OQTFAppel - convocationAppel`);
    }

    // Réponse de l'Appel
    if ( isDefined(params.OQTF.reponseAppel) && isDefined(params.OQTF.dateReponseAppel) ) {
        await Evenement.buildEvenementDA(idBenef, getDateValue(params.OQTF.dateReponseAppel), "OQTFAppel", "reponse", getStringValue(params.OQTF.reponseAppel));
        sails.log.debug(`BeneficiaireController - buildEventFromParams - Evenement traité : OQTFAppel - reponseAppel`);
    }
    
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
        return new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]);
    }
    return null;
}

function getNumberValue(value){
    return (value != "") ? parseInt(value) : 0;
}

module.exports = async function inscrire(req, res) {
        
    sails.log.info('BeneficiaireController - inscrire - Inscrption commencée');
    let params = req.allParams().benef;

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
    await buildEventsFromParams(params.demAdmin, benefObj.id);

    sails.log.info('BeneficiaireController - inscrire - Inscription terminée');

    return res.json({ benefid: benefObj.id});
};