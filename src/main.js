import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainGame
    ]
};

export default new Game(config);

preload() {
    // Load necessary assets from the assets directory
    this.load.image('background', 'assets/background.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('paddle', 'assets/paddle.png');
}

contructor() {
    super('Game');
    // Initialise necessary variables
    this.ball = null;
    this.leftPaddle = null;
    this.rightPaddle = null;
}

create() {
    // Add background, ball. and paddles to the scene
    this.add.image(WIDTH/2, HEIGHT/2, 'background').setScale(0.8, 0.8);
    this.ball = this.add.image(WIDTH/2, HEIGHT/2, 'ball').setSc;ale(0.05, 0.05);
    this.leftPaddle = this.add.image(50, 384, "paddle");
    this.rightPaddle = this.add.image(974, 384, "paddle");
}

