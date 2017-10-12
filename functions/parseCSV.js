var fs = require('fs');
var path = require('path');
var csvParse = require('csv-parse/lib/sync');
var funcs = require('./usefulFunctions.js');


verbose = true;

module.exports = function(path, numProps, seasonName, statConfig){
  console.log("Reading data file " + path);
  var headers;

  var data = csvParse(fs.readFileSync(path), {
    columns: function(line){
      headers = line;
    },
    auto_parse:true
  });

  var numColumns = numProps;

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

      console.log('  - ' + statBlock[0]);
      var extractedStats = {};

      for(var i = 1; i < statBlock.length; i++){
        var columnName = headers[i];
        var columnValue = statBlock[i];
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
    //Total score, damages, kills, deaths, time
    funcs.doTime(weeks);
    funcs.convertPosToPoints(weeks);
    funcs.totalSomething(weeks, 'Pts', 'Points');
    //funcs.totalSomething(weeks, 'W', 'Wins');
    //funcs.totalSomething(weeks, 'L', 'Losses');
    funcs.totalSomething(weeks, 'K', 'Kills');
    funcs.totalSomething(weeks, 'D', 'Deaths');
    funcs.totalSomething(weeks, 'SD', 'Self Destructs');
    funcs.totalSomething(weeks, 'DmgG', 'Damage Given');
    funcs.totalSomething(weeks, 'DmgR', 'Damage Recieved');
    funcs.totalSomething(weeks, 'Time', 'Total Time');
    funcs.totalSomething(weeks, 'Hit%', 'Hit%Sum');

    //Get kills - self destructs
    funcs.subtractSomething(weeks, 'Kills', 'Self Destructs', 'ModKills');

    //Compute K/D, DG/DR, DG/K, DR/D, Lfspn, Klspn, DPS, DRPS
    //funcs.doKDShiftingAllainces(weeks, 'Kills', 'Deaths', 'Self Destructs', 'K/D');
    funcs.divideSomething(weeks, 'Kills', 'Deaths', 'K/D');
    funcs.divideSomething(weeks, 'Damage Given', 'Damage Recieved', 'DG/DR');
    funcs.divideSomething(weeks, 'Damage Given', 'Kills', 'DG/K');
    funcs.divideSomething(weeks, 'Damage Recieved', 'Deaths', 'DR/D');
    funcs.divideSomething(weeks, 'Total Time', 'Deaths', 'Lfspn');
    funcs.divideSomething(weeks, 'Total Time', 'ModKills', 'Klspn');
    funcs.divideSomething(weeks, 'Damage Given', 'Total Time', 'DPS');
    funcs.divideSomething(weeks, 'Damage Recieved', 'Total Time', 'DRPS');

    //Hit%
    funcs.multiplySomething(weeks, 'Hit%', 'Time', 'Hit%Mod');
    funcs.totalSomething(weeks, 'Hit%Mod', 'Hit%ModTotal');
    funcs.divideSomething(weeks, 'Hit%ModTotal', 'Total Time', 'Hit%');

    //Peak Damage
    funcs.maxSomething(weeks, 'PkD', 'Peak Damage');


    //Clean up
    funcs.trimSomething(weeks, 'Pos');
    funcs.trimSomething(weeks, 'Pts');
    funcs.trimSomething(weeks, 'W');
    funcs.trimSomething(weeks, 'L');
    funcs.trimSomething(weeks, 'K');
    funcs.trimSomething(weeks, 'D');
    funcs.trimSomething(weeks, 'SD');
    funcs.trimSomething(weeks, 'Min');
    funcs.trimSomething(weeks, 'Sec');
    funcs.trimSomething(weeks, 'DmgG');
    funcs.trimSomething(weeks, 'DmgR');
    funcs.trimSomething(weeks, 'PkD');
    funcs.trimSomething(weeks, 'Time');
    funcs.trimSomething(weeks, 'ModKills');
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

  console.log("Stats");
  console.log(data);

  console.log("Finished computing.");

  /*
   * Sort and trim
   */

  var stats = statConfig;

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
    }).sort(config.sort);

    //Do averages
    var total = ranks.map(function(player){
      //Possibly null
      if(!player.current) return 0;
      if(player.current.max)
        return player.current.max;
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
      average: null,
      graph: config.graph,
      data: ranks
    }
  }

  return {
    name: seasonName,
    weeks: numWeeks,
    data: stats
  }
}
