const logic = require('Logic');
const resultView = require('ResultUI');
const StartUI = require('StartUI');
const ReadyGoUI = require('ReadyGoUI');
const DataBus = require('DataBus');



const MAXCOUNTDOWN = 40;
const MAX_CORRECT_TIME = 5000;


let myLogic = new logic();
var myQuestion = myLogic.updateQuestion();
var myAnswer = myLogic.answer();
var myScore = 0;
var lastPointTime = new Date().getTime();


cc.Class({
    extends: cc.Component,

    properties: {
    

        trueAudio:cc.AudioClip,
        falseAudio:cc.AudioClip,
        buttonAudio:cc.AudioClip,

        startView: StartUI,
        countDownTimes: MAXCOUNTDOWN,
        countDownText: cc.Label,

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

        myResult: resultView,

        pausedView:cc.Node,

        readyGo:ReadyGoUI

    },

    // use this for initialization
    onLoad: function () {

        this.initPausedView();

    },




    init: function (){

        this.countDownTimes = MAXCOUNTDOWN;
        myScore = 0;
        var that = this;
        this.refreshNow(that);
    },

    initPausedView:function(){

        this._isShowPausedView = false;
        this.pausedView.x = 800;
        this._showAction = cc.moveTo(0.5, 0, this.pausedView.y);
        this._hideAction = cc.moveTo(0.5, 800, this.pausedView.y);
    },

    titckAction:function(){

        var that = this;

        this._theTickitCallBack = function(){



            if (that.countDownTimes < 0)
            {
                return;
            }

            that.countDownTimes--;

            //如何倒计时 到了，就把结果页面显示出来
            if (0 == this.countDownTimes)
            {

                myScore = Math.round(myScore);

                DataBus.currentScore = myScore;

                if (DataBus.maxScore < myScore)
                {
                    // DataBus.maxScore = myScore;
                    DataBus.setMaxScore(myScore);


                    if (typeof wx === 'undefined') {
                        
                    }else
                    {

                        wx.setUserCloudStorage({
                            KVDataList: [{ key: 'score', value: myScore.toString() }],
                            success: res => {
                                // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                                let openDataContext = wx.getOpenDataContext();
                                openDataContext.postMessage({
                                    type: 'updateMaxScore',
                                });
                            },
                            fail: res => {
                            }
                        });
                    }

                    
                }else
                {

                    if (typeof wx === 'undefined') {
                        
                    }else
                    {
                                            // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                        let openDataContext = wx.getOpenDataContext();
                        openDataContext.postMessage({
                            type: 'updateMaxScore',
                        });
                    }

                }

                // cc.director.getScheduler().unschedule(this.titckAction, this);


                that.countDownTimes = MAXCOUNTDOWN;
                that.hide();
                that.myResult.show();


            }
        };
        
        cc.director.getScheduler().schedule(this._theTickitCallBack, this, 1, false);
    },

    start: function (){

        
        
    },

    // called every frame
    update: function (dt) {


        // this.scoreText.string = myScore;

        this.countDownText.string = this.countDownTimes;
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

        this.delayRefresh();

    },

    answer2Action: function(){

        this.markAnswerTrueOrFalse(1);

        this.delayRefresh();

    },

    answer3Action: function(){

        this.markAnswerTrueOrFalse(2);

        this.delayRefresh();

    },

    answer4Action: function(){

        this.markAnswerTrueOrFalse(3);

        this.delayRefresh();

    },

    delayRefresh: function(){



        var that = this;

        this.scheduleOnce( function(){

            that.refreshNow(that);

                                                                                                                                          
        }.bind(this),0.5);

 
    },

    refreshNow: function(that){

        that.trueMark.node.active = false;
        that.falseMark.node.active = false;
        that.a1TrueMark.node.active = false;
        that.A2TrueMark.node.active = false;
        that.A3TrueMark.node.active = false;
        that.A4TrueMark.node.active = false;
                                                                                         
        myQuestion = myLogic.updateQuestion();
        myAnswer = myLogic.answer();
    },



    checkAnswer: function(index){
       
        var correctAnswerIndex =  myAnswer.indexOf(myLogic.getResult().toString());

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
            if (myScore > 0)
            {
                myScore -= 2;
            }

        }

        //根据速度加分
       var theAddScore = this.canAddPlusScore(bCorrect);

    },

    canAddPlusScore(bCorrect)
    {
        var currentTime =  new Date().getTime()
        var dValue = currentTime - lastPointTime

        // 1.答对每题2分，且根据答题反应时间乘以加分系统[3,4]:0.5,[2,3):1,[1，2):1.5,[0.5,1):2,[0,0.5):2.5
        // 2.答错 - 1分
        // 3.连续答对2题且反应时间在1s以内 + 2，连续答对3题 + 3，连续答对4题 + 4，连续答对5题 + 5，以此内推



        var theAddScore = 0;

        if (bCorrect)
        {

            if (dValue < MAX_CORRECT_TIME)
            {
               theAddScore = (MAX_CORRECT_TIME - dValue)*1.0/1000;

               myScore += theAddScore;

            }

            lastPointTime = currentTime

        }else
        {
            lastPointTime = 0
        }

        return theAddScore;
        
    },


    markAnswerTrueOrFalse: function(index){


        //分数统计
        var bCorrect = this.checkAnswer(index);

        this.addScore(bCorrect);

        this.playTheAnswerAudio(bCorrect);


        if (this.checkAnswer(index))
        {

            this.trueMark.node.active = true;

        }else
        {

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

    playTheAnswerAudio:function(bCorrect){

        if (bCorrect)
        {
            cc.audioEngine.play(this.trueAudio, false, 1);

        }else
        {
            cc.audioEngine.play(this.falseAudio, false, 1);

        }

    },


    titckOn:function(){

        if (cc.director.getScheduler().isTargetPaused(this))
        {
            cc.director.getScheduler().resumeTarget(this);

        }else
        {
            if (this._theTickitCallBack == null || cc.director.getScheduler().isScheduled(this._theTickitCallBack, this) == false)
            {

                this.titckAction();

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

    pausedAction:function(){


        this.pausedView.runAction(this._showAction);
        this._isShowPausedView = true;
        cc.director.getScheduler().pauseTarget(this);
    },

    continueAction:function(){

        this.pausedView.runAction(this._hideAction);
        this._isShowPausedView = false;
        cc.audioEngine.play(this.buttonAudio, false, 1);
        this.readyGo.init();
        this.readyGo.show();
    },
    restartAction:function(){

        this.pausedView.runAction(this._hideAction);
        this._isShowPausedView = false;
        cc.audioEngine.play(this.buttonAudio, false, 1);
        var life = DataBus.getLifeValue();
        if (life <= 0)
        {
            //生命值+1
            var life = DataBus.getLifeValue();
            life++;
            DataBus.setLifeValue(life);


            if (typeof wx === 'undefined') {
                        
            }else
            {
                wx.shareAppMessage({
                    title: '机灵脑袋瓜'
                })
                return;
            }

            
        }

        //生命值减去1
        var life = DataBus.getLifeValue();
        life--;
        DataBus.setLifeValue(life);


        this.init();

        this.readyGo.init();
        this.readyGo.show();
    },
    homeAction:function(){

        this.pausedView.runAction(this._hideAction);
        this._isShowPausedView = false;

        this.startView.show();
    },


});
