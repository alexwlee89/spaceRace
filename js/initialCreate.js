var app = app || {};

app.create = function() {

    app.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    app.starfield = app.game.add.tileSprite(0, 0, 800, 700, 'starfield');

    //  Our bullet group
    app.bullets = app.game.add.group();
    app.bullets.enableBody = true;
    app.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    app.bullets.createMultiple(30, 'bullet');
    app.bullets.setAll('anchor.x', 0.5);
    app.bullets.setAll('anchor.y', 1);
    app.bullets.setAll('outOfBoundsKill', true);
    app.bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    app.enemyBullets = app.game.add.group();
    app.enemyBullets.enableBody = true;
    app.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    app.enemyBullets.createMultiple(30, 'enemyBullet');
    app.enemyBullets.setAll('anchor.x', 0.5);
    app.enemyBullets.setAll('anchor.y', 1);
    app.enemyBullets.setAll('outOfBoundsKill', true);
    app.enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    app.player = app.game.add.sprite(400, 500, 'ship');
    app.player.anchor.setTo(0.5, 0.5);
    app.game.physics.enable(app.player, Phaser.Physics.ARCADE);

    //  The baddies!
    app.aliens = app.game.add.group();
    app.aliens.enableBody = true;
    app.aliens.physicsBodyType = Phaser.Physics.ARCADE;

    app.createAliens();

    //  The score
    app.scoreString = 'Score : ';
    app.scoreText = app.game.add.text(10, 705, app.scoreString + app.score, { font: '25px Georgia', fill: '#fff' });

    //  Lives
    app.lives = app.game.add.group();
    app.game.add.text(app.game.world.width - 200, 705, 'Lives : ', { font: '25px Georgia', fill: '#fff' });

    //  Text
    app.stateText = app.game.add.text(app.game.world.centerX,app.game.world.centerY,' ', { font: '84px Gerogia', fill: '#fff' });
    app.stateText.anchor.setTo(0.5, 0.5);
    app.stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var ship = app.lives.create(app.game.world.width - 100 + (30 * i), 720, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 1;
    }

    //  An explosion pool
    app.explosions = app.game.add.group();
    app.explosions.createMultiple(30, 'kaboom');
    app.explosions.forEach(app.setupInvader, this);

    //  And some controls to play the game with
    app.cursors = app.game.input.keyboard.createCursorKeys();
    app.fireButton = app.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
}