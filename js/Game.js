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
      var playerCountref=await database.ref("playerCount").once("value");
      if(playerCountref.exists()){
          playerCount=playerCountref.val();
          player.getCount();
      }
     
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();
    if(allPlayers!==undefined){
        var ypos=130;
        
        for(var i in allPlayers){
            ypos+=20;
            if(i==="player"+player.index){
                fill("red");
            }
            else{
              fill("black");
            }

      
            textSize(20);
            text(allPlayers[i].name+":"+allPlayers[i].distance,120,ypos);
        }
        
    }
    if(keyIsDown(UP_ARROW)&player.index!==null){
        player.distance+=50;
        player.update();
    }
  }
}
