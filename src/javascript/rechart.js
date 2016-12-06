
var chartColors = {
  red: 'rgb(255, 226, 224)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(68, 211, 255)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};

function randomScalingFactor() {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function getData(){
  var data = {
    "Damage Recieved":[
    -Math.abs(randomScalingFactor())/4,
    -Math.abs(randomScalingFactor())/4,
    -Math.abs(randomScalingFactor())/4,
    -Math.abs(randomScalingFactor())/4,
    -Math.abs(randomScalingFactor())/4,
    -Math.abs(randomScalingFactor())/4,
    -Math.abs(randomScalingFactor())/4
    ],
    "Damage Given":[
    Math.abs(randomScalingFactor()),
    Math.abs(randomScalingFactor()),
    Math.abs(randomScalingFactor()),
    Math.abs(randomScalingFactor()),
    Math.abs(randomScalingFactor()),
    Math.abs(randomScalingFactor()),
    Math.abs(randomScalingFactor())
    ],
    "DG/DR to date":[

    ]
  }

  var totalDamageRecieved = 0, totalDamageGiven = 0;

  for(var i = 0; i < data['Damage Given'].length && i < data['Damage Recieved'].length; i++){
    totalDamageRecieved += data['Damage Recieved'][i];
    totalDamageGiven += data['Damage Given'][i];
    data['DG/DR to date'][i] = Math.abs(totalDamageGiven / totalDamageRecieved);
  }

  return data;
};

$(document).ready(function(){

  var data = getData();

  var chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    datasets: [{
      type: 'line',
      label: 'DG/DR to date',
      borderColor: chartColors.yellow,
      borderWidth: 2,
      fill: false,
      data: data['DG/DR to date']
    }, {
      type: 'bar',
      label: 'Damage Recieved',
      backgroundColor: chartColors.red,
      data: data['Damage Recieved'],
      borderColor: 'white',
      borderWidth: 2
    }, {
      type: 'bar',
      label: 'Damage Given',
      backgroundColor: chartColors.blue,
      data: data['Damage Given'],
      borderColor: 'white',
      borderWidth: 2
    }]
  };
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myMixedChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Damage Given / Recieved'
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
  });

  $('#randomizeData').click(function(ev) {
    console.log('clicked');
    var newData = getData();

    chartData.datasets.forEach(function(dataset) {
      dataset.data = newData[dataset.label];
    });
    window.myMixedChart.update();
  });
})
