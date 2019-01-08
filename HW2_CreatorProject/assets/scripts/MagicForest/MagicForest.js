const i18n = require('LanguageData');

cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },

        bgMusic: {
            type: cc.AudioClip,
            default: null,
        },

        webview: cc.WebView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // 初始化计时器
        this.starDuration = 1;

        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 生成一个新的星星
        this.spawnNewStar();
        
        this.score = 0;
        this.scoreDisplay.string = 0;
    },

    onBtnChatClicked: function() {
        if(this.webview.enabled == true){
            this.webview.enabled = false;
        }else{
            this.webview.enabled = true;
        }
    },

    onBtnBackClicked: function() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('Login');
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        

        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;

        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;

        //console.log(this.groundY, randY);

        // 返回星星坐标
        return cc.v2(randX, randY);        
    },

    start () {
        this.current = cc.audioEngine.play(this.bgMusic, true, 1);
    },

    update: function (dt) {
        i18n.updateSceneRenderers();
    },

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function () {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },
});
