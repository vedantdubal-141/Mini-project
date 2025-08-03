 //DOM elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const resumeBtn = document.querySelector('#resumeBtn')
const pauseBtn = document.querySelector('#pauseBtn')
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');



//requried variable
var score = 0;
var time = 30;
var best = 0;
var playGame = false;
var gameId = null;



//common function
function webLoad(){
    onLoad();
    displayContent();
}



function onLoad(){
    var temp = localStorage.getItem('highScoreMole');
    //terneriopreter
    // bestScore = (temp != null)
    if(temp != null){
        bestScore = temp;
    }
    else{
        bestScore = 0;
    }
}


function displayContent(){
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}

function randomTime(min,max){
    return Math.floor(Math.random()*(max - min) + max);
}

function randomHole(){
    var index = Math.floor(Math.random() * holes.length);//holes.length --->access the no. of box from html//for generate the random hole to popup 
    console.log(holes[index]);
    return holes[index];

    //0th  <div class="hole" id="hole1">
    //   <div class="mole"></div>
    // </div>
}

function popGame(){
    //setTimeOut{func,milisec} -->for
   var timer = randomTime(500,1500);
   var hole = randomHole();
   var mole = hole.querySelector('.mole');
   if(playGame){
    mole.classList.add('up');
   setTimeout(function(){
     mole.classList.remove('up');
     popGame();
   } , timer);
}
}

function startGame(){
    time = 30;
    score = 0;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resumeBtn.disabled = false;
    playGame = true;
    popGame();

    gameId = setInterval(function(){
        time--;
        if(time == 0){
            endGame();
        }
        displayContent();
    },1000);
}
function endGame(){
    clearInterval(gameId);
    startBtn.disabled = false; //for unable the btn
    playGame = false;
    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'none'
    if(score > bestScore){
        bestScore = score;
        score = 0;
        localStorage.setItem('highScoreMole',score);//for update in localstorage
        alert(`you've scored max value then previous one : ${score}`);
    }
    else{
        alert(`you're current score is : ${score}`);
    }
    displayContent();
}

function bonk(event){
   if(!event.isTrusted) return;//return boolean
   if(playGame == false) return;
   if(event.target.classList.contains('up')){
    score++;
     event.target.classList.remove('up');
     event.target.classList.add('bonked');

   }
   setTimeout(function(){
    displayContent();
     event.target.classList.remove('bonked');
   },300);
//    event.target.classList.remove('up');
}
function resumeGame(){
    playGame = true;
     gameId = setInterval(function(){
        time--;
        if(time == 0){
            endGame();
        }
        displayContent();
    },1000);
    popGame();
    pauseBtnBtn.style.display = 'none';
}
function pauseGame(){
    clearInterval(gameId);
    resumeBtn.disabled = false;
    playGame = false;
    resumeBtn.style.display = 'block';
}


webLoad();

moles.forEach((box)=>{
    box.addEventListener('click',bonk);
})
startBtn.addEventListener('click',startGame);
resumeBtn.addEventListener('click',resumeGame);
pauseBtn.addEventListener('click',pauseGame);