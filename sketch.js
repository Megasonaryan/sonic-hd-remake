var sonic,sonicimg;
var bg;
var sonicStanding;
var sonicrunningimg;
var flagimg;
var flag;
var ground,groundimg;
var gameState = "play";
var reset,resetimg;
var obstacle;
var velocity = 0;

function preload(){
  sonicimg=loadAnimation("images/sonic 0.5.png","images/sonic 1.png","images/sonic 2.png","images/sonic 3.png","images/sonic 4.png","images/sonic 5.png","images/sonic 6.png","images/sonic 7.png","images/sonic 8.png")
  sonicrunningimg=loadAnimation("images/sonicrunning2.png","images/sonicrunning3.png","images/sonicrunning4.png","images/sonicrunning5.png","images/sonicrunning6.png",)
  bg= loadImage("green hill zone 2.png")
  sonicStanding=loadImage("images/sonicstanding.png")
  flagimg= loadImage("flag race.png")
  groundimg= loadImage("green hill zone 2 masked.png")

   resetimg = loadImage("you win ending screen.jpg");
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  flag=createSprite(displayWidth*1.6,displayHeight-250);
  flag.addImage(flagimg)
  ground= createSprite(0,displayHeight-130,displayWidth*5,5);
  ground.visible=false;
  //ground.addImage(groundimg);
  //ground.scale=2.2;
  /*bgsprite= createSprite(displayWidth/2,displayHeight/2,50,50);
  bgsprite.scale=2;
  bgsprite.addImage(bg)
  bgsprite.velocityX= -5;*/

  reset=createSprite(displayWidth*1.6,displayHeight-600);
  reset.addImage(resetimg);
  reset.visible=false;
  obstacle = createSprite(1570,685,170,20);
  obstacle.visible=false;
  sonic = createSprite(1000,displayHeight-200, 50, 50);
  sonic.addAnimation("stand",sonicStanding);
  sonic.addAnimation("sonicrun",sonicimg);
  sonic.addAnimation("sonicrunning",sonicrunningimg);

 sonic.mirrorX(sonic.mirrorX() * -1);

 sonic.scale=.1;
}

function draw() {
 // console.log(sonic.y)
  background("white");  
  //sonic.debug=true;
  sonic.setCollider("rectangle",0,0,500,1500);
  camera.position.x=sonic.x;
  image(bg,0,-750,displayWidth*2.2,displayHeight*2.2)
  image(groundimg,0,-750,displayWidth*2.2,displayHeight*2.2)

  if(gameState==="play"){
    reset.visible=false;
  if(sonic.isTouching(obstacle)){
    sonic.velocityX=0;
    sonic.changeAnimation("stand",sonicStanding);
    sonic.collide(obstacle);
  }
 console.log(sonic.y);
  /*if(bgsprite.x<0){
    bgsprite.x=displayWidth/2;
  }*/
  if(sonic.x===1480){
  if(sonic.y>659)
  console.log("you lose");
  }
  console.log(sonic.velocityX);
  if(keyWentDown(UP_ARROW)){
    sonic.velocityY=-14;
  }
  if(keyWentUp(UP_ARROW)){
  }
  sonic.velocityY=sonic.velocityY+0.7;
 if(keyWentDown(RIGHT_ARROW)){

  sonic.velocityX=20;
  sonic.changeAnimation("sonicrun",sonicimg)
  sonic.changeAnimation("sonicrunning",sonicrunningimg)
  
 }
 if(keyWentUp(RIGHT_ARROW)){
  sonic.velocityX=0;
  sonic.changeAnimation("stand",sonicStanding);
 }
 if(sonic.x>2450){
  gameState= "end";
  }
}
 if(gameState==="end"){
   sonic.changeAnimation("stand",sonicStanding);
   sonic.velocityX=0;
   reset.visible=true;
   if(mousePressedOver(reset)){
     sonic.x=1000;
     gameState= "play";
   }
   
 }
  
 sonic.collide(ground)
  drawSprites();
}
