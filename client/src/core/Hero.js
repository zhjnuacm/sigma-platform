/**
 * [Hero 英雄类]
 * @author Saisa
 * 
 * 对外接口
 * Hero Hero.create(CCPoint position);			//创建英雄类实例
 * void moveByStep(int dir);					//根据方向移动一步
 * void moveByRoute(int[] route,int routeSize);	//根据路线数组移动
 * bool checkIsWalking();						//返回精灵是否在移动的判断值
 * CCSprite getSprite();						//返回精灵对象
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
	
	//人物行走帧设定
	_frameUp:null;
	_frameDown:null;
	_frameLeft:null;
	_frameRight:null;
	_frameWidth:null;
	_frameHeight:null;

	//精灵的状态
	_isHeroWalking:null;//精灵是否在移动
	_routeState:null;//精灵是否正在进行路线移动
	_dir:null;//精灵正在移动的方向
	_routeOrderTag:null;
	_routeRunTag:null;
	_nextPos:null;

	//主体精灵
	_sprite:null;//英雄类的主体精灵


    _mesLayer: null,
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
		
		//人物行走帧
		//原始妹子
//		this._frameUp = 3;
//		this._frameDown = 0;
//		this._frameLeft = 2;
//		this._frameRight = 1;
//		this._frameWidth = 120;
//		this._frameHeight = 120;
		
		//僵尸
//		this._frameUp = 2;
//		this._frameDown = 1;
//		this._frameLeft = 3;
//		this._frameRight = 0;		
//		this._frameWidth = 74;
//		this._frameHeight = 98;
		
		//青蛙
		this._frameUp = 2;
		this._frameDown = 1;
		this._frameLeft = 3;
		this._frameRight = 0;
		this._frameWidth = 80;
		this._frameHeight = 80;
	

		
		//动画模块相关变量
		this._heroTexture = cc.TextureCache.getInstance().addImage(s_photo);
		this._delayTime=0.2;
		this._loopCnt=1;
		this._spriteActions = new Array();
		var frames = new Array();
    	var box = new Array(this._frameUp,this._frameDown,this._frameLeft,this._frameRight);
		for(var k=0;k<4;k++){
			var animation = new cc.Animation();
	    	for(var i=0;i<4;i++){
				frames[i] = cc.SpriteFrame.createWithTexture(this._heroTexture,cc.rect(0,0,this._frameWidth,this._frameHeight));
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
		this._routeOrderTag=0;
		this._routeRunTag=0;
		this._nextPos=position;
		
		
		
		//hero真正初始化
		this._sprite = cc.Sprite.create();	
		this._sprite.setPosition(position);//坐标位置
		this._sprite.initWithTexture(this._heroTexture, cc.rect(0, 0, this._frameWidth, this._frameHeight));	
    	this._sprite.setAnchorPoint(cc.p(0.5,0.1));
    	
    	this._sprite.setScale(0.6,0.6);

    	var br = cc.Sprite.create(s_user_block);
        br.setPosition(cc.p(41, 39));
        br.setScale(5 / 3, 5 / 3);
        this._sprite.addChild(br);
        
        var mark;
        
            mark = cc.Sprite.create(s_user_boy_mark);
            mark.setPosition(cc.p(8, 70));
         
        mark.setScale(5 / 3, 5 / 3);
        this._sprite.addChild(mark);

        var name = cc.LabelTTF.create('['+ 'admin' + ']', 'Microsoft YaHei', 14, cc.size(100, 16), cc.TEXT_ALIGNMENT_CENTER);
        name.setPosition(cc.p(40, -16));
        name.setColor(cc.c3(30, 30, 30));
        name.setScale(5 / 3, 5 / 3);
        this._sprite.addChild(name);
	    //初始化消息
    	this._mesLayer = MessageList.create(cc.p(-20, 130));
    	this._sprite.addChild(this._mesLayer);

		return true;
	},
	
	/*
	 * 根据移动路线进行移动，可转向
	 */
	this.moveByRouteUpdately = function(route,routeSize){
			this._route = route;
			this._routeCnt = routeSize;
			this._routeOrderTag++;
			if(!this.checkIsWalking()){
				this.moveByRoute(this._route,this._routeCnt);
			}
	}

	/*
	 * 单步移动
	 */
	this.moveByStep = function(dir){
		if(this._isHeroWalking) return;
		this._isHeroWalking=true;
		this._dir = dir;
		this._nextPos = cc.pAdd(this._sprite.getPosition(),this._stepDelta[dir]);
		var movementActions = cc.Sequence.create(
			cc.Spawn.create(
				cc.MoveBy.create(this._stepTime,this._stepDelta[dir]),
				this._spriteActions[dir],
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
		var box = new Array(this._frameUp,this._frameDown,this._frameLeft,this._frameRight);
		this._sprite.setTextureRect(cc.rect(0,0, this._frameWidth,this._frameHeight),false);
		this._nextPos=this._sprite.getPosition();
		if(this._routeRunTag!=this._routeOrderTag){
			this.moveByRoute(this._route,this._routeCnt);
			return;
		}
		if(this._routeState==true ){
			if(this._routeCnt>=0) this._routeCnt--;
			if(this._routeCnt<0){
				this._routeState=false;
				return;
			}
			GLOBAL.mediator._heroPanel.updateHeroPosition(
			GLOBAL.mapName,GLOBAL.mediator._childScene.getHeroTilePosition()
			);
			this.moveByStep(this._route[this._routeCnt]);
		}
	},


	/*
	 * 根据路线移动
	 */
	this.moveByRoute = function(route,routeSize){
			this._route = route;
			this._routeCnt = routeSize;
			this._routeRunTag = this._routeOrderTag;
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
		if(!this.checkIsWalking())
			return this._sprite.getPosition();
		return this._nextPos;
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
	},

    this.addMessage =  function (mes) {
        this._mesLayer.addMessage(mes);
    }

}



Hero.create = function(position) {
	var hero = new Hero();
	if (hero && hero.init(position)) {
		return hero;
	}
	return ret;
}
