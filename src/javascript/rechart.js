
var chartColors = [
  'rgb(255, 226, 224)',//red
  'rgb(255, 159, 64)',//orange
  'rgb(255, 205, 86)',//yellow
  'rgb(75, 192, 192)',//green
  'rgb(68, 211, 255)',//blue
  'rgb(153, 102, 255)',//purple
  'rgb(231,233,237)'//grey
];

var chartContents;

//New stuff
$(document).ready(function(){

  resetGraph('Select a Season');





  $('#season').change(function(){
    //prepSeason($(this).val());
    redrawGraph();
  })


})

var resetGraph = function(title){
  chartContents = {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title
      },
      tooltips: {
        display:true
      },
      legend:{
        onClick:function(){}
      }
    }
  };
  $('#canvasContainer').html('').html('<canvas id="canvas"></canvas>');
  var ctx = document.getElementById("canvas").getContext("2d");
  window.ySmashChart = new Chart(ctx, chartContents);
}

var prepSeason = function(prep){
  var season = stats[prep];
  for(stat in season.stats){
    console.log(stat);
  }
  for(player in season.players){
    console.log(player)
  }
}

var redrawGraph = function(){
  var season = stats[$('#season').val()];

  var stat = 'dg-dr';
  var players = ['anonano', 'pawnstar', 'splice'];
  var data = [];
  var labels = [];

  //Get name of stat
  var name;
  if(typeof season.stats[stat] == 'function')
    name = season.stats[stat]([]);
  else
    name = season.stats[stat];

  //Figure out how many weeks of data we have
  for(var i = 1; i <= season.weeks; i++)
    labels.push('Week ' + i);

  //Get each player
  for(var i = 0, player; player = (i < players.length)?players[i]:false; i++){
    if(!season.players.hasOwnProperty(player))
      continue;

    //Calculate this stat for them if necessary
    if(typeof season.stats[stat] == 'function'){
        season.stats[stat](season.players[player].weeks);
    }

    //Build their dataset
    var dataset = {
      label: season.players[player].name,
      backgroundColor: chartColors[i],
      data: season.players[player].weeks.map(function(week){return week[stat]})
    };

    //Add it
    data.push(dataset);
  }

  //Update chart tile
  chartContents.options.title.text = name;
  //Update chart data
  chartContents.data.datasets = data;
  chartContents.data.labels = labels;
  //Redraw
  window.ySmashChart.destroy();
  $('#canvasContainer').html('').html('<canvas id="canvas"></canvas>');
  var ctx = document.getElementById("canvas").getContext("2d");
  window.ySmashChart = new Chart(ctx, chartContents);
}
