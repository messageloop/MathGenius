
// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const ReadyGoUI = require('ReadyGoUI');
const DataBus = require('DataBus');

cc.Class({
    extends: cc.Component,

    properties: {


        buttonAudio:cc.AudioClip,
        lifeLabel:cc.Label,
        maxScoreLabel: cc.Label,
        startBtn: cc.Node,
        readyGoUI:ReadyGoUI 
    },

    start () {

        this.maxScoreLabel.string = DataBus.getMaxScore();
        this.lifeLabel.string = DataBus.getLifeValue();


    },

     update (dt) {


     },

     share:function(){

        //生命值+1
        var life = DataBus.getLifeValue();
        life++;
        DataBus.setLifeValue(life);

        this.lifeLabel.string = DataBus.getLifeValue();

        if (typeof wx === 'undefined') {
                        
        }else
        {

            wx.shareAppMessage({
                title: '机灵脑袋瓜'
            });
        }
     },


    startAction: function(){



        cc.audioEngine.play(this.buttonAudio, false, 1);


        var life = DataBus.getLifeValue();

        if (life <= 0)
        {
            this.share();
            return;
        }


        //准备界面开始初始化和准备
        this.readyGoUI.init();

        //准备界面显示
        this.readyGoUI.show();


        //游戏主页初始化
        var theMainGame = cc.find('Canvas/Main').getComponent('Main');
        theMainGame.init();

        //游戏主页显示
        theMainGame.show();


        //本页面消失
        this.hide();


        //每玩一次生命值减去1
        var life = DataBus.getLifeValue();
        life--;
        DataBus.setLifeValue(life);
    },

    show: function(){

        this.maxScoreLabel.string = DataBus.getMaxScore();
        this.lifeLabel.string = DataBus.getLifeValue();


        this.node.active = true;
    },
    hide: function(){
        this.node.active = false;
    },

});
