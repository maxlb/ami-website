/**
 * StatistiquesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var paysAfrique = [
  "Afrique du Sud",
  "Algérie",
  "Angola",
  "Bénin",
  "Botswana",
  "Burkina",
  "Burundi",
  "Cameroun",
  "Cap-Vert",
  "République centrafricaine",
  "Comores",
  "Congo",
  "République démocratique du Congo",
  "Côte d'Ivoire",
  "Djibouti",
  "Égypte",
  "Érythrée",
  "Éthiopie",
  "Gabon",
  "Gambie",
  "Ghana",
  "Guinée",
  "Guinée-Bissau",
  "Guinée équatoriale",
  "Kenya",
  "Lesotho",
  "Libéria",
  "Libye",
  "Madagascar",
  "Malawi",
  "Mali",
  "Maroc",
  "Maurice",
  "Mauritanie",
  "Mozambique",
  "Namibie",
  "Niger",
  "Nigeria",
  "Ouganda",
  "Rwanda",
  "Sao Tomé-et-Principe",
  "Sénégal",
  "Seychelles",
  "Sierra Leone",
  "Somalie",
  "Soudan",
  "Sud-Soudan",
  "Swaziland",
  "Tanzanie",
  "Tchad",
  "Togo",
  "Tunisie",
  "Zambie",
  "Zimbabwe"
];
var paysAmerique = [
    "Antigua-et-Barbuda",
    "Argentine",
    "Bahamas",
    "Barbade",
    "Belize",
    "Bolivie",
    "Brésil",
    "Canada",
    "Chili",
    "Colombie",
    "Costa Rica",
    "Cuba",
    "République dominicaine",
    "Dominique",
    "Équateur",
    "États-Unis",
    "Grenade",
    "Guatemala",
    "Guyana",
    "Haïti",
    "Honduras",
    "Jamaïque",
    "Mexique",
    "Nicaragua",
    "Panama",
    "Paraguay",
    "Pérou",
    "Porto Rico",
    "Saint-Christophe-et-Niévès",
    "Sainte-Lucie",
    "Saint-Vincent-et-les Grenadines",
    "Salvador",
    "Suriname",
    "Trinité-et-Tobago",
    "Uruguay",
    "Venezuela"
]
var paysAsie = [
  "Afghanistan",
  "Arabie saoudite",
  "Bahreïn",
  "Bangladesh",
  "Bhoutan",
  "Birmanie",
  "Brunei",
  "Cambodge",
  "Chine",
  "Corée du Nord",
  "Corée du Sud",
  "Émirats arabes unis",
  "Inde",
  "Indonésie",
  "Irak",
  "Iran",
  "Israël",
  "Japon",
  "Jordanie",
  "Kazakhstan",
  "Kirghizistan",
  "Koweït",
  "Laos",
  "Liban",
  "Malaisie",
  "Maldives",
  "Mongolie",
  "Népal",
  "Oman",
  "Ouzbékistan",
  "Palestine",
  "Pakistan",
  "Philippines",
  "Qatar",
  "Singapour",
  "Sri Lanka",
  "Syrie",
  "Tadjikistan",
  "Taïwan",
  "Thaïlande",
  "Timor oriental",
  "Turkménistan",
  "Turquie",
  "Viêt Nam",
  "Yémen"
]
var paysEurope = [
    "Allemagne",
    "Albanie",
    "Andorre",
    "Arménie",
    "Autriche",
    "Azerbaïdjan",
    "Belgique",
    "Biélorussie",
    "Bosnie-Herzégovine",
    "Bulgarie",
    "Chypre",
    "Croatie",
    "Danemark",
    "Espagne",
    "Estonie",
    "Finlande",
    "France",
    "Géorgie",
    "Grèce",
    "Hongrie",
    "Irlande",
    "Islande",
    "Italie",
    "Lettonie",
    "Liechtenstein",
    "Lituanie",
    "Luxembourg",
    "République de Macédoine",
    "Malte",
    "Moldavie",
    "Monaco",
    "Monténégro",
    "Norvège",
    "Pays-Bas",
    "Pologne",
    "Portugal",
    "République tchèque",
    "Roumanie",
    "Royaume-Uni",
    "Russie",
    "Saint-Marin",
    "Serbie",
    "Slovaquie",
    "Slovénie",
    "Suède",
    "Suisse",
    "Ukraine",
    "Vatican"
]
var paysOceanie = [
    "Australie",
    "Fidji",
    "Kiribati",
    "Marshall",
    "Micronésie",
    "Nauru",
    "Nouvelle-Zélande",
    "Palaos",
    "Papouasie-Nouvelle-Guinée",
    "Salomon",
    "Samoa",
    "Tonga",
    "Tuvalu",
    "Vanuatu"
]

module.exports = {
    
    async getStats(req, res) {
        return res.view('pages/stats');
    },

    async getInscritsParMois(req, res) {

        var inscritsParMois = {
            labels: ["Janvier", "Février", "Mars", "Avril", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"], 
            values: [60, 10, 65, 20, 71, 28, 56, 37, 42, 25, 48] 
        };

        return res.json(inscritsParMois);
    },

    async getRepartitionHF(req, res) {
        /* Récupérations des statistiques */
        var nbHommes = await Beneficiaire.count({ genre: 'H' });
        var nbFemmes = await Beneficiaire.count({ genre: 'F' });

        var repartitionHF = { 
            labels: ["Hommes", "Femmes"], 
            values: [nbHommes, nbFemmes] 
        };

        return res.json(repartitionHF);
    },

    async getRepartitionContinent(req, res) {
        /* Récupérations des statistiques */
        var nbAfrique = await Beneficiaire.count({ paysNaissance: paysAfrique });
        var nbAmerique = await Beneficiaire.count({ paysNaissance: paysAmerique });
        var nbAsie = await Beneficiaire.count({ paysNaissance: paysAsie });
        var nbEurope = await Beneficiaire.count({ paysNaissance: paysEurope });
        var nbOceanie = await Beneficiaire.count({ paysNaissance: paysOceanie });

        var repartitionContinent = { 
            labels: ["Europe", "Afrique", "Asie", "Amérique", "Océanie"], 
            values: [nbEurope, nbAfrique, nbAsie, nbAmerique, nbOceanie] 
        };

        return res.json(repartitionContinent);
    },
};