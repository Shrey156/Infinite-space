var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket,rocketImage;
var rock,rockImage,rockImage1,space,spaceImage;
var rockGroup;
var gameOver,gameOverImage;

function preload(){
  rockImage = loadImage("rock1.png");
  rockImage1 = loadImage("rock2.png")
  spaceImage = loadImage("space.jpg");
  rocketImage = loadImage("rocket.png");
  gameOverImage = loadImage("gameOver1.png");
}

function setup() {
  createCanvas(600,600);
  
  //create space
  space = createSprite(300,300,1200,10);
  space.addImage(spaceImage);
  space.y = space.height/1;
  space.velocityY = 3;
  space.scale = 4;
  
  //create rocket
  rocket = createSprite(80,315,20,20);
  rocket.addImage(rocketImage);
  rocket.scale = 0.5;
  //rocket.debug = true;    
  
  rocket.setCollider("rectangle",0,-20,110,170);
  
  gameOver = createSprite(350,250);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2.3;
  
   rockGroup = createGroup();
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
    gameOver.visible = false;

    camera.position.x = 600/2;
    camera.position.y = rocket.y;

   //jump when the space key is pressed
    if(keyDown("space")) {
        rocket.velocityY = -18;
    }
    
    //boost the space
    if (space.y > 600){
      space.y = space.height/2;
    }
    
    //add gravity
    rocket.velocityY = rocket.velocityY + 1;
    
    rocket.x = mouseX;
    
    rocket.collide(rockGroup);
    
    Rock();
        
    //changing the gameState
    if(rocket.y>600){
      gameState = END;
    }
  }
  
  if(gameState === END){
     
    gameOver.visible = true;
    
    rockGroup.depth=gameOver.dept;
    gameOver.depth=gameOver.depth+1;
    
    
      space.velocityY = 0;
      rocket.velocityY = 0;

      
 //set lifetime of the game objects so that they are never   destroyed
    rockGroup.setLifetimeEach(-1);
     
    //set velocityX zero
     rockGroup.setVelocityYEach(0);
  }
  
  drawSprites();
}

// function reset(){
 
//   gameState = PLAY;
  
//   rockGroup.destroyEach();
//   FoodGroup.destroyEach();
  
// }

function Rock(){
  if(camera.mouseX%60 === 0){
  rock = createSprite(300,-5,10,10);
  rock.velocityY = 3;
  
  var rand = Math.round(random(1,2));
    switch(rand){
        case 1: rock.addImage(rockImage);
        break;
        case 2: rock.addImage(rockImage1);
        break;
        default: break;
    }
  rock.x = Math.round(random(150,650));
  rock.scale = 0.7;
  rock.lifetime = 220;
  //rock.debug = true;
  rock.setCollider("circle",0,20,40);
  
  rockGroup.add(rock);
  }
}
