var listeNationalites = {
    "Afghane": null,
    "Sud-Africaine": null,
    "Albanaise": null,
    "Algérienne": null,
    "Allemande": null,
    "Andorrane": null,
    "Angolaise": null,
    "Antiguaise et Barbudienne": null,
    "Saoudienne": null,
    "Argentine": null,
    "Arménienne": null,
    "Australienne": null,
    "Autrichienne": null,
    "Azerbaïdjanaise": null,
    "Bahreïnienne": null,
    "Bangladaise": null,
    "Barbadienne": null,
    "Belge": null,
    "Bélizienne": null,
    "Béninoise": null,
    "Bhoutanaise": null,
    "Biélorusse": null,
    "Birmane": null,
    "Bolivienne": null,
    "Bosniaque": null,
    "Botswanéenne": null,
    "Brésilienne": null,
    "Brunéienne": null,
    "Bulgare": null,
    "Burkinabè": null,
    "Burundais": null,
    "Cambodgiennes": null,
    "Camerounaise": null,
    "Canadienne": null,
    "Cap-Verdienne": null,
    "Centrafricaine": null,
    "Chilienne": null,
    "Chinoise": null,
    "Chypriote": null,
    "Colombienne": null,
    "Comorienne": null,
    "Congolaise": null,
    "Sud-Coréenne": null,
    "Nord-Coréenne": null,
    "Costaricaine": null,
    "Ivoirienne": null,
    "Croate": null,
    "Cubaine": null,
    "Danoise": null,
    "Djiboutienne": null,
    "Dominicaine": null,
    "Dominiquaise": null,
    "Egyptienne": null,
    "Emirienne": null,
    "Equatorienne": null,
    "Erythréenne": null,
    "Espagnole": null,
    "Estonienne": null,
    "Américaine": null,
    "Éthiopienne": null,
    "Fidjienne": null,
    "Finlandaise": null,
    "Française": null,
    "Gabonaise": null,
    "Gambienne": null,
    "Géorgienne": null,
    "Ghanéenne": null,
    "Grecque": null,
    "Grenadienne": null,
    "Guatémaltèque": null,
    "Guinéenne": null,
    "Bissao-Guinéenne": null,
    "Equato-Guinéenne": null,
    "Guyanienne": null,
    "Haïtienne": null,
    "Hondurienne": null,
    "Hongroise": null,
    "Indienne": null,
    "Indonésienne": null,
    "Iranienne": null,
    "Iraquienne": null,
    "Irlandaise": null,
    "Islandaise": null,
    "Israélienne": null,
    "Italienne": null,
    "Jamaïquaine": null,
    "Japonaise": null,
    "Jordanienne": null,
    "Kazakhe": null,
    "Kényane": null,
    "Kirghize": null,
    "Kiribatienne": null,
    "Koweïtienne": null,
    "Laotienne": null,
    "Lesothane": null,
    "Lettone": null,
    "Libanaise": null,
    "Libérienne": null,
    "Libyenne": null,
    "Liechtensteinoise": null,
    "Lituanienne": null,
    "Luxembourgeoise": null,
    "Malgache": null,
    "Malaisienne": null,
    "Malawienne": null,
    "Maldivienne": null,
    "Malienne": null,
    "Maltaise": null,
    "Marocaine": null,
    "Marshallaise": null,
    "Mauricienne": null,
    "Mauritanienne": null,
    "Mexicaine": null,
    "Micronésienne": null,
    "Moldave": null,
    "Monégasque": null,
    "Mongole": null,
    "Mozambicaine": null,
    "Namibienne": null,
    "Nauruane": null,
    "Népalaise": null,
    "Nicaraguayenne": null,
    "Nigérienne": null,
    "Nigériane": null,
    "Norvégienne": null,
    "Néo-Zélandaise": null,
    "Omanaise": null,
    "Ougandaise": null,
    "Ouzbèke": null,
    "Pakistanaise": null,
    "Panaméenne": null,
    "Papouane-Néo-Guinéenne": null,
    "Paraguayenne": null,
    "Néerlandaise": null,
    "Péruvienne": null,
    "Philippine": null,
    "Polonaise": null,
    "Portugaise": null,
    "Qatarienne": null,
    "Roumaine": null,
    "Britannique": null,
    "Russe": null,
    "Rwandaise": null,
    "Kittitienne": null,
    "Névicienne": null,
    "Saint-Lucienne": null,
    "Saint-Marinaise": null,
    "Saint-Vincentaise et Grenadine": null,
    "Salomonaise": null,
    "Salvadorienne": null,
    "Samoane": null,
    "Santoméenne": null,
    "Sénégalaise": null,
    "Seychelloise": null,
    "Sierra-Léonaise": null,
    "Singapourienne": null,
    "Slovaque": null,
    "Slovène": null,
    "Somalienne": null,
    "Soudanaise": null,
    "Sri-Lankaise": null,
    "Suédoise": null,
    "Suisse": null,
    "Surinamaise": null,
    "Swazie": null,
    "Syrienne": null,
    "Tadjike": null,
    "Tanzanienne": null,
    "Tchadienne": null,
    "Tchèque": null,
    "Thaïlandaise": null,
    "Togolaise": null,
    "Tonguienne": null,
    "Trinidadienne": null,
    "Tunisienne": null,
    "Turkmène": null,
    "Turque": null,
    "Tuvaluane": null,
    "Ukrainienne": null,
    "Uruguayenne": null,
    "Vanuatuane": null,
    "Vénézuélienne": null,
    "Vietnamienne": null,
    "Yéménite": null,
    "Yougoslave": null,
    "Zaïroise": null,
    "Zambienne": null,
    "Zimbabwéenne": null
}

