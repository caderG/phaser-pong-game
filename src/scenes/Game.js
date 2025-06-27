import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;

export class Game extends Scene {
    constructor() {
        super('Game');
        // Initialise necessary variablesAdd commentMore actions
        this.ball = null;
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.ballInMotion = false;
        this.wasd = null;
        this.cursors = null;
        // Points logic
        this.leftScore = 0;
        this.rightScore = 0;
        this.leftScoreText = null;
        this.rightScoreText = null;
    }

    preload() {
        // Load necessary assets from the assets directoryAdd commentMore actions
        this.load.image('background', 'assets/background.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');
    }

    create() {
        // Add background
        this.add.image(WIDTH/2, HEIGHT/2, 'background').setScale(0.8, 0.8);

        // Add paddles
        this.leftPaddle = this.physics.add.image(50, HEIGHT/2, "paddle");
        this.leftPaddle.setImmovable(true); // Make the left paddle immovable

        this.rightPaddle = this.physics.add.image(WIDTH - 50, HEIGHT/2, "paddle");
        this.rightPaddle.setImmovable(true); // Make the right paddle immovable 

        // Add ball as a physics object, scale it down
        this.ball = this.physics.add.image(WIDTH/2, HEIGHT/2, 'ball');
        this.ball.setScale(0.05, 0.05);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

        // Add collision detection between ball and either of the paddles
        this.physics.add.collider(this.ball, this.leftPaddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.rightPaddle, this.hitPaddle, null, this);

        // Ball starts stationary; press SPACE to launch
        this.ball.setVelocity(0, 0);
        this.ballInMotion = false;

        // Listen for "space" key to start ball
        this.input.keyboard.on('keydown-SPACE', this.startBall, this);

        // Assigns U/D/L/R keys to the cursors variable
        this.cursors = this.input.keyboard.createCursorKeys();
        // Assigns W/S keys to the wasd variable
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        })

        // Display scores on the screen
        this.leftScoreText = this.add.text(100, 50, '0', { fontSize: '50px' });
        this.rightScoreText = this.add.text(924, 50, '0', { fontSize: '50px' });
    }

    update() {
        // leftPaddle movement logic
        if (this.wasd.up.isDown && this.leftPaddle.y > 0) {
            this.leftPaddle.y -= 5;
        } else if (this.wasd.down.isDown && this.leftPaddle.y < HEIGHT) {
            this.leftPaddle.y += 5;
        }

        // rightPaddle movement logic
        if (this.cursors.up.isDown && this.rightPaddle.y > 0) {
            this.rightPaddle.y -= 5;
        } else if (this.cursors.down.isDown && this.rightPaddle.y < HEIGHT) {
            this.rightPaddle.y += 5;
        }

        // Fall condition check
        const margin = 30;
        if (this.ball.x < margin) { // ball hits left wall
            this.rightScore += 1;
            this.rightScoreText.setText(this.rightScore);
            this.resetBall();
        } else if (this.ball.x > WIDTH - margin) { // ball hits right wall
            this.leftScore += 1;
            this.leftScoreText.setText(this.leftScore);
            this.resetBall();
        }
    }

    startBall() {
        if (!this.ballInMotion) { // checks flag to determine if ball is not in motion
            this.ball.setVelocity(200, 200); // sets ball velocity
            this.ballInMotion = true; // sets flag to ball is in motion
        }
    }

    hitPaddle(ball, paddle) {
        let velocityFactor = 1.3;
        let newVelocityX = ball.body.velocity.x * velocityFactor;
        let newVelocityY = ball.body.velocity.y * velocityFactor;

        let angleDeviationInDeg = Phaser.Math.Between(-30, 30);
        let angleDeviationInRad = Phaser.Math.DegToRad(angleDeviationInDeg)
        let newVelocity = new Phaser.Math.Vector2(newVelocityX, newVelocityY).rotate(angleDeviationInRad);
        ball.setVelocity(newVelocity.x, newVelocity.y);
    }

    resetBall() {
        this.ball.setPosition(WIDTH/2, HEIGHT/2);
        this.ball.setVelocity(0, 0);
        this.ballInMotion = false;
        this.startBall();
    }

}