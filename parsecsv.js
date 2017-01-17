var args = require('minimist')(process.argv.slice(2),{
  boolean: 'verbose'
});
var fs = require('fs');
var path = require('path');
var csvParse = require('csv-parse/lib/sync');

var error = false;
if(!args['in']){
  console.log("No input file given.");
  error = true;
}
if(!args['out']){
  console.log("No output file given.");
  error = true;
}
if(!args['columns']){
  console.log("No column length given.");
  error = true;
}
if(!args['name']){
  console.log("You haven't provided a name for this season.");
}
if(error){
  console.log("USAGE: node parsedir.js []--verbose] --name=[Season] --in [inputFile] --out [outputFile] --columns [numColumns]");
  process.exit(1)
}

console.log("Reading data file");
var headers;

var data = csvParse(fs.readFileSync(path.join(__dirname,args['in']), 'utf8'),{
  columns:function(line){
    headers = line;
  },
  auto_parse:true
});

var numColumns = args.columns;
var numRounds = data[0].length / numColumns;
var numWeeks = headers[headers.length - numColumns];

console.log("CSV parsed correctly . . . checking a few things.")

if(args.verbose)
  console.log("  Assuming " + numRounds + " rounds of data for " + numWeeks + " weeks");

var numPlayers = data.length;

if(args.verbose)
  console.log("  Assuming " + numPlayers + " players");

console.log();
console.log("Extracting player data . . . ");

//Convert [[,,,,,,]] structure into [{name:'',weeks:[{stat:''}]}]
for(i in data){
  var player = {
    name: data[i][0],
    weeks:[]
  }
  if(args.verbose)
    console.log('  Parsing ' + player.name);
  //For every match block
  for(var j = 0; j < numRounds; j++){
    //Check name consistency
    if(player.name != data[i][j*numColumns]){
      console.log("  Error, name mismatch: " + player.name + " and " + data[i][j*numColumns])
      process.exit(1);
    }

    //Check which week it belongs to
    var week = headers[j*numColumns];
    if(args.verbose)
      console.log('    Getting data for match '+j+' (week ' + week + ')');

    //Get data
    var match = {};
    for(var k = j*numColumns + 1/*Skip name*/; k < (j+1)*numColumns; k++){
      //If it's an empty string, ignore it
      if(data[i][k] === '')
        continue;
      //Shove the raw data in property that matches its name
      match[headers[k]] = data[i][k];
    }

    //Add it to the player's stuff (week-1 for zero-indexed)
    if(typeof player.weeks[week-1] == 'undefined')
      player.weeks[week-1] = [];
    player.weeks[week-1].push(match)
  }

  if(args.verbose)
    console.log("  " + player.name + " parsed correctly")

  data[i] = player;
}

console.log("All players raw data parsed.\n")

console.log("Preparing to compute stats . . .")

var funcs = require('./usefulFunctions.js');
var compute = function(weeks){
  //Total score, damages, kills, deaths, time
  funcs.doTime(weeks);
  funcs.totalSomething(weeks, 'Pts', 'Score');
  funcs.totalSomething(weeks, 'K', 'Kills');
  funcs.totalSomething(weeks, 'D', 'Deaths');
  funcs.totalSomething(weeks, 'SD', 'Self Destructs');
  funcs.totalSomething(weeks, 'DmgG', 'Damage Given');
  funcs.totalSomething(weeks, 'DmgR', 'Damage Recieved');
  funcs.totalSomething(weeks, 'Time', 'Total Time');
  funcs.totalSomething(weeks, 'Hit%', 'Hit%Sum');

  //Compute K/D, DG/DR, DG/K, DR/D, Lfspn, Klspn, DPS, DRPS
  funcs.divideSomething(weeks, 'Kills', 'Deaths', 'K/D');
  funcs.divideSomething(weeks, 'Damage Given', 'Damage Recieved', 'DG/DR');
  funcs.divideSomething(weeks, 'Damage Given', 'Kills', 'DG/K');
  funcs.divideSomething(weeks, 'Damage Recieved', 'Deaths', 'DR/D');
  funcs.divideSomething(weeks, 'Total Time', 'Deaths', 'Lfspn');
  funcs.divideSomething(weeks, 'Total Time', 'Kills', 'Klspn');
  funcs.divideSomething(weeks, 'Damage Given', 'Total Time', 'DPS');
  funcs.divideSomething(weeks, 'Damage Recieved', 'Total Time', 'DRPS');

  //Hit%
  funcs.multiplySomething(weeks, 'Hit%', 'Time', 'Hit%Mod');
  funcs.totalSomething(weeks, 'Hit%Mod', 'Hit%ModTotal');
  funcs.divideSomething(weeks, 'Hit%ModTotal', 'Total Time', 'Hit%');

  //Peak Damage
  funcs.maxSomething(weeks, 'PkD', 'Peak Damage');


  //Clean up
  funcs.trimSomething(weeks, 'Rnk');
  funcs.trimSomething(weeks, 'Pts');
  funcs.trimSomething(weeks, 'K');
  funcs.trimSomething(weeks, 'D');
  funcs.trimSomething(weeks, 'SD');
  funcs.trimSomething(weeks, 'Min');
  funcs.trimSomething(weeks, 'Sec');
  funcs.trimSomething(weeks, 'DmgG');
  funcs.trimSomething(weeks, 'DmgR');
  funcs.trimSomething(weeks, 'PkD');
  funcs.trimSomething(weeks, 'Time');
}

console.log("Computing stats.");
for(player of data){
  if(args.verbose)
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

var stats = require('./statConfig.js');

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

  if(config.trim > 0)
    ranks = ranks.slice(0, config.trim);

  //Store again
  stats[stat] = {
    name: stat,
    graph: config.graph,
    data: ranks
  }
}

//console.log('\nWriting to file . . .');
fs.writeFile(path.join(__dirname,args['out']), JSON.stringify({
  name: args['name'],
  data: stats
}, null, 2), 'utf8')
