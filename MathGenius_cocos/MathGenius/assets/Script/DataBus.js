// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

module.exports = {


    //生命值
    lifeValue:null,

    //当前得分
    currentScore: null,

    //历史最高分
     maxScore: null,

     //获取历史最高分
     getMaxScore: function(){


        const KEY_BEST_SCORE = "bestScore";
        var bestScore = cc.sys.localStorage.getItem(KEY_BEST_SCORE);
        console.log(bestScore);
        if (bestScore == null || bestScore =='' || bestScore == 'NaN') {


            this.maxScore = 0;
        }else 
        {

            this.maxScore = bestScore;
        }
        return this.maxScore;
     },

     setMaxScore: function(value){
          // 保存最高分到本地
          const KEY_BEST_SCORE = "bestScore";
          let bestScore = cc.sys.localStorage.getItem(KEY_BEST_SCORE);
          if (bestScore == null || value > bestScore) {
              bestScore = value;
          }
          cc.sys.localStorage.setItem(KEY_BEST_SCORE, bestScore);

          this.maxScore = value;
     },


     //读取生命值
     getLifeValue: function(){


        const KEY_LIFE_VALUE = "lifeValue";
        var tempLifeValue = cc.sys.localStorage.getItem(KEY_LIFE_VALUE);
        if (tempLifeValue == null || tempLifeValue == '' || tempLifeValue == 'NaN') {


            this.lifeValue = 8;
            cc.sys.localStorage.setItem(KEY_LIFE_VALUE, this.lifeValue);
        }else 
        {

            this.lifeValue = tempLifeValue;
        }
        return this.lifeValue;
     },

     setLifeValue: function(value){
          // 保存最高分到本地
          const KEY_LIFE_VALUE = "lifeValue";

          if (value != null && value >=0)
            cc.sys.localStorage.setItem(KEY_LIFE_VALUE, value);

          this.lifeValue = value;
     },

};
