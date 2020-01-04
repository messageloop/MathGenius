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

    //当前得分
    currentScore: null,

    //历史最高分
    // maxScore: null,

    maxScore: {
            get () {

                const KEY_BEST_SCORE = "bestScore";
                var bestScore = cc.sys.localStorage.getItem(KEY_BEST_SCORE);
                if (bestScore === "null" ) {
                    this._maxScore = 0;
                }else 
                {
                    this._maxScore = bestScore;
                }
                return this._maxScore;
            },
            set (value) {


                // 保存最高分到本地
                const KEY_BEST_SCORE = "bestScore";
                let bestScore = cc.sys.localStorage.getItem(KEY_BEST_SCORE);
                if (bestScore === "null" || value > bestScore) {
                    bestScore = value;
                }
                cc.sys.localStorage.setItem(KEY_BEST_SCORE, bestScore);

                this._maxScore = value;
            }
        },
};