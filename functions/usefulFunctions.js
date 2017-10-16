var stuff = {};

stuff.iterateMatches = function(weeks, callback){
  //Callback gets (thisMatch, prevMatch, weekNum)
  var prevMatch = null;
  for(var i = 0; i < weeks.length; i++){
    for(var j = 0; j < weeks[i].length; j++){
      callback(weeks[i][j], prevMatch, i);
      prevMatch = weeks[i][j];
    }
  }
};

stuff.doTime = function(weeks){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty('Min') && current.hasOwnProperty('Sec'))
      current.Time = current['Min']*60 + current['Sec'];
  })
};

stuff.doKDShiftingAllainces = function(weeks, kills, deaths, selfDestructs, result){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty(kills) && current.hasOwnProperty(deaths) && current.hasOwnProperty(selfDestructs))
      current[result] = (current[kills] - current[selfDestructs]/2) / current[deaths];
  })
}

stuff.totalSomething = function(weeks, statName, totalName){
  stuff.iterateMatches(weeks,function(current,prev){
    var total = null;
    if(prev && prev.hasOwnProperty(totalName))
      total = prev[totalName];

    if(current.hasOwnProperty(statName)){
      if(total)
        total = parseFloat(total) + parseFloat(current[statName]);
      else
        total = parseFloat(current[statName]);
      current[totalName] = total;
    }else{
      current[totalName] = total;
    }
  })
};


stuff.maxSomething = function(weeks, statName, maxName){
  stuff.iterateMatches(weeks, function(current, prev, week){
    if(!current.hasOwnProperty(statName) || current[statName] === null){
      if(prev && prev.hasOwnProperty(maxName))
        current[maxName] = prev[maxName];
      else
        current[maxName] = null;
    }else{
      if(prev && prev.hasOwnProperty(maxName) && prev[maxName] >= current[statName])
        current[maxName] = prev[maxName];
      else
        current[maxName] = current[statName]
    }
  })
};

stuff.divideSomething = function(weeks, numerator, denominator, resultName){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty(numerator) && current.hasOwnProperty(denominator))
      current[resultName] = parseFloat(current[numerator]) / parseFloat(current[denominator]);
  })
};

stuff.combineWinLoss = function(weeks, wins, losses, resultName){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty(wins) && current.hasOwnProperty(losses))
      current[resultName]
  })
}

stuff.multiplySomething = function(weeks, first, second, resultName){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty(first) && current.hasOwnProperty(second))
      current[resultName] = parseFloat(current[first]) * parseFloat(current[second]);
  })
};

stuff.subtractSomething = function(weeks, first, second, resultName){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty(first) && current.hasOwnProperty(second))
      current[resultName] = parseFloat(current[first]) - parseFloat(current[second]);
  })
}

stuff.trimSomething = function(weeks, stat){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty(stat))
      delete current[stat];
  })
}

stuff.convertPosToPoints = function(weeks){
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty('Pos') && current['Pos'] != 'Lt' && current['Pos'] != 'No'){
      current['Pts'] = 4 - parseInt(current['Pos']);
    } else {
      current['Pts'] = 0;
    }
  })
}

stuff.countMatches = function(weeks){
  var count = 0;
  stuff.iterateMatches(weeks, function(current){
    if(current.hasOwnProperty('Pos') && current['Pos'] != 'Lt' && current['Pos'] != 'No'){
      count++;
    }
    current.matchCount = count;
  })

  return count;
}

stuff.doAverage = function(statName, avgPlayerName, data){

}

module.exports = stuff;
