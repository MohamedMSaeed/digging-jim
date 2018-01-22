var gameScore = document.getElementById("score");
var gameLevel = document.getElementById("level");
var gameLifes = document.getElementById("lifes");
var gameOver = document.getElementById("gameOver");
var winGame = document.getElementById("congratulations");
var startHome = document.getElementById("startHome");
var footer = document.getElementById("footer");

var maxWidth = 1800;
var maxHight = 1200;
var lifes = 3;
var level = 0; 
var index=0;
var score=0;
var totalScore = 0;
var charIndex = 42;

var rockImages;
var diamondImages;


/////////////////////////////////////////////////////////////////////////////////////
// Game Audios ////////////////////////////////
var walkingAudio = new Audio("audio/footStepsOnGrass.mp3");

var loadingAudio = new Audio('audio/loadingGame.mp3');

var losingAudio = new Audio("audio/losing.mp3");

var movingRockAudio = new Audio('audio/movingRock.mp3');

var OpenDoorAudio = new Audio("audio/OpenDoor.mp3");

var takeCoinAudio = new Audio('audio/takeCoin.mp3');

var winnerAudio = new Audio('audio/winner.mp3');
////////////////////////////////////////////////////////////////////////////////////////

/////// To reset level variables ////////////////////
function resetVariables(){
    pressleftFlag = false;
    pressRightFlag = false;
    pressUpFlag = false;
    pressDownFlag = false;
    characterRunningFlag = false;
    characterIdleflag = true;
    characterLookLeft = false;
    characterLookRight = false;
    characterLookUp = false;
    characterLookDown = false;
    charIndex = 42;
    index = 0;
    score = 0;
}
////////////////////////////////////////////////////////////////////////

/////// To Start The Level ////////////////////
var gameDivLevel;
function startLevel(){
    setTimeout(function(){
        if(level!=0){
            gameDivLevel.setAttribute("style","display: none");
            gameDivLevel.innerHTML = "";
        }
        level++;
        resetVariables();
        if(level<4){
            gameLevel.innerHTML = level;
            gameLifes.innerHTML = lifes;
            gameScore.innerHTML = score;
            window.scrollTo(0,0);
            gameDivLevel = document.getElementById('level'+level);
            gameDivLevel.innerHTML = "";
            gameDivLevel.setAttribute("style","display: block");
            if(level==1)
                drawMyGame(gameDivLevel,RockIndex1,DiamondIndex1,blockIndex1);
            else if(level==2)
                drawMyGame(gameDivLevel,RockIndex2,DiamondIndex2,blockIndex2);
            else if(level==3)
                drawMyGame(gameDivLevel,RockIndex3,DiamondIndex3,blockIndex3);
            rockImages = document.getElementsByClassName("rock");
            diamondImages = document.getElementsByClassName("diamond");
        }else{
            gameDivLevel.innerHTML = "";
            gameDivLevel.setAttribute("style","display: none");
            winGame.setAttribute("style","display: block");
            // To stop Character Intervals //////////////////
            clearInterval(lookWhereInterval);
            clearInterval(characterRunningInterval);
            clearInterval(characterIdleInterval);
        }
        
    },10);
}
////////////////////////////////////////////////////////////////////////////
function deadPopUp(){
    document.getElementById("popupUserHit").style.display="block";
    losingAudio.play();
    var count = 3;
    var displaycounter=setInterval(function(){
        count--;
        document.getElementById("count").innerHTML="Your Game will start in "+ count +" Second";
    },1000);
    
    setTimeout(function(){
        clearInterval(displaycounter);
        document.getElementById("popupUserHit").style.display="none";
    }, 3001);
}
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
function winPopUp(){
    document.getElementById("popupUserWin").setAttribute("style","display: block");
    winnerAudio.play();
    var wincount = 3;
    var displaywincounter=setInterval(function(){
        wincount--;
        document.getElementById("wincount").innerHTML="Your Game will start in "+ wincount +" Second";
    },1000);
    
    setTimeout(function(){
        clearInterval(displaywincounter);
        document.getElementById("popupUserWin").style.display="none";
    }, 3001);
}
////////////////////////////////////////////////////////////////////////////

