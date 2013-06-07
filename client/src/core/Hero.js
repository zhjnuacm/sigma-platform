/*
 * 对外接口
 * Hero Hero.create(position);			//创建英雄类实例
 * void moveByStep(dir);				//根据方向移动一步
 * void moveByRoute(route,routeSize);	//根据路线数组移动
 * bool checkIsWalking();				//返回精灵是否在移动的判断值
 * CCSprite getSprite();				//返回精灵对象
 * 
 * 
 */



function Hero() {
	//精灵移动相关变量
	_stepTime:null;//单步移动时间
	_stepLengthX:null;//单步移动实际距离X
	_stepLengthY:null;//单步移动实际距离Y
	_stepDelta:null;//单步位移向量
	_route:null;//移动路线数组
	_routeCnt:null;//移动路线步数
	

	//动画模块相关变量
	_heroTexture:null;//精灵的纹理
	_delayTime:null;//每帧时间间隔
	_loopCnt:null;//行走动画循环次数
	_spriteActions:null;//精灵行走动画四个方向的数组
	
	//精灵的状态
	_isHeroWalking:null;//精灵是否在移动
	_routeState:null;//精灵是否正在进行路线移动
	_dir:null;//精灵正在移动的方向

	//主体精灵
	_sprite:null;//英雄类的主体精灵

	/*
	 * 初始化函数
	 */
	this.init = function(position) {
		//精灵移动相关变量
		this._stepTime = 0.8;//步长表示移动一格花费1秒时间
		this._stepLengthX = 50;
		this._stepLengthY = 25;
		this._stepDelta = new Array();
		this._stepDelta[0] = cc.p(this._stepLengthX,this._stepLengthY);//UP
		this._stepDelta[1] = cc.p(-this._stepLengthX,-this._stepLengthY);//DOWN
		this._stepDelta[2] = cc.p(-this._stepLengthX,this._stepLengthY);//LEFT
		this._stepDelta[3] = cc.p(this._stepLengthX,-this._stepLengthY);//RIGHT
		this._route= new Array();
		this._routeCnt=0;
		
		//动画模块相关变量
		this._heroTexture = cc.TextureCache.getInstance().addImage(s_hero);
		this._delayTime=0.2;
		this._loopCnt=1;
		this._spriteActions = new Array();
		var frames = new Array();
    	var box = new Array(6,5,7,4);
		for(var k=0;k<4;k++){
			var animation = new cc.Animation();
	    	for(var i=0;i<4;i++){
				frames[i] = cc.SpriteFrame.createWithTexture(this._heroTexture,cc.rect(120*i,120*box[k],120,120));
				animation.addSpriteFrame(frames[i]);
			}
			animation.setLoops(this._loopCnt);//设置循环次数
			animation.setDelayPerUnit(this._delayTime);//动画间隔
	    	this._spriteActions[k] = cc.Animate.create(animation);
		}
    	
    	//精灵的状态
    	this._routeState=false;
		this._isHeroWalking=false;
		this._dir=-1;
		
		//hero真正初始化
		this._sprite = cc.Sprite.create();	
		this._sprite.setPosition(position);//坐标位置
		this._sprite.initWithTexture(this._heroTexture, cc.rect(0, 120*4, 120, 120));
    	this._sprite.setScale(0.7);	
    	this._sprite.setAnchorPoint(cc.p(0.5,0.1));
    	
		return true;
	},
	


	/*
	 * 单步移动
	 */
	this.moveByStep = function(dir){
		if(this._isHeroWalking) return;
		this._isHeroWalking=true;
		this._dir = dir;
		var box = new Array(2,3,0,1);
		var movementActions = cc.Sequence.create(
			cc.Spawn.create(
				cc.MoveBy.create(this._stepTime,this._stepDelta[dir]),
				this._spriteActions[box[dir]],
				null),
			cc.CallFunc.create(this.setFaceDirection,this,dir),
			null);
		this._sprite.runAction(movementActions);
		
		
	},
	
	/*
	 * 单步移动结束后的回调函数
	 */
	this.setFaceDirection=function(nodeExecutingAction, value){
		this._isHeroWalking=false;
		var box = new Array(7,4,6,5);
		this._sprite.setTextureRect(cc.rect(0, 120*box[value], 120, 120),false);
		if(this._routeState==true ){
			if(this._routeCnt>=0) this._routeCnt--;
			if(this._routeCnt<0){
				this._routeState=false;
				return;
			} 
			this.moveByStep(this._route[this._routeCnt]);
		}
	},


	/*
	 * 根据路线移动
	 */
	this.moveByRoute = function(route,routeSize){
			this._route = route;
			this._routeCnt = routeSize;
			this._routeState=true;
			this._routeCnt--;
			this.moveByStep(this._route[this._routeCnt]);
	},
	
	this.getStepDir=function(){
		return this._dir;
	},
	
	/*
	 * 获得走完下一步后的世界坐标
	 */
	this.getNextWorldPosition=function(dir){
		return cc.pAdd(this._sprite.getPosition(),this._stepDelta[dir]);
	},
	
	/*
	 * 判断是否在行走
	 */
	this.checkIsWalking = function(){
		if(this._routeState==true || this._isHeroWalking==true) return true;
		return false;
	},
	
	this.checkIsStepDone = function(){
		return !this._isHeroWalking;
	},
	/*
	 * 返回精灵实例
	 */
	this.getSprite = function(){
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







