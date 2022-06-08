class Difficulties extends Phaser.Scene {
    constructor() {
        super("difficultiesScene");
    }

    preload() {
        this.load.audio("hit", "./assets/SFX/hit.wav");
    }

    create() {

        let textConfig = {
            fontFamily: 'Arcade',
            fontSize : '75px',
            align: 'left',
            fixedWidth: 0,
            resolution: 2,
        }


        let textConfig1 = {
            fontFamily: 'Arcade',
            fontSize : '45px',
            align: 'left',
            fixedWidth: 0,
            resolution: 2,
        }

        // find center of screen
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.hitSound = this.sound.add("hit");
        let hitConfig = {
            volume:0.04}

        this.difficultyTitleText = this.add.text(this.screenCenterX, this.screenCenterY - 100, "DIFFICULTY SELECT", textConfig).setOrigin(0.5);

        this.easyDifficulty = this.add.text(this.screenCenterX - 275, this.screenCenterY + 25, "EASY", textConfig1).setOrigin(0.5);
        this.easyDifficulty.setInteractive();
        this.easyDifficulty.on("pointerover", () => {
            this.easyDifficulty.setColor('#33d40f');  
        });
        this.easyDifficulty.on("pointerout", () => {
            this.easyDifficulty.setColor('#FFFFFF');  
        });
        this.easyDifficulty.on("pointerdown", () => {
            this.scene.start("playEasyScene")
            this.hitSound.play(hitConfig);
        });

        this.normalDifficulty = this.add.text(this.screenCenterX - 125, this.screenCenterY + 25, "NORMAL", textConfig1).setOrigin(0.5);
        this.normalDifficulty.setInteractive();
        this.normalDifficulty.on("pointerover", () => {
            this.normalDifficulty.setColor('#0a5e8f');  
        });
        this.normalDifficulty.on("pointerout", () => {
            this.normalDifficulty.setColor('#FFFFFF');  
        });
        this.normalDifficulty.on("pointerdown", () => {
            this.scene.start("playNormalScene")
            this.hitSound.play(hitConfig);
        });

        this.hardDifficulty = this.add.text(this.screenCenterX + 35, this.screenCenterY + 25, "HARD", textConfig1).setOrigin(0.5);
        this.hardDifficulty.setInteractive();
        this.hardDifficulty.on("pointerover", () => {
            this.hardDifficulty.setColor('#FF0000');  
        });
        this.hardDifficulty.on("pointerout", () => {
            this.hardDifficulty.setColor('#FFFFFF');  
        });
        this.hardDifficulty.on("pointerdown", () => {
            this.scene.start("playHardScene")
            this.hitSound.play(hitConfig);
        });

        this.nightmareDifficulty = this.add.text(this.screenCenterX + 225, this.screenCenterY + 25, "NIGHTMARE", textConfig1).setOrigin(0.5);
        this.nightmareDifficulty.setInteractive();
        this.nightmareDifficulty.on("pointerover", () => {
            this.nightmareDifficulty.setColor('#4e10e0');  
        });
        this.nightmareDifficulty.on("pointerout", () => {
            this.nightmareDifficulty.setColor('#FFFFFF');  
        });
        this.nightmareDifficulty.on("pointerdown", () => {
            this.scene.start("playNightmareScene")
            this.hitSound.play(hitConfig);
        })

        this.backButton = this.add.text(this.screenCenterX - 400, this.screenCenterY + 310, '↩️',textConfig).setOrigin(0.5);
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.scene.start('menuScene');
        })

   }
}