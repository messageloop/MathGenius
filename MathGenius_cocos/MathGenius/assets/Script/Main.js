const logic = require('Logic');
const resultView = require('ResultUI');
const MAXCOUNTDOWN = 40;


let myLogic = new logic();
var myQuestion = myLogic.updateQuestion();
var myAnswer = myLogic.answer();
var myScore = 0;
var lastPointTime = new Date().getTime();

var DataBus = require('DataBus');

cc.Class({
    extends: cc.Component,

    properties: {
    
        startView: cc.Node,
        countDownTimes: MAXCOUNTDOWN,
        countDownText: cc.Label,

        scoreText: cc.Label,

        questionText: cc.Label,
        answer1: cc.Label,
        answer2: cc.Label,
        answer3: cc.Label,
        answer4: cc.Label,

        trueMark: cc.Sprite,
        falseMark: cc.Sprite,

        a1TrueMark: cc.Sprite,
        A2TrueMark: cc.Sprite,
        A3TrueMark: cc.Sprite,
        A4TrueMark: cc.Sprite,

        myResult: resultView

    },

    // use this for initialization
    onLoad: function () {
        console.log('main on load');

    },



    init: function (){

        this.countDownTimes = MAXCOUNTDOWN;
        myScore = 0;
        this.scoreText.string = 0;
    },

    start: function (){


        var theTickit = this.schedule( function(){

            this.countDownTimes--;

            //如何倒计时 到了，就把结果页面显示出来
            if (0 == this.countDownTimes)
            {

                DataBus.currentScore = myScore;
                if (DataBus.maxScore < myScore)
                {
                    DataBus.maxScore = myScore;
                }

                this.countDownTimes = MAXCOUNTDOWN;
                this.hide();
                this.myResult.show();
            }

        }.bind(this),1);

    },

    // called every frame
    update: function (dt) {


        this.scoreText.string = myScore;

        this.countDownText.string = '倒计时：' + this.countDownTimes;
        this.questionText.string = myQuestion;
        if (myAnswer.length >= 4 )
        {
            this.answer1.string = myAnswer[0];
            this.answer2.string = myAnswer[1];
            this.answer3.string = myAnswer[2];
            this.answer4.string = myAnswer[3];
        }


    },


    answer1Action: function(){



        this.markAnswerTrueOrFalse(0);

        this.refresh();

    },

    answer2Action: function(){

        this.markAnswerTrueOrFalse(1);

        this.refresh();

    },

    answer3Action: function(){

        this.markAnswerTrueOrFalse(2);

        this.refresh();

    },

    answer4Action: function(){

        this.markAnswerTrueOrFalse(3);

        this.refresh();

    },

    refresh: function(){


        this.scheduleOnce( function(){

            this.trueMark.node.active = false;
            this.falseMark.node.active = false;
            this.a1TrueMark.node.active = false;
            this.A2TrueMark.node.active = false;
            this.A3TrueMark.node.active = false;
            this.A4TrueMark.node.active = false;

            myQuestion = myLogic.updateQuestion();
            myAnswer = myLogic.answer();

        }.bind(this),0.5);

 
    },

    checkAnswer: function(index){
       
        var correctAnswerIndex =  myAnswer.indexOf(myLogic.getResult().toString());

        // console.log('myAnswer:'+myAnswer);
        // console.log('correctAnswerIndex:'+correctAnswerIndex);
        // console.log('getResult:'+myLogic.getResult());


        if (index == correctAnswerIndex)
        {
            return true;

        }else 
        {
            return false;
        }

    },



    // 1.答对每题2分，且根据答题反应时间乘以加分系数[3,4]:0.5,[2,3):1,[1，2):1.5,[0.5,1):2,[0,0.5):2.5
    // 2.答错 - 1分
    // 3.连续答对2题且反应时间在1s以内 + 2，连续答对3题 + 3，连续答对4题 + 4，连续答对5题 + 5，以此内推
    addScore: function(bCorrect){


        if (bCorrect)
        {
            myScore += 2;            
        }else
        {
            if (myScore >= 0)
            {
                myScore -= 1;
            }

        }


        //根据速度加分
        this.canAddPlusScore(bCorrect);
    },

    canAddPlusScore(bCorrect)
    {
        console.log(lastPointTime)
        var currentTime =  new Date().getTime()
        var dValue = currentTime - lastPointTime
        console.log(dValue)

        // 1.答对每题2分，且根据答题反应时间乘以加分系统[3,4]:0.5,[2,3):1,[1，2):1.5,[0.5,1):2,[0,0.5):2.5
        // 2.答错 - 1分
        // 3.连续答对2题且反应时间在1s以内 + 2，连续答对3题 + 3，连续答对4题 + 4，连续答对5题 + 5，以此内推

        if (bCorrect)
        {

            if (dValue >= 3000 && dValue < 4000)
            {
                myScore += 0.5

            }else if (dValue >= 2000 && dValue < 3000)
            {
                myScore += 1

            }else if (dValue >= 1000 && dValue < 2000)
            {
                myScore += 1.5

            }else if (dValue >= 500 && dValue < 1000)
            {
                myScore += 2

            }else if (dValue >= 0 && dValue < 500)
            {
                myScore += 2.5
            }
        }

        lastPointTime = currentTime
    },


    markAnswerTrueOrFalse: function(index){


        //分数统计
        var bCorrect = this.checkAnswer(index);
        this.addScore(bCorrect);


        if (this.checkAnswer(index))
        {

            console.log('true:');

            this.trueMark.node.active = true;

        }else
        {

            console.log('false:');


            this.falseMark.node.active = true;

            var correctAnswerIndex =  myAnswer.indexOf(myLogic.getResult().toString());

            if (0 == correctAnswerIndex)
            {
                this.a1TrueMark.node.active = true;

            }else if (1 == correctAnswerIndex)
            {
                this.A2TrueMark.node.active = true;

            }else if (2 == correctAnswerIndex)
            {
                this.A3TrueMark.node.active = true;

            }else if (3 == correctAnswerIndex)
            {
                this.A4TrueMark.node.active = true;
            }
        }

    },


    show: function (){
        this.node.active = true;
    },

    hide: function(){

        // this.unscheduleAllCallbacks();
        this.node.active = false;
    },


});
