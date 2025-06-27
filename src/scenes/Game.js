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

        // Add collision detection between ball and either of the paddles
        this.physics.add.collider(this.ball, this.leftPaddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.rightPaddle, this.hitPaddle, null, this);

        // Add ball as a physics object, scale it down
        this.ball = this.physics.add.image(WIDTH/2, HEIGHT/2, 'ball');
        this.ball.setScale(0.05, 0.05);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

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

    }

    startBall() {
        if (!this.ballInMotion) { // checks flag to determine if ball is not in motion
            this.ball.setVelocity(200, 200); // sets ball velocity
            this.ballInMotion = true; // sets flag to ball is in motion
        }
    }

    hitPaddle() {

    }

}