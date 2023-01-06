import {Game} from 'phaser';
import config from './config';

import {EstateOutside} from './scenes/estate-outisde';

new Game({...config, scene: [EstateOutside]});
