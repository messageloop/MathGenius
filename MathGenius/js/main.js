import Player from './player/index'
import Answer from './npc/answer'
import BackGround from './runtime/background'
// import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Logic from './runtime/logic.js'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

let logic = new Logic()

let music = new Music()


var thequestion = logic.updateQuestion()
var answer = logic.answer()

var currectAnswerIndex = 0
var answerStatus = 0

let MAXCOUNTTIMES = 30
var countDownTimes = MAXCOUNTTIMES
var levelArray = new Array("幼儿园", "一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "初一", "初二", "初三", "高一", "高二", "高三", "大一", "大二", "大三", "大四")


var lastPointTime = new Date().getTime()


/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()



  //   // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  //   wx.getSetting({
  //     success(res) {
  //       if (!res.authSetting['scope.userInfo']) {
  //         wx.authorize({
  //           scope: 'scope.userInfo',
  //           success() {
  //             // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //             // 必须是在用户已经授权的情况下调用
  //             wx.getUserInfo({
  //               success: function (res) {
  //                 var userInfo = res.userInfo
  //                 var nickName = userInfo.nickName
  //                 var avatarUrl = userInfo.avatarUrl
  //                 var gender = userInfo.gender //性别 0：未知、1：男、2：女
  //                 var province = userInfo.province
  //                 var city = userInfo.city
  //                 var country = userInfo.country

  //                 res.encryptedData
  //               }
  //             })

  //           }
  //         })
  //       }
  //     }
  //   }

  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    // this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    //设置默认倒计时
    this.countDownTimes = MAXCOUNTTIMES
    this.countDownFunc() 

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }


  countDownFunc() {

      var self = this
      //倒计时
      var num = setInterval(function(){
        self.countDownTimes--

        console.log(self.countDownTimes)

        if (self.countDownTimes <= 0) {
          
          //game over
          clearInterval(num)

          //计算得分
          self.scoreManage()

          console.log(databus.historyMaxScore)
          //显示游戏结束框
          wx.showModal({

            

            title: '本次 : ' + self.getLevelWithScore(databus.score) + ' 历史最好: ' + self.getLevelWithScore(databus.historyMaxScore),
            content: '矮油，再接再厉',
            cancelText: '排行第22',
            confirmText: '重新开始',
            success(res) {
              if (res.confirm) {
                self.restart() 
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })


        }

      }, 1000)
    
    

  }


getLevelWithScore(score)
{
  var returnLevelString = '幼儿园'
  var bit = Math.ceil(score / 5)
  returnLevelString = levelArray[bit]
  return returnLevelString
}



  scoreManage()
  {
    // console.log('value dsfaf')
    try {
      var value = wx.getStorageSync('theMaxScore')
      console.log('the history value ='+value)
      databus.historyMaxScore = value
      if (value  > 0 ) {
        // Do something with return value
        if (value < databus.score)
          {
          console.log('abc2')
            databus.historyMaxScore = databus.score
          wx.setStorage({
            key: "theMaxScore",
            data: databus.historyMaxScore
          })
          }else 
          {
          // databus.historyMaxScore = value
          }
      }else 
      {
        // console.log('abc3')
        // wx.setStorage({
        //   key: "theMaxScore",
        //   data: databus.score
        // })
        // databus.historyMaxScore = databus.score
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }

  }

 

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()


    console.log(e.touches)

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area1 = this.bg.answer1Area
    let area2 = this.bg.answer2Area
    let area3 = this.bg.answer3Area
    let area4 = this.bg.answer4Area

     console.log(area1)
    console.log(area2)
    console.log(area3)
    console.log(area4)
    // console.log(e.touches[0])


    if (x >= area1.startX
      && x <= area1.endX
      && y >= area1.startY
      && y <= area1.endY)
      {
        this.checkAnswer(answer[0])
        
        this.setTheCurrentAnswer(1)
        
    } else if (x >= area2.startX
      && x <= area2.endX
      && y >= area2.startY
      && y <= area2.endY) {

      this.checkAnswer(answer[1])
      this.setTheCurrentAnswer(2)

    } else if (x >= area3.startX
      && x <= area3.endX
      && y >= area3.startY
      && y <= area3.endY) {

      this.checkAnswer(answer[2])
      this.setTheCurrentAnswer(3)
    
    } else if (x >= area4.startX
      && x <= area4.endX
      && y >= area4.startY
      && y <= area4.endY) {

      this.checkAnswer(answer[3])
      this.setTheCurrentAnswer(4)
    }

    


  }

  /**
   * 生成答案
   * 
   */
  answerGenerate() {
    if (databus.frame % 30 === 0) {
      let answer = databus.pool.getItemByClass('answer', Answer)
      answer.init(6)
      databus.enemys.push(answer)
    }
  }



setTheCurrentAnswer(index)
{
  this.currentAnswerIdex = index

//当答题之后把正确答案索引置为0，确保render刷新没问题
  var self = this
  var num =  setTimeout(function(){
    self.currentAnswerIdex = 0
    console.log(self.currentAnswerIdex)
  },
    500
  )

  this.updataQuestion()
}

  //检查是否答对
checkAnswer(value){

  var isCurrectBool

//答对了
  if (value == logic.getResult()) {
    databus.score += 2
    isCurrectBool = true
    this.answerStatus = 1
    
    //判断是否可以加分
    this.canAddScore()
  } else {
    if (databus.score > 0) {
      databus.score -= 1
    }
    this.answerStatus = 2
    isCurrectBool = false
  }
    return isCurrectBool
}


canAddScore()
{
  console.log(lastPointTime)
  var currentTime =  new Date().getTime()
  var dValue = currentTime - lastPointTime
  console.log(dValue)

  // 1.答对每题2分，且根据答题反应时间乘以加分系统[3,4]:0.5,[2,3):1,[1，2):1.5,[0.5,1):2,[0,0.5):2.5
  // 2.答错 - 1分
  // 3.连续答对2题且反应时间在1s以内 + 2，连续答对3题 + 3，连续答对4题 + 4，连续答对5题 + 5，以此内推

if (dValue >= 3000 && dValue < 4000)
{
  databus.score += 0.5

}else if (dValue >= 2000 && dValue < 3000)
{
  databus.scope += 1

}else if (dValue >= 1000 && dValue < 2000)
{
  databus.scope += 1.5

}else if (dValue >= 500 && dValue < 1000)
{
  databus.scope += 2

}else if (dValue >= 0 && dValue < 500)
{
  databus.scope += 2.5
}



  lastPointTime = currentTime
}

updataQuestion()
{
  thequestion = logic.updateQuestion()
  answer = logic.answer()
  // this.currentAnswerIdex = 0

}

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.renderGameContent(ctx, thequestion, answer, this.currentAnswerIdex, this.answerStatus)

    this.bg.renderGameCoundDown(ctx, this.countDownTimes)
    this.bg.renderGameCurrentScore(ctx, databus.score)
      if (!this.hasEventBind) {

        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;




  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
