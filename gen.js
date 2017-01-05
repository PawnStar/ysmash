var players = {};

var getRandIntAround = function(center, offset){
  if(offset == null) offset = 30;
  return Math.floor(Math.random()*((center+offset)-(center-offset)+1)+(center-offset));
}

for(var i = 0; i<20; i++){
  var player = 'player' + i;
  players[player] = {
    name: 'Player ' + i,
    weeks:[]
  }
  for(var j = 0; j < 6; j++){
    players[player].weeks[j] = {
      damageGiven: getRandIntAround(300),
      damageRecieved: getRandIntAround(300),
      numKills: getRandIntAround(3, 3),
      numDeaths: getRandIntAround(3, 3),
      totalTime: getRandIntAround(90)
    }
  }
}

console.log(JSON.stringify(players))
