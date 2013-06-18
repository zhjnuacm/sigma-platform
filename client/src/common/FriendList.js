/**
 * @ Jopix  滚动列表单元格
 * @ 2013年6月15日 12:27:07
 * @ [action] 点击时时间响应在这个函数里面
 */

var SeachFriendCell = cc.TableViewCell.extend({
    _fData: {
        'name': null,
        'place': null,
        'photo': null,
    },
    _name: null,
    _place: null,
    _photo: null,

    draw: function (ctx) {
        this._super(ctx);
        cc.renderContext.strokeStyle = "rgba(220,220,220,1)";
        cc.renderContext.lineWidth = "1";
        cc.drawingUtil.drawLine(cc.p(10, 0), cc.p(170, 0));
    },

    init: function (idx) {
        this.getDataFromIndex(idx);
        this.setIdx(idx);

        this._photo = cc.Sprite.create(this._fData.photo);
        this._photo.setPosition(cc.p(25, 25));
        this.addChild(this._photo);

        this._name = cc.LabelTTF.create(this._fData.name, s_yahei, 12);
        this._name.setAnchorPoint(cc.p(0, 0));
        this._name.setColor(cc.c3(30, 30, 30));
        this._name.setPosition(cc.p(60, 30));

        this.addChild(this._name);

        this._place = cc.LabelTTF.create(this._fData.place, s_yahei, 12);
        this._place.setColor(cc.c3(140, 140, 140));
        this._place.setPosition(cc.p(60, 8));
        this._place.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._place);

        return true;
    },

    //从数据库读取第idx个好友的信息
    getDataFromIndex: function (idx) {
        this._fData.place = friendData[idx].place;
        this._fData.name = friendData[idx].name;
        this._fData.photo = friendData[idx].photo;
        this._fData.mood = friendData[idx].mood;
    },

    updataFromIndex: function (idx) {
        this.getDataFromIndex(idx);
        this._name.setString(this._fData.name);
        this._place.setString(this._fData.place);
        this._photo.initWithFile(this._fData.photo);
    },

    send: function () {
        alert(this._fData.name + ' ' + this._fData.mood);
    },

    getData: function () {
        return this._fData;
    },

    action: function () {
        alert(this._fData.name);
    }
});



/**
 * @ Jopix  添加好友界面
 * @ 2013年6月15日 12:27:07
 * @ 在这里输入名字向后台搜索出用户列表展示在滚动列表里面。请@cchun在此添加与后台响应函数返回js数组
 */
//临时定义成全局
var sself;

var FriendAddView = function () {

    this._seachRueslt;
    this._addDig;
    this._box;
    this._root;
    this.jsonData = [];
    this.init = function () {

        //this._root = cc.p(cc.Director.getInstance().getWinSize().width - 380, 250);
        this._root = cc.p(0, 0);
        this._addDig = DialogView.create(220, 360, this._root);
        var fseachs = cc.Sprite.create(s_Friendseach);
        fseachs.setPosition(cc.p(90, 340));
        this._addDig.addChild(fseachs);

        this._box = cc.EditBox.create(cc.size(138, 16));
        this._box.setText("输入用户名");
        this._box.setFontColor(cc.c3(200, 200, 200));
        this._box.setPosition(cc.p(25, 330));
        this._box.setBgClr(cc.c3(245, 245, 245));
        this._box.setFontSize(12);
        sself = this;
        this._box.setFunction("keydown", function (event) {
         
            if (event.keyCode == 13)
                sself.showResult();
            //响应函数
        });

        this._box.setFunction("click", function (event) {
            sself._box.setText("");
            sself._box.setColor(cc.c3(30, 30, 30));
            sself._box.setBgClr(cc.c3(255, 255, 255));
        });
        this._addDig.addChild(this._box);
        return true;
    } 
    
    
    this.showResult = function () {
        var sname = this._box.getText();
        //=====
        //去数据库抓取搜索到的用户信息给我，保存在jsonData数组里面
        this.getFriendOfSearch(sname);
       /* var jsonData = [
            {
                'name': 'Jopix0',
                'place': '教室吹水',
                'photo': 'client/res/user/user_1.jpg',
                'mood': '好不想学习，想打怪，其带菜',
            },
            {
                'name': 'nanke1',
                'place': '宿舍睡觉',
                'photo': 'client/res/user/user_2.jpg',
                'mood': '好不想学习，想打怪，其带菜',
            }
        ];*/

        //===
       // cc.log("嘿嘿" + this.jsonData.length);
        
        if (this.jsonData.length > 0) {
            this._showResult = ScrollList.create(200, 320, cc.p(this._root.x + 10, this._root.y + 10), SeachFriendCell, 50, this.jsonData);
            this._addDig.addChild(this._showResult);
        } else {
            this._showResult = cc.Layer.create();
            var mes = cc.LabelTTF.create("未找到该用户", "Microsoft YaHei", 12);
            this._showResult.addChild(mes);
            this._addDig.addChild(this._showResult);
        }
    }
    
    this.getFriendOfSearch = function(name) {
		var self = this;
		$.ajax({
			type : "POST",
			async: false,
			dataType : "json",
			url : genGetFriendOfSearchUrl(name),
			success : function(data, textStatus) {
				this.jsonData = data;
			//	cc.log("haha:" + this.jsonData);
			//	cc.log("嘿嘿1111" + this.jsonData.length);
			}
		});
	}

    this.setTouchPriority = function(num){
        this._showResult.setTouchPriority(num);
    }
    this.getDig = function () {
        return this._addDig;
    }
}


