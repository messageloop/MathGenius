cc.Class({
    extends: cc.Component,

    properties: {

        content: cc.Node,
        prefab: cc.Prefab,
    },

    // use this for initialization
    start () {

        if (typeof wx === 'undefined') {
            return;
        }



        wx.onMessage(data => {

            if (data.type == 'updateMaxScore')
            {
                this.initFriendInfo();
            }
          });
          
    }, 


    initFriendInfo () {

        wx.getFriendCloudStorage({
            keyList: ['score'],
            success: (res) => {

                console.log(res);

                this.sortList(res.data, false);

                for (let i = 0; i < res.data.length; ++i) {
                    this.createUserBlock(res.data[i], i+1);
                }
            },
            fail: (res) => {
            }
        });
    },

    createUserBlock (user, indexValue) {
        let node = cc.instantiate(this.prefab);
        node.parent = this.content;
        node.y = 0;

        //set Index
        let indexLabel = node.getChildByName('Index').getComponent(cc.Label);
        indexLabel.string = indexValue;

        // set nickName
        let userName = node.getChildByName('UserName').getComponent(cc.Label);
        userName.string = user.nickName || user.nickname;

        //Score
        let score = node.getChildByName('Score').getComponent(cc.Label);
        score.string = user.KVDataList[1].value;
        console.log(user.KVDataList[1].value);

        // set avatar
        cc.loader.load({url: user.avatarUrl, type: 'png'}, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('Head').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
    },


    sortList: function(ListData, order){ //排序(ListData：res.data;order:false降序，true升序)
        ListData.sort(function(a,b){
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i = 0; i < KVDataList.length; i++){
                if(KVDataList[i].key == "score"){
                    AMaxScore = KVDataList[i].value;
                }
            }
    
    
            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i = 0; i<KVDataList.length; i++){
                if(KVDataList[i].key == "score"){
                    BMaxScore = KVDataList[i].value;
                }
            }
    
    
            if(order){
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            }else{
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    }


});
