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
        maxScoreLabel: cc.Label,
        startBtn: cc.Node,
        readyGoUI:ReadyGoUI 
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.maxScoreLabel.string = DataBus.maxScore;


    },

     update (dt) {


     },


    startAction: function(){

        this.readyGoUI.show();
        this.readyGoUI.init();

        //2秒之后关闭
        this.scheduleOnce( function(){

            this.hide();

        }.bind(this), 2);

    },

    show: function(){

        this.maxScoreLabel.string = DataBus.maxScore;

        this.node.active = true;
    },
    hide: function(){
        this.node.active = false;
    },

});
