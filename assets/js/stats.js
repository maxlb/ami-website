
var getStatsValues = async function(statWanted) {
    return new Promise((resolve, reject) => {
        $.get("/statistiques/" + statWanted, function (data, jwres) {
            if (jwres != 'success') { 
                reject({ labels: [], values:[] });
            } else {
                resolve(data);             
            }
        });
    });
}

/* Répartition par continents */
getStatsValues("repCont").then((stats) => {
    new Chart($('#repartitionParContinent'), {
        type: 'bar',
        data: {
            labels: stats.labels,
            datasets: [{
                label: 'Nombre de Bénéficiaires',
                data: stats.values,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});

/* Répartition par genre */
getStatsValues("repHF").then((stats) => {
    new Chart($('#repartitionHommeFemme'), {
        type: 'pie',
        data: {
            labels: stats.labels,
            datasets: [{
                label: 'Nombre de Bénéficiaires',
                data: stats.values,
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
})

/* Répartition par date d'inscription */
getStatsValues("nbInscr").then((stats) => {
    new Chart($('#graphInscriptions'), {
        type: 'line',
            bezierCurve: false,
        data: {
            labels: stats.labels,
            datasets: [{
                label: "Nombre d'inscriptions",
                data: stats.values
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
});