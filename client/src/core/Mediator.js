
function Mediator() {
	this._hero;
	this._heroPanel;
	this._heroPosition;
	this._systemFunction;
	this._mainLayer;
	this._map;
	this._size;
	this._tipsManage;
	this._input;
	this.init = function(mainLayer) {
		this._size = cc.Director.getInstance().getWinSize();
		// get the main layer
		this._mainLayer = mainLayer;

		//tipsManage
		this._tipsManage = TipsManage.create();
		this._mainLayer.addChild(this._tipsManage,TIPS_MANAGE_TAG);
		
		// map
		this._map = Map.create(cc.p(5,6),'map1');
		this._mainLayer.addChild(this._map);

		
		this._hero = Hero.create(
			cc.p(this._map.tilePositionToWorldLocation(cc.p(5,6)) + this._map.getPosition())
			);

		this._mainLayer.addChild(this._hero.getSprite());

		

		return true;
	},

	this.onMouseDown = function(event) {
		var toTilePosition = this._map.locationToTilePosition(event.getLocation());
		var moveAble = this._map.isMoveAble(toTilePosition);
		
		if( moveAble == true)
		{
			this._map.mapMoveByHeroPosition(toTilePosition,true);
		}
		else this._tipsManage.addTip(moveAble);
		
		
	},
    this.onMouseDragged = function(event) {
        //this._map.mapDragged(event);
    },
    this.onMouseMoved = function(event) {

    },
    this.onMouseUp =  function(event) {	
    };
}

Mediator.create = function(mainLayer) {
	var ret = new Mediator();
	if (ret && ret.init(mainLayer)) return ret;
	return null;
};




