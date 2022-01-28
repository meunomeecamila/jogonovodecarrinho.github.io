class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    c1 = createSprite(100,200);
    c1.addImage("car1",c1_img);
    c2 = createSprite(300,200);
    c2.addImage("car2",c2_img);
    //c3 = createSprite(500,200);
    //c3.addImage("car3",c3_img);
    //c4 = createSprite(700,200);
    //c4.addImage("car4",c4_img);
    cars = [c1, c2, /*c3, c4*/];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    //player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(rgb(66,66,66));
      //ajustar a imagem da pista 
      image(track_img,0,-displayHeight*4,displayWidth,displayHeight*5);

      //var display_position = 130;
      var index = 0;
      var x = 175;
      var y;

      for(var plr in allPlayers){
        index = index+1;
        x = x+200;

        y = displayHeight-allPlayers[plr].distanceY;
        x = displayHeight-allPlayers[plr].distanceX;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("yellow");
          ellipse(x,y,60,60);

          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
      
        //textSize(15);
        //text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distanceX +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distanceX -=10
      player.update();
    }

    if(player.distanceY>3860){
      gameState = 2;

    }

    /*if(keyIsDown(UP_ARROW)){
      player.velocityY = +10;
    }
    if(keyIsDown(LEFT_ARROW)){
      player.velocityX = -10;
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.velocityX = +10;
    }*/

    drawSprites();
  }

 end(){
 console.log("Game over");
  }
  
}
