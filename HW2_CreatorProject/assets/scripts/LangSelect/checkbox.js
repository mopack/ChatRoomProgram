const i18n = require('LanguageData');
var Global = require("Global");


cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        radioButtonEventString: cc.Label,
        
        LabelBack: cc.Label,
        ButtonBack: cc.Button,

        radioButton: {
            default: [],
            type: cc.Toggle
        },
    },

    // use this for initialization
    onLoad: function () {
    },

    onBtnBackClicked: function() {
        cc.director.loadScene('Login');
    },

    radioButtonClicked: function(toggle) { //by ISO 639
        var index = this.radioButton.indexOf(toggle);
        var Lang = '';

        switch(index){
            case 0: Lang = 'en'; break;
            case 1: Lang = 'zh_tw'; break;
            case 2: Lang = 'zh'; break;
        }
        Global.lang = Lang;
        i18n.init(Lang);       
    },

    update: function(){
        i18n.updateSceneRenderers();
    }
});
