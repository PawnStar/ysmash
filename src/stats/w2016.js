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
        dgdr = totalGiven / totalRecieved;
        if(!isFinite(dgdr))
          weeks[i]['dg-dr'] = dgdr;
        else
          weeks[i]['dg-dr'] = dgdr;
      }
      return 'Damage Given/Recieved';
    },
    'killspan': function(weeks){
      var totalTime = 0, totalKills = 0;
      for(var i = 0; i < weeks.length; i++){
        totalTime += weeks[i]['totalTime'];
        totalKills += weeks[i]['numKills'];
        var killspan = totalTime / totalKills;
        if(!isFinite(killspan))
          weeks[i]['killspan'] = totalTime;
        else
          weeks[i]['killspan'] = killspan;
      }
      return 'Killspan';
    },
    'lifespan': function(weeks){
      var totalTime = 0, totalDeaths = 0;
      for(var i = 0; i < weeks.length; i++){
        totalTime += weeks[i]['totalTime'];
        totalDeaths += weeks[i]['numDeaths'];
        lifespan = totalTime / totalDeaths;
        if(!isFinite(lifespan))
          weeks[i]['lifespan'] = totalTime;
        else
          weeks[i]['lifespan'] = lifespan;
      }
      return 'Lifespan';
    },
  },
  invert:['killspan'],
  players:{"player0":{"name":"Player 0","weeks":[{"damageGiven":273,"damageRecieved":316,"numKills":2,"numDeaths":5,"totalTime":89},{"damageGiven":330,"damageRecieved":294,"numKills":0,"numDeaths":1,"totalTime":68},{"damageGiven":325,"damageRecieved":316,"numKills":2,"numDeaths":6,"totalTime":114},{"damageGiven":326,"damageRecieved":309,"numKills":6,"numDeaths":2,"totalTime":103},{"damageGiven":320,"damageRecieved":274,"numKills":0,"numDeaths":0,"totalTime":72},{"damageGiven":296,"damageRecieved":273,"numKills":3,"numDeaths":2,"totalTime":61}]},"player1":{"name":"Player 1","weeks":[{"damageGiven":284,"damageRecieved":322,"numKills":6,"numDeaths":5,"totalTime":98},{"damageGiven":270,"damageRecieved":272,"numKills":1,"numDeaths":6,"totalTime":85},{"damageGiven":303,"damageRecieved":305,"numKills":1,"numDeaths":3,"totalTime":113},{"damageGiven":327,"damageRecieved":310,"numKills":2,"numDeaths":3,"totalTime":77},{"damageGiven":306,"damageRecieved":321,"numKills":6,"numDeaths":1,"totalTime":103},{"damageGiven":292,"damageRecieved":317,"numKills":3,"numDeaths":3,"totalTime":77}]},"player2":{"name":"Player 2","weeks":[{"damageGiven":325,"damageRecieved":315,"numKills":3,"numDeaths":6,"totalTime":119},{"damageGiven":281,"damageRecieved":279,"numKills":6,"numDeaths":2,"totalTime":118},{"damageGiven":310,"damageRecieved":281,"numKills":5,"numDeaths":4,"totalTime":93},{"damageGiven":273,"damageRecieved":301,"numKills":4,"numDeaths":5,"totalTime":108},{"damageGiven":274,"damageRecieved":294,"numKills":1,"numDeaths":6,"totalTime":113},{"damageGiven":318,"damageRecieved":289,"numKills":2,"numDeaths":4,"totalTime":90}]},"player3":{"name":"Player 3","weeks":[{"damageGiven":295,"damageRecieved":286,"numKills":4,"numDeaths":1,"totalTime":62},{"damageGiven":291,"damageRecieved":308,"numKills":3,"numDeaths":5,"totalTime":78},{"damageGiven":277,"damageRecieved":293,"numKills":4,"numDeaths":1,"totalTime":68},{"damageGiven":321,"damageRecieved":281,"numKills":3,"numDeaths":3,"totalTime":63},{"damageGiven":328,"damageRecieved":304,"numKills":4,"numDeaths":0,"totalTime":105},{"damageGiven":276,"damageRecieved":293,"numKills":2,"numDeaths":5,"totalTime":66}]},"player4":{"name":"Player 4","weeks":[{"damageGiven":289,"damageRecieved":274,"numKills":1,"numDeaths":4,"totalTime":72},{"damageGiven":319,"damageRecieved":320,"numKills":4,"numDeaths":4,"totalTime":76},{"damageGiven":280,"damageRecieved":310,"numKills":1,"numDeaths":2,"totalTime":62},{"damageGiven":315,"damageRecieved":286,"numKills":4,"numDeaths":1,"totalTime":108},{"damageGiven":319,"damageRecieved":288,"numKills":3,"numDeaths":2,"totalTime":104},{"damageGiven":272,"damageRecieved":303,"numKills":6,"numDeaths":2,"totalTime":69}]},"player5":{"name":"Player 5","weeks":[{"damageGiven":288,"damageRecieved":273,"numKills":6,"numDeaths":3,"totalTime":114},{"damageGiven":284,"damageRecieved":318,"numKills":2,"numDeaths":4,"totalTime":87},{"damageGiven":304,"damageRecieved":316,"numKills":5,"numDeaths":0,"totalTime":108},{"damageGiven":270,"damageRecieved":327,"numKills":3,"numDeaths":3,"totalTime":84},{"damageGiven":301,"damageRecieved":310,"numKills":4,"numDeaths":3,"totalTime":60},{"damageGiven":287,"damageRecieved":330,"numKills":5,"numDeaths":0,"totalTime":98}]},"player6":{"name":"Player 6","weeks":[{"damageGiven":303,"damageRecieved":276,"numKills":0,"numDeaths":2,"totalTime":82},{"damageGiven":279,"damageRecieved":288,"numKills":3,"numDeaths":1,"totalTime":113},{"damageGiven":313,"damageRecieved":301,"numKills":2,"numDeaths":5,"totalTime":108},{"damageGiven":320,"damageRecieved":318,"numKills":6,"numDeaths":0,"totalTime":101},{"damageGiven":313,"damageRecieved":287,"numKills":4,"numDeaths":6,"totalTime":74},{"damageGiven":307,"damageRecieved":328,"numKills":6,"numDeaths":0,"totalTime":76}]},"player7":{"name":"Player 7","weeks":[{"damageGiven":290,"damageRecieved":273,"numKills":4,"numDeaths":6,"totalTime":113},{"damageGiven":273,"damageRecieved":298,"numKills":1,"numDeaths":5,"totalTime":64},{"damageGiven":303,"damageRecieved":321,"numKills":3,"numDeaths":6,"totalTime":109},{"damageGiven":312,"damageRecieved":270,"numKills":5,"numDeaths":4,"totalTime":110},{"damageGiven":284,"damageRecieved":313,"numKills":3,"numDeaths":1,"totalTime":98},{"damageGiven":310,"damageRecieved":298,"numKills":3,"numDeaths":0,"totalTime":70}]},"player8":{"name":"Player 8","weeks":[{"damageGiven":291,"damageRecieved":285,"numKills":3,"numDeaths":3,"totalTime":64},{"damageGiven":315,"damageRecieved":321,"numKills":2,"numDeaths":1,"totalTime":90},{"damageGiven":279,"damageRecieved":316,"numKills":4,"numDeaths":2,"totalTime":77},{"damageGiven":312,"damageRecieved":293,"numKills":1,"numDeaths":0,"totalTime":108},{"damageGiven":308,"damageRecieved":320,"numKills":1,"numDeaths":1,"totalTime":84},{"damageGiven":305,"damageRecieved":290,"numKills":5,"numDeaths":1,"totalTime":106}]},"player9":{"name":"Player 9","weeks":[{"damageGiven":324,"damageRecieved":285,"numKills":1,"numDeaths":1,"totalTime":81},{"damageGiven":302,"damageRecieved":326,"numKills":0,"numDeaths":1,"totalTime":73},{"damageGiven":314,"damageRecieved":308,"numKills":1,"numDeaths":5,"totalTime":102},{"damageGiven":286,"damageRecieved":284,"numKills":0,"numDeaths":3,"totalTime":115},{"damageGiven":322,"damageRecieved":287,"numKills":4,"numDeaths":3,"totalTime":110},{"damageGiven":306,"damageRecieved":297,"numKills":0,"numDeaths":2,"totalTime":74}]},"player10":{"name":"Player 10","weeks":[{"damageGiven":319,"damageRecieved":276,"numKills":2,"numDeaths":3,"totalTime":66},{"damageGiven":277,"damageRecieved":292,"numKills":3,"numDeaths":0,"totalTime":112},{"damageGiven":318,"damageRecieved":320,"numKills":5,"numDeaths":0,"totalTime":60},{"damageGiven":284,"damageRecieved":292,"numKills":2,"numDeaths":0,"totalTime":78},{"damageGiven":298,"damageRecieved":288,"numKills":2,"numDeaths":4,"totalTime":79},{"damageGiven":272,"damageRecieved":287,"numKills":6,"numDeaths":1,"totalTime":105}]},"player11":{"name":"Player 11","weeks":[{"damageGiven":305,"damageRecieved":328,"numKills":1,"numDeaths":2,"totalTime":112},{"damageGiven":297,"damageRecieved":302,"numKills":1,"numDeaths":5,"totalTime":61},{"damageGiven":298,"damageRecieved":295,"numKills":1,"numDeaths":6,"totalTime":116},{"damageGiven":273,"damageRecieved":295,"numKills":3,"numDeaths":4,"totalTime":98},{"damageGiven":306,"damageRecieved":302,"numKills":2,"numDeaths":1,"totalTime":97},{"damageGiven":292,"damageRecieved":276,"numKills":2,"numDeaths":4,"totalTime":96}]},"player12":{"name":"Player 12","weeks":[{"damageGiven":308,"damageRecieved":313,"numKills":6,"numDeaths":6,"totalTime":100},{"damageGiven":271,"damageRecieved":298,"numKills":6,"numDeaths":1,"totalTime":83},{"damageGiven":321,"damageRecieved":316,"numKills":6,"numDeaths":0,"totalTime":103},{"damageGiven":296,"damageRecieved":316,"numKills":5,"numDeaths":1,"totalTime":86},{"damageGiven":314,"damageRecieved":272,"numKills":5,"numDeaths":3,"totalTime":86},{"damageGiven":309,"damageRecieved":308,"numKills":0,"numDeaths":5,"totalTime":88}]},"player13":{"name":"Player 13","weeks":[{"damageGiven":309,"damageRecieved":275,"numKills":3,"numDeaths":6,"totalTime":87},{"damageGiven":328,"damageRecieved":278,"numKills":2,"numDeaths":1,"totalTime":96},{"damageGiven":300,"damageRecieved":306,"numKills":3,"numDeaths":1,"totalTime":117},{"damageGiven":312,"damageRecieved":311,"numKills":2,"numDeaths":6,"totalTime":85},{"damageGiven":286,"damageRecieved":279,"numKills":0,"numDeaths":0,"totalTime":68},{"damageGiven":279,"damageRecieved":325,"numKills":0,"numDeaths":2,"totalTime":71}]},"player14":{"name":"Player 14","weeks":[{"damageGiven":293,"damageRecieved":289,"numKills":1,"numDeaths":4,"totalTime":82},{"damageGiven":294,"damageRecieved":277,"numKills":1,"numDeaths":1,"totalTime":63},{"damageGiven":275,"damageRecieved":297,"numKills":1,"numDeaths":4,"totalTime":120},{"damageGiven":271,"damageRecieved":285,"numKills":6,"numDeaths":1,"totalTime":73},{"damageGiven":299,"damageRecieved":315,"numKills":1,"numDeaths":2,"totalTime":79},{"damageGiven":271,"damageRecieved":281,"numKills":5,"numDeaths":0,"totalTime":120}]},"player15":{"name":"Player 15","weeks":[{"damageGiven":292,"damageRecieved":321,"numKills":4,"numDeaths":3,"totalTime":78},{"damageGiven":311,"damageRecieved":272,"numKills":5,"numDeaths":6,"totalTime":89},{"damageGiven":277,"damageRecieved":307,"numKills":0,"numDeaths":1,"totalTime":78},{"damageGiven":318,"damageRecieved":307,"numKills":3,"numDeaths":4,"totalTime":87},{"damageGiven":315,"damageRecieved":325,"numKills":3,"numDeaths":3,"totalTime":82},{"damageGiven":283,"damageRecieved":271,"numKills":2,"numDeaths":5,"totalTime":118}]},"player16":{"name":"Player 16","weeks":[{"damageGiven":286,"damageRecieved":300,"numKills":3,"numDeaths":6,"totalTime":97},{"damageGiven":316,"damageRecieved":316,"numKills":1,"numDeaths":1,"totalTime":76},{"damageGiven":292,"damageRecieved":299,"numKills":5,"numDeaths":0,"totalTime":96},{"damageGiven":330,"damageRecieved":290,"numKills":4,"numDeaths":1,"totalTime":95},{"damageGiven":305,"damageRecieved":284,"numKills":5,"numDeaths":0,"totalTime":89},{"damageGiven":275,"damageRecieved":274,"numKills":6,"numDeaths":5,"totalTime":80}]},"player17":{"name":"Player 17","weeks":[{"damageGiven":291,"damageRecieved":299,"numKills":3,"numDeaths":6,"totalTime":105},{"damageGiven":284,"damageRecieved":324,"numKills":6,"numDeaths":4,"totalTime":97},{"damageGiven":327,"damageRecieved":284,"numKills":3,"numDeaths":1,"totalTime":104},{"damageGiven":299,"damageRecieved":270,"numKills":5,"numDeaths":0,"totalTime":115},{"damageGiven":326,"damageRecieved":327,"numKills":5,"numDeaths":1,"totalTime":89},{"damageGiven":299,"damageRecieved":273,"numKills":1,"numDeaths":5,"totalTime":91}]},"player18":{"name":"Player 18","weeks":[{"damageGiven":311,"damageRecieved":272,"numKills":2,"numDeaths":4,"totalTime":117},{"damageGiven":319,"damageRecieved":316,"numKills":1,"numDeaths":1,"totalTime":107},{"damageGiven":311,"damageRecieved":290,"numKills":6,"numDeaths":3,"totalTime":68},{"damageGiven":289,"damageRecieved":279,"numKills":2,"numDeaths":6,"totalTime":65},{"damageGiven":324,"damageRecieved":289,"numKills":3,"numDeaths":6,"totalTime":112},{"damageGiven":325,"damageRecieved":320,"numKills":4,"numDeaths":1,"totalTime":68}]},"player19":{"name":"Player 19","weeks":[{"damageGiven":314,"damageRecieved":310,"numKills":6,"numDeaths":3,"totalTime":62},{"damageGiven":284,"damageRecieved":275,"numKills":4,"numDeaths":5,"totalTime":98},{"damageGiven":274,"damageRecieved":325,"numKills":1,"numDeaths":0,"totalTime":69},{"damageGiven":327,"damageRecieved":299,"numKills":3,"numDeaths":6,"totalTime":104},{"damageGiven":295,"damageRecieved":300,"numKills":3,"numDeaths":2,"totalTime":94},{"damageGiven":297,"damageRecieved":284,"numKills":5,"numDeaths":4,"totalTime":85}]}}
}
