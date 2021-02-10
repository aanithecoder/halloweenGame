var pumpkin, candy;
var ghost, back;

var pumpkinSprite, candySprite, ghostSprite, backSprite;

var score;
score = 0; 

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
pumpkinSprite = loadImage("pumpkinGame.png"); 
candySprite = loadImage("candyGame.png");
ghostSprite = loadImage("ghostGame.png");
backSprite = loadImage("halloweenGame.png");
  
gameOver = loadImage("gameOverGame.png");
}

function setup() {
 createCanvas(400, 400);
  
back = createSprite(10, 150, width, height);
back.velocityX = -3;
back.addImage(backSprite);
back.scale = 2;
console.log(windowWidth);
console.log(windowHeight);
  
pumpkin = createSprite(50, 200, 10, 10);
pumpkin.addImage(pumpkinSprite);
pumpkin.scale = 0.03;

  
candyGroup = createGroup();
ghostGroup = createGroup();
 }

function draw() {
  
  background("white")
  
if (gameState===PLAY) {
  if (back.x < 0) 
  {back.x = back.width/2;
}

if (keyDown("up")){
  pumpkin.velocityY = -5;
}
  
if (keyDown("down")){
  pumpkin.velocityY = 5;
}
  
if (pumpkin.y < 0 || pumpkin.y > 400) {
  pumpkin.y = 200;
}
 
if (pumpkin.isTouching(candyGroup)) {
  score = score + 1;
  candyGroup.destroyEach();
}
  
if (frameCount % 100 === 0) {
ghostGroup.velocityX = ghostGroup.velocityX+2
candyGroup.velocityX = candyGroup.velocityX+2
}
    
if (pumpkin.isTouching(ghostGroup)) {
  pumpkin.addImage(gameOver);
  pumpkin.scale = 0.5;
  pumpkin.x = 200;
  pumpkin.y = 200;
  gameState = 0;
}
spawnGhosts();
spawnCandies();
}
 
else if (gameState === END){
  pumpkin.velocityY = 0;
  ghostGroup.destroyEach();
  candyGroup.destroyEach();
  back.velocityX = 0;
  }
  
drawSprites(); 


textSize(20);
fill("yellow");
text("Score: "+ score, 180, 40);
}


function spawnGhosts() {
  if (frameCount % 100 === 0) {
    ghost = createSprite(410, 200, 10, 10);
    ghost.y = Math.round(random(80, 320))
    ghost.addImage(ghostSprite);
    ghost.velocityX = -8;
    ghost.scale = 0.2;
    ghost.setCollider("circle", 0, 0, 100);
    ghost.debug = false;
    
    ghost.lifetime = 220;
    
    ghostGroup.add(ghost);
  }
}

function spawnCandies() {
  if(frameCount % 120 === 0){
    candy = createSprite(410, 200, 10, 10);
    candy.y = Math.round(random(80, 320))
    candy.addImage(candySprite);
    candy.velocityX = -6;
    candy.scale = 0.1;
    candy.setCollider("rectangle", 0, 0, 100, 100);
    candy.debug = false;
    
    candy.lifetime = 220;
    
    candyGroup.add(candy);
  }
}

