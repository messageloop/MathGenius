cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label

        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        startView: cc.Node,
        resultView: cc.Node,
        countDownTimes: 40,
        countDownText: '倒计时：40',

    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

    },



    start: function (){


        this.schedule( function(){

            this.countDownText = 

        }.bind(this),1, countDownTimes);

    },

    // called every frame
    update: function (dt) {

    },

    show: function (){
        this.node.active = true;
    },

    hide: function(){

        this.node.active = false;
    },


});
