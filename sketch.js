var newx=700
var life=3
var gameState="play"
function preload(){
  enemy2 = loadImage("enemy1.png")
  enemydead = loadImage("enemy defeated.png")
}
function setup() {
  createCanvas(1200,800);
  edge1= createSprite(3000,20,6000,10)
  edge2= createSprite(3000,780,6000,10) 
  edge1.visible=false
  edge2.visible=false
 krishna = new Player(200,500)
 rockgroup= new Group()
 for(var i=0;i<=5;i++){
 rock1 = new Rock(newx)
 rockgroup.add(rock1.body)
 stone = new Stone(krishna.body.x,10)
 newx+=800
 }
 
 enemy = new Enemy(6000,500)
}

function draw() {
  background(0);
 
  drawSprites();
  textSize(20)
  fill("white")
  text("life's : "+ life,krishna.body.x,50)
  console.log(krishna.body.x)
  krishna.body.collide(edge1)
  krishna.body.collide(edge2)
  rockgroup.bounceOff(edge1)
  rockgroup.bounceOff(edge2)
  camera.position.x= krishna.body.x

  if(keyDown(RIGHT_ARROW)){
    krishna.body.x+=30
  }

  if(keyDown(LEFT_ARROW)){
    krishna.body.x-=30
  }

  if(keyDown(UP_ARROW)){
    krishna.body.y-=10
  }

  if(keyDown(DOWN_ARROW)){
    krishna.body.y+=10
  }

  if(krishna.body.x>5270){
   // stone = new Stone(krishna.body.x,krishna.body.y)
    enemy.body.addImage(enemy2)
    enemy.body.scale=2
    text("press space to throw the stone",krishna.body.x,200)
    if(keyWentDown("space")){
      stone = new Stone(krishna.body.x,krishna.body.y)
    }

    if(stone.body.isTouching(enemy.body)){
      text("you are entering level 2",krishna.body.x,500)
      enemy.body.addImage(enemydead)
      gameState="play2"
    }
  }

  if(life===0){
    gameState="end"

  }

  if(gameState==="end"){
    krishna.velocityX=0
    krishna.velocityY=0
    rockgroup.setVelocityEach(0,0)
    text("GAME OVER",krishna.body.x,200)
  }

  krishna.body.collide(rockgroup,comeback)
}

function comeback(krish,rock){
  krish.x=200
  krish.y=500
  krish.velocityX=0
  krish.velocityY=0
  life--

}