FriendAddView.create = function(){
    var ret = new FriendAddView();
    if (ret && ret.init())
        return ret;
    return null;
}



/**
 * @ Jopix  好友列表对于用户的菜单
 * @ 2013年6月7日 01:18:32
 */

var FriendMenu = cc.LayerColor.extend({
    _userID: null,
    _fData: null,
    _touchBegan: null,
    _width: null,
    _height: null,


    init: function (fData) {
        this._width = 260;
        this._height = 133;
        this._super(cc.c4(255, 255, 255, 200), this._width, this._height);
        this._fData = fData;
        this._touchBegan = false;

        //初始化菜单
        var homeButton = cc.MenuItemImage.create(s_friend_menu_home, s_friend_menu_home2, s_friend_menu_home2, this.home, this);
        var chatButton = cc.MenuItemImage.create(s_friend_menu_chat, s_friend_menu_chat2, s_friend_menu_chat2, this.chat, this);
        var mailButton = cc.MenuItemImage.create(s_friend_menu_mail, s_friend_menu_mail2, s_friend_menu_mail2, this.mail, this);
        var showButton = cc.MenuItemImage.create(s_friend_menu_show, s_friend_menu_show2, s_friend_menu_show2, this.show, this);
        var pkButton = cc.MenuItemImage.create(s_friend_menu_pk, s_friend_menu_pk2, s_friend_menu_pk2, this.pk, this);

        // 将所有的按钮加到菜单容器里面
        var menu = cc.Menu.create(homeButton, chatButton, mailButton, showButton, pkButton);
        menu.alignItemsHorizontallyWithPadding(2);
        menu.setPosition(cc.p(this._width - 70, 10));
        this.addChild(menu);

        var photo = cc.Sprite.create(this._fData.photo);
        photo.setPosition(cc.p(30, 105));

        this.addChild(photo);

        var n = cc.LabelTTF.create(this._fData.name, s_yahei, 12);
        n.setColor(cc.c3(30, 30, 30));
        n.setAnchorPoint(cc.p(0, 0));
        n.setPosition(cc.p(60, 110));
        this.addChild(n);

        var p = cc.LabelTTF.create(this._fData.place, s_yahei, 12);
        p.setColor(cc.c3(30, 30, 30));
        p.setAnchorPoint(cc.p(0, 0));
        p.setPosition(cc.p(60, 90));
        this.addChild(p);

        var m = cc.LabelTTF.create(this._fData.mood, s_yahei, 12);
        m.setColor(cc.c3(30, 30, 30));
        m.setAnchorPoint(cc.p(0, 0));
        m.setPosition(cc.p(60, 70));

        this.addChild(m);
        return true;
    },

    onEnter: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -14, true);
        this._super();
    },

    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },

    onTouchBegan: function (touch, event) {
        var _root = this.getPosition();
        var pt = touch.getLocation();
        if (pt.x > _root.x && pt.x < _root.x + this._width && pt.y > _root.y && pt.y < _root.y + this._height) {
            this._touchBegan = true;
            return true;
        }

        this.removeFromParent(true);
        return false;
    },

    onTouchEnded: function (touch, event) {
        if (this._touchBegan) {
            this._touchBegan = false;

        }
    },

    show: function () {
        //这里自定以函数体

        this.removeSelf();
    },

    chat: function () {
        GLOBAL.chatD = ChatPanel.create(this._fData.name, cc.p(this.getPosition().x + 60, this.getPosition().y + 20), cc.p(30, 50), 0);
        this.removeSelf();
    },

    home: function () {
        //这里自定以函数体


        this.removeSelf();
    },

    mail: function () {
        //这里自定以函数体

        this.removeSelf();
    },

    pk: function () {
        //这里自定以函数体

        this.removeSelf();
    },

    removeSelf: function () {
        this.removeFromParent(true);
    }
});


