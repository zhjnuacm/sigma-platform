/**
 * [Map 地图类]
 * @author Saisa
 * 
 * 对外接口
 * Map Map.create(string HeroMap);						//根据地图名称字符串来创建地图实例
 * CCPoint locationToTilePosition(CCPoint position);	//将TILE地图坐标转换为屏幕实际坐标
 * CCPoint tilePositionToMapLocation(CCPoint position);	//将屏幕实际坐标转换为TILE地图坐标
 * bool checkCollision(CCPoint tilePos)					//检查某个tile是否有障碍物
 * bool checkOrCalRoute(CCPoint start,CCPoint terminal);//检查起始点到终点能否进行路线移动,能则计算移动路径且返回true，不是则返回false
 * Array getRouteContent();								//返回移动路线的数组内容，需要先调用checkOrCalRoute
 * int getRouteSize();									//获取移动路线的数组大小，需要先调用checkOrCalRoute
 * getMapConfig();										//获取当前地图的配置信息
 */
var Map = cc.Layer.extend({
    _backGround: null,
    _tmxMap:null,
    _winSize:null,
    _minMap:null,
    _tileSize:null,
    _mapSize:null,
    _mapConfig:null,
    _groundLayer: null,
    _npcLayer:null,
    /**
	 * [_mapLength 地图大菱形的长度]
	 * @type {[double]}
	 */
    _mapLength:null, 

    /**
	 * [_vectorA 大菱形X轴的单位向量]
	 * @type {[double]}
	 */
    _vectorA:null,

    /**
	 * [_vectorA 大菱形Y轴的单位向量]
	 * @type {[double]}
	 */	
    _vectorB:null, 
    /**
	 * [_tileLength tile菱形的边长]
	 * @type {[double]}
	 */
    _tileLength:null,
	
    //解决地图边缘
    _edgeBg:null,

    //求路线模块
    _tmpLayer:null,
    _matrix:null,
    _matrixWidth:null,
    _matrixHeight:null,
    _tileSets:null,
    _route:null,
    _canMove:null,
	
    _routeSize:0,
	
    //移动模块
    _newPosPoint:null,
    _stepTime:null,
    _stepLengthX:null,
    _stepLengthY:null,
    _walking:null,
    _stepCnt:null,
    _tmpHero:null,

    //地图传送
    _gates:null,

    //地图信息
    _mapName:null,
    _walkMargin:7,//地图边缘
    _squareSize:30,//TMX地图大小为 30*30=900个TILE
	

    /**
	 * [init 根据英雄的位置和英雄的地图 初始化地图]
	 * @param  {[type]} HeroPosition [英雄的tile位置]
	 * @param  {[type]} HeroMap      [英雄所在的地图]
	 * @return {[type]}              [description]
	 */
    init: function(HeroMap) {
        this._winSize = cc.Director.getInstance().getWinSize();
		
        var mapPath = 'client/res/map/' + HeroMap + '.tmx';
        this._tmxMap = cc.TMXTiledMap.create(mapPath);
        //this._tmxMap.setAnchorPoint(cc.p(0,0));
        this.addChild(this._tmxMap,-1,MAP_TAG);
        this._tileSize = this._tmxMap.getTileSize();
        this._mapSize = this._tmxMap.getContentSize();

        this.initMapInfo(HeroMap);
        GLOBAL.mapName = HeroMap;
        return true;
    },

    initMapInfo:function(HeroMap){
		
        ///////////////////解决地图边缘问题
        this._edgeBg = cc.Sprite.create(s_edgeBg);
        this._edgeBg.setPosition(cc.p(1500,750));
        this._edgeBg.setScale(1.0);
        this.addChild(this._edgeBg,-5);
        this._mapName = HeroMap;
		
        this._mapConfig = this.getSingleMapConfigByName(HeroMap);		//读出了地图配置文件
        /*
		for (var i = this._mapConfig.buildings.length - 1; i >= 0; i--) {	//初始化地图上的建筑
		//	cc.log(this._mapConfig.buildings[i]['buildingName'] + " "  	+ this._mapConfig.buildings[i]['objectName']);
			var buildingObjects = this._tmxMap.getObjectGroup(
				this._mapConfig.buildings[i]['objectName']);
			var buildObject = buildingObjects.getObjects()[0];
			//cc.log(buildObject.getAttribute('polyline'));

		};

		*/

        this._groundLayer = this._tmxMap.getLayer(this._mapConfig.ground);		//初始化地图floor层

		
        this._mapLength = Math.sqrt(this._mapSize.width*this._mapSize.width + 
			this._mapSize.height*this._mapSize.height)/2;
        this._vectorA = cc.p(-this._mapSize.width*0.5/this._mapLength,
			-this._mapSize.height*0.5/this._mapLength);
        this._vectorB = cc.p(this._mapSize.width*0.5/this._mapLength,
			-this._mapSize.height*0.5/this._mapLength);
        this._tileLength = Math.sqrt(this._tileSize.width*this._tileSize.width + 
			this._tileSize.height*this._tileSize.height)/2;


        ///////////////////求路线模块
        this._matrix= new Array();
        this._route = new Array();
        this._gates = new Array();	
        this._canMove=false;
		
        this._matrixWidth = this._tmxMap.getMapSize().width;
        this._matrixHeight = this._tmxMap.getMapSize().height;
        for( var i=0;i<this._matrixWidth;i++){
            this._matrix[i]=new Array();
            this._gates[i] = new Array();
            for(var j=0;j<this._matrixHeight;j++){
                this._matrix[i][j] = 0;
                this._gates[i][j] = -1;
            }
        }
        this._tmpLayer = this._tmxMap.getLayer(this._mapConfig.ground);
        this._tileSets = this._tmpLayer.getTiles();
        this.getMatrix();

        ///////////////////移动模块
        this._newPosPoint = cc.p(null,null);
        this._stepTime = 1;//步长表示移动一格花费1秒时间
        this._stepLengthX = 50;
        this._stepLengthY = 25;
        this._walking= false;
        this._stepCnt=0;

        ///////////////////////地图传送部分
		

		
        for (var i = this._mapConfig.conveyGate.length - 1; i >= 0; i--) {	//初始化地图上的建筑
            this._gates[this._mapConfig.conveyGate[i]['startPos'].x][this._mapConfig.conveyGate[i]['startPos'].y]=i;
            //cc.log(buildObject.getAttribute('polyline'));
        };
		 
		
    },


    /**
	 * [getSingleMapConfigByName 根据地图名称读出地图配置]
	 * @param  {[type]} mapName [地图名字]
	 * @return {[type]}         [description]
	 */
    getSingleMapConfigByName : function(mapName)
    {
        for (var i = mapsConfig.length - 1; i >= 0; i--) {
            if(mapsConfig[i].name == mapName)
                return mapsConfig[i];
        };
        return null;
    },


    ////////////////////////////////////求移动的路线
    //根据TMX一维瓦片数组获取TMX迷宫矩阵
    getMatrix:function(){
        var c=0;
        for(var i=0;i<this._matrixWidth;i++){
            for(var j=0;j<this._matrixHeight;j++){
                if(typeof(this._tileSets[i+j]) == "undefined") continue;
                if(this._tileSets[c]>0) this._matrix[i][j] = this._tileSets[c++];
                if(this._matrix[i][j]==91)this._matrix[i][j]=0;
            }
        }
    },
    //////在控制台输出TMX迷宫矩阵
    logMatrix:function(){
        for(var i=0;i<this._matrixWidth;i++){
            var a="";
            for(var j=0;j<this._matrixHeight;j++){
                a+=this._matrix[i][j];
                a+=" ";
            }
          //  cc.log(a);
        }
    },


    //计算移动路线
    calMoveRoute:function(start,terminal){

        var dx = new Array(-1,1,0,0);
        var dy = new Array(0,0,-1,1);
        var name = new Array(0,1,2,3);
        var q = new Array();
        var vis = new Array();
        var nMap = new Array();
        var m=this._squareSize;
        var n=this._squareSize;
        var dir = new Array();
        var fa = new Array();
        var dis = new Array();
        var last_dir = new Array();
        var front=rear=0;
        var d,u,x,y;
        //bfs

        for(var i = 0;i<m;i++){
            vis[i]=new Array();
            fa[i]=new Array();
            dis[i]=new Array();
            last_dir[i]=new Array();
            for(var j=0;j<n;j++){
                vis[i][j]=dis[i][j]=fa[i][j]=0;
            }
        }

        x=start.y;
        y=start.x;
        u=x*m+y;
        vis[x][y]=1;
        fa[x][y]=u;
        q[rear++]=u;
        while(front!=rear){
            u=q[front++];
            x=Math.floor(u/m);y=u%m;
            for(d=0;d<4;d++){
                var nx=x+dx[d];
                var ny=y+dy[d];
                if(nx>=0 && nx<m && ny>=0 && ny<n && vis[nx][ny]==0 && this._matrix[nx][ny]==0){					
                    var v = nx*m+ny;
                    q[rear++]=v;
                    vis[nx][ny]=1;
                    fa[nx][ny]=u;
                    dis[nx][ny]=dis[x][y]+1;
                    last_dir[nx][ny]=d;	
                }     
            }
        }

        x = terminal.y;
        y = terminal.x;

        var c=0;
        while(1){
            var fx=Math.floor(fa[x][y]/m);
            var fy=fa[x][y]%m;
            if(fx==x && fy==y) break;
            dir[c++] = last_dir[x][y];
            x=fx;
            y=fy;
        }

        //dx = null;
        //dy = null;
        //q = null;
        //vis = null;
        //nMap = null;
        //m = null;
        //n = null;

        //fa = null;
        //dis = null;
        //last_dir = null;

        this._routeSize = c;
        while(c--){
            this._route[c]=name[dir[c]];
            if(this._route[c]==undefined) return false;
        }
        //name = null;
        //        dir = null;
        if(this._routeSize>0) return true;
        else return false;
    },
	
	
    ///////////////////////////////////////////////对外接口
	
    /**
	 * [locationToTilePosition  根据鼠标的点击位置索引地图的tile]
	 * @param  {[ccp]} position [鼠标的点击位置]
	 * @return {[ccp]}          [tile的位置,如果没有则返回null]
	 */
    locationToTilePosition : function (position)	
    {
        var x = position.x  - this._mapSize.width/2 ;
        var y = position.y  - this._mapSize.height ;
        var a = (x*this._vectorB.y - y*this._vectorB.x)/(
			this._vectorA.x*this._vectorB.y - this._vectorB.x *this._vectorA.y);
        var b = (x*this._vectorA.y - y*this._vectorA.x)/(
			this._vectorB.x *this._vectorA.y - this._vectorA.x*this._vectorB.y);
        if(a <= 0 || b <= 0)
            return null;

        var ret =  cc.p(parseInt(b/this._tileLength),parseInt(a/this._tileLength));
        return ret;
    },
	
    /**
	 * [tilePositionToMapLocation 将tile坐标变为地图的相对坐标]
	 * @param  {[ccp]} position [tile坐标]
	 * @return {[ccp]}          [tile在地图上的坐标]
	 */
    tilePositionToWorldLocation : function (position)
    {
        var tile_nx = this._mapSize.width/this._tileSize.width;
        var tile_ny = this._mapSize.height/this._tileSize.height;
        var posX = (tile_ny + position.x - position.y) * this._tileSize.width * 0.5;
        var posY = (tile_ny+tile_nx - position.x - position.y - 1 )* this._tileSize.height *0.5;
        return (cc.p(posX,posY));
		
    },
	

    getRouteSize:function(){
        return this._routeSize;
    },
    getRouteContent:function(){
        return this._route;
    },
    getWalkMargin:function(){
        return this._walkMargin;
    },
    getSquareSize:function(){
        return this._squareSize;
    },
    getTileSize:function(){
        return this._tileSize;
    },
	

    checkConvey:function(position){
        var conveyId = this._gates[position.x][position.y];
        if(conveyId==-1) return false;
        return true;
    },
    doConvey:function(position){
        var conveyId = this._gates[position.x][position.y];
        var targetMap = this._mapConfig.conveyGate[conveyId]['targetMap'];
        var targetPos = this._mapConfig.conveyGate[conveyId]['tagetPos'];
        var mapPath = 'client/res/map/' + targetMap + '.tmx';
        this.removeChild(this._tmxMap);
        this._tmxMap = cc.TMXTiledMap.create(mapPath);
        this.addChild(this._tmxMap,-1,MAP_TAG);
        this.initMapInfo(targetMap);
		
        this._tileSize = this._tmxMap.getTileSize();
        this._mapSize = this._tmxMap.getContentSize();
		
        return targetPos;
	
    },
	
    checkTileInMap:function(position){
        if(	position!=null 	&&
			position.x>=0	&&
			position.x<=30 	&&
			position.y>=0 	&&
			position.y<=30
		)return true;
        return false;
			
    },
	
    /*
	 * 判断tile坐标是否应该进行地图切换，是则进行移动且返回true，不是则返回false
	 */
    checkOrDoConvey:function(position){
        var conveyId = this._gates[position.x][position.y];
        if(conveyId==-1) return false;
        else{
            var targetMap = this._mapConfig.conveyGate[conveyId]['targetMap'];
            var mapPath = 'client/res/map/' + targetMap + '.tmx';
            this.removeChild(this._tmxMap);
            this._tmxMap = cc.TMXTiledMap.create(mapPath);
            this.addChild(this._tmxMap,-1,MAP_TAG);
            this.initMapInfo(targetMap);
            this._tileSize = this._tmxMap.getTileSize();
            this._mapSize = this._tmxMap.getContentSize();
            return true;
        }
    },
	
	
    /*
	 * 检查能否进行路线移动,是则计算移动路径且返回true，不是则返回false
	 */
    checkOrCalRoute:function(start,terminal){
        if(this._matrix[start.y][start.x]==0 
		&& this._matrix[terminal.y][terminal.x]==0
		&& (start.x!=terminal.x || start.y!=terminal.y) ){
            if(this.calMoveRoute(start,terminal))return true;
        }
        return false;
    },
	
	
    /*
	 * 检查该tile是否有障碍物
	 */
    checkCollision:function(tilePos){
        if(this._matrix[tilePos.y][tilePos.x]!=0){
            return true;
        }else return false; 
    },
	
    /*
	 * 获取地图信息
	 */
    getMapConfig:function(){
        return this.getSingleMapConfigByName(this._mapName);
    },
    
    getMapName : function (){
    	return this._mapName;
    }
});
/**
 * [create 根据英雄的位置和英雄的地图 初始化地图]
 * @param  {[type]} HeroPosition [英雄的tile位置]
 * @param  {[type]} HeroMap      [英雄所在的地图]
 * @return {[type]}              [description]
 */
