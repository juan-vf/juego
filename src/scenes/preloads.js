// Clase Preloads, para separar los preloads y tener mejor orden
export class Preloads extends Phaser.Scene {
  // Se extiende de Phaser.Scene porque es una escena
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Preloads");
  }

  preload() {
    this.load.image("sad_cow", "public/assets/images/sad_cow.png");
    this.load.image("phaser_logo", "public/assets/images/phaser_logo.png");
    this.load.image(
      "mainmenu_bg",
      "public/assets/images/main_menu_background.png"
    );
    // this.load.image("sky", "public/assets/images/sky.png");
    // this.load.image("ground", "public/assets/images/platform.png");
    this.load.image("star", "public/assets/images/star.png");
    this.load.image("bomb", "public/assets/images/bomb.png");
    this.load.spritesheet("dude", "public/assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.tilemapTiledJSON("map", "public/assets/tilemaps/map.json");
    this.load.image("tilesBelow", "public/assets/images/sky_atlas.png");
    this.load.image("tilesPlatform", "public/assets/images/platform_atlas.png");
    
    //Nivel 2 preloads
    this.load.tilemapTiledJSON("mapL2", "public/assets/tilemaps/Level2.json" )
    //this.load.tilemapTiledJSON("mapL3", "public/assets/tilemaps/atlas2.json")
    this.load.image("fondo3", "public/assets/images/sky22.png")
    //this.load.image("fondo02", "public/assets/images/sky2.png")
    this.load.image("plataforma02", "public/assets/images/ground.png")
    this.load.image("luna", "public/assets/images/luna.png")

    //Nivel 3 preloads
    this.load.tilemapTiledJSON("mapL3", "public/assets/tilemaps/Level3.json" )
    this.load.image("fondo4", "public/assets/images/Sky33.png")
    this.load.image("plataforma03", "public/assets/images/waterP.png")

  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Pasa directamente a la escena del menú principal
    this.scene.start("MainMenu");
  }
}
