var stats;

var chartColors = [
  'hsl(120, 100%, 50%)',
  'hsl(108, 100%, 50%)',
  'hsl(96, 100%, 50%)',
  'hsl(84, 100%, 50%)',
  'hsl(72, 100%, 50%)',
  'hsl(60, 100%, 50%)',
  'hsl(48, 100%, 50%)',
  'hsl(36, 100%, 50%)',
  'hsl(24, 100%, 50%)',
  'hsl(12, 100%, 50%)',
  'hsl(0, 100%, 50%)',
];

var chartContents;

//New stuff
$(document).ready(function(){
  resetGraph('Initializing . . . ')
  $.ajax({
    dataType: "json",
    url: './stats.json',
    success: function(data){
      stats = data;
      setupSeasons(data.seasons);
    }
  });
})

var setupSeasons = function(seasons){
  for(season in seasons)
    $('#season').append('<option value="' + season + '">' + seasons[season].name + '</option>')

  $('#season').change(function(){
    prepSeason();
  })

  prepSeason();
}

var statClick = function(ev){
  ev.preventDefault();

  $('.statLink.selected').removeClass('selected');
  $(this).addClass('selected');
  prepStat($(this).attr('data-stat'), true);
  redrawGraph();

  return false;
}

var playerClick = function(ev){
  ev.preventDefault();

  $(this).toggleClass('selected');
  redrawGraph();

  return false;
}

var resetGraph = function(title){
  chartContents = {
    type: 'line',
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
        onClick:function(){} //Disable hiding lines from graph legend
      }
    }
  };
  $('#chart').html('').html('<canvas id="canvas"></canvas>');
  var ctx = document.getElementById("canvas").getContext("2d");
  window.ySmashChart = new Chart(ctx, chartContents);
}

var prepSeason = function(){
  var season = stats.seasons[$('#season').val()];

  var hasStats = false;
  $('#stats').empty();
  for(stat in season.data){
    if(!season.data.hasOwnProperty(stat) || season.data[stat] == null || !season.data[stat].graph)
      continue;
    var name = season.data[stat].name;

    hasStats = true;
    $('#stats').append('<li><a class="statLink" data-stat="' + stat + '" href="#"">' + name + '</a></li>');
  }
  if(!hasStats) $('#stats').append('<li>Couldn\'t load stats</li>');

  $('#players').html('<li>Select a stat</li>')

  $('.statLink').click(statClick);
  $('.statLink').first().addClass('selected');
  prepStat($('.statLink').first().attr('data-stat'), true);
}

var prepStat = function(stat, preselect){
  var stat = stats.seasons[$('#season').val()].data[stat];

  var hasPlayers = false;
  $('#players').empty();
  var players = stat.data
  for(i in players){
    var player = players[i];
    hasPlayers = true;
    if(player.current.max)
      player.current = player.current.max;

    $('#players').append('<li><a class="playerLink" data-player="' + player.name + '" href="#"">' + player.name + '<span>' + player.current.toFixed(2) + '</span></a></li>');
  }
  if(!hasPlayers) $('#players').append('<li>Couldn\'t load players</li>')

  $('.playerLink').click(playerClick);

  //Preselect first three
  if(preselect){
    $('.playerLink').slice(0,3).addClass('selected');
  }
  redrawGraph();
}

var redrawGraph = function(){
  var season = stats.seasons[$('#season').val()];

  var stat = $('.statLink.selected').attr('data-stat');
  var selectedPlayers = $('.playerLink.selected').map(function(){return $(this).attr('data-player')}).toArray();
  var data = [];
  var labels = [];

  //Get name of stat
  var name = season.data[stat].name;

  //Set up labels
  for(var i = 1; i <= season.weeks; i++)
    labels.push('Week ' + i);

  var players = season.data[stat].data;

  //Fancy dynamic color stepping
  var colorStep;
  if(selectedPlayers.length)
    colorStep = 120 / (selectedPlayers.length-1);
  else
    colorStep = 0;

  //Get each player
  for(var i = 0, player; player = (i < players.length)?players[i]:false; i++){
    if(selectedPlayers.indexOf(player.name) == -1)
      continue;

    //Build their dataset
    var dataset = {
      label: player.name,
      //Use fancy dynamic color stepping
      borderColor: 'hsl('+parseInt(120 - colorStep*i)+', 100%, 50%)',
      backgroundColor: 'hsl('+parseInt(120 - colorStep*i)+', 100%, 50%)',
      fill:false,
      //Map to take care of max damage
      data: player.weeks.map(function(current){if(current && current.max) return current.max; return current;})
    };

    //Add it
    data.push(dataset);
  }

  //Update chart tile
  chartContents.options.title.text = name + ((selectedPlayers.length)?'':' (no players selected)');
  //Update chart data
  chartContents.data.datasets = data;
  chartContents.data.labels = labels;
  //Redraw
  window.ySmashChart.destroy();
  $('#chart').html('').html('<canvas id="canvas"></canvas>');
  var ctx = document.getElementById("canvas").getContext("2d");
  window.ySmashChart = new Chart(ctx, chartContents);
}
