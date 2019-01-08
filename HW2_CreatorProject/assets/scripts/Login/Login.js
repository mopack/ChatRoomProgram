const i18n = require('LanguageData');
var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        bgMusic: {
            type: cc.AudioClip,
            default: null,
        },
        buttonStart: cc.Button,
        buttonSettings: cc.Button,
        labelStart: cc.Label,
        lbaelSettings: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    onBtnStartClicked: function() {
        this.current = cc.audioEngine.pauseAll();
        cc.director.loadScene('MagicForest');
    },
    
    onBtnSettingsClicked: function() {
        cc.director.loadScene('Settings');
    },

    onLoad () {
        if(Global.isFirstStart){
            Global.lang = 'en';
            Global.isFirstStart = false;
            this.current = cc.audioEngine.play(this.bgMusic, true, 1);
        }
        i18n.init(Global.lang);
    },

    start () {
    },

    // update (dt) {},
    update: function(){
        i18n.updateSceneRenderers();
    }
});

