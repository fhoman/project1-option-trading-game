// Create class with rendering different styling for type of screens


class Screens {

    constructor(player) {
        this.divElement = document.getElementById('game')
        this.divElementTradeBox = document.getElementById('trade-box')
        this.name = player.name;  

    }

    renderIntroductionScreen() {
        this.divElement.innerHTML = `<div><div class='introduction'>Hi ${this.name},
     <br> If you want to be a good option trader. You need to think quick and 
     know which option strategies you need to use in which markets. In this game 
     we are going to test if you are able to beat the markets!</div>
     <div class='button-container'><button class='btn btn-warning' id='start-questions'>
     Start the questions!</button></div></div>`
    }

    renderQuestionScreens(question, score, category, strategy) {

        // Render multiple choice screens
        if (category === 'multiple') {
            this.divElement.innerHTML = `<div class='multiplechoice'><div class='top'>
    <div class='question'><h2>${question.question}</h2></div>
    <div><span id='timer'>10</span></div></div><div class='question-container'>
    <ul id='multiplechoice'></ul> <div class='question-image'>
    <img src="./images/${question.image}"></div></div></div></div>`
            var answersContainer = document.getElementById('multiplechoice')
            question.answers.forEach((element, index) => {
                let node = document.createElement("LI");
                node.className = 'answer'
                let textnode = document.createTextNode(`${element.answer}`);
                node.appendChild(textnode);
                answersContainer.appendChild(node)
            });

        }
        // Render trade demo screen
        else if (category === 'trade-demo') {

            var domstringQuotes = '';
            this.divElement.innerHTML = `<span id='timer'></span>
    <table class="quote-box"><thead><tr><th colspan="3">Call</th><th>Serie</th>
    <th colspan="3">Put</th></tr></thead><tr><td></td><td>Bied</td><td>Laat</td>
    <td class='serie'>${question.serie.stock}</td><td>Bied</td><td>Laat</td><td></td>
    </tr><tbody id='quote-box'></tbody></table><table class="trade-box" id='trade-box'>
    <head><tr><td>Actie</td><td>Expiratiedatum</td><td>Strike</td><td>Type</td></tr>
    </thead><tbody id='strategies'></tbody></table>`
            question.quotes.forEach(function (element) {
                domstringQuotes += `<tr id='${element[2]}'><td class='delete'></td><td class='call-bid'>${element[0]}</td>
    <td class='call-ask'>${element[1]}</td><td class='strike'>${element[2]}
    </td><td class='put-bid'>${element[3]}</td><td class='put-ask'>${element[4]}
    </td><td class='delete'></td></tr>`

            })

            var quoteBoxElement = document.getElementById('quote-box')
            quoteBoxElement.innerHTML = domstringQuotes;

        }

    }

    renderFeedbackScreen(question, score, category, answer) {
      console.log(answer);
        // Feedback screen generated for the multiple choice questions 

        if (category === 'multiple') {

            this.divElement.innerHTML = `<div class='multiplechoice'><div class='top'>
        <div class='question'><h2>${question.question}</h2></div>
        <div><span class='score-player'>Your score: ${score}</span></div></div>
        <div class='question-container'><ul id='multiplechoice'> </ul>
        <div class='feedback-container'><div class='question-image'> 
        <img src="./images/${question.image}"></div>
        <div class='feedback'>${question.feedback}</div>
        <div><button class='btn btn-warning' id='next-question'>
        Next question</button></div></div></div></div></div>`

            var answersContainer = document.getElementById('multiplechoice')
            question.answers.forEach(element => {


                var node = document.createElement("LI");
                var textnode = document.createTextNode(`${element.answer}`)


                if (element.state === false) {

                    node.className = 'answer inactive'
                    node.appendChild(textnode);
                    answersContainer.appendChild(node)

                } else {

                    node.className = 'answer right-answer';
                    node.appendChild(textnode);
                    answersContainer.appendChild(node)

                }

                if (answer[0].answer === element.answer && element.state === false) {

                    node.className = 'answer chosen-answer'
                    node.appendChild(textnode);
                    answersContainer.appendChild(node)

                }

            });

        }

        // Feedback screen generated for the trade demo 
        else if (category === 'trade-demo') {

            if (score > 0) {
                this.divElement.innerHTML = `<div class='multiplechoice'><div class='top'>
       
        <div><span class='score-player'>${score}</span></div></div>
        <div class='question-container'><ul id='multiplechoice'> </ul>
        <div class='feedback-container'>        
        
        <div><button class='btn btn-warning' id='next-question'>
        Next question</button> </div>
        </div></div> </div>               
        </div>`

            } else {

                this.divElement.innerHTML = `<div class='multiplechoice'><div class='top'>
       
        <div><span class='score-player'>${score}</span></div></div>
        <div class='question-container'><ul id='multiplechoice'> </ul>
        <div class='feedback-container'>        
            
        <div><button class='btn btn-warning' id='next-question'>
        Next question</button> </div>
        </div></div> </div>               
        </div>`

            }

        }
    }
    // Screen for generating trade box with strategies
    renderTradeBoxScreen(questions, strategies) {

        // Fill the trade box with strategies
        var tradeBoxStrategiesElement = document.getElementById('strategies')
        var domString = '';
        const deleteElement = `<i class="fas fa-times" aria-hidden="true"></i>`
        strategies.forEach(function (value) {

            domString += `<tr><td class='action'>${value.action}</td>
    <td class='expiration'>${questions.serie.date}</td><td class='strike'>
    ${value.strike}</td><td class='type'>${value.type}</td></tr>`

            if (value.type === 'Call') {

                var quoteBoxRow = document.getElementById(value.strike);

                if (value.action === 'Buy') {
                    quoteBoxRow.className = 'active-left-buy';
                    console.log(quoteBoxRow);
                    quoteBoxRow.firstElementChild.innerHTML = deleteElement

                } else {

                    quoteBoxRow.className = 'active-left-sell'
                    quoteBoxRow.firstElementChild.innerHTML = deleteElement

                }

            } else if (value.type === 'Put') {

                var quoteBoxRow = document.getElementById(value.strike);

                if (value.action === 'Buy') {
                    quoteBoxRow.className = 'active-right-buy'

                    quoteBoxRow.firstElementChild.nextElementSibling.nextElementSibling.
                    nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
                    innerHTML = deleteElement

                } else {

                    quoteBoxRow.className = 'active-right-sell'
                    quoteBoxRow.firstElementChild.nextElementSibling.nextElementSibling.
                    nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
                    innerHTML = deleteElement

                }

            }

        })
        tradeBoxStrategiesElement.innerHTML = domString;

    }


    renderResultScreen(score, highscores) {
    let resultText = '';
    if (score > 100 ) {
    resultText = `Great work`;
    }
    else {
    resultText = `Try harder`
    }
        this.divElement.innerHTML = `<div class='result'>
    <div class='top'><div class='question'><button class='btn btn-warning' 
    id='start-game' class='start-button'>Play the game again</button></div></div>
    <div class='result-container'>${resultText} ${this.name}! Your 
    total score is ${score}! <br><br></div><div class='feedback-container'> 
    <table class='table'><thead><tr><th>Player </th><th>Score</th></tr></thead>
    <tbody id='highscores'></tbody></table></div></div>`

        var highScoreContainer = document.getElementById('highscores')
        var domStringRows = '';


        for (let i = 0; i < highscores.length; i++) {

            domStringRows += `<tr><td>${highscores[i].name}</td><td>${highscores[i].score}</td></tr>`


            if (i > 2) {

                return highScoreContainer.innerHTML = domStringRows;


            }

        }




    }

}