// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// const TheMainGame = require('Main');




cc.Class({
    extends: cc.Component,

    properties: {
    
        readyLabel:cc.Node,
        goLabel: cc.Node,
        readGoAudio:cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

     },

    onDestroy: function () {
        // cc.audioEngine.stop(this.current);
    },

    init: function(){

        const showTime = 0.8;
        const scaleValue = 0.5;

        //刚开始显示  准备
        this.readyLabel.active = true;
        this.goLabel.active = false;

        this.readyLabel.scale = 1;
        this.goLabel.scale = 1;

        this.readyLabel.stopAllActions();
        this.readyLabel.runAction(cc.scaleTo(showTime, scaleValue));

        var that = this;

        this.scheduleOnce( function(){

            that.readyLabel.active = false;
            that.goLabel.active = true;

            that.readyLabel.stopAllActions();
            that.goLabel.stopAllActions();
            that.goLabel.runAction(cc.scaleTo(showTime, scaleValue));

        }.bind(this), showTime);

        this.scheduleOnce( function(){

            that.readyLabel.stopAllActions();
            that.goLabel.stopAllActions();

            that.hide();

            var theMainGame = cc.find('Canvas/Main').getComponent('Main');
            theMainGame.titckOn();

        }.bind(this), showTime*2);
    },

    start () {

        // this.init();
 
    },

    // update (dt) {},
    show: function ()
    {
        this.node.active = true;

        cc.audioEngine.play(this.readGoAudio, false, 1);

        
    },
    hide: function () {
        this.node.active = false;
    },
    
});
