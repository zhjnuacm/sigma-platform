//由于源码的关系。这里只能使用左下角为原点。

//var TapMenu = cc.Sprite.extend({

//    ctor: function () {
//        this._super();
//    },
    
//    init: function (s_l, s_p, page) {
//        this._super();
//        this._viewPage = page;
//        this.initWithFile(s_l);
//        this.setAnchorPoint(cc.p(0.5, 0));
//        this.point = cc.Sprite.create(s_p);
//        this.point.setAnchorPoint(cc.p(0.5, 0.5));
//        this.addChild(this.point);
//        this.point.setPosition(cc.p(2, 102));
//        return true;
    
//    },

//    onEnter: function () {
//        cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, 0);
//        this._touchEnabled = true;
//        this._super();
//    },

    
//    onExit: function () {
//        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
//        this._touchEnabled = false;
//        this._super();
//    },

    
//    touchRect: function () {
//        return this.getBoundingBoxToWorld();
//    },

        
//    setTouchEnabled: function (enable) {
//        if (enable && !this._touchEnabled) {
//            cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, 0);
//            this._touchEnabled = true;
//        }
        
//        else if (!enable && this._touchEnabled) {
//            cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
//            this._touchEnabled = false;
//        }
//    },

        
//    onTouchesBegan: function (touches, event) {
//        if (cc.Rect.CCRectContainsPoint(this.touchRect(), touches[0].getLocation())) {
//            this._touchBegan = true;
  
//            var touch = touches[0].getLocation();
//            var pButten = this.point.getPositionY() + 64;
//            this._tx = touch.y - this.point.getPosition().y;
//            if (touch.y >= pButten && touch.y <= pButten + 7) {
//                this._touchDraw = true;
//            } else {
//            }
//        }
//    },
       
//    onTouchesMoved: function (touches, event) {           
//        if (this._touchDraw) {             
//            var y = touches[0].getLocation().y;            
            
//            if (y <= 170 && y > 70) {
//                this.point.setPositionY(y - this._tx);
//                this._viewPage.setPositionInpercent(170 - y);             
//            }       
//        }       
//    },

     
//    onTouchesEnded: function (touches, event) {        
//        if (this._touchBegan) {          
//            this._touchBegan = false;         
//            this._touchDraw = false;        
//        }
//     },
    
//    setButtom: function () {
//        this.point.setPositionY(2);   
//    } 
//});

//TapMenu.create = function (filename, tapname, bg, size) {
//    var retObj = new TapMenu();
//    if (retObj && retObj.init(tapname, bg, size)) {
//        return retObj;
//    }
//    return null;
//}


var FriendViewCell = cc.TableViewCell.extend({
    _name: null,
    _place: null,
    id: null,

    draw: function (ctx) {
        this._super(ctx);
        cc.renderContext.strokeStyle = "rgba(220,220,220,1)";
        cc.renderContext.lineWidth = "1";
        cc.drawingUtil.drawLine(cc.p(10, 0), cc.p(170, 0));
    },

    init: function (image, name, place) {
        this._place = place;
        this._name = name;

        var photo = cc.Sprite.create(image);
        photo.setAnchorPoint(cc.p(0, 0));
        photo.setPosition(cc.p(15, 5));
        this.addChild(photo);

        var n = cc.LabelTTF.create(name, s_yahei, 12);
        n.setColor(cc.c3(30, 30, 30));
        n.setPosition(cc.p(60, 30));
        n.setAnchorPoint(cc.p(0, 0));
        n.setTag(123);
        this.addChild(n);

        var p = cc.LabelTTF.create(place, s_yahei, 12);
        p.setColor(cc.c3(140, 140, 140));
        p.setPosition(cc.p(60, 5));
        p.setAnchorPoint(cc.p(0, 0));
        p.setTag(123);
        this.addChild(p);
        return true;
    },

    send:function(){
        alert(this._name + this._place);
    }

});

var FriendList = cc.Layer.extend({
    friendView: null,
    _root: null,
    _box:null,
    init: function () {
        if (!this._super()) {
            return false;
        }

        this._root = cc.p(cc.Director.getInstance().getWinSize().width - 174, 220);
        this.initBorder(180, 288);


        //初始化主标签

        //var item = cc.MenuItemSprite.create(normalImage, SelectedImage, 'callback', this);





        //初始化朋友列表
        this.friendView = cc.TableView.create(this, cc.SizeMake(180, 230));
        this.friendView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.friendView.setPosition(cc.p(this._root.x, 250));
        this.friendView.setDelegate(this);
        this.friendView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.friendView);
        this.friendView.reloadData();

        //初始化搜索

        var fseach = cc.Sprite.create(s_Friendseach);
        fseach.setPosition(cc.p(this._root.x + 85, this._root.y + 14));
        this.addChild(fseach);

        this._box = cc.EditBox.create(cc.size(138, 16));
        this._box.setText("搜索");
        this._box.setFontColor(new cc.Color3B(200, 200, 200));
        this._box.setPosition(this._root.x + 14, this._root.y + 6);
        this._box.setBgClr(new cc.Color3B(245, 245, 245));
        this._box.setFontSize(12);

        this._box.setFunction("keydown", function (event) {
            if (event.keyCode == 13)
                friendList.sendMessage();
        });
        this._box.setFunction("click", function (event) {
            friendList._box.setText("");
            friendList._box.setColor(cc.c3(30, 30, 30));
            friendList._box.setBgClr(new cc.Color3B(255, 255, 255));
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
            cell.init(s_user, "喜欢你搞基", "课室-学习");
        } else {
          //  label = cell.getChildByTag(123);
         //   label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return 25;
    }
});

FriendList.create = function () {
    var retObj = new FriendList();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};

