var firstFlag = true;
var images;
var mapStage;

var userLayer;
var mapLayer;
var messageLayer;
var NPCLayer;

function changeSizeAuto() {
    var winWidth = document.documentElement.clientWidth;
    if (winWidth > 500) {
        document.body.style.width = winWidth;
        var maingd = (winWidth - 135) + "px";
        document.getElementById("rightMenu").style.width = maingd;

        if (firstFlag) {
            mapStage = new Kinetic.Stage({
                container: 'map',
                width: winWidth - 135,
                height: 500
            });
            mainContral();//游戏入口
            firstFlag = false;
        }
    }
}

function mainContral() {
    loadMapImages(initMap);//初始化地图资源，初始化地图，读取完地图资源之后才调用显示地图的函数
}



///----------------------------华丽丽的分界线---------------
//---------------下面读取地图

function loadMapImages(callback) {
    //该函数仅用于读取函数。
    var assetDir = 'http://localhost/sigma_local/resources/images/testMap/testMaps_';
    images = new Array();
    var loadedImages = 0;
    var numImages = 16;

    var mapWidth = 4;
    var mapHeight = 4;

    for (var i = 0; i < mapHeight; i++) {
        images[i] = new Array();
        for (var j = 0; j < mapWidth; j++) {
            images[i][j] = new Image();
            
            images[i][j].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images);
                }
            }
            images[i][j].src = assetDir + "0" + i + "x0" + j + ".jpg";
        }
    }
}


function initMap(images) {
    //显示地图函数
    mapLayer = new Kinetic.Layer();
    var groupMap = new Kinetic.Group({
       // draggable: true
    });

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var imap = new Kinetic.Image({
                image: images[i][j],
                x: j * 400,
                y: i * 200,
                name: 'imagesMap',
            });
            groupMap.add(imap);
        }
    }

    mapLayer.add(groupMap);
    mapStage.add(mapLayer);

    loadUserImage(initUser);//初始化用户资源， 初始化用户层，读取完资源之后才调用显示函数
}

///----------------------------华丽丽的分界线---------------
//-------------下面读取用户
function loadUserImage(callback) {
    //该函数仅用于读取函数。
    var picLink = "http://localhost/sigma_local/resources/images/user.png";
    var images = new Image();
    images.onload = function () {
        callback(images);
    }
    images.src = picLink;
}

function initUser(image) {

    userLayer = new Kinetic.Layer();
    var myuser = new User();
    myuser.init(image);
    var targeX, targeY;

    var anim = new Kinetic.Animation(function (frame) {
        myuser.animAction(targeX, targeY, myuser.userImage);
    }, userLayer);

    anim.start();

    mapLayer.on('mouseup', function () {
        var mousePos = mapStage.getMousePosition();
        targeX = mousePos.x;
        targeY = mousePos.y;
    });//鼠标相应

    userLayer.add(myuser.userImage);
    mapStage.add(userLayer);

    loadNPCImage(initNPC); //初始化NPC跟消息显示，，读取完资源之后才调用显示函数
}



///----------------------------华丽丽的分界线---------------
//----------下面读取NPC
function loadNPCImage(callback) {
    //该函数仅用于读取函数。
    var picLink = "http://localhost/sigma_local/resources/images/NPC.png";
    var images = new Image();
    images.onload = function () {
        callback(images);
    }
    images.src = picLink;
}

function initNPC(image) {

    NPCLayer = new Kinetic.Layer();
    messageLayer = new Kinetic.Layer();
    var NPCframe = false;

    var myNPC = new NPC();
    myNPC.init(image);

    NPCLayer.add(myNPC.NPCImage);
    mapStage.add(NPCLayer);

    myNPC.NPCImage.on('mouseup', function () {
        var mes = new Message();
        mes.createMessage("sdfffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        mes.show(myNPC.NPCImage.getX()-60, myNPC.NPCImage.getY()-80);
    });//点击信息里面显示信息//////////////////////////////////////////////////////////////////////////////////////////////////////////同志们注意这里

    var animMessage = new Kinetic.Animation(function (frame) {
    }, messageLayer);
    
    animMessage.start();
    mapStage.add(messageLayer);
}






