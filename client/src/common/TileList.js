
/**
 * @ Jopix  好友列表单元格
 * @ 2013年6月5日 22:41:27
 */
var ItemCellView = cc.TableViewCell.extend({
    /*
    _fData: {
        'name': null,
        'place': null,
        'photo': null,
        'mood': null,
    },
    _name: null,
    _place: null,
    _photo: null,
    */
    _size: null,

    draw: function (ctx) {
        this._super(ctx);
        cc.renderContext.strokeStyle = "rgba(220,220,220,1)";
        cc.renderContext.lineWidth = "1";
        cc.drawingUtil.drawLine(cc.p(10, 0), cc.p(this._size.width-20, 0));
    },

    init: function (node) {
        /*
        this.setIdx(idx);

        this._photo = cc.Sprite.create(this._fData.photo);
        this._photo.setScale(0.5, 0.5);
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
        */

        this._size = node.getContentSize();
        return true;
    },

    updataFromIndex : function( node )
    {
      //  node.removeFromParentAndCleanup(false);
      //  this.addChild(node);
    }
});


/**
 * @ Jopix  好友列表层
 * @ 2013年6月5日 22:41:27
 * @ 由于源码关系，只能以视角左下角为（0，0）
 */

var TileList = cc.Layer.extend({
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
        this.friendView.setTouchPriority(-10000);
        this.addChild(this.friendView, 2);
        this.friendView.setDataSource(this);
        this.friendView.reloadData();
        return true;
    },

    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        //暂无点击事件
        cc.log("fuck");
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
    }
});


/**
 * @ Jopix--
 * @ 2013年6月5日 22:41:27
 * @ 
 */
TileList.create = function (dataScoure, contentSize, cellSize, pos) {
    var retObj = new TileList();
    if (retObj && retObj.init(dataScoure, contentSize, cellSize, pos)) {
        return retObj;
    }
    return null;
};