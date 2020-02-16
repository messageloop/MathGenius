// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const StartUI = require('StartUI');
const ReadyGoUI1 = require('ReadyGoUI');

const DataBus = require('DataBus');

cc.Class({
    extends: cc.Component,

    properties: {


        buttonAudio:cc.AudioClip,

        currentScoreText: cc.Label,
        maxScoreText: cc.Label,

        startUI: StartUI,
        okReady: ReadyGoUI1,
        wxSubContextView: cc.Node,

    },


    start () {

    
        // let bannerAd = wx.createBannerAd({
        //     adUnitId: '1234234',
        //     style: {
        //       left: 10,
        //       top: 76,
        //       width: 320
        //     }
        //   });
          
        //   bannerAd.show();

       
    },



    show: function(){

        this.currentScoreText.string = DataBus.currentScore;
        this.maxScoreText.string = DataBus.getMaxScore();

        this.node.active = true;

        let scoreString = this.currentScoreText.string;
        let maxScoreString = this.maxScoreText.string;

    },
    hide: function(){
        this.node.active = false;
    },

    goHome: function(){

        cc.audioEngine.play(this.buttonAudio, false, 1);

        this.hide();
        this.startUI.show();
    },
    restart:function(){

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
            }
            return;
        }

        //生命值减去1
        var life = DataBus.getLifeValue();
        life--;
        DataBus.setLifeValue(life);

        this.hide();

        this.okReady.init();

        this.okReady.show();

        //游戏主页初始化
        var theMainGame = cc.find('Canvas/Main').getComponent('Main');
        theMainGame.init();

        //游戏主页显示
        theMainGame.show();
    },

});
