var stats;



var chartContents;

//New stuff
$(document).ready(function(){
  resetGraph('Select a stat . . . ')
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

  if($(this).hasClass('selected'))
    return false;

  if($(this).attr('data-stat') !== 'Points'){
    $('.statLink.selected').removeClass('selected');
    $(this).addClass('selected');
  }

  prepStat($(this).attr('data-stat'), true);

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
      scaleFontColor:'white',
      title: {
        display: true,
        text: title,
      },
      tooltips: {
        mode:'index',
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

  if(season.data['Points'])
    $('#stats').append('<li><a class="statLink" data-stat="Points" href="#">Rankings</a></li>');

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
  $('.statLink').eq(1).click();
}

var prepStat = function(value, preselect){
  var stat = stats.seasons[$('#season').val()].data[value];

  var hasPlayers = false;
  var html = '';

  var players = stat.data
  for(i in players){
    var player = players[i];
    hasPlayers = true;
    if(!player.current) player.current = 0;
    if(player.current.max)
      player.current = player.current.max;

    html += '<li><a class="playerLink" data-player="' + player.name + '" href="#"">' + player.name + '<span>' + player.current.toFixed(2) + '</span></a></li>';
  }

  if(!hasPlayers)
    html = '<li>Couldn\'t load players</li>';

  if(value === 'Points'){
    $('body').addClass('noscroll')
      .append('')
      .append('<div class="overlay"><a class="overlay" id="closeOverlay" href="#"></a><div id="rankings"><h2>Season Rankings</h2><ol>' + html + '</ol></div></div>');

    $('#closeOverlay').click(function(ev){
      if(ev) ev.preventDefault();
      $('body').removeClass('noscroll');
      $('.overlay').remove();
      return false;
    })
  }else{
    $('#players').html(html);
    $('.playerLink').click(playerClick);

    //Preselect first three
    if(preselect)
      $('.playerLink').slice(0,3).addClass('selected');
    redrawGraph();
  }
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
  for(var i = 0, playersDisplayed = 0, player; player = (i < players.length)?players[i]:false; i++){
    if(selectedPlayers.indexOf(player.name) == -1)
      continue;

    //Build their dataset
    var dataset = {
      label: player.name,
      //Use fancy dynamic color stepping
      borderColor: 'hsl('+parseInt(120 - colorStep*playersDisplayed)+', 100%, 50%)',
      backgroundColor: 'hsl('+parseInt(120 - colorStep*playersDisplayed)+', 100%, 50%)',
      fill:false,
      //Map to take care of max damage
      data: player.weeks.map(function(current){if(current && current.max) return current.max.toFixed(4); if(current) return current.toFixed(4); return current;})
    };

    //Add it
    data.push(dataset);
    playersDisplayed++;
  }

  //Add average
  var avgSet = {
    label: 'Average ' + name,
    borderColor: 'lightgray',
    backgroundColor: 'lightgray',
    fill: false,
    data: (new Array(season.weeks)).fill(season.data[stat].average)
  }

  console.log(season.data[stat].average);
  console.log(avgSet.data);

  if(season.data[stat].average)
    data.push(avgSet);

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
