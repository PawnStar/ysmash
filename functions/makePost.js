module.exports = function(season){

  var post = "";
  var stats = season.data;

  console.log(stats)

  for(stat in stats){
    console.log(stat)
    post += "## " + stats[stat].name + "\n```\n";

    for(player of stats[stat].data){
      post += player.current.toFixed(2) + ' ' + player.name + '\n';
    }
    post += "```\n\n"
  }

  return post;
}
