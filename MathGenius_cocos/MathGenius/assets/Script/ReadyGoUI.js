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
        goLabel: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    init: function(){

        console.log('ReadyGoUI start');

        //刚开始显示  准备
        this.readyLabel.active = true;
        this.goLabel.active = false;


        //1秒之后显示  开始
        this.scheduleOnce( function(){

            this.readyLabel.active = false;
            this.goLabel.active = true;

        }.bind(this), 1);

        //2秒之后关闭
        this.scheduleOnce( function(){

            var theMainGame = cc.find('Canvas/Main').getComponent('Main');
            theMainGame.init();
            theMainGame.show();
            this.hide();

        }.bind(this), 2);
    },

    start () {

        // this.init();
 
    },

    // update (dt) {},
    show: function ()
    {
        this.node.active = true;
        
    },
    hide: function () {
        this.node.active = false;
    },
});