FriendMenu.create = function (fData) {
    var ret = new FriendMenu();
    if (ret && ret.init(fData)) {
        return ret;
    }
    return null;
};


//===
//用于测试
var friendData = [];
//==

/**
 * @ Jopix  好友列表单元格
 * @ 2013年6月5日 22:41:27
 */
var FriendViewCell = cc.TableViewCell.extend({

    _fData: {
        'name': null,
        'place': null,
        'photo': null,
        'mood': null,
    },
    _name: null,
    _place: null,
    _photo: null,

    draw: function (ctx) {
        this._super(ctx);
        cc.renderContext.strokeStyle = "rgba(220,220,220,1)";
        cc.renderContext.lineWidth = "1";
        cc.drawingUtil.drawLine(cc.p(10, 0), cc.p(170, 0));
    },

    init: function (idx) {
    	
        this.getDataFromIndex(idx);
        this.setIdx(idx);

        this._photo = cc.Sprite.create(this._fData.photo);
        this._photo.setPosition(cc.p(25, 25));
        this.addChild(this._photo);

        this._name = cc.LabelTTF.create(this._fData.name, s_yahei, 12);
        this._name.setAnchorPoint(cc.p(0, 0));
        this._name.setColor(cc.c3(30, 30, 30));
        this._name.setPosition(cc.p(60, 30));

        this.addChild(this._name);

        this._place = cc.LabelTTF.create(this._fData.place, s_yahei, 12);
        this._place.setColor(cc.c3(140, 140, 140));
        this._place.setPosition(cc.p(60, 8));
        this._place.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._place);

        return true;
    },

    //从数据库读取第idx个好友的信息
    getDataFromIndex: function (idx) {
        this._fData.place = friendData[idx].place;
        this._fData.name = friendData[idx].name;
        this._fData.photo = friendData[idx].photo;
        this._fData.mood = friendData[idx].mood;
    },

    updataFromIndex: function (idx) {
        this.getDataFromIndex(idx);
        this._name.setString(this._fData.name);
        this._place.setString(this._fData.place);
        this._photo.initWithFile(this._fData.photo);
    },

    send: function () {
        alert(this._fData.name + ' ' + this._fData.mood);
    },

    getData: function () {
        return this._fData;
    }
});


/**
 * @ Jopix  好友列表层
 * @ 2013年6月5日 22:41:27
 * @ 由于源码关系，只能以视角左下角为（0，0）
 */

