var Map = cc.Layer.extend({
	_backGround: null,
	_tmxMap:null,
	_winSize:null,
	_minMap:null,
	_tileSize:null,
	_mapSize:null,
	_mapConfig:null,
	_groundLayer: null,
    _npcLayer:null,
	/**
	 * [_mapLength 地图大菱形的长度]
	 * @type {[double]}
	 */
	_mapLength:null, 

	/**
	 * [_vectorA 大菱形X轴的单位向量]
	 * @type {[double]}
	 */
	_vectorA:null,

	/**
	 * [_vectorA 大菱形Y轴的单位向量]
	 * @type {[double]}
	 */	
	_vectorB:null, 
	/**
	 * [_tileLength tile菱形的边长]
	 * @type {[double]}
	 */
	_tileLength:null,


	/**
	 * [init 根据英雄的位置和英雄的地图 初始化地图]
	 * @param  {[type]} HeroPosition [英雄的tile位置]
	 * @param  {[type]} HeroMap      [英雄所在的地图]
	 * @return {[type]}              [description]
	 */
	init: function(HeroPosition,HeroMap) {
		this._winSize = cc.Director.getInstance().getWinSize();
		
		var mapPath = 'client/res/map/' + HeroMap + '.tmx';
		this._tmxMap = cc.TMXTiledMap.create(mapPath);
		this.addChild(this._tmxMap,-1,MAP_TAG);
		this._tileSize = this._tmxMap.getTileSize();
		this._mapSize = this._tmxMap.getContentSize();
		this.mapMoveByHeroPosition(HeroPosition);		//根据英雄的位置初始化地图的位置


		

		this._mapConfig = this.getSingleMapConfigByName(HeroMap);		//读出了地图配置文件
		for (var i = this._mapConfig.buildings.length - 1; i >= 0; i--) {	//初始化地图上的建筑
			cc.log(this._mapConfig.buildings[i]['buildingName'] + " "
			 	+ this._mapConfig.buildings[i]['objectName']);
			var buildingObjects = this._tmxMap.getObjectGroup(
				this._mapConfig.buildings[i]['objectName']);
			var buildObject = buildingObjects.getObjects()[0];
			//cc.log(buildObject.getAttribute('polyline'));

		};



		this._groundLayer = this._tmxMap.getLayer(this._mapConfig.ground);		//初始化地图floor层

		
		this._mapLength = Math.sqrt(this._mapSize.width*this._mapSize.width + 
			this._mapSize.height*this._mapSize.height)/2;
		this._vectorA = cc.p(-this._mapSize.width*0.5/this._mapLength,
			-this._mapSize.height*0.5/this._mapLength);
		this._vectorB = cc.p(this._mapSize.width*0.5/this._mapLength,
			-this._mapSize.height*0.5/this._mapLength);
		this._tileLength = Math.sqrt(this._tileSize.width*this._tileSize.width + 
			this._tileSize.height*this._tileSize.height)/2;
		
		return true;
	},

	/**
	 * [locationToTilePosition  根据鼠标的点击位置索引地图的tile]
	 * @param  {[ccp]} position [鼠标的点击位置]
	 * @return {[ccp]}          [tile的位置,如果没有则返回null]
	 */
	locationToTilePosition : function (position)	
	{
		var newPosition = cc.pSub(position,this.getPosition());		//将鼠标点击的位置变为地图的相对位置
		var x = newPosition.x  - this._mapSize.width/2 ;
		var y = newPosition.y  - this._mapSize.height ;
		var a = (x*this._vectorB.y - y*this._vectorB.x)/(
			this._vectorA.x*this._vectorB.y - this._vectorB.x *this._vectorA.y);
		var b = (x*this._vectorA.y - y*this._vectorA.x)/(
			this._vectorB.x *this._vectorA.y - this._vectorA.x*this._vectorB.y);
		if(a <= 0 || b <= 0)
			return null;

	    var ret =  cc.p(parseInt(b/this._tileLength),parseInt(a/this._tileLength));
	    return ret;
	},

	/**
	 * [tilePositionToMapLocation 将tile坐标变为地图的相对坐标]
	 * @param  {[ccp]} position [tile坐标]
	 * @return {[ccp]}          [tile在地图上的坐标]
	 */
	tilePositionToWorldLocation : function (position)
	{
		var tile_nx = this._mapSize.width/this._tileSize.width;
		var tile_ny = this._mapSize.height/this._tileSize.height;
		var posX = (tile_ny + position.x - position.y) * this._tileSize.width * 0.5;
		var posY = (tile_ny+tile_nx - position.x - position.y - 1 )* this._tileSize.height *0.5;
		return (cc.p(posX,posY));
		
	},

	/**
	 * [getSingleMapConfigByName 根据地图名称读出地图配置]
	 * @param  {[type]} mapName [地图名字]
	 * @return {[type]}         [description]
	 */
	getSingleMapConfigByName : function(mapName)
	{
		for (var i = mapsConfig.length - 1; i >= 0; i--) {
			if(mapsConfig[i].name == mapName)
				return mapsConfig[i];
		};
		return null;
	},



	/**
	 * [isMoveAble 检测目的点是否可动]
	 * @param  {[cc.p]}  position [鼠标点击的相对于tile的点]
	 * @return {Boolean}          [description]
	 */
	isMoveAble : function ( position )
	{
		var tileId = this._groundLayer.getTileGIDAt(position);
		if(tileId == 93)
			return "你不能到达那里!";
		else return true;

	},

	/**
	 * [mapDragged debug专用]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	mapDragged : function (event)
	{
		var delta = event.getDelta();
        var diff = cc.pAdd(delta, this.getPosition());
        this.setPosition(diff);

	},


	/**
	 * [mapMoveByHeroPosition 根据英雄的位置来改变地图的位置]
	 * @param  {[cc.p]} position 	[坐标]
	 * @param  {[boolean]} type     [是否有动画]
	 * @return {[type]}          [null]
	 */
	mapMoveByHeroPosition : function(position,type)
	{
		var middlePosition = cc.p(this._winSize.width/2,this._winSize.height/2);
		var diff = cc.pSub(middlePosition,this.tilePositionToWorldLocation(position));
		
		if(type == true)
		{
			this.runAction(cc.MoveTo.create(0.2,diff));
		}
		else
		{
			this.setPosition(diff);
		}
		
	}
});





/**
 * [create 根据英雄的位置和英雄的地图 初始化地图]
 * @param  {[type]} HeroPosition [英雄的tile位置]
 * @param  {[type]} HeroMap      [英雄所在的地图]
 * @return {[type]}              [description]
 */
Map.create = function(HeroPosition,HeroMap) {
	var ret = new Map();
	if (ret && ret.init(HeroPosition,HeroMap)) {
		return ret;
	}
	return null;
};


