var stats = {
  'Points': {
    'stat':'Wins',
    'trim': 0,
    'graph': false,
    'sort':function(first,second){
      return second.current - first.current;
    }
  },
  'K/D': {
    'stat':'K/D',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return second.current - first.current;
    }
  },
  'DG/DR': {
    'stat':'DG/DR',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return second.current - first.current;
    }
  },
  'DG/K': {
    'stat':'DG/K',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return first.current - second.current;
    }
  },
  'DR/D': {
    'stat':'DR/D',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return second.current - first.current;
    }
  },
  'Lifespan': {
    'stat':'Lfspn',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return second.current - first.current;
    }
  },
  'Killspan': {
  'trim':10,
    'stat':'Klspn',
    'graph': true,
    'sort':function(first,second){
      return first.current - second.current;
    }
  },
  'DPS': {
    'stat':'DPS',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return second.current - first.current;
    }
  },
  'DRPS': {
    'stat':'DRPS',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return first.current - second.current;
    }
  },
  'Peak Damage': {
    'trim':10,
    'stat':'Peak Damage',
    'graph': true,
    'sort':function(first,second){
      return second.current.max - first.current.max;
    }
  },
  'Hit %': {
    'stat':'Hit%',
    'trim':10,
    'graph': true,
    'sort':function(first,second){
      return second.current - first.current;
    }
  }
}

module.exports = stats;
