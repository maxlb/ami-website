
var repartitionParContinent = new Chart($('#repartitionParContinent'), {
    type: 'bar',
    data: {
        labels: ["Europe", "Afrique", "Asie", "Amérique", "Océanie", "Antartique"],
        datasets: [{
            label: 'Nombre de Bénéficiaires',
            data: [12, 19, 3, 5, 2, 3],
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


var repartitionHommeFemme = new Chart($('#repartitionHommeFemme'), {
    type: 'pie',
    data: {
        labels: ["Hommes", "Femme"],
        datasets: [{
            label: 'Nombre de Bénéficiaires',
            data: [90, 10],
            backgroundColor: [
                '#42a5f5',
                '#3f51b5'
            ]
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: "#FFF"
            }
        }
    }
});


var graphInscriptions = new Chart($('#graphInscriptions'), {
    type: 'line',
		bezierCurve: false,
    data: {
        labels: ["Janvier", "Février", "Mars", "Avril", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"],
        datasets: [{
            label: "Nombre d'inscriptions",
            data: [60, 10, 65, 20, 71, 28, 56, 37, 42, 25, 48]
        }]
    },
    options: {
        elements: {
            line: {
                borderColor: "#FFF",
                backgroundColor: "rgba(0,0,0,0)"
            },
            point: {
                backgroundColor: "#FFF"
            }
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#FFF",
                    beginAtZero:true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "#FFF"
                }
            }]
        }
    }
});