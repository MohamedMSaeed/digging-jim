var popup=document.getElementById("popupUserName");
var load= document.getElementById("load");
var playerName=document.getElementById("pName");
var getPNameButton=document.getElementById("getPName");
var txt=document.getElementById("temp");
var clickMe = true;

/////////////////////////////////////////      LET'S BEGIN BUTTON     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  

var newGame=document.getElementById('newgame').onclick=function(){
        popup.style.display="block";
        playerName.focus();  
}


////////////////////////////////////////      HIGHEST SCORES BUTTON   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.getElementById("dashbord").onclick=function(){
     if(clickMe){
         clickMe = false;
         getHighScore();
         document.getElementById("highestScorePOPUP").style.display="block";
         popup.style.display="none";
         document.getElementById("popupAboutus").style.display="none";
         document.getElementById("exitPopUp").style.display="none"; 
     }
};

///////////////////////////////////////////  dashboard    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.getElementById("highspan").onclick=function(){
    clickMe = true;
    clearHighScore();
    document.getElementById("highestScorePOPUP").style.display="none";
};


/////////////////////////////////////////      ABOUT US BUTTON     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  

var aboutus=document.getElementById('aboutus').onclick=function(){
    document.getElementById("popupAboutus").style.display="block"; 
}
//////////////////////// click on X   \\\\\\\\\\\\\\\\\\\\\\\
document.getElementById("aboutusspan").onclick=function(){
    document.getElementById("popupAboutus").style.display="none";
};
/////////////////////////////////////////////     EXIT BUTTON      \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.getElementById('exit').onclick=function(){
    document.getElementById("exitPopUp").style.display="block";
    popup.style.display="none";
    document.getElementById("highestScorePOPUP").style.display="none";
    document.getElementById("popupAboutus").style.display="none";
    document.getElementById("no").onclick=function(){ document.getElementById("exitPopUp").style.display="none";};
    document.getElementById("yes").onclick=function(){ window.close();};
};


/////////////////////////////////////////////      POP-UP WINDOW    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////////////////// click on X   \\\\\\\\\\\\\\\\\\\\\\\
document.getElementById("x").onclick=function(){
    popup.style.display="none";
    playerName.style="border: 3px solid #555";
    txt.innerHTML="";
};

////////////////////   click on Lets's Go  \\\\\\\\\\\\\\\\\\
getPNameButton.onclick=function(){
    var Name =playerName.value;
    var valid =checkValidation(Name);
    name.value="";
    playerName.focus();

    switch(valid){
        case 0:
            txt.innerHTML="NOT VALID!!";
            playerName.style="border: 3px solid rgb(248, 0, 0); animation: shake 0.5s; ";
        break;
        case 1:
            popup.style.display="none";
            document.getElementById("div").style="animation: goup 1s; display:none;";
            localStorage.setItem(playerName.value , 0);
            load.style.display="block";
            move();
        break;
        case 5:
            txt.innerHTML="NAME SHOULD BE 5 CHARACTER AT LEAST!!";
            playerName.style="border: 3px solid rgb(248, 0, 0); animation: shake 0.5s;";
            playerName.focus(); 
        break;
    }
}   

/////////////////////  check user input  \\\\\\\\\\\\\\\\\\\\
function checkValidation(name){
    if(name.replace(/^\s+|\s+$/g, '').length ==0)
        return 0;
    else if(name.length<5)
        return 5;
    else return 1;
}
////////////////////  user input  \\\\\\\\\\\\\\\\\
playerName.onclick=function(){
    playerName.style="border: 3px solid #555";
    txt.innerHTML=""; 
}
//////////////////////////////////////// load page \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  
function move() {
    var elem = document.getElementById("myBar");   
    var width = 1;
    var l=1;
    var id = setInterval(frame,60);
    var boy=document.getElementById("boy");
    function frame() {
            l++;
            boy.style.left=l+"%";
      if (width >= 100) {
          clearInterval(id);
          loadingAudio.pause();
          load.setAttribute("style","display: none");
          startGame();
      } else {  
          width++; 
          elem.style.width = width + '%'; 
          loadingAudio.play();
      }
    }
}

//////////////////////////////////////Get High Score/////////////////////////////////////////

function getHighScore(){
	var scores=[];
	for(var i= 0; i<localStorage.length ; i++){ 			
        var op = document.createElement("li");
        op.innerHTML = Object.keys(localStorage)[i]+" : "+localStorage[Object.keys(localStorage)[i]];
        document.getElementById("olHighScore").appendChild(op);
	}
    sort();
}

function user(key,value){
  this.key = key;
  this.value = value;
}

function sort(){
  var scoreArr = [];

  for(var i=0;i<localStorage.length;i++){
    var element = new user(Object.keys(localStorage)[i],localStorage[Object.keys(localStorage)[i]]);
    scoreArr.push(element);
  }

 scoreArr.sort(function(a,b){
   return parseInt(b.value) - parseInt(a.value);
 });
clearHighScore();
 for(i=0; i<scoreArr.length; i++){
    localStorage.setItem(scoreArr[i].key , scoreArr[i].value);
          var op = document.createElement("li");
          op.innerHTML = scoreArr[i].key+" : "+scoreArr[i].value;
          document.getElementById("olHighScore").appendChild(op);
 }

}

function clearHighScore(){
    document.getElementById("olHighScore").innerHTML = "";
}
