/****************************************************************************
 Copyright (c) 2012-2013 zhjnuacm
 ****************************************************************************/

var mainLayer = cc.Layer.extend({

    _mediator: null,
    init: function() {
        var selfPointer = this;

        this._super();
        this._mediator = Mediator.create(this);
        var size = cc.Director.getInstance().getWinSize();
        var colorLayer = cc.LayerColor.create(new cc.Color3B(255, 255,
				255), size.width, size.height);
		this.addChild(colorLayer, -1);
        this.setKeyboardEnabled(true);
        this.setTouchEnabled(true);
        if ('mouse' in sys.capabilities) {
            this.setMouseEnabled(true);
        } else {
            cc.log("MOUSE Not supported");
        }
        if ('keyboard' in sys.capabilities) {
            this.setKeyboardEnabled(true);
        } else {
            cc.log("KEYBOARD Not supported");
        }
        
        this.schedule(this.mainloop);
        //this.adjustSizeForWindow();
        //window.addEventListener("resize", function(event) {
        //    selfPointer.adjustSizeForWindow();
        //});
        return true;
    },

    adjustSizeForWindow: function() {
        var margin = document.documentElement.clientWidth - document.body.clientWidth;

        if (document.documentElement.clientWidth < cc.originalCanvasSize.width) { //这里判断拉伸了还是收缩了
            cc.canvas.width = cc.originalCanvasSize.width;
        } else {
            cc.canvas.width = document.documentElement.clientWidth - margin;
        }
        if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
            cc.canvas.height = cc.originalCanvasSize.height;
        } else {
            cc.canvas.height = document.documentElement.clientHeight - margin;
        }

        var xScale = cc.canvas.width / cc.originalCanvasSize.width; //这里是等比缩放的
        var yScale = cc.canvas.height / cc.originalCanvasSize.height;
        if (xScale > yScale) {
            xScale = yScale;
        }
        cc.canvas.width = cc.originalCanvasSize.width * xScale;
        cc.canvas.height = cc.originalCanvasSize.height * xScale;
        var parentDiv = document.getElementById("Cocos2dGameContainer");
        if (parentDiv) {
            parentDiv.style.width = cc.canvas.width + "px";
            parentDiv.style.height = cc.canvas.height + "px";
        }
        cc.renderContext.translate(0, cc.canvas.height);
        cc.renderContext.scale(xScale, xScale);
        cc.Director.getInstance().setContentScaleFactor(xScale);
    },
    
    mainloop: function(dt){
    	this._mediator.mainloop(dt);
    },
    
    onKeyDown: function(key) {
    	this._mediator.onKeyDown(key); 
    },
//    onKeyUp: function(key) {},
//    onMouseDown: function(event) { 
//        this._mediator.onMouseDown(event); 
//        return true;
//    },
//    onMouseDragged: function(event) {
//        this._mediator.onMouseDragged(event);
//    },
//    onMouseMoved: function(event) {},
//    onMouseUp: function(event) {
//        this._mediator.onMouseUp(event);
//    },
//    onRightMouseDown: function(event) {
//        cc.log(event.getLocation());
//    },
//    
    onTouchBegan: function (touch, event) {
    	
        this._mediator.onTouchBegan(touch);
        return true;
    },

    onEnter: function () {
        this._super();
        //alert("mainLayer " + this.getTouchPriority());
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
        //alert(this.getTouchPriority());
    },

    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },
    
    onRightMouseDragged: function(event) {},
    onRightMouseUp: function(event) {},
    onOtherMouseDown: function(event) {},
    onOtherMouseDragged: function(event) {},
    onOtherMouseUp: function(event) {},
    onScrollWheel: function(event) {},
    onMouseEntered: function(theEvent) {},        //当鼠标移动到画布内的时候调用
    onMouseExited: function(theEvent) {},         //移出画布内调用
    
});

var SgimaScene = cc.Scene.extend({
	_layer: null,
	onEnter: function() {
        this._super();
        this._layer = new mainLayer();
        this._layer.init();
        this.addChild(this._layer);
    }
});




