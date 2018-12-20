import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.png'
const BG_WIDTH = 754
const BG_HEIGHT = 1334

export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

  }