Map.create = function(HeroMap) {
	var ret = new Map();
	if (ret && ret.init(HeroMap)) {
		return ret;
	}
	return null;
};



/**
 * @ Jopix  小地图
 * @ 2013年5月23日 22:41:27
 */

function SMap() {

    this._winSize;
    this._map;
    this._content;
    this._hero;
    this._mx;
    this._my;
    this._width;
    this._height;
    this._midPoint;

    SMap.instance = this;
	    this.show = function () {
     //   cc.log("sdfsdfsdfsdf");
    }

    this.init = function (mapPath) {
        //设置大小
        this._width = 200;
        this._height = 130;

        this._winSize = cc.Director.getInstance().getWinSize();
        //设置偏移量
        this._mx = (this._width - this._winSize.width * sMapratio) * 0.5;
        this._my = (this._height - this._winSize.height * sMapratio) * 0.5;
	        //放置遮罩 只显示方框区域
        this._content = cc.ScrollView.create();
        this._content.setViewSize(cc.SizeMake(this._width, this._height));
        this._content.setPosition(cc.p(30, 20));
	        //获取地图
        this._map = cc.Sprite.create(mapPath);
        //       this._map.setPosition(cc.p(this._mx, this._my));
        this._content.addChild(this._map);
	        //颜色层
        var colorLayer = cc.LayerColor.create(cc.c4(30, 30, 30, 100), this._width, this._height);
        this._content.addChild(colorLayer);
	        //放置hero
	        this._midPoint = cc.p(this._width * 0.5, this._height * 0.5);
        this._hero = cc.Sprite.create(s_shero);
        //this._hero.setPosition(cc.p(this._winSize.width * sMapratio * 0.5, this._winSize.height * sMapratio * 0.5));
        this._hero.setPosition(this._midPoint);
        this._content.addChild(this._hero);
	        return true;
    };
	    /**
     * [init 根据地图移动的方向来调整小地图]
      * @param  {[type]} diff         [大地图移动的向量*0.15]
     * @param  {[type]} type         [是否显示动画]
     * @return {[type]}              [description]
     */
    this.mapMoveByHeroPosition = function (diff) {
        var sdiff = cc.p(0, 0);
        sdiff.x = this._midPoint.x - diff.x * sMapratio;
        sdiff.y = this._midPoint.y - diff.y * sMapratio;
        //this._map.runAction(cc.MoveTo.create(1.0, sdiff));
        this._map.setPosition(sdiff);

    };
	    this.heroMoveByHeroPosition = function (diff) {
        var sdiff = cc.p(0, 0);
        sdiff.x = diff.x * sMapratio;
        sdiff.y = diff.y * sMapratio;
        alert(sdiff.x + ' ' + sdiff.y);
        //this._hero.runAction(cc.MoveTo.create(1.0, sdiff));
        this._hero.setPosition(sdiff);
    };
	};

