var app = app || {};

app.createLevelFour = function() {

    app.player.loadTexture("shipLevel4", 0, false);
    app.bulletVelocity = 400;
    app.aliensVelocity = 2.1;
    app.aliensSpawnTime = 20000;

    app.createAliensLevelFour();
    app.stateText.visible = false;
    app.levelCounter ++;
    // app.preloadLevelFive();
    app.game.time.events.events.pop();
    app.game.time.events.loop(Phaser.Timer.SECOND * .02, app.descendLevelFourSmallAliens, this);
    

}

app.createAlienGroupTopBottom = function(x, y, num, alienMove) {

    var alienArray = [];

    for (var i = 0; i < num; i++) {

        var alien = app.aliens.create(_.random(100, x), y, 'asteroidLargeLevelFour');
        alien.anchor.setTo(0.5, 0.5);
        // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        // alien.play('fly');
        alien.body.moves = false;
        alienArray.push(alien);
    }

    _.each(alienArray, function(alien){

        setTimeout(function() {
            app.game.time.events.loop(Phaser.Timer.SECOND * .01, alienMove, this, alien);
        }, _.random(1000, app.aliensSpawnTime) );

    });

}

app.createAlienGroupLeftRight = function(x, y, num, alienMove) {

    var alienArray = [];

    for (var i = 0; i < num; i++) {

        var alien = app.aliens.create(x, _.random(100, y), 'asteroidLargeLevelFour');
        alien.anchor.setTo(0.5, 0.5);
        // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        // alien.play('fly');
        alien.body.moves = false;
        alienArray.push(alien);
    }

    _.each(alienArray, function(alien){

        setTimeout(function() {
            app.game.time.events.loop(Phaser.Timer.SECOND * .01, alienMove, this, alien);
        }, _.random(1000, app.aliensSpawnTime) );

    });


}

app.createAliensLevelFour = function() {

    // Reset aliens position
    app.aliens.x = 0;
    app.aliens.y = 0;

    asteroidNum = 21; // Total number of asteroids that will spawn
    num = asteroidNum / 3;

    // Asteroid group moving from top to bottom
    app.createAlienGroupTopBottom(700, -300, num, app.descendLevelFour);

    // Asteroid group moving from left to right
    app.createAlienGroupLeftRight(-300, 550, num, app.moveRightLevelFour);

    // Asteroid group moving from right to left
    app.createAlienGroupLeftRight(1200, 550, num, app.moveLeftLevelFour);

}

app.descendLevelFour = function(alien) {

    alien.position.y += app.aliensVelocity;
    // player.body.velocity.y = -200;

    if (alien.worldPosition.y > app.game.world.bounds.bottom) {
        alien.kill();
    }

}

app.moveRightLevelFour = function(alien) {

    alien.position.x += app.aliensVelocity;

    if (alien.worldPosition.x > app.game.world.bounds.right) {
        alien.kill();
    }

}

app.moveLeftLevelFour = function(alien) {

    alien.position.x -= app.aliensVelocity;

    if (alien.worldPosition.x < app.game.world.bounds.left) {
        alien.kill();
    }
}

app.collisionHandlerLevelFour = function(bullet, alien) {
    app.loggingPositions(alien);
    
    app.totalKillCount += 1;

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //AUDIO enemy is hit by bullet -K

    soundCall = new Howl({
    urls: [playSound("enemyHit")]
    }).play();

    //  Increase the score
    app.score += 20;
    app.scoreText.text = app.scoreString + app.score;

    //  And create an explosion :)
    var explosion = app.explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

}

app.collisionHandlerLevelFourSmall = function(bullet, alien) {

    app.totalKillCount += 1;


    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //AUDIO enemy is hit by bullet -K

    soundCall = new Howl({
    urls: [playSound("enemyHit")]
    }).play();

    //  Increase the score
    app.score += 20;
    app.scoreText.text = app.scoreString + app.score;

    //  And create an explosion :)
    var explosion = app.explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);


}


app.preloadLevelFive = function(){

    app.game.load.spritesheet('shipLevelFive', '<%= image_path("LevelFive/ship.png") %>');
    app.game.load.start();

};



