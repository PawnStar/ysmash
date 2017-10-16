var fs = require('fs');
var path = require('path');
var csvParse = require('csv-parse/lib/sync');
var funcs = require('./usefulFunctions.js');
var math = require('mathjs');

verbose = true;

showPlayersInWeek = false;
verboseComputeLog = false;

module.exports = function(config){
  if(config.skip) return null;
  console.log("Reading data file " + config.file + " for " + config.name);
  var name = config.name;
  var headers;

  var data = csvParse(fs.readFileSync(path.join(__dirname, '..', config.file)), {
    columns: function(line){
      headers = line;
    },
    auto_parse:true
  });

  var numColumns = config.columns;

  if(data[0].length % numColumns !== 0){
    return new Error("Invalid number of columns");
  }

  var numWeeks = data[0].length / numColumns;

  if(verbose)
    console.log("CSV parsed correctly . . . checking a few things.")

  console.log("  Found " + numWeeks + " weeks of data");

  console.log();
  console.log("Extracting player data . . . ");

  if(verbose)
    console.log("Chunking rows . . .")

  data = data.map(row=>{
    var newRow = [];
    var i,j,chunk = numColumns;
    for (i=0,j=row.length; i<j; i+=chunk) {
      newRow.push(row.slice(i,i+chunk));
    }
    return newRow;
  })

  if(verbose)
    console.log("Reversing rows/columns");

  //Brilliant transpose stolen shamelessly from https://stackoverflow.com/a/36164530
  var transpose = m => m[0].map((x,i) => m.map(x => x[i]))

  data = transpose(data);

  var players = {};

  var addMatchToPlayer = function(playerName, weekNum, statBlock){
    if(!players[playerName])
      players[playerName] = [];

    if(!players[playerName][weekNum])
      players[playerName][weekNum] = [];

    players[playerName][weekNum].push(statBlock);
  }

  for(weekNum in data){
    console.log("Processing matches for week " + weekNum);

    for(statBlock of data[weekNum]){
      //Skip empty
      var playerName = statBlock[0];
      if(playerName == '') continue;

      if(showPlayersInWeek)
        console.log('  - ' + statBlock[0]);
      var extractedStats = {};

      for(var i = 1; i < statBlock.length; i++){
        var columnName = headers[i];
        var columnValue = statBlock[i];
        if(columnValue === "")
          if(config.defaults && config.defaults.hasOwnProperty(columnName))
            columnValue = config.defaults[columnName];
          else if(config.defaults && config.defaults.hasOwnProperty('all'))
            columnValue = config.defaults.all;
          else
            columnValue = 0;

        extractedStats[columnName] = columnValue;
      }

      addMatchToPlayer(playerName, weekNum, extractedStats);
    }
  }

  data = [];

  for(player in players){
    data.push({
      name: player, weeks: players[player]
    })
  }

  console.log("All players raw data parsed.\n")

  console.log("Preparing to compute stats . . .")

  var compute = function(weeks){
    var computations = config.computations;

    for(computation of computations){
      if(verboseComputeLog)
        console.log("   Computing " + JSON.stringify(computation));
      if(typeof computation === 'string')
        funcs.iterateMatches(weeks, (thisMatch, prevMatch, weekNum)=>{
          math.eval(computation, thisMatch);
        })
      else if(typeof computation === 'object' && computation.source)
        funcs.totalSomething(weeks, computation.source, computation.dest);
      else if(typeof computation === 'object' && computation.max)
        funcs.maxSomething(weeks, computation.max, computation.as);
      else
        console.log("Unknown computation: " + computation);
    }
  }

  console.log("Computing stats.");
  for(player of data){
    if(verbose)
      console.log("  Computing stats for " + player.name)
    compute(player.weeks)

    //Make player.current for convenience
    finalWeek = player.weeks[player.weeks.length -1];
    finalMatch = finalWeek[finalWeek.length - 1];
    player.current = finalMatch;
  }

  console.log("Finished computing.");

  /*
   * Sort and trim
   */


  var stats = config.stats;

  for(stat in stats){
    console.log("Preparing leaderboards for " + stat);
    var config = stats[stat];

    //Make
    var ranks = data.map(function(player){
      var p = {
        name: player.name,
        current:player.current[config.stat]
      }
      if(config.graph)
        p.weeks = player.weeks.map(function(week){
          return week[week.length-1][config.stat]
        })
      return p;
    }).sort((a,b)=>math.eval(config.sort, {a: a, b: b}));

    //Do averages
    var total = ranks.map(function(player){
      //Possibly null
      if(!player.current) return 0;
      return player.current;
    }).reduce(function(cont, current){
      return cont + current;
    })
    console.log("Total for " + stat + ": " + total);
    var average = total/ranks.length;
    console.log("  Average: " + average);

    if(config.trim > 0)
      ranks = ranks.slice(0, config.trim);

    //Store again
    stats[stat] = {
      name: stat,
      //average: average,
      graph: config.graph,
      data: ranks
    }
  }

  return {
    name: name,
    weeks: numWeeks,
    data: stats
  }
}