//小地图的单例

SMap.getInstance = function () {
    if (SMap.instance == null) {
        return new SMap();
    }
    else
        return SMap.instance;
};

SMap.create = function (HeroPosition, HeroMap) {
    var ret = SMap.getInstance();
    if (ret && ret.init(HeroPosition, HeroMap)) {
        return ret;
    }
    return null;
};

/**
* @ Jopix  大地图
* @ 2013年5月25日 22:41:27
*/

function BMap() {
    this._winSize;
    this._map;
    this._dig;
    this._mapPointList;
    this._vis;
    this._width;
    this._height;

    BMap.instance = this;

    this.init = function () {

        this._isOnShow = false;//初始化大地图不可见
        this._width = 680;
        this._height = 440;

        this._winSize = cc.Director.getInstance().getWinSize();
        this._dig = DialogView.create(this._width, this._height, cc.p(0, 0));
        this._dig.setPosition(cc.p((this._winSize.width - this._width) * 0.5, (this._winSize.height - this._height) * 0.5 - 20));
        this.buildMap();
        this._map.setScale(bMapratio);
        this._map.setPosition(cc.p(0, 0));
        this._dig.addChild(this._map);
        ////放置遮罩 只显示方框区域
        //this._content = cc.ScrollView.create();
        //this._content.setViewSize(cc.SizeMake(800, 600));
        //this._dig.addChild(this._content);
        return true;
    };
    //初始化各场景地图的相对坐标 保存在 _mapPointList里面。第一张地图默认（0，0）;
    this.dfs = function (x) {
        var p = this._mapPointList[x];
        for (var i = 0; i < mapsConfig[x].conveyGate.length; i++) {
            var j = this.getMapIndex(mapsConfig[x].conveyGate[i].targetMap);
            if (this._vis[j])
                continue;
            var edge = mapsConfig[x].conveyGate[i].starEdge;
            if (edge == 0) {
                this._mapPointList[j] = cc.p(p.x - 1, p.y + 1);
            } else if (edge == 1) {
                this._mapPointList[j] = cc.p(p.x + 1, p.y + 1);
            } else if (edge == 2) {
                this._mapPointList[j] = cc.p(p.x + 1, p.y - 1);
            } else if (edge == 3) {
                this._mapPointList[j] = cc.p(p.x - 1, p.y - 1);
            } else {
            }
            this._vis[j] = true;
            this.dfs(j);
        }
    }
    /**
* [初始化地图]
* @return {[null]}              [null]
*/
    this.buildMap = function () {
        this._map = cc.Layer.create();
        this._mapPointList = new Array();
        this._mapPointList[0] = cc.p(0, 0);
        this._vis = new Array();
        for (var i = 0; i < mapsConfig.length; i++)
            this._vis[i] = false;
        this._vis[0] = true;
        this.dfs(0);

        for (var i = 0; i < mapsConfig.length; i++) {
            var tmap = cc.Sprite.create('client/res/map/' + mapsConfig[i].name + '_s.png');
            tmap.setPosition(cc.p(this._mapPointList[i].x * mapWidthH * sMapratio, this._mapPointList[i].y * mapHeightH * sMapratio));
            this._map.addChild(tmap);
        }
    };


    /**
      * [根据地图名获取下标]
      * @param  {[String]} mapName      [地图名]
      * @return {[int]}              [下标]
      */

    this.getMapIndex = function (mapName) {
        for (var i = mapsConfig.length - 1; i >= 0; i--) {
            if (mapsConfig[i].name == mapName)
                return i;
        };
        return null;
    };

    /**
    * [将点显示在大体图上]
    * @param  {[string]} mapName      [地图名]
    * @param  {[cc.p]} inPoint      [点在地图中的像素点位置]
    * @return {[null]}              [null]
    */
    this.showPoint = function (mapname, inPoint) {
        inPoint.x -= mapWidthH;
        inPoint.y -= mapHeightH;
        var i = this.getMapIndex(mapname);
        var ccp = cc.Sprite.create(s_user);
        // alert(this._mapPointList[i].x + ' ' + this._mapPointList[i].y);
        ccp.setPosition(cc.p((this._mapPointList[i].x * mapWidthH + inPoint.x) * sMapratio, (this._mapPointList[i].y * mapHeightH + inPoint.y) * sMapratio));
        this._map.addChild(ccp);
        ccp.setTag(41);
    };

    this.isOnShow = function () {
        if (this._dig.getParent() == null) {
            return false;
        } else {
            return true;
        }
    };

    this.closeDig = function () {
        this._dig.onCloseMyself();
        this._map.removeChildByTag(41, true);
    };
};



BMap.getInstance = function () {
    if (BMap.instance == null) {
        return BMap.create();
    }
    else
        return BMap.instance;
};

BMap.create = function () {
    var ret = new BMap();
    if (ret && ret.init()) {
        return ret;
    }
    return null;
};