/*
	显示用户任务完成情况
	author: conlan
	date: 2014.05.09
*/
var COMPLETED = 0; //完成
var UNCOMPLETED = 1; //未完成

var UserTasksData = [];
UserTasksData.push(
{
'name': "test_1",
'accepted_tasks': [
{"id":"1","status":COMPLETED},
{"id":"2","status":COMPLETED},
{"id":"3","status":COMPLETED},
{"id":"4","status":COMPLETED},
{"id":"5","status":UNCOMPLETED},
{"id":"6","status":UNCOMPLETED},
{"id":"7","status":UNCOMPLETED},
{"id":"8","status":COMPLETED},
{"id":"9","status":COMPLETED},
{"id":"10","status":COMPLETED}]
},
{
'name': "test_2",
'accepted_tasks': [
{"id":"1","status":COMPLETED},
{"id":"2","status":COMPLETED},
{"id":"3","status":COMPLETED},
{"id":"4","status":COMPLETED},
{"id":"5","status":UNCOMPLETED},
{"id":"6","status":UNCOMPLETED},
{"id":"7","status":COMPLETED}]
},
{
'name': "test_3",
'accepted_tasks': [
{"id":"1","status":COMPLETED},
{"id":"2","status":COMPLETED},
{"id":"3","status":COMPLETED},
{"id":"4","status":COMPLETED},
{"id":"5","status":COMPLETED},
{"id":"6","status":COMPLETED},
{"id":"7","status":COMPLETED},
{"id":"8","status":COMPLETED},
{"id":"9","status":COMPLETED}]
},
{
'name': "test_4",
'accepted_tasks': [
{"id":"1","status":COMPLETED},
{"id":"2","status":COMPLETED},
{"id":"3","status":COMPLETED},
{"id":"4","status":COMPLETED},
{"id":"5","status":COMPLETED},
{"id":"6","status":COMPLETED},
{"id":"7","status":COMPLETED},
{"id":"8 ","status":COMPLETED}]
},
{
'name': "admin",
'completed_tasks': [
{"id":"1","status":COMPLETED},
{"id":"2","status":COMPLETED},
{"id":"3","status":COMPLETED},
{"id":"4","status":COMPLETED}]
}
);
var udata = [];
udata.push(
	{
		'name': 'jopix',
		'photo' : 'client/res/user/1.png'
	},
	{
		'name': 'nanke',
		'photo' : 'client/res/user/2.png'
	},
	{
		'name': 'vainner',
		'photo' : 'client/res/user/3.png'
	},
	{
		'name': 'jopix',
		'photo' : 'client/res/user/1.png'
	},
	{
		'name': 'nanke',
		'photo' : 'client/res/user/2.png'
	},
	{
		'name': 'vainner',
		'photo' : 'client/res/user/3.png'
	},
	{
		'name': 'nanke',
		'photo' : 'client/res/user/2.png'
	},
	{
		'name': 'vainner',
		'photo' : 'client/res/user/3.png'
	}
);

var MenuList = cc.Layer.extend({
    friendView: null,
    _itemNum: null,
    _addDig: null,
    _dataScoure: null,
    _cellSize:null,
    _bg: null,

    init: function (dataScoure, contentSize, cellSize, pos) {
        if (!this._super()) {
            return false;
        }
        this._dataScoure = dataScoure;
        this._cellSize = cellSize;
        this.setItemNum(dataScoure.length);

        //初始化主标签
        //var item = cc.MenuItemSprite.create(normalImage, SelectedImage, 'callback', this);
        var closeItem = cc.MenuItemImage.create(s_dlg_close_normal, s_dlg_close_select, this.onCloseMyself, this);
        closeButton = cc.Menu.create(closeItem);
        closeButton.setPosition(cc.p(pos.x + contentSize.width - 10, pos.y + contentSize.height - 10));
        this.addChild(closeButton, 1);

        //初始化朋友列表
        var colorLayer = cc.LayerColor.create(cc.c4(255,255,255,255), contentSize.width, contentSize.height);
        colorLayer.setPosition(pos);
        colorLayer.setTouchPriority(100);
        this.addChild(colorLayer, 0);

        this.friendView = myTableView.create(this, contentSize);
        this.friendView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.friendView.setPosition(pos);
        this.friendView.setDelegate(this);
        this.friendView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.friendView.setTouchPriority(-128);
        this.addChild(this.friendView, 2);
        this.friendView.setDataSource(this);
        this.friendView.reloadData();
        return true;
    },

    scrollViewDidScroll: function (view) {
    	cc.log("scroll");
    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        //暂无点击事件
    	cc.log(cell._name);
    	this.showCheck(cell._name);
        return true;
    },
    
    cellSizeForTable: function (table) {
        return this._cellSize;
    },

    tableCellAtIndex: function (table, idx) {

        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var node = this._dataScoure[strValue];
        if (!cell) {
            cell = new ItemCellView();
            cell.init(node);
            cell.addChild(node);
        } else {
            cell.removeAllChildren(false);
            node.removeFromParent(false);
            cell.addChild(node);
        }

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this._itemNum;
    },

    setItemNum: function (num) {
        this._itemNum = num;
    },

    rushList: function () {
        this.setItemNum(this._dataScoure.length);
        this.friendView.reloadData();
    },

    setPosition: function (pos) {
        //this._super(pos);
        this.friendView.setPosition(pos);
    },
    onCloseMyself: function() 
    {
        this.removeFromParent(true);
    },
   	showCheck: function(name) {

   		
   	}
});


/**
 * @ Jopix--
 * @ 2013年6月5日 22:41:27
 * @ 
 */
MenuList.create = function (dataScoure, contentSize, cellSize, pos) {
    var retObj = new MenuList();
    if (retObj && retObj.init(dataScoure, contentSize, cellSize, pos)) {
        return retObj;
    }
    return null;
};


TaskCheck = function() {

	this.init = function (pos) {
		var data = new Array();
		var contenSize = cc.SizeMake(130, 300);
		var cellSize = cc.SizeMake(100, 40);

		for(var i = 0; i < udata.length; ++i) {
			var node = cc.Node.create();
			node.setContentSize(cellSize);

			var photo = cc.Sprite.create(udata[i].photo);
			photo.setScale(0.5, 0.5);
			photo.setPosition(cc.p(20, 20));

			node.addChild(photo);
        	var label1 = cc.LabelTTF.create(userData[i >= 5 ? i - 5 : i].name, s_yahei, 12);
        	label1.setAnchorPoint(cc.p(0, 0));
        	label1.setColor(cc.c3(20 * i, 15 * i, 10 * i));
        	label1.setPosition(cc.p(50, 5));
        	label1.setTag(1);
        	node.addChild(label1);

        	data[i] = node;
		}

		var list = MenuList.create(data, contenSize, cellSize, pos);
		GLOBAL.mainLayer.addChild(list, 100);
		return true;
	}
}

TaskCheck.create = function(pos) {
	var ret = new TaskCheck();
	if(ret && ret.init(pos)) {
		return ret; 
	}
	return null;
};