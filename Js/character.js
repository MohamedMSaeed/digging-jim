//// To Recognize the state of the character when keypressed //////////
var pressleftFlag = false;
var pressRightFlag = false;
var pressUpFlag = false;
var pressDownFlag = false;
var characterRunningFlag = false;
var characterIdleflag = true;
var characterLookLeft = false;
var characterLookRight = false;
var characterLookUp = false;
var characterLookDown = false;
var lookWhereInterval;
var characterRunningInterval;
var characterIdleInterval;
/////////////////////////////////////////////////////

///// src when character is not moving ////
var characterImageIdle = [
  "Images/CharacterImages/frame-1.png","Images/CharacterImages/frame-2.png"];
///// src when character is moving ////
var characterRunningImages = ["Images/CharacterImages/frame-7.png","Images/CharacterImages/frame-8.png", "Images/CharacterImages/frame-9.png", "Images/CharacterImages/frame-10.png", "Images/CharacterImages/frame-11.png", "Images/CharacterImages/frame-12.png"];
///////////////////////////////////////////////////////////////////

function startCharIntervals(){
    //// To know where the character looks //////////////
    lookWhereInterval = setInterval(function(){
        if(characterLookLeft == true){
            myImages[charIndex].style.transform ="scalex(-1)";
        }
        if(characterLookRight == true){
            myImages[charIndex].style.transform ="scalex(1)";
        }
        if(characterLookDown == true){
            myImages[charIndex].style.transform ="rotate(9deg)";
        }
        if(characterLookUp == true){
            myImages[charIndex].style.transform ="rotate(-9deg)";
        }
    },1);
    ///////////////////////////////////////////////////////////////////
    // To change character image src while runnig /////
    var characterRunningimagesIndex = 0;

    characterRunningInterval = setInterval(function(){
        if(pressRightFlag == true && characterRunningFlag == true){
              myImages[charIndex].src = characterRunningImages[characterRunningimagesIndex++];
        }
        if(pressleftFlag == true && characterRunningFlag == true){
          myImages[charIndex].src = characterRunningImages[characterRunningimagesIndex++];
        }
        if(pressDownFlag == true && characterRunningFlag == true){
           myImages[charIndex].src = characterRunningImages[characterRunningimagesIndex++];
        }
        if(pressUpFlag == true && characterRunningFlag == true){
          myImages[charIndex].src = characterRunningImages[characterRunningimagesIndex++];
        }
        if(characterRunningimagesIndex==characterRunningImages.length){
          characterRunningimagesIndex=0;
        }
    },100);
    //////////////////////////////////////////////////////////////
    // To change character image src while it is not runnig /////
    characterIdleInterval = setInterval(function(){
        if(characterIdleflag == true && characterRunningFlag == false){
            characterRunningimagesIndex=0;
            myImages[charIndex].src = characterImageIdle[0];
            characterIdleflag = false;
        }else{
            myImages[charIndex].src = characterImageIdle[1];
            characterIdleflag = true;
        }
    },200);
    ////////////////////////////////////////////////////////////
    
    // Event Listener to check char states /////////////////
        document.addEventListener("keyup", KeyUp);
        document.addEventListener("keydown", KeyDown);
}

function KeyUp(e){
    
    if(level>0 && level<4){
        walkingAudio.pause();
        switch(e.which){
        case 38: {characterRunningFlag = false;pressUpFlag = false;characterIdleflag = true;} break;
        case 40: {characterRunningFlag = false;pressDownFlag = false;characterIdleflag = true;} break;
        case 39: {characterRunningFlag = false;pressRightFlag = false;characterIdleflag = true;myImages[charIndex].style.transform ="scalex(1)";} break;
        case 37: {characterRunningFlag = false;pressleftFlag = false;characterIdleflag = true;myImages[charIndex].style.transform ="scalex(-1)";} break;
    }
  }
}

function KeyDown(e){
    if(level>0 && level<4){
        
          switch(e.which){
            case 38: {characterRunningFlag = true;pressUpFlag = true;characterIdleflag = false; walkingAudio.play();} break;
            case 40: {characterRunningFlag = true;pressDownFlag = true;characterIdleflag = false; walkingAudio.play();} break;
            case 39: {characterRunningFlag = true;pressRightFlag = true;characterIdleflag = false;myImages[charIndex].style.transform ="scalex(1)"; walkingAudio.play();} break;
            case 37: {characterRunningFlag = true;pressleftFlag = true;characterIdleflag = false;myImages[charIndex].style.transform ="scalex(-1)"; walkingAudio.play();} break;
          }
    }
}