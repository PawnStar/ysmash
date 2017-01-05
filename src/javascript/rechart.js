
var chartColors = [
  '#D50000',
  '#C51162',
  '#AA00FF',
  '#6200EA',
  '#304FFE',
  '#2962FF',
  '#0091EA',
  '#00B8D4',
  '#00BFA5',
  '#00C853',
  '#64DD17',
  '#AEEA00',
  '#FFD600',
  '#FFAB00',
  '#FF6D00',
  '#DD2C00'
];

var chartContents;

//New stuff
$(document).ready(function(){
  resetGraph('Initializing . . . ')
  $('#season').change(function(){
    prepSeason();
  })

  prepSeason();
})

var statClick = function(ev){
  ev.preventDefault();

  if($(this).hasClass('selected'))
    prepStat($(this).attr('data-stat'), true);
  else {
    var players = $('.playerLink.selected').map(function(){return $(this).attr('data-player')});
    $('.statLink.selected').removeClass('selected');
    $(this).addClass('selected');
    prepStat($(this).attr('data-stat'), false);
    $('.playerLink.selected').removeClass('selected');
    players.each(function(i, player){
      $('[data-player=\''+player+'\']').addClass('selected');
    })
  }

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
        onClick:function(){}
      }
    }
  };
  $('#chart').html('').html('<canvas id="canvas"></canvas>');
  var ctx = document.getElementById("canvas").getContext("2d");
  window.ySmashChart = new Chart(ctx, chartContents);
}

var prepSeason = function(){
  var season = stats[$('#season').val()];

  var hasStats = false;
  $('#stats').empty();
  for(stat in season.stats){
    if(!season.stats.hasOwnProperty(stat) || season.stats[stat] == null)
      continue;
    var name;
    if(typeof season.stats[stat] == 'function')
      name = season.stats[stat]([]);
    else
      name = season.stats[stat];

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
  var season = stats[$('#season').val()];

  var hasPlayers = false;
  $('#players').empty();
  var players = Object.keys(season.players)
    .map(function(playerName){
      var player = season.players[playerName];
      player.id = playerName;
      return player;
    })
    .map(function(player){
      if(typeof season.stats[stat] == 'function')
        season.stats[stat](player.weeks)
      return player;
    }).sort(function(a,b){
      if(season.invert.includes(stat))
        return a.weeks[season.weeks-1][stat] - b.weeks[season.weeks-1][stat];
      else
        return b.weeks[season.weeks-1][stat] - a.weeks[season.weeks-1][stat];
    }).slice(0,10);
  for(i in players){
    var player = players[i];
    hasPlayers = true;

    $('#players').append('<li><a class="playerLink" data-player="' + player.id + '" href="#"">' + player.name + '<span>' + player.weeks[season.weeks-1][stat].toFixed(2) + '</span></a></li>');
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
  var season = stats[$('#season').val()];

  var stat = $('.statLink.selected').attr('data-stat');
  var players = $('.playerLink.selected').map(function(){return $(this).attr('data-player')});
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
      borderColor: chartColors[i],
      fill:false,
      data: season.players[player].weeks.map(function(week){return week[stat]})
    };

    //Add it
    data.push(dataset);
  }

  //Update chart tile
  chartContents.options.title.text = name + ((players.length)?'':' (no players selected)');
  //Update chart data
  chartContents.data.datasets = data;
  chartContents.data.labels = labels;
  //Redraw
  window.ySmashChart.destroy();
  $('#chart').html('').html('<canvas id="canvas"></canvas>');
  var ctx = document.getElementById("canvas").getContext("2d");
  window.ySmashChart = new Chart(ctx, chartContents);
}
