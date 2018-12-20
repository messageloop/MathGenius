import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg.png'
const BG_WIDTH     = 754
const BG_HEIGHT    = 1334


let bg = new Image()
bg.src = BG_IMG_SRC

let A1 = new Image()
A1.src = 'images/A1.png'

let A2 = new Image()
A2.src = 'images/A2.png'

let A3 = new Image()
A3.src = 'images/A3.png'

let A4 = new Image()
A4.src = 'images/A4.png'

let C = new Image()
C.src = 'images/true.png'

let F = new Image()
F.src = 'images/false.png'

const ANSWER_WIDTH = 266
const ANSWER_HEIGHT = 331

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    // this.render(ctx)

    // this.top = 0

    // this.renderGameContent(ctx, '5+8=?', [3,10,13,20])
  }

renderGameCoundDown(ctx, countDownTimes)
{
  ctx.fillStyle = "#ffffff"
  ctx.font = "30px Arial"

  ctx.fillText(
    countDownTimes,
    screenWidth - 50,
    100
  )

}

renderGameCurrentScore(ctx, currentScore)
{
  ctx.fillStyle = "#ffffff"
  ctx.font = "50px Arial"

  ctx.fillText(
    currentScore,
    50,
    100
  )
}

  renderGameContent(ctx, question, answer, currentAnswer, answerStatus) {
    ctx.drawImage(bg, 0, 0, BG_WIDTH, BG_HEIGHT, 0, 0, screenWidth, screenHeight)

    ctx.fillStyle = "#ffffff"
    ctx.font = "80px Arial"

    ctx.fillText(
      question,
      20,
      screenHeight / 2 - 100+20
    )


    ctx.font = "10px Arial"
    ctx.fillText(
      '你的选择是？',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 70
    )

    ctx.font = "50px Arial"

    //答案1
    var image1 = A1
    if(currentAnswer == 1)
    {
      if (answerStatus == 1)
      {
        image1 = C

      }else if (answerStatus == 2)
      {
        image1 = F
      }
    }
    ctx.drawImage(
      image1,
      0, 0, ANSWER_WIDTH, ANSWER_HEIGHT,
      (screenWidth / 2 - 120) / 2,
      screenHeight / 2 - 100 + 100,
      ANSWER_WIDTH / 2, ANSWER_HEIGHT / 2
    )

    this.answer1Area = {
      startX: (screenWidth / 2 - 120) / 2,
      startY: screenHeight / 2 - 100 + 100,
      endX: (ANSWER_WIDTH/2) + ((screenWidth / 2 - 120) / 2),
      endY: (ANSWER_HEIGHT/2) - 30 + (screenHeight / 2 - 100 + 100)
    }

    ctx.fillText(
      answer[0],
      (screenWidth / 2 - (ANSWER_WIDTH / 2)) + 40,
      screenHeight / 2 - 100 + 180
    )

    //答案2
    var image2 = A2
    if (currentAnswer == 2) {
      if (answerStatus == 1)
      {
        image2 = C
      }else if (answerStatus == 2)
      {
        image2 = F
      }
    } 
    ctx.drawImage(
      image2,
      0, 0, ANSWER_WIDTH, ANSWER_HEIGHT,
      (screenWidth / 2) + (screenWidth / 2 - 120) / 2,
      screenHeight / 2 - 100 + 100,
      ANSWER_WIDTH / 2, ANSWER_HEIGHT/2
    )

    this.answer2Area = {
      startX: (screenWidth / 2) + (screenWidth / 2 - 120) / 2,
      startY: screenHeight / 2 - 100 + 100,
      endX: ANSWER_WIDTH/2 + (screenWidth / 2) + (screenWidth / 2 - 120) / 2,
      endY: ANSWER_HEIGHT/2 - 30 + (screenHeight / 2 - 100 + 100)
    }

    ctx.fillText(
      answer[1],
      (screenWidth - (ANSWER_WIDTH / 2))+ 40,
      screenHeight / 2 - 100 + 180
    )


    //答案3
    var image3 = A3
    if (currentAnswer == 3) {
      if (answerStatus == 1)
      {
        image3 = C
      }else if (answerStatus == 2)
      {
        image3 = F
      }
    } 
    ctx.drawImage(
      image3,
      0, 0, ANSWER_WIDTH, ANSWER_HEIGHT,
      (screenWidth / 2 - 120) / 2,
      screenHeight / 2 - 100 + 80 + (ANSWER_HEIGHT / 2),
      ANSWER_WIDTH / 2, ANSWER_HEIGHT / 2
    )

    this.answer3Area = {
      startX: (screenWidth / 2 - 120) / 2,
      startY: screenHeight / 2 - 100 + 80 + (ANSWER_HEIGHT / 2),
      endX: ANSWER_WIDTH/2 + ((screenWidth / 2 - 120) / 2),
      endY: ANSWER_HEIGHT/2 - 30 + (screenHeight / 2 - 100 + 80 + (ANSWER_HEIGHT / 2))
    }

    ctx.fillText(
      answer[2],
      (screenWidth / 2 - (ANSWER_WIDTH / 2)) + 40,
      screenHeight / 2 - 100 + 180 + 120,
    )

    //答案4
    var image4 = A4
    if (currentAnswer == 4) {
      if (answerStatus == 1)
      {
        image4 = C
      }else if (answerStatus == 2)
      {
        image4 = F
      }
      
    } 
    ctx.drawImage(
      image4,
      0, 0, ANSWER_WIDTH, ANSWER_HEIGHT,
      (screenWidth / 2) + (screenWidth / 2 - 120) / 2,
      screenHeight / 2 - 100 + 80 + (ANSWER_HEIGHT / 2),
      ANSWER_WIDTH / 2, ANSWER_HEIGHT / 2
    )

    this.answer4Area = {
      startX: (screenWidth / 2) + (screenWidth / 2 - 120) / 2,
      startY: screenHeight / 2 - 100 + 80 + (ANSWER_HEIGHT / 2),
      endX: ANSWER_WIDTH/2 + ((screenWidth / 2) + (screenWidth / 2 - 120) / 2),
      endY: ANSWER_HEIGHT/2 - 30 + (screenHeight / 2 - 100 + 80 + (ANSWER_HEIGHT / 2))
    }

    // ctx.fillRect(this.answer4Area.startX, this.answer4Area.startY, ANSWER_WIDTH / 2, ANSWER_HEIGHT / 2 - 30)

    ctx.fillText(
      answer[3],
      (screenWidth - (ANSWER_WIDTH / 2)) + 40,
      screenHeight / 2 - 100 + 180 + 120,
    )
  }
}
