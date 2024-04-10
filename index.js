//generate a random number
let randomNumber = parseInt(Math.random()*100+1)

const userInput =document.querySelector('#guess')
const previous = document.querySelector('#previous')
const remaining = document.querySelector('#remaining')
const submit = document.querySelector('#submit')
const loworhi = document.querySelector('#loworhi')
const startOver =  document.querySelector('.result')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1;

let playGame = true;


// check if you are eligible to play a game or not
if(playGame){
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        const guess = parseInt(userInput.value)
        console.log(guess);
        validateGuess(guess);
    })
}

//check if the number is valid or not
function validateGuess(guess){
    if(isNaN(guess) || guess < 1 || guess > 100){
        alert('PLEASE ENTER THE VALID NUMBER!!')
    }else
    prevGuess.push(guess)
    //check if game is over ot not (check number of guesses)
    if(numGuess>=11){
        displayGuess(guess)
        displayMessage(`Game Over. Random Number was ${randomNumber}`)
        endGame()
    }
    else{
        displayGuess(guess)
        checkGuess(guess)
    }
}

// to give message weather the value is high or low
function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`you guessed it right!`)
    }
    else if(guess < randomNumber){
        displayMessage(`number is too low!`)
    }
    else if(guess > randomNumber){
        displayMessage(`number is too high`)
    }
}

//clean values to input new values, update guess arrays, update remaining guess
function displayGuess(guess){
    userInput.value = '';
    previous.innerHTML += `${guess}, `
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`
}


//this one is to direct interact with dom
function displayMessage(message){
    loworhi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    //clean all values
    userInput.value = ''
    // do something that user cant add more values
    userInput.setAttribute('disabled', '')  //disabled always used as akey value pair so value used as a empty string
    p.classList.add('button');
    p.innerHTML= `<h2 id="newGame" >Start new game</h2>`;
    startOver.appendChild(p)
    playGame = false
    newGame()
}


function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click' , (e) => {
        randomNumber = parseInt(Math.random()*100+1)
        prevGuess = []
        numGuess = 1
        previous.innerHTML= ``
        remaining.innerHTML = `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })
}