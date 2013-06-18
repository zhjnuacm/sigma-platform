var actionList = [];

actionList.push(
		{
			'x' : 980,
			'y' : 980
		},
		{
			'x' : 1000,
			'y' : 1000
		},
		{
			'x' : 800,
			'y' : 800
		},
		{
			'x' : 700,
			'y' : 700
		},
		{
			'x' : 700,
			'y' : 700
		}
		);
/**
 * [ChildScene 子场景类]
 * @author Saisa
 * 
 * 对外接口
 * ChildScene ChildScene.create();		//创建子场景类实例
 * CCPoint getHeroTilePosition();		//获取英雄在TILE地图中的坐标
 * CCPoint getHeroWorldPosition();		//获取英雄在屏幕中的实际坐标
 * 
 */
var ChildScene = cc.Layer.extend({

	//layer中的元素内容
	_zOrder:null,//该layer中所有节点的层次度
	_hero: null,
	_map: null,
	_clickTile:null,//点击tile的时显示的精灵	
	_clickAction:null,//该精灵的动画
	
	_users: null,//其他用户
	
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
		
		//this._zOrder["_npc"] = 30;
		
		//map
		this._map = Map.create('map1');
		this.addChild(this._map,this._zOrder["_map"]);
		this._npcFactory = NpcFactory.create(this._map,'map1');
		//hero
		this._hero = Hero.create(this._map.tilePositionToWorldLocation(cc.p(6,1)));
		this.addChild(this._hero.getSprite(),this._zOrder["_hero"]);

		//添加其他用户
		this._users = new Array();
		
		for(var i = 0; i < userData.length; ++i)
		{
			//cc.log(i);
			var user = User.create(userData[i]);
			this._users.push(user);
			this._map.addChild(this._users[i]);
		}
		
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
		var winSize=cc.Director.getInstance().getWinSize();
		var screenCenter = cc.p(winSize.width/2.0,winSize.height/2.0);
		this.setPosition(cc.pSub(screenCenter,this._hero.getSprite().getPosition()));
		
		this.schedule(this.myUserMove, 2.0);//定时让其他用户移动
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
		this.setPosition(cc.pSub(screenCenter, nowWorldPos));
		var smap = SMap.getInstance();
		smap.mapMoveByHeroPosition(this.getHeroWorldPosition());
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
		
		var nowTilePos = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
		//镜头跟踪
		//this.setSceneScrollPosition();
		
		//角色移动时判断是否踩到特殊格子
		if(this._hero.checkIsWalking()){
			this.setSceneScrollPosition();
		}else{
			
			if(this._map.checkConvey(nowTilePos)){
				//this._conveyBg.setVisible(true);
			//	cc.log("good?");
				var nowTilePos = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
			 	this._hero.getSprite().setPosition(this._map.tilePositionToWorldLocation(this._map.doConvey(nowTilePos)));
				var winSize=cc.Director.getInstance().getWinSize();
		    	var screenCenter = cc.p(winSize.width/2.0,winSize.height/2.0);
				this.setPosition(cc.pSub(screenCenter,this._hero.getSprite().getPosition()));
				
	
			}
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
		

		var toTilePosition = this._map.locationToTilePosition(cc.pSub(event.getLocation(),this.getPosition()));
		if(this._clickAble && this._map.checkTileInMap(toTilePosition)){//防止暴力点击
			this._clickAble=false;
			var targetPos = this._map.tilePositionToWorldLocation(toTilePosition);
		
			
			//点击格子动画
	      	var clickCellPos = this._map.tilePositionToWorldLocation(toTilePosition);
	      	
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
				if(this._map.checkOrCalRoute(start,terminal)){
					this._hero.moveByRoute(this._map.getRouteContent(),this._map.getRouteSize());
				}	
			}
	
		}
		
	},

    onTouchMoved : function(event) {
        //this._map.mapDragged(event);
    },
    
    onTouchEnd :  function(event) {	
    	
    },
    
	//判断hero当前场景是否有新用户登录
    checkNewUser: function(position) {
    	var self = this;
    	
    	$.ajax({
    		type : "GET",
    		url : getNewUserDataUrl(position),
    		success : function(data) {
    			self.addNewUser(data);
    		}
    	});
    },
    
    //添加新用户
    addNewUser: function(data) {
    	
    },
    
    userMove: function () {
        var self = this;
        $.ajax({
            type: "POST",
            dataType: "json", 
            timeout: 80000,
            data:{time:"80"}, 
            url: genPullMessageUrl(),
            success: function (data, textStatus) {
                //	cc.log(data);
            }, 
        });
    },
    
    //随机获取位置，让其他用户移动
    myUserMove: function(){
    	var tot = actionList.length;
    	
    	for(var i = 0; i < this._users.length; ++i)
    	{
    		var id = getRandomNum(0, tot);
    		if(id != tot){
    			this._users[i].setPosition(actionList[id]);
    		}
    	}
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