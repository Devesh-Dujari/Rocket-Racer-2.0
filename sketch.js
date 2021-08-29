//Declaring variables.
var backgroundImg;
var rocket, rocketImg, rocketImgLeft, rocketImgRight;
var space, spaceImg;
var comet, cometImg, cometGroup;
var bronzeCoin, bronzeCoinImg, bronzeCoinGroup;
var silverCoin, silverCoinImg, silverCoinGroup;
var goldCoin, goldCoinImg, goldCoinGroup;

var gameOver, gameOverImg;
var restart, restartImg;

var gameState = "PLAY";
var distance = 0;
var coinCount = 0;
var deaths = 0;

function preload() {
  //Loading images in variables.
  //backgroungImg = loadImage("Rocket Racer.jpg");
  
  rocketImg = loadImage("rocket.png");
  spaceImg = loadImage("space.jpg");
  
  cometImg = loadImage("comet.png");
  bronzeCoinImg = loadImage("bronzeCoin.png");
  silverCoinImg = loadImage("silverCoin.png")
  
  goldCoinImg = loadImage("goldCoin.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  canvas = createCanvas(400, 500);

  //Creating space.
  space = createSprite(200, 150, 20, 20);
  space.addImage(spaceImg);
  space.scale = 0.86;
  space.velocityY = 8;

  rocket = createSprite(200, 380, 20, 20);
  rocket.addImage(rocketImg);
  rocket.scale = 0.125;
  //rocket.debug=true;
  rocket.setCollider("rectangle", 0, -200, 400, 600);

  gameOver = createSprite(200, 200, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.9;
  gameOver.visible = false;

  restart = createSprite(200, 280, 10, 10);
  restart.addImage(restartImg);
  restart.scale = 0.15;
  restart.visible = false;

  bronzeCoin = createSprite(200, -20, 10, 10);
  silverCoin = createSprite(200, -20, 10, 10);
  goldCoin = createSprite(200, -20, 10, 10);
  comet = createSprite(200, -20, 10, 10);

  cometGroup = new Group();
  bronzeCoinGroup = new Group();
  silverCoinGroup = new Group();
  goldCoinGroup = new Group();
}

function draw() {
  background(0);

/*  if(gameState === "START")
    {
      background(backgroundImg);
      
      text("Press Space to continue", 100, 300);
      
      if(keyDown("space"))
        {
          gameState = "PLAY";
        }
    }*/
  
  if (gameState === "PLAY") {
    
    distance = distance + Math.round(getFrameRate() / 50);

    gameOver.visible = false;
    //restart.visible = false;

    space.velocityY = 8;

    //Regenerating the background.
    if (space.y > 350) {
      space.y = height / 2;
    }

    //Making rocket move when arrow keys are pressed.
    if (keyDown("right_arrow")) {
      rocket.x = rocket.x + 2;
    }

    if (keyDown("left_arrow")) {
      rocket.x = rocket.x - 2;
    }

    //Making rocket come back from the other side if it goes out from one.
    if (rocket.x > 415) {
      rocket.x = -15;
    }

    if (rocket.x < -15) {
      rocket.x = 415;
    }

    //Function call.
    spawnComets();
    spawnBronzeCoins();
    spawnSilverCoins();
    spawnGoldCoins();

     if (bronzeCoinGroup.isTouching(rocket)) {
      coinCount += 1;
      //to destroy only one touched coin
      bronzeCoinGroup.get(0).destroy();
    }

     if (silverCoinGroup.isTouching(rocket)) {
      coinCount += 5;
      //to destroy only one touched coin
      silverCoinGroup.get(0).destroy();
    }
    
    if (goldCoinGroup.isTouching(rocket)) {
      coinCount += 10;
      //to destroy only one touched coin
      goldCoinGroup.get(0).destroy();
    }

    if (cometGroup.isTouching(rocket)) {
      gameState = "END";
      space.velocityY = 0;
      deaths += 1;
    }
  }

  if (gameState === "END") {
    gameOver.visible = true;
    restart.visible = true;
    rocket.visible = false;
    
    rocket.x = 200;
    rocket.y = 380;

    space.veloctyY = 0;
    rocket.velocityY = 0;
    cometGroup.destroyEach();
    bronzeCoinGroup.destroyEach();
    goldCoinGroup.destroyEach();
    reset();
  }

  drawSprites();

  fill(255);
  textSize(20);
  text("Distance: " + distance, 10, 50);
  text("Coins: " + coinCount, 160, 50);
  text("Deaths: " + deaths, 275, 50);
  textSize(13);
  text("HIGHEST: 7707,125 (keep this updated [line 118])", 50, 490);
}

function spawnComets() {
  if (frameCount % 40 === 0) {
    comet = createSprite(200, -20, 10, 10);
    comet.addImage(cometImg);
    comet.x = Math.round(random(50, 350));
    comet.velocityY = 5;
    comet.lifetime = 110;
    comet.scale = 0.1;

    //comet.debug = true;
    comet.setCollider("rectangle", 0, 0, 400, 1000);

    cometGroup.add(comet);
    rocket.depth = comet.depth;
    rocket.depth += 1;
  }
}

function spawnBronzeCoins() {
  if (frameCount % 100 === 0) {
    bronzeCoin = createSprite(200, -20, 10, 10);
    bronzeCoin.addImage(bronzeCoinImg);
    bronzeCoin.x = Math.round(random(50, 350));
    bronzeCoin.velocityY = 5;
    bronzeCoin.lifetime = 110;
    bronzeCoin.scale = 0.04;

    //bronzeCoin.debug = true;
    bronzeCoin.setCollider("circle", 0, 0, 500);

    bronzeCoinGroup.add(bronzeCoin);
    rocket.depth = bronzeCoin.depth;
    rocket.depth += 1;
  }
}

function spawnSilverCoins() {
  if (frameCount % 500 === 0) {
    silverCoin = createSprite(200, -20, 10, 10);
    silverCoin.addImage(silverCoinImg);
    silverCoin.x = Math.round(random(50, 350));
    silverCoin.velocityY = 10;
    silverCoin.lifetime = 60;
    silverCoin.scale = 0.05;

    //silverCoin.debug = true;
    silverCoin.setCollider("circle", 0, 0, 300);

    silverCoinGroup.add(silverCoin);
    rocket.depth = silverCoin.depth;
    rocket.depth += 1;
  }
}


function spawnGoldCoins() {
  if (frameCount % 1000 === 0) {
    goldCoin = createSprite(200, -20, 10, 10);
    goldCoin.addImage(goldCoinImg);
    goldCoin.x = Math.round(random(50, 350));
    goldCoin.velocityY = 25;
    goldCoin.lifetime = 30;
    goldCoin.scale = 0.05;

    //goldCoin.debug = true;
    goldCoin.setCollider("circle", 0, 0, 300);

    goldCoinGroup.add(goldCoin);
    rocket.depth = goldCoin.depth;
    rocket.depth += 1;
  }
}

function reset() {
  if (mousePressedOver(restart)) {
    distance = 0;
    coinCount = 0;
    gameState = "PLAY";
    restart.visible = false;
  }
}
