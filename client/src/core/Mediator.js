var inputD;
var friendList;

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
	this._npcLayer;
	this._npc1;


	//控制hero和map移动的部分
	this._start;
	this._terminal;
	this._route;
	this._routeSize;
	this._stepCnt;
	this._walkMargin;
	this._squareSize;
	this._walking;

	this.init = function(mainLayer) {
		this._size = cc.Director.getInstance().getWinSize();
		// get the main layer
		this._mainLayer = mainLayer;

		//tipsManage
		this._tipsManage = TipsManage.create();
		this._mainLayer.addChild(this._tipsManage, TIPS_MANAGE_TAG);

	    //小地图
		var smap = SMap.create(cc.p(5, 6), 'map1');

		this._mainLayer.addChild(smap._content, 2);
		
		
		
		// map
		this._map = Map.create(cc.p(5,6),'map1');
		this._mainLayer.addChild(this._map);

	    // npc add npclayer into maplayer
		this._npcLayer = cc.Layer.create();
		this._npc1 = Npc.create();
		this._npc1.setPriority(this._map.getTouchPriority() - 1);
		this._npcLayer.addChild(this._npc1);
		this._map.addChild(this._npcLayer);
		//alert(this._mainLayer.getTouchPriority() + "    " + (this._map.getTouchPriority() - 1));
		
		//alert(this._npcLayer.getTouchPriority());
		
		//hero
		var k = cc.p(0,0);

		k.x = this._map.tilePositionToWorldLocation(cc.p(5,6)).x+this._map.getPosition().x;
		k.y = this._map.tilePositionToWorldLocation(cc.p(5,6)).y+this._map.getPosition().y;

		this._hero = Hero.create(k);
		this._mainLayer.addChild(this._hero.getSprite());
        //�����
		
		/*var mes = new Message();
		mes.init2("�ҽ�����ʺ�ø��˺ÿ��İ���̾���أ�����˭�ܷ����ҵ�ϲ�á�", 26);
		var tb = TextBox.create(mes, 1);
		this._mainLayer.addChild(tb);
		tb.setPosition(cc.p(400, 300));*/

		/**/
		inputD = InputPanel.create();
		this._mainLayer.addChild(inputD, 2);
		inputD.adaptPoistion();
		
	    var friend = FriendList.create(cc.c4(236,236, 236, 255), 180, 288);
	    friend.setPosition(cc.p(this._size.width - 200, 220));
	    this._mainLayer.addChild(friend);
		
		
		friendList = FriendList.create();
		this._mainLayer.addChild(friendList);

		return true;
	},
    
/////////////////////////////////////////MAP 和 HERO的移动控制
	//执行路线
	this.runRoute=function(){
		this._stepCnt--;
		this._hero.stopOneAction();
		var nowPos = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
		if(this.shouldHeroMove(nowPos,this._route[this._stepCnt])){
			this._hero.moveOneStep(this._route[this._stepCnt]);
			this._hero.moveOneAction(this._route[this._stepCnt]);
		}else{
			this._map.moveOneStep(this._route[this._stepCnt]);
			this._hero.moveOneAction(this._route[this._stepCnt]);
		}
		var self = this;
		if(this._stepCnt!=0)
		 	setTimeout(function(){self.runRoute();},1000);
		if(this._stepCnt==0){
			setTimeout(function(){
				self._hero.stopOneAction();
				self._walking=false;
				},1000);
		}
	},
		///判断是hero还是map移动
	this.shouldHeroMove=function(position,dir){
		cc.log(position);//坐标
		if(
			(position.x>=this._walkMargin &&  position.x<=this._squareSize-this._walkMargin) 
			&&(position.y>=this._walkMargin &&  position.y<=this._squareSize-this._walkMargin)
			)return false;
		else if((position.x>=this._walkMargin &&  position.x<=this._squareSize-this._walkMargin)&&(dir ==2 || dir ==3))
			return false;
		else if((position.y>=this._walkMargin &&  position.y<=this._squareSize-this._walkMargin)&&(dir ==0 || dir ==1))
			return false;
		else 
			return true;
	},
	this.isWalking=function(){
		return this._walking;
	},
	this.moveHeroAndMap=function(){
		this._walking = true;
		this.runRoute();
	},
	this.moveHeroByKey=function(dir){
		this._hero.moveOneStep(dir);
		this._hero.moveOneAction(dir);
		var self = this;
		setTimeout(function(){
			self._hero.stopOneAction();
			self._walking=false;
		},1000);		
	},
	
////////////////////////////按键响应
	this.onKeyDown = function(key){
		//碰撞冲突还没写，之后在地图里面写
		if(!this.isWalking()){
			this._hero.stopOneAction();
			this._walking = true;
			switch(key){
				case 38:
					this.moveHeroByKey(0);
				break;
				case 40:
					this.moveHeroByKey(1);
				break;
				case 37:
					this.moveHeroByKey(2);
				break;
				case 39:
					this.moveHeroByKey(3);
				break;
			}
		}
	},
///////////////////////////鼠标响应
	this.onTouchBegan = function(event) {
		
		
		var toTilePosition = this._map.locationToTilePosition(event.getLocation());
		var moveAble = this._map.isMoveAble(toTilePosition);
		this._walkMargin = this._map.getWalkMargin();
		this._squareSize = this._map.getSquareSize();
		this._start = this._map.locationToTilePosition(this._hero.getSprite().getPosition());
		this._terminal = this._map.locationToTilePosition(event.getLocation());
		cc.log("from  ("+this._start.y+","+this._start.x+") to ("+ this._terminal.y+","+this._terminal.x+")");
		if(this._map.isMoveable(this._start,this._terminal) && !this.isWalking())
		{
			this._map.calMoveRoute(this._start,this._terminal);
			this._routeSize =this._stepCnt= this._map.getRouteSize();
			this._route = this._map.getRouteContent();
			this.moveHeroAndMap();

		}
		else this._tipsManage.addTip(moveAble);
	},

    this.onTouchMoved = function(event) {
        //this._map.mapDragged(event);
    },
    
    this.onTouchEnd =  function(event) {	
    };
}

Mediator.create = function(mainLayer) {
	var ret = new Mediator();
	if (ret && ret.init(mainLayer)) return ret;
	return null;
};
