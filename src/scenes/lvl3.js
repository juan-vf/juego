var player;
var lunas;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;




export class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3")
    }

// preload(){
    


// }

create(){
    const map = this.make.tilemap({ key: "mapL3" });
    const tilesetBelow2  = map.addTilesetImage("Sky33", "fondo4");
    const tilesetBelow3  = map.addTilesetImage("waterP", "plataforma03");

    const fondoLayer = map.createLayer("fondo", tilesetBelow2, 0, 0);
    const platformLayer = map.createLayer("plataforma", tilesetBelow3, 0, 0);
    const objects2 = map.getObjectLayer("objetos");

    platformLayer.setCollisionByProperty({ collides: true });
    

      // tiles marked as colliding
    /*
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
    */

    const spawnPoint2 = map.findObject("objetos", (obj) => obj.name === "dude")

    player = this.physics.add.sprite(spawnPoint2.x, spawnPoint2.y, "dude");
    
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Input Events
    if ((cursors = !undefined)) {
        cursors = this.input.keyboard.createCursorKeys();
    }
    
    // Create empty group of crystal
    lunas = this.physics.add.group();

    // find object layer
    // if type is "crystal", add to stars group
    objects2.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);

      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "luna": {
          // add star to scene
          // console.log("crystal agregada: ", x, y);
          var luna = lunas.create(x, y, "luna");
          luna.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
      }
    });

    // Create empty group of bombs
    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(30, 6, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    

    // Collide the player and the crystal with the platforms
    // REPLACE Add collision with worldLayer
    this.physics.add.collider(player, platformLayer);
    this.physics.add.collider(lunas, platformLayer);
    this.physics.add.collider(bombs, platformLayer);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, lunas, this.collectLuna, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    gameOver = false;
    score = 0;
  }

update(){
      if (lunas.countActive(true) === 0) { 
        this.scene.start("MainMenu", { score: score });
      }
    
      if (gameOver) {
        return;
      }
  
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
  
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
  
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
  
        player.anims.play("turn");
      }
  
      // REPLACE player.body.touching.down
      if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
      }
    }
    
    
    collectLuna(player, lunas) {
      lunas.disableBody(true, true);
  
      //  Add and update the score
      score += 10;
      scoreText.setText("Score: " + score);
  
      /*if (luna.countActive(true) === 0) {
        //  A new batch of crystal to collect
        lunas.children.iterate(function (child) {
          child.enableBody(true, child.x, child.y + 10, true, true);
        });
  
        var x =
          player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
  
        var bomb = bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }*/
    }
  
    hitBomb(player, bomb) {
      this.physics.pause();
  
      player.setTint(0xff0000);
  
      player.anims.play("turn");
  
      gameOver = true;
  
      // Función timeout usada para llamar la instrucción que tiene adentro despues de X milisegundos
      setTimeout(() => {
        // Instrucción que sera llamada despues del segundo
        this.scene.start(
          "Retry",
          { score: score } // se pasa el puntaje como dato a la escena RETRY
        );
      }, 1000); // Ese número es la cantidad de milisegundos
    }

  

}