app.loggingPositions = function(alien){
    var prevPosX = alien.previousPosition.x
    var prevPosY = alien.previousPosition.y
    var currentPosX = alien.worldPosition.x
    var currentPosY = alien.worldPosition.y

    if ( prevPosX === currentPosX ){
        // console.log("X's are equal");
        console.log("Going Down")
        app.smallAsteroidSpawnLvlFour(app.smallAliensDown, app.smallAlienGroupCounter);
        app.createSmallDown(alien);
    }

    if ( prevPosY === currentPosY ) {
        if(prevPosX > currentPosX){
            console.log("Going Left")
            app.smallAsteroidSpawnLvlFour(app.smallAliensLeft, app.smallAlienGroupCounter);
            app.createSmallLeft(alien);
        }
        if(currentPosX > prevPosX){
            console.log("Going Right")
             app.smallAsteroidSpawnLvlFour(app.smallAliensRight, app.smallAlienGroupCounter);
            app.createSmallRight(alien);
        }
    }

};


app.createSmallRight = function(lastAlien) {

    var currentXPos = lastAlien.previousPosition.x
    var currentYPos = lastAlien.previousPosition.y
    var alienName = _.last(app.smallAliensRight);
    var alienIndex = app.smallAliensRight.indexOf(alienName);
    var alienInfo = app.game.add.group();
        alienInfo.enableBody = true;
        alienInfo.physicsBodyType = Phaser.Physics.ARCADE;
        app.smallAliensRight[ alienIndex ] = alienInfo;

    for (var y = 0; y < 1; y++)
    {
        for (var x = 0; x < 2; x++)
        {
            alienInfo.create(x * 50, 0, 'invader');
        }
    }
    alienInfo.x = currentXPos - 40;
    alienInfo.y = currentYPos;

}

app.createSmallLeft = function(lastAlien) {

    var currentXPos = lastAlien.previousPosition.x
    var currentYPos = lastAlien.previousPosition.y
    var alienName = _.last(app.smallAliensLeft);
    var alienIndex = app.smallAliensLeft.indexOf(alienName);
    var alienInfo = app.game.add.group();
        alienInfo.enableBody = true;
        alienInfo.physicsBodyType = Phaser.Physics.ARCADE;
        app.smallAliensLeft[ alienIndex ] = alienInfo;

    for (var y = 0; y < 1; y++)
    {
        for (var x = 0; x < 2; x++)
        {
            alienInfo.create(x * 50, 0, 'invader');
        }
    }
    alienInfo.x = currentXPos - 40;
    alienInfo.y = currentYPos;



}

app.createSmallDown = function(lastAlien) {

    var currentXPos = lastAlien.previousPosition.x
    var currentYPos = lastAlien.previousPosition.y
    var alienName = _.last(app.smallAliensDown);
    var alienIndex = app.smallAliensDown.indexOf(alienName);
    var alienInfo = app.game.add.group();
        alienInfo.enableBody = true;
        alienInfo.physicsBodyType = Phaser.Physics.ARCADE;
        app.smallAliensDown[ alienIndex ] = alienInfo;

    for (var y = 0; y < 1; y++)
    {
        for (var x = 0; x < 2; x++)
        {
            alienInfo.create(x * 50, 0, 'invader');
        }
    }
    alienInfo.x = currentXPos - 40;
    alienInfo.y = currentYPos;



}


app.smallAsteroidSpawnLvlFour = function(group, num){

     var alienObj = {alienGroup: 'smallAliens'}
        group.push(alienObj['alienGroup']+num)

        app.smallAlienGroupCounter ++;

}


app.descendLevelFourSmallAliens = function(){


    for(i = 0; i < app.smallAliensDown.length; i++){
  

    app.smallAliensDown[i].y += 1.3;
    app.smallAliensDown[i].children[0].x += -0.08
    app.smallAliensDown[i].children[1].x += 0.08


        for (var j = 0; j < app.smallAliensDown[i].children.length; j++) {

            if (app.smallAliensDown[i].children[j].world.y > app.game.world.bounds.bottom) {
                app.smallAliensDown[i].children[j].kill()
            }
        };

    }

      for(i = 0; i < app.smallAliensRight.length; i++){
  

    app.smallAliensRight[i].x += 1.3;
    app.smallAliensRight[i].children[0].y += -0.08
    app.smallAliensRight[i].children[1].y += 0.08


        for (var j = 0; j < app.smallAliensRight[i].children.length; j++) {

            if (app.smallAliensRight[i].children[j].world.x > app.game.world.bounds.right) {
                app.smallAliensRight[i].children[j].kill()
            }
        };

    }

      for(i = 0; i < app.smallAliensLeft.length; i++){


    app.smallAliensLeft[i].x += 1.3;
    app.smallAliensLeft[i].children[0].y += -0.08
    app.smallAliensLeft[i].children[1].y += 0.08
  

        for (var j = 0; j < app.smallAliensLeft[i].children.length; j++) {

            if (app.smallAliensLeft[i].children[j].world.x > app.game.world.bounds.left) {
                app.smallAliensLeft[i].children[j].kill()
            }
        };

    }

}
