//logic.js

/**
 * Created by liang on 2020/1/1.
 */
//加
//减
//乘
//除
//原则
// 1.乘法是个位数相乘。
// 2.加法是左边是1-2位数，且两位数小于90，右边是1位数。
// 3.除法是1-2位数除于个位数，能除尽。
// 4.减法两数减去两位数，结果只能是个位数，也就是说三个数中至少有一个个位数
// 5.结果不能大于100

var result = 0


export default class logic {

  constructor() {
    result = 0
  }

 updateQuestion() {

  var questionStr = ""
  var leftValue = 0
  var rightValue = 0
  //1-4分别代码加减乘除，随机取1-4
  var num = Math.floor(Math.random() * 4 + 1)
  switch (num){
        case 1: //加法

    leftValue = Math.floor(Math.random() * 90 + 1)
    rightValue = Math.floor(Math.random() * 9 + 1)
    result = leftValue + rightValue
    questionStr = leftValue + "+" + rightValue + "=?"
    break
    case 2: //减法

      rightValue = Math.floor(Math.random() * 89 + 1)
      leftValue = Math.floor(Math.random() * 9 + rightValue)
      result = leftValue - rightValue
      questionStr = leftValue + "-" + rightValue + "=?"

      break
    case 3: //乘法

      leftValue = Math.floor(Math.random() * 9 + 1)
      rightValue = Math.floor(Math.random() * 9 + 1)
      result = leftValue * rightValue
      questionStr = leftValue + "x" + rightValue + "=?"

      break
    case 4: //除法

      rightValue = Math.floor(Math.random() * 9 + 1)
      result = Math.floor(Math.random() * 9 + 1)
      leftValue = rightValue * result
      questionStr = leftValue + "÷" + rightValue + "=?"

      break
    default:
      break
  }

      return questionStr
  }

  answer() {

    var returnArray = new Array()
    var num = Math.floor(Math.random() * 4 + 0)
    if (result == 0) {

      returnArray[0] = "0"
      returnArray[1] = "1"
      returnArray[2] = "2"
      returnArray[3] = "3"

    } else {

      if (num == 0) {
        returnArray[1] = (result - 1).toString()
        returnArray[num] = result.toString()
        returnArray[2] = (result + 1).toString()
        returnArray[3] = (result + 2).toString()
      } else if (num == 1) {
        returnArray[0] = (result - 1).toString()
        returnArray[num] = result.toString()
        returnArray[2] = (result + 1).toString()
        returnArray[3] = (result + 2).toString()
      } else if (num == 2) {
        returnArray[1] = (result - 1).toString()
        returnArray[num] = result.toString()
        returnArray[0] = (result + 1).toString()
        returnArray[3] = (result + 2).toString()
      } else if (num == 3) {
        returnArray[1] = (result - 1).toString()
        returnArray[num] = result.toString()
        returnArray[2] = (result + 1).toString()
        returnArray[0] = (result + 2).toString()
      }





    }

    return returnArray

  }

getResult(){

  return result
}



}