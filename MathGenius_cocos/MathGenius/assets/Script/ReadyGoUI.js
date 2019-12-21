// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
        readyLabel:cc.Node,
        goLabel: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

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

            this.hide();

        }.bind(this), 2);
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
