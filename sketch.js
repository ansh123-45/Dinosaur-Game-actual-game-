var trex, trex_running;
var ground;
var groundimage;
var cactus, cactus_group, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloud, cloud_image, cloud_group;
var play = 1;
var end = 2
var start=0;
var gameState = start;
var score = 0;
var trex_collide
var gameOver,restart,restart_image
var gameOver_image
var high_score=0
function preload() {
    //loading the animation of trex
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    groundimage = loadImage("ground2.png")
    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
    obstacle3 = loadImage("obstacle3.png")
    obstacle4 = loadImage("obstacle4.png")
    obstacle5 = loadImage("obstacle5.png")
    obstacle6 = loadImage("obstacle6.png")
    cloud_image = loadImage("cloud.png")
    trex_collide= loadAnimation("trex1.png")
    gameOver_image = loadImage("gameOver.png");
    restart_image = loadImage("restart.png");

}

function setup() {
    //creating game area
    createCanvas(600, 200);
    //creating trex sprite
    trex = createSprite(50, 160, 20, 50);
    trex.debug = false;
    trex.setCollider("circle", 0, 0, 40);
    //adding animation to the trex
    trex.addAnimation("running", trex_running);
    //adding trex collision image
    trex.addAnimation("collide",trex_collide) 
    //resizing the trex
    trex.scale = 0.5;
    ground = createSprite(300, 180, 600, 20)
    //adding picture
    ground.addImage("ground", groundimage)
    //move ground in a backward direction

    //creating groups
    cactus_group = createGroup()
    cloud_group = createGroup()
    //creating game sprite
    gameOver = createSprite(283,60,100,30);
    gameOver.addImage("game_image", gameOver_image);
    gameOver.scale=0.1
    //making visible thing false
    gameOver.visible=false;
    //creating restart sprite
    restart = createSprite(283,100,65,30);
    restart.addImage("restart_image", restart_image);
    restart.scale=0.4
    restart.visible=false;
}

function draw() {
    background(180);
    //displaying score
    textSize(20);
    fill("gray");
    text("Score=" + score, 450, 20);
    if (gameState == start) {
        trex.changeAnimation("collide");
        if (keyDown("space")) {
            gameState=play;
        }
    }
    else if (gameState == play) {
        text("High=" + high_score,340,20);
        trex.changeAnimation("running");
        //moving the ground
        ground.velocityX = -15
        //updating the score
        //score = score + Math.round(frameCount / 60);
        score=score+Math.round(getFrameRate()/60)
        //creating infinite ground
        if (ground.x < 0) {
            ground.x = 300;
        }
        //trex jump
        if (keyDown("space") && trex.y > 142) {
            trex.velocityY = -16;
        }
        //give gravity
        trex.velocityY = trex.velocityY + 2.0
        //spawning clouds and obstacles
        spawn_cloud()
        spawn_obstacles()
        //checking the collision between the t=rex and the obstacles
        if (cactus_group.isTouching(trex)) {
            gameState=end
        }
    }

    else if (gameState == end) {
        if (high_score>=score) {
            high_score=high_score;
        }
        else {
            high_score=score;
        }
        text("High=" + high_score,340,20);
        ground.velocityX=0;
        cactus_group.setVelocityXEach(0);
        cloud_group.setVelocityXEach(0);
        cactus_group.setLifetimeEach(-1);
        cloud_group.setLifetimeEach(-1);
        trex.changeAnimation("collide");
        gameOver.visible=true;
        restart.visible=true;
        trex.velocityY=0;
        if (mousePressedOver(restart)) {
            //if user will click on restart button, then we the reset function
            reset()
        }
    }
    //to stop the trex from falling down
    trex.collide(ground);
    drawSprites();
}

function spawn_obstacles() {
    //creating cactus in a gap of 50 frame count
    var a = Math.round(random(25, 35));
    if (frameCount % a == 0) {
        var cactus = createSprite(600, 165, 20, 40)
        cactus_group.add(cactus)
        cactus.lifetime = 50;
        cactus.velocityX = -15
        cactus.scale = 0.4
        //generating random cactus images
        var r = Math.round(random(1, 6));
        switch (r) {
            case 1:
                cactus.addImage("ob1", obstacle1);
                break;
            case 2:
                cactus.addImage("ob2", obstacle2);
                break;
            case 3:
                cactus.addImage("ob3", obstacle3);
                break;
            case 4:
                cactus.addImage("ob4", obstacle4);
                break;
            case 5:
                cactus.addImage("ob5", obstacle5);
                break;
            case 6:
                cactus.addImage("ob6", obstacle6);
                break;
        }
    }
}
function spawn_cloud() {
    var b = 60
    if (frameCount % b == 0) {
        cloud = createSprite(600, 35, 80, 30);
        cloud_group.add(cloud);
        cloud.lifetime = 230
        cloud.velocityX = -3
        cloud.y = Math.round(random(40, 60));
        cloud.addImage("cloud", cloud_image)
    }
}

function reset() {
    
    score=0
    gameState=play;
    gameOver.visible=false;
    restart.visible=false;
    cactus_group.destroyEach();
    cloud_group.destroyEach();
    trex.changeAnimation("running", trex_running)
}