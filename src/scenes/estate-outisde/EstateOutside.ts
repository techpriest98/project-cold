import Phaser from 'phaser';

export class EstateOutside extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Phaser.Physics.Arcade.Sprite;
    private speed = 100;

    constructor() {
        super('estate-outside1');
    }

    preload() {
        this.load.image('tiles', 'assets/tiles/estate-outside-tilemap.png');
        this.load.tilemapTiledJSON('estate-outside-map', 'assets/tiles/estate-outside-map.json');
        this.load.atlas('player', 'assets/player/traveler.png', 'assets/player/traveler_atlas.json');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const map = this.make.tilemap({key: 'estate-outside-map'});
        const tileset = map.addTilesetImage('estate-outside-tileset', 'tiles');

        const groundLayer = map.createLayer('Ground', tileset);
        groundLayer.setDepth(1);

        const secondariesLayer = map.createLayer('Secondaries', tileset);
        secondariesLayer.setDepth(2);

        const collidesLayer = map.createLayer('Collides', tileset);
        collidesLayer.setDepth(2);
        collidesLayer.setCollisionByProperty({collides: true});

        const interactsLayer = map.createLayer('Interacts', tileset);
        interactsLayer.setDepth(3);

        const overheadLayer = map.createLayer('Overhead', tileset);
        overheadLayer.setDepth(5);

        this.player = this.physics.add.sprite(64, 128, 'player', 'traveler-idle-front-0');
        this.player.body.setSize(48, 48);
        this.player.setDepth(4);

        this.anims.create({key: 'traveler-idle-front', frames: [{key: 'player', frame: 'traveler-idle-front-0'}]});

        this.anims.create({key: 'traveler-idle-right', frames: [{key: 'player', frame: 'traveler-idle-right-0'}]});

        this.anims.create({key: 'traveler-idle-back', frames: [{key: 'player', frame: 'traveler-idle-back-0'}]});

        this.anims.create({key: 'traveler-idle-left', frames: [{key: 'player', frame: 'traveler-idle-left-0'}]});

        this.anims.create({
            key: 'traveler-walk-front',
            frames: this.anims.generateFrameNames('player', {start: 0, end: 3, prefix: 'traveler-walk-front-'}),
            repeat: -1,
            frameRate: 4
        });

        this.anims.create({
            key: 'traveler-walk-right',
            frames: this.anims.generateFrameNames('player', {start: 0, end: 3, prefix: 'traveler-walk-right-'}),
            repeat: -1,
            frameRate: 4
        });

        this.anims.create({
            key: 'traveler-walk-back',
            frames: this.anims.generateFrameNames('player', {start: 0, end: 3, prefix: 'traveler-walk-back-'}),
            repeat: -1,
            frameRate: 4
        });

        this.anims.create({
            key: 'traveler-walk-left',
            frames: this.anims.generateFrameNames('player', {start: 0, end: 3, prefix: 'traveler-walk-left-'}),
            repeat: -1,
            frameRate: 4
        });

        this.player.anims.play('traveler-idle-front');
        this.physics.add.collider(this.player, collidesLayer);
        this.cameras.main.startFollow(this.player, true);
    }

    update(time: number, delta: number) {
        if (!this.cursors || !this.player) {
            return
        }
        this.player.body.offset.y = 64;

        if (this.cursors.left?.isDown) {
            this.player.anims.play('traveler-walk-left', true);
            this.player.setVelocity(-this.speed, 0);
        } else if (this.cursors.right?.isDown) {
            this.player.anims.play('traveler-walk-right', true);
            this.player.setVelocity(this.speed, 0);
        } else  if (this.cursors.up?.isDown) {
            this.player.anims.play('traveler-walk-back', true);
            this.player.setVelocity(0, -this.speed);
        } else if (this.cursors.down?.isDown) {
            this.player.anims.play('traveler-walk-front', true);
            this.player.setVelocity(0, this.speed);
        } else {
            const part = this.player.anims.currentAnim.key.split('-')[2];
            this.player.anims.play(`traveler-idle-${part}`, true);
            this.player.setVelocity(0, 0);
        }

    }
}
