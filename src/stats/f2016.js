stats['f2016'] = {
  name: 'Fall 2016',
  weeks: 6,
  stats:{
    'damageGiven': null,
    'damageRecieved': null,
    'totalTime': null,
    'numKills': null,
    'numDeaths': null,
    'dg-dr': function(weeks){
      for(var i = 0; i < weeks.length; i++){
        weeks[i]['dg-dr'] = weeks[i]['damageGiven'] / weeks[i]['damageRecieved'];
      }
      return 'Damage Given/Recieved';
    },
    'killspan': function(weeks){
      for(var i = 0; i < weeks.length; i++){
        weeks[i]['killspan'] = weeks[i]['totalTime'] / weeks[i]['numKills'];
      }
      return 'Killspan';
    },
    'lifespan': function(weeks){
      for(var i = 0; i < weeks.length; i++){
        weeks[i]['lifespan'] = weeks[i]['totalTime'] / weeks[i]['numDeaths'];
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
