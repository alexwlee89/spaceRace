var app = app || {};

app.createLevelFour = function() {
    app.createAliensLevelThree();
    app.stateText.visible = false;
    app.levelCounter ++;
    
}

app.createAliensLevelFour = function() {

  for (var y = 0; y < 2; y++)
    {
        for (var x = 0; x < 5; x++) {
        
            var alien = app.aliens.create(x * 150, y * 200, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            // alien.play('fly');
            alien.body.moves = false;
        };
    }

    app.aliens.x = 250;
    app.aliens.y = -300;



    app.game.time.events.loop(Phaser.Timer.SECOND * .01, app.descendLevelFour, this);

}

app.descendLevelFour = function() {


    app.aliens.y += 1;



    _.each(app.aliens.children, function(alien) {
        if (alien.world.y > app.game.world.bounds.bottom) {
            alien.kill();
        }
    });

}

app.collisionHandlerLevelFour = function(bullet, alien) {


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

    app.toNextLevel(app.createLevelFour);

}