app.randomizer = function(x,y){
  for (var i = 0; i < app.aliens.children.length; i++){
    app.aliens.children[i].position.x = _.random(x,y);
  }
}


app.toNextLevel = function(createLevel){

  if (app.aliens.countLiving() === 0)
      {
          // app.score += 1000;
          app.scoreText.text = app.scoreString + app.score;

          app.enemyBullets.callAll('kill',this);

          if ( app.levelCounter === 1 ) {
            app.stateText.text = " It's dangerous \n  to go alone. \n   Try these: \n     ⍃   ⍄";
            app.stateText.visible = true;
          } else if ( app.levelCounter === 2 ) {
            app.stateText.text = " Lvl Two Done";
            app.stateText.visible = true;
          } else if ( app.levelCounter === 3 ) {
            app.stateText.text = " Lvl Three Done ";
            app.stateText.visible = true;
          } else if ( app.levelCounter === 4 ) {
            app.stateText.text = " Lvl Four Done";
            app.stateText.visible = true;
          } else if ( app.levelCounter === 5 ) {
            app.stateText.text = " Lvl Five Done";
            app.stateText.visible = true;
          } else if ( app.levelCounter === 6 ) {
            app.stateText.text = " Lvl Six Done";
            app.stateText.visible = true;
          };

          //Destroys killed sprites from our count.
          app.aliens.children = [];

          //the "click to restart" handler
          app.game.time.events.events.pop();

          // app.game.input.onDown.addOnce(createLevel, this)

          app.canFire = false;

          app.fireButton.onDown.addOnce(createLevel, this);

          var checkSpacePress = setInterval(function() {
       
            if (app.fireButton.isDown) {
              console.log("space pressed!");
              clearInterval(checkSpacePress);
              checkSpacePress = 0;

              setTimeout(function() {
                app.canFire = true;
              }, 1000);

            }

          }, 100);

  }

};


// Are the small aliends dead?
// var areSmallAliensDead = function(){
//   var deathTest = 0
//   for ( var i = 0; i < app.smallAliens.length; i++ ){
//     if ( app.smallAliens[i].countLiving() === 0 ){
//       deathTest += app.smallAliens[i].countLiving()
//       console.log("Dead!")
//     } else { lifetest = false }


//   }
//   return lifetest
// }

app.areSmallAliensDead = function(){
  var deathTest = 0;
  for ( var i = 0; i < app.smallAliens.length; i++ ){
    if (app.smallAliens[i].countLiving() === 0){
      deathTest ++;
    }
  }


  if (deathTest === app.smallAliens.length){
    console.log("SECOND DEATH TEST " + deathTest)
    console.log("SECOND SMALL ALIEN LOG " + app.smallAliens.length)

    return true;
  }
// return false

}