var FriendListLayer = cc.Layer.extend({
    friendView: null,
    _root: null,
    _box: null,
    _friendNum: null,
    _isShow: null,
    _addDig: null,

    init: function () {
        if (!this._super()) {
            return false;
        }
        this.getMyFriendInfo();
        
        this._root = cc.p(cc.Director.getInstance().getWinSize().width - 174, 220);
        this._isShow = true;
        this.initBorder(180, 288);
        this.setfriendNum(friendData.length);


        //初始化主标签
        //var item = cc.MenuItemSprite.create(normalImage, SelectedImage, 'callback', this);

        //初始化朋友列表
        this.friendView = myTableView.create(this, cc.SizeMake(180, 230));
        this.friendView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.friendView.setPosition(cc.p(this._root.x, 250));
        this.friendView.setDelegate(this);
        this.friendView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.friendView, 2);
        this.friendView.setDataSource(this);

        //初始化搜索

        var fseach = cc.Sprite.create(s_Friendseach);
        fseach.setPosition(cc.p(this._root.x + 85, this._root.y + 14));
        this.addChild(fseach);

        this._box = cc.EditBox.create(cc.size(138, 16));
        this._box.setText("搜索");
        this._box.setFontColor(cc.c3(200, 200, 200));
        this._box.setPosition(this._root.x + 14, this._root.y + 6);
        this._box.setBgClr(cc.c3(245, 245, 245));
        this._box.setFontSize(12);

        this._box.setFunction("keydown", function (event) {
            if (event.keyCode == 13)
                friendList.sendMessage();

            //响应函数


        });
        this._box.setFunction("click", function (event) {
            friendList._box.setText("");
            friendList._box.setColor(cc.c3(30, 30, 30));
            friendList._box.setBgClr(cc.c3(255, 255, 255));
        });
        this.addChild(this._box);


        //添加好友列表相关菜单按钮
        var addButton = cc.MenuItemImage.create(s_friend_add, s_friend_add2, this.addFriend, this);
        addButton.setPosition(cc.p(this._root.x + 160, this._root.y + 275));
        //var showButton = cc.MenuItemImage.create(s_friend_add, s_friend_add, s_friend_add, this.show, this);
        //showButton.setPosition(cc.p(this._root.x + 5, this._root.y + 270));
        // 将所有的按钮加到菜单容器里面
        var tmenu = cc.Menu.create(addButton);
        tmenu.setPosition(cc.p(0, 0));
        this.addChild(tmenu);

        /*this.setfriendNum(5);
        this.friendView.insertCellAtIndex(5);
        this.friendView.reloadData();*/
        
        return true;
    },

    /**
     * get my friend infomation
     */
	getMyFriendInfo : function() {
		var self = this;
		$.ajax({
			type : "POST",
			async: false,
			dataType : "json",
			url : genGetFriendInfoUrl(),
			success : function(data, textStatus) {
				friendData = data;
				//cc.log(friendData);
			}
		});
	},
    
    initBorder: function (w, h) {

        var bg = cc.LayerColor.create(cc.c4(225, 225, 225, 255), w, h);
        var top = cc.Sprite.create(s_Friend_t);
        top.setPosition(cc.p(92, h - 2));
        bg.addChild(top);

        var bot = cc.Sprite.create(s_Friend_b);
        bot.setPosition(cc.p(92, 0));
        bg.addChild(bot);

        //var rig = cc.Sprite.create(s_Friend_r);
        //rig.setAnchorPoint(cc.p(0, 0));
        //rig.setScaleY((h - 14) / 10);
        //rig.setPosition(cc.p(w, 8));
        //bg.addChild(rig);

        var lef = cc.Sprite.create(s_Friend_l);
        lef.setAnchorPoint(cc.p(1, 0));
        lef.setScaleY((h - 14) / 10);
        lef.setPosition(cc.p(0, 8));
        bg.addChild(lef);
        this.addChild(bg);
        bg.setPosition(this._root);

        var box = cc.LayerColor.create(cc.c4(255, 255, 255, 255), 180, 230);
        box.setPosition(cc.p(this._root.x, 250));
        this.addChild(box);
        var boxtop = cc.Sprite.create(s_FriendList_t);
        boxtop.setAnchorPoint(cc.p(0, 1));
        boxtop.setPosition(cc.p(this._root.x, 480));
        this.addChild(boxtop);
    },

    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {

        cell.getDataFromIndex(cell.getIdx());
        var fmenu = FriendMenu.create(cell.getData());
        fmenu.setPosition(cc.p(this._root.x - 265, this._root.y + cell.getParent().getPositionY() + cell.getPositionY() - 20));
        this.addChild(fmenu);
        return true;
    },
    
    cellSizeForTable: function (table) {
        return cc.SizeMake(180, 50);
    },

    tableCellAtIndex: function (table, idx) {

        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new FriendViewCell();
            cell.init(idx);
        } else {
            cell.updataFromIndex(idx);
        }
        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this._friendNum;
    },

    setfriendNum: function (num) {
        this._friendNum = num;
    },

    addFriend : function () {
        //添加好友界面

        var digC = FriendAddView.create();
        this.addChild(digC.getDig(), 5);
        digC.getDig().setTouchPriority(this.getTouchPriority() - 1);
        //friendData.push({
        //    'name': 'huan10',
        //    'place': '食堂泡妞10',
        //    'photo': 'client/res/user/user_5.jpg',
        //    'mood': '好不想学习，想打怪，其带菜',
        //});
    },

    rushList: function () {
        this.setfriendNum(friendData.length);
        this.friendView.insertCellAtIndex(friendData.length);
        this.friendView.reloadData();
    }
});


FriendListLayer.create = function () {
    var retObj = new FriendListLayer();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};



/**
 * @ Jopix  好友列表类--单例
 * @ 2013年6月5日 22:41:27
 * @ 由于源码关系，只能以视角左下角为（0，0）
 */
var FriendList = function () {
    FriendList.instance = this;
    this._Layer;
    this._isShow;

    this.init = function () {
        this._isShow = false;
        this._Layer = FriendListLayer.create();
        return true;
    };

    this.getLayer = function () {
        return this._Layer;
    };

    this.show = function (layer) {
        if (this._isShow) {
            this.getLayer().removeFromParent(true);
        }
        else {
            layer.addChild(this.getLayer());
        }
        this._isShow ^= true;
    }
};

FriendList.create = function () {
    var ret = new FriendList();
    if (ret && ret.init()) {
        return ret;
    }
    return null;
};

FriendList.getInstance = function () {
    if (FriendList.instance == null) {
        return FriendList.create();
    } else {
        return FriendList.instance;
    }
};