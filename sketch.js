
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var survivalTime = 0;

var play = 0;
var over = 1;
var gameState = play;
var gameoverImg, gameover;  
function preload(){

  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 monkey_collided = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 FoodGroup = new Group();
  obstacleGroup = new Group();
 gameoverImg = loadImage("punch-the-monkey.jpg");
}



function setup() {
  monkey = createSprite(50,310,10, 10);
  monkey.addAnimation("Monkey running animation", monkey_running);
  monkey.scale = 0.12;
  /* I have not given ground velocity because it is not animated 
  and there will be no difference if I move it.*/
  ground = createSprite(50, 370, 10000, 50);
  ground.shapeColor = (rgb(30, 189, 72));
  

                       
}


function draw() {
  background(rgb(189, 255, 248));

  if(gameState === play){
  if (keyDown("space")){
    monkey.velocityY = -10;
  }
monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  if (frameCount%70 === 0){
      banana = createSprite(200,200,10,10);
  banana.addImage("Image of banana", bananaImage);
  banana.scale = 0.1;
    banana.y = Math.round(random(100,250));
    banana.velocityX = -6;
    FoodGroup.add(banana);

  }
  if(frameCount% 100 === 0){
    obstacle = createSprite(200, 310, 10, 10);
    obstacle.addImage("Image of obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.x = Math.round(random(150,400)); 
    obstacleGroup.add(obstacle);
  //  obstacle.debug = true;
obstacleGroup.setColliderEach("rectangle",0,0, obstacle.width,obstacle.height);
  }
    survivalTime = survivalTime + Math.round(getFrameRate()/60);

  stroke("black");
    textSize(20);
  fill("black");
 // survivalTime = Math.ceil(frameCount / frameRate());
   text("Score : " + survivalTime, 100, 50);
  
  if(monkey.isTouching(FoodGroup)){
    survivalTime = survivalTime + 1;
    FoodGroup.destroyEach();
  }   
      if (monkey.isTouching(obstacleGroup)){
    gameState = over;
  }
    
  }
if(gameState === over){
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
 gameover = createSprite(200,200,20,20);
  gameover.addImage("image of game end", gameoverImg);
  gameover.scale = 0.55;
}
 
  
  drawSprites();
}






