/**
 * [HeroPanel 英雄面板信息类]
 * @type {[type]}
 */
var HeroPanel = cc.Layer.extend({
	_name: null,
	_level: null,
	_score: null,
	_width: null,
	_height: null,
	_heroImage: null,
	_expWhite: null,
	_expRed: null,
	_background: null,
	_scalex: null,
	_nameLabel: null,
	_levelLabel: null,
	_scoreLabel: null,
	_totScore: null,
	_action: null,
	_actionLabel: null,
	
	init: function(name, level, score) {
		
		this._super();
		
		this._width = 277;
		this._height = 92;
		this._name = name;
		this._score = score;
		this._totScore = 1000000;
		this._level = level;
		this._scalex = this._score * 1.0 * 80 / this._totScore;
		this._action = 99999;
		
		this._background = cc.LayerColor.create(cc.c4(60, 60, 60, 125), 277, 92);
		this.addChild(this._background, 0);
		
		//头像
		this._heroImage = cc.Sprite.create(s_photo);
		this._heroImage.setPosition(cc.p(45, 48));
		this.addChild(this._heroImage);
		
		//白色经验条
		this._expWhite = cc.LayerColor.create(cc.c4(255, 255, 255, 255), 80, 4);
		this._expWhite.setPosition(cc.p(5, 3));
		this.addChild(this._expWhite, 1);
		
		//红色经验条
		this._expRed = cc.LayerColor.create(cc.c4(115, 2, 2, 255), 1, 4);		
		this._expRed.setScaleX(this._scalex);
		this._expRed.setPosition(cc.p(5 + (this._scalex - 1) / 2.0, 3));	
		this.addChild(this._expRed, 2);
		
		//显示姓名
		this._nameLabel = cc.LabelTTF.create(this._name, s_yahei, 16, cc.size(32, 16), cc.TEXT_ALIGNMENT_LEFT);
		this._nameLabel.setPosition(cc.p(110, 90));
		this.addChild(this._nameLabel, 2);
		
		var lvLabel =  cc.LabelTTF.create("Lv.", s_yahei, 16, cc.size(32, 16), cc.TEXT_ALIGNMENT_LEFT);
		lvLabel.setPosition(cc.p(110, 50));
		this.addChild(lvLabel, 2);
		
		//显示等级
		this._levelLabel = cc.LabelTTF.create(this._level, s_yahei, 14, cc.size(32, 14), cc.TEXT_ALIGNMENT_LEFT);
		this._levelLabel.setPosition(cc.p(136, 50));
		this.addChild(this._levelLabel, 2);
		
		//
		this._scoreLabel = cc.LabelTTF.create(this._score + "/", s_yahei, 14, cc.size(32, 14), cc.TEXT_ALIGNMENT_LEFT);
		this._scoreLabel.setPosition(cc.p(160, 67));
		this.addChild(this._scoreLabel, 2);
		
		this._totScoreLabel = cc.LabelTTF.create(this._totScore, s_yahei, 14, cc.size(32, 14), cc.TEXT_ALIGNMENT_LEFT);
		this._totScoreLabel.setPosition(cc.p(215, 67));
		this.addChild(this._totScoreLabel, 2);
		
		
		var actLabel = cc.LabelTTF.create("行动值", s_yahei, 16, cc.size(32, 16), cc.TEXT_ALIGNMENT_LEFT);
		actLabel.setPosition(cc.p(110, 47));
		this.addChild(actLabel, 2);
		
		this._actionLabel = cc.LabelTTF.create(this._action, s_yahei, 14, cc.size(32, 14), cc.TEXT_ALIGNMENT_LEFT);
		this._actionLabel.setPosition(cc.p(162, 44));
		this.addChild(this._actionLabel, 2);
		//var screenSize = cc.Director.getInstance().getWinSize();
//		var spriteSize = this._testSprite.getContentSize();
//		var spritePosition = cc.p(position.x + spriteSize.width / 2, screenSize.height - position.y - spriteSize.height / 2);
//
//		this._testSprite.setPosition(spritePosition);
		return true;
	},

	getHeroPanelSize: function() {
		return this._testSprite.getContentSize();
	}

});


/**
 * 英雄面板工厂方法
 * @param  {[cc.p]} position [面板的位置,x为离左边的间距，y为离上面的间距]
 * @return {[type]}          [英雄面板的实例]
 */
HeroPanel.create = function(name, level, score) {
	var ret = new HeroPanel();
	if (ret && ret.init(name, level, score)) {
		return ret;
	}
	return null;
}





