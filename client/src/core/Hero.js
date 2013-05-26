



function Hero() {
	_sprite:null;
	this.init = function(position) {
		this._sprite = cc.Sprite.create(s_hero);
		this._sprite.setPosition(position);
		return true;
	}
	this.getSprite = function()
	{
		return this._sprite;
	}
}

Hero.create = function(position) {
	var hero = new Hero();
	if (hero && hero.init(position)) {
		return hero;
	}
	return ret;
}