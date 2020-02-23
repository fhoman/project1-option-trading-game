// Event lister on start game button

document.getElementById('start-game').addEventListener('click', function (e) {
    const name = document.getElementById('player-name').value;
    if (name) {
        const quiz = new Quiz(name, 2);
        quiz.startGame(name);
    } else {
        alert('fill in your name')
    }
}, {
    once: true
})

// Create class quiz with logic to run the quiz

class Quiz {

    constructor(name, number) {
        // Generate new player
        this.player = new Player(name);
        this.name = this.player.name;
        this.score = this.player.score;
        this.answers = this.player.answers;
        this.answer = this.player.answer;
        // Render screen class
        this.screens = new Screens(this.player);
        // Generate randomArray of questions based on number
        this.highScores = [{name:'Erik',score: 100},{name:'Pieter',score: 40},{name:'Marie',score: 30}]
        this.number = number;
        this.questionsArray = this.getRandomQuestions();
        // Set variables for the timer elements
        this.timeQuestion = 10;
        this.timeTimeOutQuestion = 10000
        this.timeLeftQuestion = null
        this.seconds = 0;
        this.rightAnswer = 100;
        this.timeoutID = undefined
        this.timerID = undefined
    }

    // Initialise a new game
    startGame() {
        
        this.screens.renderIntroductionScreen();
        // Add event listeners for different screens        
        this.addEventListenerIntro()
        this.addEventListenerMultipleQuestions()
        this.addEventListenerFeedback()
    }

    getRandomQuestions() {
        const number = this.number
        const data = [];
        JSON.parse(JSONdata).forEach(function (element, index) {
            if (element.category === 'multiple' || 'trade-demo') {
                data.push(element);
            }
            if (index > number - 1) {
                return data;
            }
        })
        return data;
    }

    questionsLoop() {
        // Check if the array with questions is empty to trigger result screen
        if (this.questionsArray.length < 1) {
            this.addScorePlayer({
                'name': this.name,
                'score': this.score
            })
            this.screens.renderResultScreen(this.score, this.highScores);
            this.addEventListenerStart()
            return
        }
        // render new question screen based on category
        this.screens.renderQuestionScreens(this.questionsArray[0], this.score,
            this.questionsArray[0].category)
        // Set timer to count down seconds for every question
        this.setTimer()
        // Set timeout for question
        this.timeoutID = setTimeout(() => {
            // Update score if the timeout is finished
            this.calculateScore();
            // no answer was give is updated in the answer array
            this.player.answers.push({
                'answer': null,
                'state': false,
                'score': 0
            })
            // trigger feedback screen and event listener if the timeout is finished          
            this.feedBackLoop()
        }, this.timeTimeOutQuestion)
    }
    // Start the feedback loop if the timeout has finished
    feedBackLoop() {
        // Render the feedback loop screen if the timeout
        this.screens.renderFeedbackScreen(this.questionsArray[0], this.score,
            this.questionsArray[0].category, this.player.answers);
        // Remove the question from the array after the feedback loop is finished
        this.questionsArray.splice(0, 1);
        this.player.answers.splice(0, 1);
    }
    calculateScore() {
        // Check the answer with loop over the array
        this.questionsArray[0].answers.forEach(this.checkAnswersMultiple.bind(this))
    }
    checkAnswersMultiple(element) {
        if (this.answer === element.answer) {
            if (element.state === true) {
                this.score += this.rightAnswer;
                this.score += this.timeLeftQuestion;
                this.player.answers.push({
                    'answer': element.answer,
                    'state': element.state,
                    'score': this.rightAnswer + this.timeLeftQuestion
                })
            } else {
                this.player.answers.push({
                    'answer': element.answer,
                    'state': element.state,
                    'score': 0
                })
            }
        }
    }

    setTimer() {
        this.timeElement = document.getElementById('timer');
        this.timerID = setInterval(countdown.bind(this), 1000);

        function countdown() {
            if (this.timeQuestion === 0) {
                clearTimeout(this.timerID);
            } else {
                this.timeElement.innerHTML = `${this.timeQuestion}`;
                this.timeQuestion--;
            }
        }
    }
    calculateTimeBonus() {
        if (time > 0) {
            this.score += this.rightAnswer;
            this.score += time;
            this.player.answers.push({
                'score': this.rightAnswer + time
            })
        } else if (time < 1) {
            this.player.answers.push({
                'score': 0,
            })
        }
    }
    addEventListenerStart() {
        this.screens.divElement.addEventListener('click', function (e) {
            if (e.target.id === 'start-game') {
                location.reload()
            }
        }, {
            once: true
        })
    }
    // Event listeners for all rendered screens
    addEventListenerIntro() {
        this.screens.divElement.addEventListener('click', (e) => {
            if (e.target.id === 'start-questions') {
                this.questionsLoop();
            }
        })
    }
    addEventListenerMultipleQuestions() {
        this.screens.divElement.addEventListener('click', (e) => {
            if (e.target.className === 'answer') {
                clearTimeout(this.timeoutID)
                clearTimeout(this.timerID)
                this.answer = e.target.innerText;
                this.timeLeftQuestion = this.timeQuestion
                this.calculateScore()
                this.feedBackLoop();
            }
        })
    }
    addEventListenerFeedback() {
        this.screens.divElement.addEventListener('click', (e) => {
            if (e.target.id === 'next-question') {
                this.questionsLoop()
            }
        })
    }

    addScorePlayer(player) {
        console.log(this.highScores)
        this.highScores.push(player);
        this.highScores.sort(function (a, b) {
            return b.score - a.score;
        });    
        console.log(this.highScores)
    }
}


class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.answers = [];
        this.answer = null;
    }
}