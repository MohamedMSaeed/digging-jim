// To draw the game ///////////////////////////////////////
function drawMyGame(divContainer,RockIndex,DiamondIndex,blockIndex){
  drawMyBackground(divContainer);
  drawMyCharacter(divContainer);
  drawMyBorder(divContainer);
  drawMyRocks(RockIndex);
  drawMyDiamonds(DiamondIndex);
  drawMyBlocks(blockIndex);
  drawMyDoor(doorIndex);
  DrawMySand();
}

//////////////////////////////////////////////////////////////////////////////
var myImages;
function drawMyBackground(divContainer){
  for(var i=0; i<maxWidth; i+=60){
    for(var j=0; j<maxHight; j+=60){
        var myImg = document.createElement("img");
        myImg.src = "Images/background.png";
        myImg.setAttribute("id",++index)
        myImg.setAttribute("idI",i);
        myImg.setAttribute("idJ",j);
        myImg.setAttribute("class","background");
        myImg.setAttribute("name","background");
        myImg.setAttribute("width","60px");
        myImg.setAttribute("height","60px");
        myImg.setAttribute("style","position:absolute;z-index:0");
        myImg.style.top = j+"px";
        myImg.style.left = i+"px";
        divContainer.appendChild(myImg);
    }
  }
  myImages = document.getElementsByTagName("img");
}

function drawMyCharacter(){
  var characterIndex = 43;
  myImages[characterIndex-1].src = "Images/CharacterImages/frame-1.png";
  myImages[characterIndex-1].setAttribute("class","character");
  myImages[characterIndex-1].setAttribute("name","character");
}

function drawMyBorder(){
    var borderIndex = [];
    for(var i=1; i<=20; i++)
        borderIndex.push(i);
    for(i=21; i<=561; i+=20)
        borderIndex.push(i);
    for(i=40; i<=580; i+=20)
        borderIndex.push(i);
    for(i=581; i<=600; i++)
        borderIndex.push(i);
    for(i=0; i<borderIndex.length; i++){
        myImages[borderIndex[i]-1].src = "Images/Bricks.png";
        myImages[borderIndex[i]-1].setAttribute("class","border");
        myImages[borderIndex[i]-1].setAttribute("name","border");
    }
}

function drawMyRocks(RockIndex){
    for(i=0; i<RockIndex.length; i++){
        myImages[RockIndex[i]-1].src = "Images/rock.png";
        myImages[RockIndex[i]-1].setAttribute("class","rock");
        myImages[RockIndex[i]-1].setAttribute("name","rock");
    }
}

function drawMyDiamonds(DiamondIndex){
    for(i=0; i<DiamondIndex.length; i++){
        myImages[DiamondIndex[i]-1].src = "Images/Diamond.png";
        myImages[DiamondIndex[i]-1].setAttribute("class","diamond");
        myImages[DiamondIndex[i]-1].setAttribute("name","diamond");
    }
}

function drawMyBlocks(blockIndex){
    for(i=0; i<blockIndex.length; i++){
        myImages[blockIndex[i]-1].src = "Images/block.jpg";
        myImages[blockIndex[i]-1].setAttribute("class","block");
        myImages[blockIndex[i]-1].setAttribute("name","block");
    }
}

function drawMyDoor(doorIndex){
    myImages[doorIndex-1].src = "Images/door.jpg";
    myImages[doorIndex-1].setAttribute("class","door");
    myImages[doorIndex-1].setAttribute("name","door");
}

function DrawMySand(){
    for(i=0; i<myImages.length; i++)
        if(myImages[i].getAttribute("class")=="background"){
            myImages[i].src = "Images/Sand.png";
            myImages[i].setAttribute("class","sand");
            myImages[i].setAttribute("name","sand");
        }
}
////////////////////////////////////////////////////////////////////////////
