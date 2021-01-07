var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground,invisibleGround;
var survivalTime = 0;
var bananas,obstacles;
var gameOver;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);

  monkey = createSprite(200,500,120,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(200,550,1200,10);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,545,1200,10);
  invisibleGround.visible = false;
  
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();  
  

}


function draw() {
  
  background("purple");
  
  

  if(gameState === PLAY){
    
    if(monkey.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    survivalTime = survivalTime-8;
  }
    
    if(monkey.isTouching(bananasGroup)){
    bananasGroup.destroyEach();
    survivalTime = survivalTime+5;
  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
  ground.velocityX = -(5+5*survivalTime/5);
    
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  bananas();
  
  obstacles();
    
     if(survivalTime < 0){
    gameState = END;
  }
  }  else if (gameState === END){
   bananasGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
   bananasGroup.setVisibleEach(false);
   obstaclesGroup.setVisibleEach(false);
    fill("cyan");
    textSize(50);
    text("gameOver", 200 ,300);
    ground.velocityX = 0;
    monkey.collide(ground);
  }

  fill("yellow");
  textSize(20);
  text("survivalTime: "+ survivalTime,250,50);
  
  drawSprites();
}

function bananas(){
  
 if (frameCount % 80 === 0) {
    var bananas = createSprite(600,120,10,10);
    bananas.y = Math.round(random(150,500));
    bananas.addImage(bananaImage);
    bananas.scale = 0.12;
    bananas.velocityX = -(5+5*survivalTime/5);
    bananas.lifetime = 120;
   
   bananasGroup.add(bananas);
}
}

function obstacles(){
  
  if (frameCount % 250 === 0) {
  var obstacles = createSprite(600,120,10,10);
  obstacles.y = Math.round(random(520,520));
  obstacles.addImage(obstacleImage);
  obstacles.scale = 0.15;
  obstacles.velocityX = -(3+5*survivalTime/5);
  obstacles.lifetime = 200;
    
  obstaclesGroup.add(obstacles);
}
}

