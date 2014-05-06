/**
 * [HeroPanel 英雄面板信息类]
 * 
 * @type {[type]}
 */
var HeroPanel = cc.Layer.extend({
	_name : null,
	_level : null,
	_score : null,
	_width : null,
	_height : null,
	_heroImage : null,
	_expWhite : null,
	_expRed : null,
	_background : null,
	_scalex : null,
	_nameLabel : null,
	_levelLabel : null,
	_scoreLabel : null,
	_other : null,
	_otherLabel : null,
	_textSize : null,
	_lvlEx : null,
	_heroPosition : null , 
	_expProcesser : null,
	
	init : function() {

		this._super();

		this._width = 200;
		this._height = 85;
		this._textSize = 14;

		this.getHeroInformationFromServer();
		this.initPanel();
		return true;
	},

	initPanel : function() {
		
		this._background = cc.LayerColor.create(cc.c4(60, 60, 60, 125),
				this._width, this._height);
		this.addChild(this._background, 0);

		// 头像
		this._heroImage = cc.Sprite.create(s_photo);
		this._heroImage.setPosition(cc.p(45, 48));
		this.addChild(this._heroImage);
		this._heroImage.setScale(0.7);

		// 显示姓名
		this._nameLabel = cc.LabelTTF.create(this._name, s_yahei,
				this._textSize, cc.size(20, this._textSize),
				cc.TEXT_ALIGNMENT_LEFT);

		this._nameLabel.setPosition(cc.p(120, 90));
		this.addChild(this._nameLabel, 2);

		// 显示等级
		this._levelLabel = cc.LabelTTF.create("Lv." + this._level, s_yahei,
				this._textSize, cc.size(60, this._textSize), cc.TEXT_ALIGNMENT_LEFT);
		this._levelLabel.setPosition(cc.p(120, 50));
		this.addChild(this._levelLabel, 2);

		//
		this._scoreLabel = cc.LabelTTF.create(this._score + "/" + this._lvlEx[this._level], s_yahei,
				this._textSize, cc.size(100, this._textSize),
				cc.TEXT_ALIGNMENT_LEFT);
		this._scoreLabel.setPosition(cc.p(180, 50));
		this.addChild(this._scoreLabel, 2);

		var actLabel = cc.LabelTTF.create("叛逆值", s_yahei, this._textSize, cc
				.size(60, this._textSize), cc.TEXT_ALIGNMENT_LEFT);
		actLabel.setPosition(cc.p(120, 30));
		this.addChild(actLabel, 2);

		this._otherLabel = cc.LabelTTF.create(this._other, s_yahei,
				this._textSize, cc.size(100, this._textSize),
				cc.TEXT_ALIGNMENT_LEFT);
		this._otherLabel.setPosition(cc.p(200, 30));
		this.addChild(this._otherLabel, 2);
		
		
		// hero position
		var size = cc.Director.getInstance().getWinSize();
		
		var positionBackGround = cc.LayerColor.create(cc.c4(60, 60, 60, 125),
				this._width, 20);
		this.addChild(positionBackGround);
		positionBackGround.setPosition(cc.p(0,-30));
		this._heroPosition = cc.LabelTTF.create("",s_yahei,this._textSize,cc.size(200, this._textSize),
				cc.TEXT_ALIGNMENT_LEFT);
		positionBackGround.addChild(this._heroPosition);
		
		this._heroPosition.setPosition(cc.p(120,15));
		this.updateHeroPosition("map1",cc.p(6,1));
		
		
		// exp
		var expBackGround = cc.LayerColor.create(cc.c4(255, 255, 255, 125),this._width, 10);
		
		this._expProcesser = cc.ProgressTimer.create(cc.Sprite
				.create("client/res/process_bg.png"));
		this._expProcesser.setType(cc.PROGRESS_TIMER_TYPE_BAR);
		
		this._expProcesser.setPosition(cc.p(this._width*0.5,5));
		this._expProcesser.setMidpoint(cc.p(0, 0));
		this._expProcesser.setBarChangeRate(cc.p(1, 0));
		this.addChild(this._expProcesser );
		this.addChild(expBackGround);
		
		this.updateExpProcess(0);
		
		this.setPosition(cc.p(0,size.height  - this._height));
	},
	getHeroPanelSize : function() {
		return this._testSprite.getContentSize();
	},
	
	getHeroInformationFromServer : function() {
		// ajax
		var self = this;
		//self._name = "Compatibility";
		self._name = "admin"
		self._score = 20;
		self._level = 0;
		self._other = 150;
		self._lvlEx = [ 100, 200, 300, 400, 500, 600, 700, 800 ];
	},
	
	updateHeroPosition:function(mapName , position)
	{
		var string = "当前位置 " + mapName + "-> (" + position.x + " , " + position.y + ")";
		this._heroPosition.setString(string);
		
		//ajax 更新位置
		var url = genUpdateHeroPositionAndMapUrl();
	},
	
	updateLvl : function ()
	{
		var self = this;
		
		
		
		self._levelLabel.setString("Lv."+self._level);
		self._scoreLabel.setString(self._score + "/" + self._lvlEx[self._level]);
		
		// ajax 升级请求
		var url = genLvlUpActionUrl();
	},
	
	
	/**
	 * exp增量
	 */
	updateExpProcess : function (addExp)
	{
		var self = this;
		var actions = [];
		
		if(addExp + this._score >= this._lvlEx[this._level]) // lvl up
		{
			actions.push(cc.ProgressTo.create(2,100));
			actions.push(cc.ProgressTo.create(0,0));
			this._score = addExp + this._score - this._lvlEx[this._level];
			this._level++;
			self.updateLvl();
		}
		var radio = this._score / this._lvlEx[this._level] * 100.0;
		actions.push(cc.ProgressTo.create(2,radio));
		self._expProcesser.runAction(cc.Sequence.create(actions));
		
		//ajax 添加经验
		var url = genAddExpUrl();
	},
	
});

/**
 * 英雄面板工厂方法
 * 
 * @param {[cc.p]}
 *            position [面板的位置,x为离左边的间距，y为离上面的间距]
 * @return {[type]} [英雄面板的实例]
 */
HeroPanel.create = function() {
	var ret = new HeroPanel();
	if (ret && ret.init()) {
		return ret;
	}
	return null;
}
