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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        currentScoreText: cc.Label,
        maxScoreText: cc.Label,

        startUI: StartUI,
        okReady: ReadyGoUI1,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},


    show: function(){



        this.currentScoreText.string = DataBus.currentScore;
        this.maxScoreText.string = DataBus.maxScore;

        this.node.active = true;


    },
    hide: function(){
        this.node.active = false;
    },

    goHome: function(){

        this.hide();
        this.startUI.show();
    },
    restart:function(){

        this.hide();
        this.okReady.show();
        this.okReady.init();
    },
});
