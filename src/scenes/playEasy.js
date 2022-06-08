class PlayEasy extends Phaser.Scene {
    constructor() {
        super("playEasyScene");
    }

    preload() {
        this.load.image('background', './assets/sprites/background.png' );
        this.load.image('playerCar', './assets/sprites/playerCar.png');
        this.load.image('pauseButton', './assets/sprites/pauseButton.png');
        this.load.image('leftSide', './assets/sprites/leftSide.png');
        this.load.image('rightSide', './assets/sprites/rightSide.png');
        this.load.image('street', './assets/sprites/street.png');
        this.load.image('cars1', './assets/sprites/cars1.png');
        this.load.image('cars2', './assets/sprites/cars2.png');
        this.load.image('cars3', './assets/sprites/cars3.png');
        this.load.image('cars4', './assets/sprites/cars4.png');
        this.load.image('schoolbus', './assets/sprites/schoolbus1.png');
        this.load.image('trucks1', './assets/sprites/trucks1.png');
        this.load.image('trucks2', './assets/sprites/trucks2.png');
        this.load.image('trucks3', './assets/sprites/trucks3.png');
        this.load.image('trucks4', './assets/sprites/trucks4.png');
        this.load.image('trucks5', './assets/sprites/trucks5.png');
        this.load.image('reset', './assets/sprites/reset.png');
        this.load.image('play', './assets/sprites/play.png');
        this.load.image('mute', './assets/sprites/mute.png');
        this.load.image('unMute', './assets/sprites/unMute.png');
        this.load.image('modeBt', './assets/sprites/modeBt.png');
        this.load.image('lives', './assets/sprites/lives.png');
        this.load.image('gameOverBg', './assets/sprites/gameOverBG.png');
        this.load.audio("bgm", "./assets/SFX/soundtrack.wav");
        this.load.audio("hit", "./assets/SFX/hit.wav");
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {

        // initialize music
        this.bgMusic = this.sound.add("bgm");

        // initialize hit sound
        this.hitSound = this.sound.add("hit");

        // config for music
        let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        // play music
        this.bgMusic.play(musicConfig);

        // animation config for explosion
        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 5}),
            framerate: 15,
            repeat: 0,
        });

        // config for text
        let textConfig = {
            fontFamily: 'Arcade',
            fontSize : '24px',
            align: 'left',
            fixedWidth: 0,
            resolution: 2,
        }

        // find center of screen
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // mute flag
        this.isMute = false;

        // game over flag
        this.gameIsOver = false

        // game paused flag
        this.gameIsPaused = false

        // adding pause button
        this.pauseButton = this.add.image(64, 64,'pauseButton').setOrigin(0.5);
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            this.pauseUnpause();
        });

        // adding switch mode button
        this.modeButton = this.add.image(64, 247,'modeBt').setOrigin(0.5);
        this.modeButton.setInteractive();
        this.modeButton.on('pointerdown', () => {
            this.scene.start('menuScene');
            this.bgMusic.pause();
        });   
        
        // adding reset button
        this.resetButton = this.add.image(64, 125,'reset').setOrigin(0.5);
        this.resetButton.setInteractive();
        this.resetButton.on('pointerdown', () => {
            this.resetGame();
        });    

        // adding mute function
        if(this.isMute)
        {
            // adding mute button
            this.muteButton = this.add.image(64, 186,'mute').setOrigin(0.5);
        }
        else if(!this.isMute)
        {
            // adding mute button
            this.muteButton = this.add.image(64, 186,'unMute').setOrigin(0.5);
        }
        this.muteButton.setInteractive();
        this.muteButton.on('pointerdown', () => {
            this.muteUnmute();
        }); 


        // add boundry sprite
        this.leftSide = this.add.tileSprite(this.screenCenterX - 188, this.screenCenterY - 4800, 101, 12000, 'leftSide').setOrigin(0.5);
        this.rightSide = this.add.tileSprite(this.screenCenterX + 181, this.screenCenterY - 4800, 115, 12000, 'rightSide').setOrigin(0.5);

        // add street sprite
        this.street = this.add.tileSprite(this.screenCenterX, this.screenCenterY - 4800, 320, 12000, 'street').setOrigin(0.5);

        // add text 
        this.add.text(this.screenCenterX + 285, this.screenCenterY + 225, "  Controls  ", textConfig);
        this.add.text(this.screenCenterX + 270, this.screenCenterY + 255, "left⬅️|➡️right", textConfig);
        this.add.text(this.screenCenterX + 275, this.screenCenterY + 280, "up ⬆️|⬇️down", textConfig);

        // establishing keybind
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // create player
        this.player = new PlayerCar (this, this.screenCenterX + 25, this.screenCenterY + 200, 'playerCar').setOrigin(0.5);
        this.player.setScale(2.5);

        this.pauseText = this.add.text(this.screenCenterX, this.screenCenterY, "PAUSED", textConfig).setOrigin(0.5);
        this.pauseText.alpha = 0;

        // add physics to boundries
        this.physics.add.existing(this.leftSide, true);
        this.physics.add.existing(this.rightSide, true);

        // add physics to player
        this.physics.add.existing(this.player, false);
        this.player.body.collideWorldBounds = true;
        this.player.body.setAllowGravity(false);

        // setting size for collision size for boundries
        this.leftSide.body.setSize(55,12000);
        this.rightSide.body.setSize(40,12000);

        // add collision between player and boundries
        this.physics.add.collider(this.player, this.leftSide, () => {
            console.log('collided left');
        });
        this.physics.add.collider(this.player, this.rightSide, () => {

            console.log('collided right');
        });

        // array for random sprite usage
        this.enemySprites = ['cars1' , 'cars2', 'cars3', 'cars4', 'schoolbus', 'trucks1', 'trucks2', 'trucks3', 'trucks4', 'trucks5'];

        // spawning enemies on a timer
        this.time.addEvent({
            delay:600,
            callback: () => {
                this.spawnObstacles();
            },
            loop: true
        });

        this.scoreText = this.add.text(this.screenCenterX - 365, this.screenCenterY + 275, "SCORE: ", textConfig).setOrigin(0.5);
        this.scoreText.depth = 11;
        this.highScoreText = this.add.text(this.screenCenterX - 340, this.screenCenterY + 300, "HIGHSCORE: " + localStorage.getItem("EasyHighScoreVar"), textConfig).setOrigin(0.5);
        this.score = 0;

        // initializing high score
        this.highScore = 0;

        // creating timer
        this.timer = this.time.addEvent({ delay: 99999999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

        // initializing lives
        this.lives = 3;

        // adding "lives" text
        this.add.image(837, 64,'lives').setOrigin(0.5);
        this.livesText = this.add.text(this.screenCenterX + 345, 64, this.lives, textConfig).setOrigin(0.5);
        this.livesText.setFontSize(36);

        // text for game over menu
        this.gameOverMenu = this.add.image(this.screenCenterX, this.screenCenterY, 'gameOverBg').setOrigin(0.5);
        this.gameOverMenu.depth = 10;
        this.gameOverMenu.alpha = 0;
        this.gameOverText = this.add.text(this.screenCenterX, this.screenCenterY - 100, 'GAME OVER', textConfig).setOrigin(0.5);
        this.gameOverText.depth = 11;
        this.gameOverText.setFontSize(36);
        this.gameOverText.alpha = 0;
        this.gameOverHighScoreText = this.add.text(this.screenCenterX, this.screenCenterY, 'NEW HIGH SCORE!: ' + this.score, textConfig).setOrigin(0.5);
        this.gameOverHighScoreText.depth = 11;
        this.gameOverHighScoreText.alpha = 0;
    }

    update() {

        if(this.isMute)
        {
            // adding mute button
            this.muteButton = this.add.image(64, 186,'unMute').setOrigin(0.5);
        }
        else if(!this.isMute)
        {
            // adding mute button
            this.muteButton = this.add.image(64, 186,'mute').setOrigin(0.5);
        }

        // adding pause function
        if(this.gameIsPaused)
        {
            // adding play button
            this.pauseButton = this.add.image(64, 64,'play').setOrigin(0.5);
        }
        else if(!this.gameIsPaused)
        {
            // adding pause button
            this.pauseButton = this.add.image(64, 64,'pauseButton').setOrigin(0.5);
        }

        // move car when pressing LEFT, RIGHT, UP, or DOWN arrow keys
        if (this.keyLEFT.isDown && (!this.gameIsPaused) && (!this.keyDOWN.isDown && !this.keyUP.isDown))  {
            this.player.body.setVelocityX(-this.player.speed);
        } else if (this.keyRIGHT.isDown && (!this.gameIsPaused) && (!this.keyDOWN.isDown && !this.keyUP.isDown)) {
            this.player.body.setVelocityX(this.player.speed);
        } else if (this.keyUP.isDown && (!this.gameIsPaused) && (!this.keyLEFT.isDown && !this.keyRIGHT.isDown)) {
            this.player.body.setVelocityY(-this.player.speed);
        } else if (this.keyDOWN.isDown && (!this.gameIsPaused) && (!this.keyLEFT.isDown && !this.keyRIGHT.isDown)) {
            this.player.body.setVelocityY(this.player.speed);
        } else {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        }

        // pause scrolling of background if game is paused/over
        if (!this.gameIsOver && !this.gameIsPaused) {
            this.leftSide.tilePositionY -= 1.5;
            this.rightSide.tilePositionY -= 1.5;
            this.street.tilePositionY -= 1.5;
            this.physics.resume();
            this.timer.paused = false;
        } else {
            this.leftSide.tilePositionY -= 0;
            this.rightSide.tilePositionY -= 0;
            this.street.tilePositionY -= 0;
            this.physics.pause();
            this.timer.paused = true;
        }
        
        // while player is still playing game update score
        if (!this.gameIsPaused && !this.gameIsOver) {
            this.scoreText.setText("SCORE: " + parseInt(10 * this.timer.getElapsedSeconds()) + '0');
            this.score = parseInt(parseInt(this.timer.getElapsedSeconds() * 10) + '0');
            //this.explodeCar();
        }

        // get rid of null highscore on first play through
        if (localStorage.getItem("EasyHighScoreVar") == null){
            this.highScoreText.setText("HIGHSCORE: 0");
        }

        // constantly update "lives text"
        if (!this.gameIsOver && !this.gameIsPaused) {
            this.livesText.setText(" " + this.lives)
        }

        // show player's new highscore
        if (this.lives == 0 && (this.score > localStorage.getItem("EasyHighScoreVar"))) {
            this.gameOverHighScoreText.alpha = 1;
            this.gameOverHighScoreText.setText("NEW HIGH SCORE: " + this.score);
        }

        // if player dies
        if (this.lives == 0) {
            this.explodeCar();
            this.gameIsOver = true;
            this.highScoreFunc();
            this.gameOverMenu.alpha = 1;
            this.gameOverText.alpha = 1;
            this.resetButton.setPosition(this.screenCenterX, this.screenCenterY + 75);
            this.resetButton.depth = 12;
            this.scoreText.setPosition(this.screenCenterX, this.screenCenterY - 50);
        }

    }

    pauseUnpause() {
        if (this.gameIsPaused) {
            this.gameIsPaused = false
            this.pauseText.alpha = 0
        } else if (!this.gameIsPaused) {
            this.gameIsPaused = true
            this.pauseText.alpha = 1
        }
    }

    resetGame() {
        this.bgMusic.stop();
        this.registry.destroy(); // destroy registry
        this.events.off();       // disable all active events
        this.scene.restart();    // restart current scene
    }

    // spawn random enemies randomly
    spawnObstacles() {
        if (!this.gameIsOver && !this.gameIsPaused){
            this.enemy = new Obstacle(this, Phaser.Math.Between(this.screenCenterX - 150, this.screenCenterX + 150), -100, Phaser.Math.RND.pick(this.enemySprites));
            this.enemy.setScale(2.5);
            this.physics.add.existing(this.enemy);
            this.physics.add.overlap(this.enemy, this.player, (obj1, obj2) => {
                let hitConfig = {
                    volume:0.2
                };
                this.hitSound.play(hitConfig);
                obj1.destroy();
                this.cameras.main.flash();
                this.lives -= 1;
            });
        }
    }

    highScoreFunc() {
        if (this.score > localStorage.getItem("EasyHighScoreVar")) {
            localStorage.setItem("EasyHighScoreVar", this.score)
        }
    }

    explodeCar() {
        this.player.alpha = 0;
        let boom = this.add.sprite(this.player.x, this.player.y, 'explosion');
        boom.setScale(2);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            boom.destroy();
        });
        this.bgMusic.stop();
    }

    muteUnmute(){
        if(this.isMute){
            this.bgMusic.play();
            this.isMute = false;
        }

        else if(!this.isMute)
        {
            this.bgMusic.pause();
            this.isMute = true;
        }
    }
}