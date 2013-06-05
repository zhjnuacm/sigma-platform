//由于源码的关系。这里只能使用左下角为原点。


//================================
//  Jopix  好友列表对于的菜单
//  2013年6月5日 22:41:27
//===============================


var FriendMenu = cc.Layer.extend({
    _userID: null,

    init: function () {
    }

});



//===
//用于测试

var friendData = [];
friendData.push(
    {
        'name': 'Jopix',
        'place': '教室吹水',
        'photo': 'client/res/user/user_1.jpg',
    },
    {
        'name': 'nanke',
        'place': '宿舍睡觉',
        'photo': 'client/res/user/user_2.jpg',
    },
    {
        'name': 'cchun',
        'place': '魔界打怪',
        'photo': 'client/res/user/user_3.jpg',
    },
    {
        'name': 'vainner',
        'place': '现实世界',
        'photo': 'client/res/user/user_4.jpg',
    },
    {
        'name': 'huan',
        'place': '食堂泡妞',
        'photo': 'client/res/user/user_5.jpg',
    },
     {
         'name': 'Jopix',
         'place': '教室吹水',
         'photo': 'client/res/user/user_1.jpg',
     },
    {
        'name': 'nanke',
        'place': '宿舍睡觉',
        'photo': 'client/res/user/user_2.jpg',
    },
    {
        'name': 'cchun',
        'place': '魔界打怪',
        'photo': 'client/res/user/user_3.jpg',
    },
    {
        'name': 'vainner',
        'place': '现实世界',
        'photo': 'client/res/user/user_4.jpg',
    },
    {
        'name': 'huan',
        'place': '食堂泡妞',
        'photo': 'client/res/user/user_5.jpg',
    }
);
//==


//================================
//  Jopix  好友列表单元格
//  2013年6月5日 22:41:27
//===============================

var FriendViewCell = cc.TableViewCell.extend({
    _name: null,
    _place: null,
    _photo: null,

    id: null,

    draw: function (ctx) {
        this._super(ctx);
        cc.renderContext.strokeStyle = "rgba(220,220,220,1)";
        cc.renderContext.lineWidth = "1";
        cc.drawingUtil.drawLine(cc.p(10, 0), cc.p(170, 0));
    },

    init: function (idx) {

        this._place = friendData[idx].place;
        this._name = friendData[idx].name;
        this._photo = friendData[idx].photo;

        var photo = cc.Sprite.create(this._photo);
        photo.setPosition(cc.p(25, 25));
        this.addChild(photo);

        var n = cc.LabelTTF.create(this._name, s_yahei, 12);
        n.setColor(cc.c3(30, 30, 30));
        n.setPosition(cc.p(60, 30));
        n.setAnchorPoint(cc.p(0, 0));
        n.setTag(123);
        this.addChild(n);

        var p = cc.LabelTTF.create(this._place, s_yahei, 12);
        p.setColor(cc.c3(140, 140, 140));
        p.setPosition(cc.p(60, 8));
        p.setAnchorPoint(cc.p(0, 0));
        p.setTag(123);
        this.addChild(p);

        return true;
    },

    send: function () {
        alert(this._name + this._place);
    }

});


//================================
//  Jopix  拖动列表类
//  2013年6月5日 22:41:27
// 重写cc.TableView  更新层的优先级
//===============================
var myTableView = cc.TableView.extend({
    registerWithTouchDispatcher: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -13, true);
    }
});

myTableView.create = function (dataSource, size, container) {
    var table = new myTableView();
    table.initWithViewSize(size, container);
    table.setDataSource(dataSource);
    table._updateContentSize();
    return table;
};

//================================
//  Jopix  好友列表
//  2013年6月5日 22:41:27
//===============================


var FriendList = cc.Layer.extend({
    friendView: null,
    _root: null,
    _box: null,
    _friendNum: null,

    init: function () {
        if (!this._super()) {
            return false;
        }

        this._root = cc.p(cc.Director.getInstance().getWinSize().width - 174, 220);
        this.initBorder(180, 288);
        this.setfriendNum(friendData.length);
        //初始化主标签
        //var item = cc.MenuItemSprite.create(normalImage, SelectedImage, 'callback', this);

        //初始化朋友列表
        this.friendView = myTableView.create(this, cc.SizeMake(180, 230));
        this.friendView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.friendView.setPosition(cc.p(this._root.x, 250));
        this.friendView.onTouchMoved(cc.TOUCH_ONE_BY_ONE);
        this.friendView.setDelegate(this);
        this.friendView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.friendView, 2);
        this.friendView.reloadData();
        this.setTouchPriority(1);
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
        });

        this._box.setFunction("click", function (event) {
            friendList._box.setText("");
            friendList._box.setColor(cc.c3(30, 30, 30));
            friendList._box.setBgClr(cc.c3(255, 255, 255));
        });
        this.addChild(this._box);


        return true;
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
        cell.send();
        return true;
    },

    cellSizeForTable: function (table) {
        return cc.SizeMake(180, 50);
    },

    tableCellAtIndex: function (table, idx) {
        //   var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;

        if (!cell) {
            cell = new FriendViewCell();
            cell.init(idx);
        } else {
            //  label = cell.getChildByTag(123);
            //   label.setString(strValue);
        }
        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this._friendNum;
    },

    setfriendNum: function (num) {
        this._friendNum = num;
    }
});

FriendList.create = function () {
    var retObj = new FriendList();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};