// To restartLevel after character die Or gameOver IT //////////////////////
function restartLevel(){
    deadPopUp();
    score=0;
    level--;
    setTimeout(startLevel,3001);
}

function gameOverFunc(){
    gameDivLevel.setAttribute("style","display: none");
    gameOver.setAttribute("style","display: block");
    window.scrollTo(0,0);
}
//////////////////////////////////////////////////////////////////////////////

// To Move Rocks and Diamonds down //////////////////////////////////////////
// AND To Check the Character Death /////////////////////////////////////////
function startInervals(){
    var checkUnderInterval = setInterval(function(){
        for(var k=0; k<rockImages.length; k++){
            var around = getAround(rockImages[k],myImages);
            if(around[2].className=="background"){
                shapeIndex = parseInt(rockImages[k].id);
                switchImg(shapeIndex, rockImages[k]);
                movingRockAudio.play();
                around = getAround(rockImages[k],myImages);
                if(around[2].className=="character"){
                    lifes--;
                    if(lifes>=0) restartLevel();
                    if(lifes<0) gameOverFunc();
                }
            }
        }
        for(var k=0; k<diamondImages.length; k++){
            var around = getAround(diamondImages[k],myImages);
            if(around[2].className=="background"){
                shapeIndex = parseInt(diamondImages[k].id);
                switchImg(shapeIndex, diamondImages[k]);
                around = getAround(diamondImages[k],myImages);
                if(around[2].className=="character"){
                    lifes--;
                    if(lifes>=0) restartLevel();
                    if(lifes<0) gameOverFunc();
                }
            }
        }
    },250);
}

///////////////////////////////////////////////////////////////////////////////////////

// Function To Get All Images Around An Image ////////////////////////////////
function getAround(A,Elements){
    var elementsAround = [];
    for(var i=0;i<Elements.length;i++){
        if((parseInt(Elements[i].getAttribute('idi')) == parseInt(A.getAttribute('idi'))) && ((parseInt(Elements[i].getAttribute('idj')) == parseInt(A.getAttribute('idj'))-60) || (parseInt(Elements[i].getAttribute('idj')) == parseInt(A.getAttribute('idj'))+60)))
        {
            elementsAround.push(Elements[i]);
        }
        if((parseInt(Elements[i].getAttribute('idj')) == parseInt(A.getAttribute('idj'))) && ((parseInt(Elements[i].getAttribute('idi')) == parseInt(A.getAttribute('idi'))-60) ||(parseInt(Elements[i].getAttribute('idi')) == parseInt(A.getAttribute('idi'))+60)))
        {
            elementsAround.push(Elements[i]);
        }
    }
    return elementsAround;
}

// Function to Move any item //////////////////////////////////
function switchImg(charIndex, myImg){
    myImages[charIndex].src = myImg.src;
    myImages[charIndex].className = myImg.className;
    myImages[charIndex].name = myImg.name;
    myImg.src = "Images/background.png";
    myImg.className = "background";
    myImg.name = "background";
}

////////////////////////////////////////////////////////////////////////

function startGame(){
    startHome.setAttribute("style","display: none");
    document.getElementById("redHedBoy").remove();
    document.getElementById("logo").remove();
    document.getElementById("boy").remove();
    document.getElementsByClassName("team")[4].remove();
    document.getElementsByClassName("team")[3].remove();
    document.getElementsByClassName("team")[2].remove();
    document.getElementsByClassName("team")[1].remove();
    document.getElementsByClassName("team")[0].remove();
    footer.setAttribute("style","display: block");
    startLevel();
    startInervals();
    setTimeout(startCharIntervals,100);
}

////////////////////////////////////////////////////////////////////////
// Event Listener On Game Level Divs ///////////////////////////////////
document.addEventListener("keydown", keyPressed);

