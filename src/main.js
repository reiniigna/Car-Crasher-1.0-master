let gameConfig = {
    type: Phaser.AUTO,
    width: 900,
    height: 720,
    scene: [Menu, Credits, Difficulties, PlayEasy, PlayHard, PlayNormal, PlayNightmare],
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y : 400}

        }
    }
}
let game = new Phaser.Game(gameConfig);

let keyLEFT, keyRIGHT;
