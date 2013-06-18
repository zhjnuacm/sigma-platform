function Mediator() {
	this._childScene;
	this._heroPanel;
	this._systemFunction;
	this._mainLayer;
	this._size;
	this._tipsManage;
	this._input;
	this._npcLayer;
	this._npc1;
	this._npcFactory;

	this.init = function(mainLayer) {
		
		//发送数据给后台
		/*this._map.tranMaptoblackground();*/
		//传送地图配置信息你 
	    /*this._map.transformMapConfToNpcController();*/

	    GLOBAL.mainLayer = mainLayer;
		
		this._size = cc.Director.getInstance().getWinSize();
		// get the main layer
		this._mainLayer = mainLayer;
		
		//tipsManage
		this._tipsManage = TipsManage.create();
		this._mainLayer.addChild(this._tipsManage, TIPS_MANAGE_TAG);



		//游戏主场景
		this._childScene = ChildScene.create();
		this._mainLayer.addChild(this._childScene);
		
		
		this._heroPanel = HeroPanel.create("我是帅锅别逼我", 75, 30000);
	//	cc.log(this._size);
//		cc.log(this._heroPanel._width + " " + this._heroPanel._heigth);
		this._heroPanel.setPosition(cc.p(3, this._size.height - this._heroPanel._height - 3));
		this._mainLayer.addChild(this._heroPanel);
		
	   //其它用户
	/*	var aaa = User.create(123456);
		this._map.addChild(aaa);
	*/
		
	    //小地图
		var smap = SMap.create(s_mapPath);
		this._mainLayer.addChild(smap._content, 5);
		smap.mapMoveByHeroPosition(this._childScene.getHeroWorldPosition());
		
		/*
	    // npc add npclayer into maplayer
		//this._npcLayer = cc.Layer.create();
		//this._npc1 = Npc.create();
		//this._npc1.setPriority(this._map.getTouchPriority() - 1);
		//this._npcLayer.addChild(this._npc1);
		//this._map.addChild(this._npcLayer);
		//alert(this._mainLayer.getTouchPriority() + "    " + (this._map.getTouchPriority() - 1));
		
		//alert(this._npcLayer.getTouchPriority());
		
        */

		GLOBAL.inputD = InputPanel.create();
		this._mainLayer.addChild(GLOBAL.inputD, 2);

	    //好友列表，给一个开关按钮

		var crButton = cc.MenuItemImage.create(s_friend_menu, s_friend_menu, s_friend_menu, this.ShowFriend, this);
		var menu = cc.Menu.create(crButton);
		menu.setPosition(cc.p(this._size.width - 10, 520));
		this._mainLayer.addChild(menu);
		return true;
	},


    //Jopix tab键显示大地图
	this.showBigMap = function () {
	    var bmap = BMap.getInstance();
	    if (bmap.isOnShow()) {
	        bmap.closeDig();
	    } else {
	        this._mainLayer.addChild(bmap._dig, 6);
	        bmap._dig.setTouchPriority(this._childScene._map.getTouchPriority() - 1);
	        bmap.showPoint('map1', this._childScene.getHeroWorldPosition());
	    }
	}

    //Jopix 在大体图中显示位置
	this.markPointInBigMap = function (mapID, position) {
	    var bmap = BMap.getinstance();
	   // bmap.showPoint(mapID, Position);
	}
    
	
////////////////////////////循环刷新	
	this.mainloop=function(dt) {
	    this._childScene.loopTime();
	},
	
////////////////////////////按键响应
	this.onKeyDown = function(key){
	    if (key == 9) {
	    		this.showBigMap();
	        return;
	    }
	    this._childScene.onKeyDown(key);
	},
///////////////////////////鼠标响应
	this.onTouchBegan = function(event) {
		
		this._childScene.onTouchBegan(event);
	},

    this.onTouchMoved = function(event) {
		
    },
    this.onTouchEnd =  function(event) {	
    };

	this.ShowFriend = function () {
	    var friendList = FriendList.getInstance();
	    friendList.show(this._mainLayer);
	};
}

Mediator.create = function(mainLayer) {
	var ret = new Mediator();
	if (ret && ret.init(mainLayer)) return ret;
	return null;
};
