


/**
 * [HeroPanel 英雄面板信息类]
 * @type {[type]}
 */
var HeroPanel = cc.Layer.extend({
	_name: null,
	_testSprite: null,
	init: function(position) {
		this._super();

		this._testSprite = cc.Sprite.create(s_HeroPanel);
		this.addChild(this._testSprite, 1);

		var screenSize = cc.Director.getInstance().getWinSize();
		var spriteSize = this._testSprite.getContentSize();
		var spritePosition = cc.p(position.x + spriteSize.width / 2, screenSize.height - position.y - spriteSize.height / 2);

		this._testSprite.setPosition(spritePosition);
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
HeroPanel.create = function(position) {
	var ret = new HeroPanel();
	if (ret && ret.init(position)) {
		return ret;
	}
	return null;
}