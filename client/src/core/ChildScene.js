


/**
 * [ChildScene 英雄面板信息类]
 * @type {[type]}
 */
var ChildScene = cc.Layer.extend({

	//layer中的元素内容
	_zOrder:null,//该layer中所有节点的层次度
	_hero: null,
	_map: null,
	_clickTile:null,//点击tile的时显示的精灵	
	_clickAction:null,//该精灵的动画
	

	//鼠标点击相关
	_clickAble:null,//点击能否被响应
	
	//键盘相关
	_keytodir:null,//方向键键值映射移动方向
	
	
	init: function() {
		this._super();
		
		//该layer所附着的所有节点的层次度
		this._zOrder = new Array();
		this._zOrder["_map"] = 10;
		this._zOrder["_hero"] = 20;
		this._zOrder["_clickTile"] = 11;
		
		//map
		this._map = Map.create('map1');
		this.addChild(this._map,this._zOrder["_map"]);
		
		//hero
		this._hero = Hero.create(this._map.tilePositionToWorldLocation(cc.p(6,1)));
		this.addChild(this._hero.getSprite(),this._zOrder["_hero"]);

		
		//click!动画
		this._clickTile = cc.Sprite.create(s_clickTile);
		this.addChild(this._clickTile,this._zOrder["_clickTile"]);
		var action1 = cc.FadeIn.create(0.3);
        var action1Back = action1.reverse();
		this._clickAction = cc.Sequence.create(
        		action1, 
        		action1Back,
        		null);
        this._clickAble=true;
        
        //键盘相关
        this._keytodir = new Array();
		this._keytodir[38]=0;
		this._keytodir[40]=1;
		this._keytodir[37]=2;
		this._keytodir[39]=3;
		return true;
	},


	
	/*
	 * 镜头跟踪
	 */
	setSceneScrollPosition:function(){
    	var winSize=cc.Director.getInstance().getWinSize();
    	var screenCenter = cc.p(winSize.width/2.0,winSize.height/2.0);
    	var nowWorldPos = this._hero.getSprite().getPosition();
    	var nowTilePos = this._map.locationToTilePosition(nowWorldPos);
  		var enterMargin = new Array(0,0,0,0,0);
  		var isEnterMargin=false;
		if(nowTilePos.y<5) {nowTilePos.y=5;enterMargin[0]=true;isEnterMargin=true;}
		if(nowTilePos.y>25) {nowTilePos.y=25;enterMargin[1]=true;isEnterMargin=true;}
		if(nowTilePos.x<5) {nowTilePos.x=5;enterMargin[2]=true;isEnterMargin=true;}
		if(nowTilePos.x>25) {nowTilePos.x=25;enterMargin[3]=true;isEnterMargin=true;}
		var newWorldPos = this._map.tilePositionToWorldLocation(nowTilePos);
		/*if(enterMargin[0]) newWorldPos.y+=50;
		if(enterMargin[1]) newWorldPos.y-=50;
		if(enterMargin[2]) newWorldPos.x+=25;
		if(enterMargin[3]) newWorldPos.x-=25;*/
		var targetPos = isEnterMargin?newWorldPos:nowWorldPos;
		this.setPosition(cc.pSub(screenCenter,nowWorldPos));
			/*if(isEnterMargin){
				if(this._hero.checkIsStepDone()){
					this.setPosition(cc.pSub(screenCenter,newWorldPos));
				}
			//this.runAction(cc.MoveTo.create(1.0,newWorldPos));
			}else{
				this.setPosition(cc.pSub(screenCenter,nowWorldPos));
			}
	
		*/
		
		//cc.log(newWorldPos);
		//cc.log(nowWorldPos);
    },

	/*
	 * 该layer的时间装置，进行循环检测
	 */
	loopTime:function(){
		
		//镜头跟踪
		this.setSceneScrollPosition();
		
		//角色移动时判断是否踩到特殊格子
	 	if(this._hero.checkIsWalking()){
	 		var nowTilePos = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
		//	this._map.checkOrDoConvey(nowTilePos);
	 	}
	 	
	},
	
	/*
	 * 按键响应
	 */
	onKeyDown : function(key){		
		if(key>=37 && key<=40){//按下方向键
			var nextTilePos = this._map.locationToTilePosition(this._hero.getNextWorldPosition(this._keytodir[key]));
			if(this._map.checkCollision(nextTilePos)==false)  {
				this._hero.moveByStep(this._keytodir[key]);
			}
		}

	},	
	
	
	/*
	 * 点击响应
	 */
	onTouchBegan : function(event) {
		
		
		if(this._clickAble){//防止暴力点击
			this._clickAble=false;
			var toTilePosition = this._map.locationToTilePosition(cc.pSub(event.getLocation(),this.getPosition()));
			var targetPos = this._map.tilePositionToWorldLocation(toTilePosition);
		
			
			//点击格子动画
	      	var clickCellPos = this._map.tilePositionToWorldLocation(toTilePosition)
	        this._clickTile.setPosition(clickCellPos);
	        this._clickTile.runAction(
	        	cc.Sequence.create(
					this._clickAction,
					cc.CallFunc.create(function(){this._clickAble=true;},this),
					null
				)
			);

		
			//角色移动到点击地点
			if(!this._hero.checkIsWalking()){
				var start = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
				var terminal = toTilePosition;
				if(this._map.checkOrCalRoute(start,terminal))
					this._hero.moveByRoute(this._map.getRouteContent(),this._map.getRouteSize());
			}
			
		}
		
	},

    onTouchMoved : function(event) {
        //this._map.mapDragged(event);
    },
    
    onTouchEnd :  function(event) {	
    	
    },
  
    
    
    ////////////////////////////////////外部接口
    getHeroTilePosition:function(){
		var nowTilePos = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
		return nowTilePos;
	},
	getHeroWorldPosition:function(){
		return this._hero.getSprite().getPosition();
	},
	
    
    
    
});



ChildScene.create = function() {
	var ret = new ChildScene();
	if (ret && ret.init()) {
		return ret;
	}
	return null;
}