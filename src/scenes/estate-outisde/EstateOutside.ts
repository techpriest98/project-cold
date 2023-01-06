import Phaser from 'phaser';

export class EstateOutside extends Phaser.Scene {
  constructor() {
      super('estate-outside1');
  }

  preload() {
      this.load.image('tiles', 'assets/tiles/estate-outside-tilemap.png');
      this.load.tilemapTiledJSON('estate-outside-map', 'assets/tiles/estate-outside-map.json');
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
      overheadLayer.setDepth(4);
  }
}
