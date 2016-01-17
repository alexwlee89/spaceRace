var app = app || {};

app.restart = function() {

    //  A new level starts
    app.levelCounter = 0;

    //resets the life count
    app.lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    app.aliens.removeAll();
    app.createAliensLevelOne();

    //revives the player
    app.player.revive();
    //hides the text
    app.stateText.visible = false;

    app.score = 0;
    app.scoreText.destroy();
    app.scoreText = app.game.add.text(10, 705, app.scoreString + app.score, { font: '25px Georgia', fill: '#fff' });

    //This is to prevent the enemies moving double time on restart.
    app.game.time.events.events.pop();
}