var goToProfile = function(strID) {
    window.location.href = "/profile/" + strID;
}

var listeSituations = {
    "Débouté du droit d'asile": null,
    "Réfugié": null,
    "Protection subsidiaire": null,
    "Débouté - OQTF confirmée": null,
    "Débouté - OQTF annulée": null,
    "Demandeur d'asile - En attente de réexamen": null,
    "Demandeur d'asile": null,
    "Mineur": null,
    "Nationalité Française": null
}

$(document).ready(function() {
    //Initialisation collapsible filtres
    $('.collapsible').collapsible();
    $('select').formSelect();

    /* Initialisation du champ auto-complete "Nationalite" */
    $('input.autocomplete.nationalite').autocomplete({ minLength: 2, data: listeNationalites });
    $('input.autocomplete.situation').autocomplete({ minLength: 2, data: listeSituations });

    var table = $('#datatable').DataTable({
        "searching": true,
        "lengthMenu" : [30, 60, 100, 150, 200],
        "language": {
            "info": "_START_ à _END_ sur _TOTAL_",
            "zeroRecords": "Aucun résultat ...",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            },
            "infoFiltered": "filtrés sur _MAX_ bénéficiaires",
            "lengthMenu": "Afficher _MENU_ bénéficiaires par page"
        },
        bAutoWidth: false,
        "scrollX": true,
        "order": [[ 1, 'asc' ]],
        "columns": [
            { "width": "6%", "className": "text-center" },      // N° carte
            { "width": "15%" },                                 // Nom
            { "width": "15%" },                                 // Prénom
            { "width": "8%", "className": "text-center" },      // Date de naissance
            { "width": "14%" },                                 // Nationalité
            { "width": "5%", "className": "text-center" },      // Sexe
            { "width": "8%", "className": "text-center" },      // Entrée en France
            { "width": "8%", "className": "text-center" },      // Inscription
            { "width": "13%" },                                 // Situation Administrative
            { "width": "7%", "className": "text-center" },      // Cotisation
          ],
          "stripeClasses": [ 'strip1', 'strip2' ],
    });

    table.page.len( 30 ).draw();

    // Appliquer les filtres
    $('#carte').on('keyup change', function(){ table.column(0).search(this.value).draw() });
    $('#nom').on('keyup change', function(){ table.column(1).search(this.value).draw() });
    $('#prenom').on('keyup change', function(){ table.column(2).search(this.value).draw() });
    $('#dateNaissance').on('keyup change', function(){ table.column(3).search(this.value).draw() });
    $('#nationalite').on('keyup change', function(){ table.column(4).search(this.value).draw() });
    $('#sexe').on('keyup change', function(){ table.column(5).search(this.value).draw() });
    $('#dateEntree').on('keyup change', function(){ table.column(6).search(this.value).draw() });
    $('#dateInscription').on('keyup change', function(){ table.column(7).search(this.value).draw() });
    $('#situation').on('keyup change', function(){ table.column(8).search(this.value).draw() }); 
});