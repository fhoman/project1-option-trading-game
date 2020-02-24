const JSONdata = JSON.stringify([{
  //    id: 1,
  //    question: `Buy a long straddle Tesla with a strike of 800`,
  //    answer: [{
  //       'type': 'Call',
  //        'action': 'Buy',
  //        'strike': 800
  //    }, {
  //        'type': 'Put',
  //        'action': 'Buy',
  //        'strike': 800
  //   }],
  //    category: 'trade-demo',
  //   serie: {
  //        ISIN: 'Tesla',
  //        stock: 'TSLA FEB 2020',
  //        date: 'FEB 2020'
  //    },
  //     quotes: [
  //        ['1,10', '1,14', '895', '1,16', '1,16'],
  //        ['1,10', '1,14', '925', '1,16', '1,16'],
  //        ['1,10', '1,14', '900', '1,16', '1,16'],
  //        ['1,10', '1,14', '930', '1,16', '1,16'],
  //        ['1,10', '1,14', '905', '1,16', '1,16'],
  //       ['1,10', '1,14', '935', '1,16', '1,16'],
  //       ['1,10', '1,14', '910', '1,16', '1,16'],
  //      ['1,10', '1,14', '940', '1,16', '1,16'],
  //       ['1,10', '1,14', '915', '1,16', '1,16'],
  //       ['1,10', '1,14', '945', '1,16', '1,16'],
  //       ['1,10', '1,14', '920', '1,16', '1,16']
  //    ]
  // },

  // {
  id: 2,
  question: 'Which option strategy is this profit loss from?',
  category: 'multiple',
  answers: [{
    answer: 'Iron condor',
    state: false
  }, {
    answer: 'Long call spread',
    state: false
  }, {
    answer: 'Long straddle',
    state: false
  }, {
    answer: 'Long put spread',
    state: true
  }],
  image: 'optiestrategie_longputspread_v1.jpg',
  feedback: 'This is the profit loss diagram of the option strategy Long put spread'
},
{
  id: 3,
  question: 'Which option strategy is this profit loss from?',
  category: 'multiple',
  answers: [{
    answer: 'Short strangle',
    state: false
  }, {
    answer: 'Long call spread',
    state: false
  }, {
    answer: 'Long straddle',
    state: true
  }, {
    answer: 'Long call',
    state: false
  }],
  image: 'optiestrategie_longstraddle_v1.jpg',
  feedback: 'This is the profit/loss diagram of the option strategy Long straddle'
},

{
  id: 4,
  question: 'Which option strategy is this profit loss from?',
  category: 'multiple',
  answers: [{
    answer: 'Butterfly',
    state: false
  }, {
    answer: 'Long call spread',
    state: false
  }, {
    answer: 'Long time spread',
    state: true
  }, {
    answer: 'Short put spread',
    state: false
  }],
  image: 'optiestrategie_longtimespread_v1.jpg',
  feedback: 'This is the profit/loss diagram of the option strategy Long time spread'
}
])