function keyPressed(e){
    if(level>0 && level<4){
        switch(e.which){
                case 38: //up 
                    characterLookUp = true;
                    characterLookLeft = false;
                    characterLookDown = false;
                    characterLookRight = false;
                    myImg = myImages[charIndex];  // to catch the char image 
                    charIndex--; 
                    if(myImages[charIndex].getAttribute("class")=="border" || myImages[charIndex].getAttribute("class")=="rock" || myImages[charIndex].getAttribute("class")=="block"){
                        charIndex++;
                    }else{
                        if(myImages[charIndex].getAttribute("class")=="diamond"){
                            takeCoinAudio.play();
                            score+=100;
                            localStorage.setItem(playerName.value , score+totalScore);
                            gameScore.innerHTML = score;
                        }
                        else if(myImages[charIndex].getAttribute("class")=="door"){
                            totalScore+=score;
                            OpenDoorAudio.play();
                            winPopUp();
                            setTimeout(startLevel,3001);
                        }
                        switchImg(charIndex, myImg);
                    }   
                break;
                case 40: //down 
                    characterLookUp = false;
                    characterLookLeft = false;
                    characterLookDown = true;
                    characterLookRight = false;
                    myImg = myImages[charIndex];
                    charIndex++;
                    if(myImages[charIndex].getAttribute("class") == "border" || myImages[charIndex].getAttribute("class")=="rock" || myImages[charIndex].getAttribute("class")=="block"){
                        charIndex--;
                    }else{
                        if(myImages[charIndex].getAttribute("class")=="diamond"){
                            takeCoinAudio.play();
                            score+=100;
                            localStorage.setItem(playerName.value , score+totalScore);
                            gameScore.innerHTML = score;
                        }
                        else if(myImages[charIndex].getAttribute("class")=="door"){
                            totalScore+=score;
                            OpenDoorAudio.play();
                            winPopUp();
                            setTimeout(startLevel,3001);
                        }
                        switchImg(charIndex, myImg);
                    }
                break;
                case 39: //right
                    characterLookUp = false;
                    characterLookLeft = false;
                    characterLookDown = false;
                    characterLookRight = true;
                    myImg = myImages[charIndex];
                    charIndex+=20;
                    if(myImages[charIndex].getAttribute("class") == "border" || myImages[charIndex].getAttribute("class")=="rock" || myImages[charIndex].getAttribute("class")=="block"){
                        charIndex-=20;
                    }else{
                        if(myImages[charIndex].getAttribute("class")=="diamond"){
                            takeCoinAudio.play();
                            score+=100;
                            localStorage.setItem(playerName.value , score+totalScore);
                            gameScore.innerHTML = score;
                        }
                        else if(myImages[charIndex].getAttribute("class")=="door"){
                            totalScore+=score;
                            OpenDoorAudio.play();
                            winPopUp();
                            setTimeout(startLevel,3001);
                        }
                        switchImg(charIndex, myImg);
                    }

                break;
                case 37: //left 
                    characterLookUp = false;
                    characterLookLeft = true;
                    characterLookDown = false;
                    characterLookRight = false;
                    myImg = myImages[charIndex];
                    charIndex-=20;
                    if(myImages[charIndex].getAttribute("class") == "border" || myImages[charIndex].getAttribute("class")=="rock" || myImages[charIndex].getAttribute("class")=="block") {
                        charIndex+=20;
                    }else{
                        if(myImages[charIndex].getAttribute("class")=="diamond"){
                            takeCoinAudio.play();
                            score+=100;
                            localStorage.setItem(playerName.value , score+totalScore);
                            gameScore.innerHTML = score;
                        }
                        else if(myImages[charIndex].getAttribute("class")=="door"){
                            totalScore+=score;
                            OpenDoorAudio.play();
                            winPopUp();
                            setTimeout(startLevel,3001);
                        }
                        switchImg(charIndex, myImg);
                    }    
                break;
        }
    }
}
