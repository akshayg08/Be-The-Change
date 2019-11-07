import 'phaser';
import presentWorld from "./presentWorld"
import pastWorld from "./pastWorld"
import maze from "./maze"
import Demo from "./box"
import TextTypingPlugin from '../phaser3-rex-notes-master/plugins/texttyping-plugin.js';

var config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 2000,
	height: 2000,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: [{preload:preload, create:create}, Demo,  
	presentWorld, 
	pastWorld, 
	maze],
	plugins: {
		global: [{
			key: 'rexTextTyping',
			plugin: TextTypingPlugin,
			start: true
		}]
	}
};

var game = new Phaser.Game(config);

function preload (){
	this.load.image('logo', 'assets/logo.png');
	this.load.image('play', 'assets/play.png');
}

function create (){
	var logo = this.add.image(400, 150, 'logo');

	var sprite = this.add.sprite(900, 300, 'play').setInteractive();
	sprite.on('pointerover', function (event) {
		this.setTint(0xff0fff);
	});
	sprite.on('pointerout', function (event) {
		this.clearTint();
	});
	sprite.on('pointerdown', function (event) {
		game.scene.stop('default');
		game.scene.start('textBox', {s: 'Lila fears that the world has gone into darkness, the war has made everything gloomy, she wants to go back to a normal life. The kind that her parents and their parents lived. Can she do something about it?'});
		setTimeout(() => {
			game.scene.stop('textBox');
			game.scene.start("present", {x: 400, 
										y: 600, 
										lc: 0, 
										firstTime: 0});
		}, 15000);
	});

	this.tweens.add({
		targets: logo,
		y: 450,
		duration: 2000,
		ease: 'Power2',
		yoyo: true,
		loop: -1
	});
}
