class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('border', './assets/sprites/border.png');
    }

    create() {
        let textConfig = {
            fontFamily: 'Arcade',
            fontSize : '48px',
            align: 'left',
            fixedWidth: 0,
            resolution: 2,
        }

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.image(this.screenCenterX , this.screenCenterY ,'border').setOrigin(0.5);

        this.credits = this.add.text(this.screenCenterX, this.screenCenterY - 250, 'CREDITS', textConfig).setOrigin(0.5);

        this.programmerTitle = this.add.text(this.screenCenterX, this.screenCenterY - 150, 'PROGAMMING', textConfig).setOrigin(0.5);
        this.programmerTitle.setFontSize('30px');

        this.programmingName = this.add.text(this.screenCenterX, this.screenCenterY - 100, 'Huy Nguyen / Amir Valipour', textConfig).setOrigin(0.5);
        this.programmingName.setFontSize('24px');

        this.artDesignTitle = this.add.text(this.screenCenterX, this.screenCenterY - 50, 'ART DEISGN', textConfig).setOrigin(0.5);
        this.artDesignTitle.setFontSize('30px');

        this.artDesignName = this.add.text(this.screenCenterX, this.screenCenterY, 'Amir Valipour / Reini Igna', textConfig).setOrigin(0.5);
        this.artDesignName.setFontSize('24px');

        this.playTestingTitle = this.add.text(this.screenCenterX, this.screenCenterY + 50, 'PLAYTESTING', textConfig).setOrigin(0.5);
        this.playTestingTitle.setFontSize('30px');

        this.playTestingName = this.add.text(this.screenCenterX, this.screenCenterY + 100, 'Reini Igna / Amir Valipour / Huy Nguyen', textConfig).setOrigin(0.5);
        this.playTestingName.setFontSize('24px');

        this.backButton = this.add.text(this.screenCenterX - 400, this.screenCenterY + 300, '↩️',textConfig).setOrigin(0.5);
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.scene.start('menuScene');
        })
    }
}