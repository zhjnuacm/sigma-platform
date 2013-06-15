/**
 * @ Jopix  拖动列表类
 * @ 2013年6月5日 22:41:27
 * @ 重写cc.TableView  更新层的优先级
 */

var myTableView = cc.TableView.extend({
    registerWithTouchDispatcher: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -13, true);
    },
});

myTableView.create = function (dataSource, size, container) {
    var table = new myTableView();
    table.initWithViewSize(size, container);
    table.setDataSource(dataSource);
    table._updateContentSize();
    return table;
};

/**
 * @ Jopix  初始化滚动列表控件
 * @ 2013年6月15日 13:02:00
 * @ 由于源码关系，只能以视角左下角为（0，0）
 */

var ScrollList  = cc.Layer.extend({
    _dataView: null,
    _root: null,
    _itemNum: null,
    _width: null,
    _height: null,
    _cellHeight: null,
    _cellClass: null,

    /**
    * [初始化滚动列表控件]
    * @param  {[num]} width                [列表宽度]
    * @param  {[num]} height               [列表高度]
    * @param  {[cc.p]} inPoint             [列表在视角中的左下角]
    * @param  {[string]} cellClassName     [单元格类名]
    * @param  {[num]} cellheight           [单元格高度]
    * @param  {[Array]} jsonData           [数据数组]
    * @return {[bool]}                     [null]
    */

    init: function (width, height, rootPoint, cellClassName, cellheight, jsonData, priority) {
        if (!this._super()) {
            return false;
        }
        this._root = rootPoint;
        this._width = width;
        this._height = height;
        this._cellHeight = cellheight;
        this._cellClass = cellClassName;

        this.setItemNum(jsonData.length);
        //初始化列表
        this._dataView = myTableView.create(this, cc.SizeMake(width, height));
        this._dataView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._dataView.setPosition(this._root);
        this._dataView.setDelegate(this);
        this._dataView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this._dataView);
        this._dataView.setDataSource(this);
        this._dataView.setTouchPriority(priority);

        return true;
    },

    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        cell.getDataFromIndex(cell.getIdx());
        cell.action();
        return true;
    },

    cellSizeForTable: function (table) {
        return cc.SizeMake(this._width, this._cellHeight);
    },

    tableCellAtIndex: function (table, idx) {

        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new this._cellClass();
            cell.init(idx);
        } else {
            cell.updataFromIndex(idx);
        }
        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this._itemNum;
    },

    setItemNum: function (num) {
        this._itemNum = num;
    },
});

ScrollList.create = function (width, height, rootPoint, cellClassName, cellheight, jsonData, priority) {
    var retObj = new ScrollList();
    if (retObj && retObj.init(width, height, rootPoint, cellClassName, cellheight, jsonData, priority)) {
        return retObj;
    }
    return null;
};