class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('playButton', './assets/sprites/playButton.png');
        this.load.image('creditsButton', './assets/sprites/creditsButton.png');
        this.load.image('bg', './assets/sprites/title_bg.png');
        this.load.audio("hit", "./assets/SFX/hit.wav");
        this.load.image('border', './assets/sprites/border.png');
    }

    create() {
        // game title text config
        let gameTitleTextConfig = {
            fontFamily: 'Arcade',
            fontSize: '130px',
            //backgroundColor: '#F3B141',
            color: '#fb0800',
            align: 'right',
            }
        

        // find center of screen
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        

        this.hitSound = this.sound.add("hit");
        let hitConfig = {
            volume:0.04
        };

        // initialize spacebar key
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // create 'Game Menu' text
        this.add.image(250, 350,'bg').setOrigin(0.5);
        this.add.text(this.screenCenterX,  this.screenCenterY - 100, "CAR CRASHERS", gameTitleTextConfig).setOrigin(0.5);
        

       // create 'Play' button
        this.playButton = this.add.sprite(this.screenCenterX, this.screenCenterY + 50, 'playButton').setOrigin(0.5);
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.scene.start('difficultiesScene');
            this.hitSound.play(hitConfig);
        });

        this.creditsButton = this.add.sprite(this.screenCenterX, this.screenCenterY + 150, 'creditsButton').setOrigin(0.5);
        this.creditsButton.setInteractive();
        this.creditsButton.on('pointerdown', () => {
            this.scene.start('creditsScene')
        })

        this.add.image(this.screenCenterX , this.screenCenterY ,'border').setOrigin(0.5);
    }
}