



function Hero() {
	_sprite:null;
	
	//角色定位模块-定义部分
	_posPoint:null;
	_dir:null;	
	_dirTexture:null;
	
	//角色移动模块—定义部分
	_newPosPoint:null;
	_stepTime:null;
	_stepLengthX:null;
	_stepLengthY:null;
	_walking:null;
	_stepCnt:null;
	_route:null;
	_routeSize:null;
	
	//动画模块-定义部分
	_heroTexture:null;
	_frames:null;
	_animation:null;
	_spriteRunning:null;
	_spriteActions:null;
	_dirAction:null;
	
	this.init = function(position) {
		this._sprite = cc.Sprite.create();
		
		//定位模块-初始化部分
		this._posPoint = position;
		this._sprite.setPosition(this._posPoint);
		
		//setTexture:function (texture) {
		//this.dirTexture = cc.Texture.
		
		///////////////////////////////////移动模块-初始部分
		this._newPosPoint = cc.p(null,null);
		this._stepTime = 1;//步长表示移动一格花费1秒时间
		this._stepLengthX = 50;
		this._stepLengthY = 25;
		this._walking= false;
		this._stepCnt=0;
		this._route= new Array();

		
		/////////////////////////////////////动画模块-初始部分
		this._dirAction = new cc.Action();
		this._heroTexture = cc.TextureCache.getInstance().addImage(s_hero);
		this._frames = new Array();
		this._spriteActions = new Array();
		this._sprite.initWithTexture(this._heroTexture, cc.rect(0, 120*4, 120, 120));//左上角截到右下角，坐标系是WIN坐标系
    	this._sprite.setTexture(this._heroTexture, cc.rect(0, 120*4, 120, 120));
    	
    	this._sprite.setScale(0.8);	
    	this._sprite.setAnchorPoint(cc.p(0.5,0.1));
    	
    	
    	//--------------------LEFT
    	this._animation = new cc.Animation();
		for(var i=0;i<4;i++){
			this._frames[i] = cc.SpriteFrame.createWithTexture(this._heroTexture,cc.rect(120*i,120*6,120,120));
			this._animation.addSpriteFrame(this._frames[i]);
		}
		
		this._animation.setLoops(100);//设置循环次数
		this._animation.setDelayPerUnit(0.2);//动画间隔	
    	this._spriteActions[0] = cc.Animate.create(this._animation);
    	
    	//--------------------RIGHT
    	this._animation = new cc.Animation();
    	for(var i=0;i<4;i++){
			this._frames[i] = cc.SpriteFrame.createWithTexture(this._heroTexture,cc.rect(120*i,120*5,120,120));
			this._animation.addSpriteFrame(this._frames[i]);
		}
		this._animation.setLoops(100);//设置循环次数
		this._animation.setDelayPerUnit(0.2);//动画间隔
    	this._spriteActions[1] = cc.Animate.create(this._animation);
    	
    	//--------------------DOWN
    	this._animation = new cc.Animation();
    	for(var i=0;i<4;i++){
			this._frames[i] = cc.SpriteFrame.createWithTexture(this._heroTexture,cc.rect(120*i,120*7,120,120));
			this._animation.addSpriteFrame(this._frames[i]);
		}
		
		this._animation.setLoops(100);//设置循环次数
		this._animation.setDelayPerUnit(0.2);//动画间隔	
    	this._spriteActions[2] = cc.Animate.create(this._animation);
    	

    	//--------------------UP
    	this._animation = new cc.Animation();
    	for(var i=0;i<4;i++){
			this._frames[i] = cc.SpriteFrame.createWithTexture(this._heroTexture,cc.rect(120*i,120*4,120,120));
			this._animation.addSpriteFrame(this._frames[i]);
		}
		
		this._animation.setLoops(100);//设置循环次数
		this._animation.setDelayPerUnit(0.2);//动画间隔	
    	this._spriteActions[3] = cc.Animate.create(this._animation);
    	
						
		return true;
	},
	
	//按照方向移动1格
	this.moveOneStep = function(dir){
		this._posPoint.x = this._sprite.getPosition().x;
		this._posPoint.y = this._sprite.getPosition().y;
		if(dir == 0){//UP
			this._newPosPoint.x = this._posPoint.x+this._stepLengthX; 
			this._newPosPoint.y = this._posPoint.y+this._stepLengthY;
		}else if(dir == 1){//DOWN
			this._newPosPoint.x = this._posPoint.x-this._stepLengthX; 
			this._newPosPoint.y = this._posPoint.y-this._stepLengthY;
		}else if(dir == 2){//LEFT
			this._newPosPoint.x = this._posPoint.x-this._stepLengthX;
			this._newPosPoint.y = this._posPoint.y+this._stepLengthY;	
		}else if(dir == 3){//RIGHT
			this._newPosPoint.x = this._posPoint.x+this._stepLengthX; 
			this._newPosPoint.y = this._posPoint.y-this._stepLengthY;
		}


		this._sprite.runAction(cc.MoveTo.create(this._stepTime, this._newPosPoint));

		var sdiff = cc.p(0, 0);
		sdiff.x = this._newPosPoint.x * 0.15;
		sdiff.y = this._newPosPoint.y * 0.15;

		var smap = SMap.getinstance();
		smap.heroMoveByHeroPosition(sdiff, 1);
		
	},
	
	
	this.moveOneAction = function(dir){
		var box = new Array(2,3,0,1);
		this._dirAction = cc.RepeatForever.create(this._spriteActions[box[dir]]);
		this._sprite.runAction(this._dirAction);
	},
	this.stopOneAction = function(){
		this._sprite.stopAction(this._dirAction);
	},
	
	this.isWalking = function(){
		return this._walking;
	},
	
	//执行路线
	this.runRoute = function(){
		this._stepCnt--;
		this._sprite.stopAction(this._dirAction);
		this.moveOneStep(this._route[this._stepCnt]);
		var self = this;
		if(this._stepCnt!=0)
		 	setTimeout(function(){self.runRoute();},1000);
		if(this._stepCnt==0){
			setTimeout(function(){self._walking=false;},1000);
		}
	}
	
	//根据路线进行运动
	this.moveByRoute = function(route,cnt){
		this._route = route;
		this._routeSize = cnt;
		this._walking = true;
		this._stepCnt = cnt;
		this.runRoute();
	},
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







