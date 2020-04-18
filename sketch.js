var rand, trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, e, r, restart, end;
var o1, obs, o2, o3, o4, o5, o6, cloud, cl, gobst, clog;
var END=0;
var PLAY=1;
var gameState=PLAY;
var score = 0

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cl=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  o1 = loadImage("obstacle1.png");
   o2 = loadImage("obstacle2.png");
   o3 = loadImage("obstacle3.png");
   o4 = loadImage("obstacle4.png");
   o5 = loadImage("obstacle5.png");
   o6 = loadImage("obstacle6.png");
  e = loadImage("gameOver.png");
  r = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  end = createSprite(300, 100);
  restart = createSprite(300, 140);
  end.addImage("SPQR", e);
  restart.addImage("hogwarts", r);
  end.scale=0.5;
  restart.scale=0.5;
  end.visible=false;
  restart.visible=false;
  clog = new Group();
  gobst = new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("hedre", trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(180);
  
  if(gameState===PLAY){
  if(keyDown("space")&&trex.y>161) {
    trex.velocityY = -12.5;
  }
    ground.velocityX = -(2+3*score/100);
  
  trex.velocityY = trex.velocityY + 0.8
  
    score=score+Math.round(getFrameRate()/60)
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  c();
  ob();
    
    if(gobst.isTouching(trex)){
      gameState=END;
      trex.changeAnimation("hedre", trex_collided);
    }
    
  }
  
  if(gameState===END){
    ground.velocityX=0;
    gobst.setVelocityXEach(0);
    clog.setVelocityXEach(0);
    
    gobst.setLifetimeEach(-1);
    clog.setLifetimeEach(-1);
    
    trex.velocityY=0;
    
    end.visible=true;
  restart.visible=true;
    if(mousePressedOver(restart)){
    reset();
    }
    
  }
  
  
  
  text(score, 500, 50);
  trex.collide(invisibleGround);
  drawSprites();
}

function ob(){
  if (frameCount%60===0){
    obs = createSprite(600, 165, 10, 40);
    obs.velocityX = -(4+3*score/100);
    obs.lifetime=150;
    gobst.add(obs);
    rand=Math.round(random(1, 6));
    switch(rand){
      case 1:obs.addImage(o1);
      break;
      case 2:obs.addImage(o2);
      break;
      case 3:obs.addImage(o3);
      break;
      case 4:obs.addImage(o4);
      break;
      case 5:obs.addImage(o5);
      break;
      case 6:obs.addImage(o6);
      break;
      default:
      break;
    }
    obs.scale=0.5; 
    
  }
}
function c(){
  if(frameCount%50===0){
  cloud = createSprite(600, 120, 40, 10);
  cloud.addImage("z", cl);
  cloud.velocityX=-3
  cloud.y=Math.round(random(80, 120));
  cloud.lifetime=200;
  trex.depth=cloud.depth+1;
  clog.add(cloud);
  }
}

function reset(){
  end.visible=false;
  restart.visible=false;
  gameState=PLAY;
  trex.changeAnimation("running", trex_running);
  clog.destroyEach();
  gobst.destroyEach();
  score=0;
}