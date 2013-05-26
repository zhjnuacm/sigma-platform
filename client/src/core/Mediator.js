//var inputD;
//var friendList;

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


	this.init = function(mainLayer) {
		this._size = cc.Director.getInstance().getWinSize();
		// get the main layer
		this._mainLayer = mainLayer;

		//tipsManage
		this._tipsManage = TipsManage.create();
		this._mainLayer.addChild(this._tipsManage, TIPS_MANAGE_TAG);


	    //С��ͼ
		var smap = SMap.create(cc.p(5, 6), 'map1');
		this._mainLayer.addChild(smap._content, 2);

		// big map
		this._map = Map.create(cc.p(5, 6), 'map1');
		this._mainLayer.addChild(this._map);


	   //  npc add npclayer into maplayer
		this._npcLayer = cc.Layer.create();
		this._npc1 = Npc.create();
		this._npcLayer.addChild(this._npc1);
		this._map.addChild(this._npcLayer);
		

		this._hero = Hero.create(
			cc.p(this._map.tilePositionToWorldLocation(cc.p(5,6)) + this._map.getPosition())
			);

		this._mainLayer.addChild(this._hero.getSprite());

		//var mes = new Message();
		//mes.init2("�ҽ�����ʺ�ø��˺ÿ��İ���̾���أ�����˭�ܷ����ҵ�ϲ�á�", 26);
		//var tb = TextBox.create(mes, 1);
		//this._mainLayer.addChild(tb);
		//tb.setPosition(cc.p(400, 300));

		inputD = InputPanel.create();
		this._mainLayer.addChild(inputD, 2);
		inputD.adaptPoistion();

	    //�����б�
		//friendList = FriendList.create();
		//this._mainLayer.addChild(friendList);

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




