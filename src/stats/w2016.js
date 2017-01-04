stats['w2016'] = {
  name: 'Winter 2016',
  weeks: 6,
  stats:{
    'damageGiven': null,
    'damageRecieved': null,
    'totalTime': null,
    'numKills': null,
    'numDeaths': null,
    'dg-dr': function(weeks){
      var totalGiven = 0, totalRecieved = 0;
      for(var i = 0; i < weeks.length; i++){
        totalGiven += weeks[i]['damageGiven'];
        totalRecieved += weeks[i]['damageRecieved'];
        weeks[i]['dg-dr'] = totalGiven / totalRecieved;
      }
      return 'Damage Given/Recieved';
    },
    'killspan': function(weeks){
      var totalTime = 0, totalKills = 0;
      for(var i = 0; i < weeks.length; i++){
        totalTime += weeks[i]['totalTime'];
        totalKills += weeks[i]['numDeaths'];
        weeks[i]['killspan'] = totalTime / totalKills;
      }
      return 'Killspan';
    },
    'lifespan': function(weeks){
      var totalTime = 0, totalDeaths = 0;
      for(var i = 0; i < weeks.length; i++){
        totalTime += weeks[i]['totalTime'];
        totalDeaths += weeks[i]['numDeaths'];
        weeks[i]['lifespan'] = totalTime / totalDeaths;
      }
      return 'Lifespan';
    },
  },
  players:{
    'pawnstar': {
      name: 'PawnStar',
      weeks:[
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        }
      ]
    },
    'splice': {
      name: 'Splice',
      weeks:[
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        }
      ]
    },
    'anonano': {
      name: 'Anonano',
      weeks:[
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        },
        {
          damageGiven: 300,
          damageRecieved: 200,
          numKills: 4,
          numDeaths: 6,
          totalTime: 300
        }
      ]
    }
  }
}
