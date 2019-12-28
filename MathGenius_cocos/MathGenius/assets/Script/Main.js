const resultView = require('ResultUI');
const MAXCOUNTDOWN = 40;


cc.Class({
    extends: cc.Component,

    properties: {
    
        startView: cc.Node,
        countDownTimes: MAXCOUNTDOWN,
        countDownText: cc.Label,
        Result: cc.Node

    },

    // use this for initialization
    onLoad: function () {


    },



    start: function (){


        this.schedule( function(){

            this.countDownTimes--;

        }.bind(this),1, MAXCOUNTDOWN-1);

        
        this.scheduleOnce( function(){

            console.log('test2');
            
            resultView.show();

        }.bind(this), 5);

    },

    // called every frame
    update: function (dt) {

        this.countDownText.string = '倒计时：' + this.countDownTimes;

    },

    show: function (){
        this.node.active = true;
    },

    hide: function(){

        this.node.active = false;
    },


});
