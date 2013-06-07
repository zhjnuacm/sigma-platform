/**
//====================
Jopix 小地图，大地图相关参数
*/
var mapWidthH = 1500;//地图尺寸的一半宽
var mapHeightH = 750;//地图尺寸的一半高
var sMapratio = 0.15;//小地图相对于大地图尺寸15%
var bMapratio = 0.4;//大地图相当于小地图40%
//=====================================

var mapsConfig = [];
var mapBaseTileConfig = [];

//基本元素的 gid值

mapBaseTileConfig.push(
{}
);

//map1.tmx
mapsConfig.push(
		{
		    'name': 'map1',
		    'ground': 'floor',
		    'pos': cc.p(3, 2),
		    'buildings': [
                        { 'buildingName': 'Dormitory_4', 'objectName': 'Dormitory_4' },
                        { 'buildingName': 'Dormitory_3', 'objectName': 'Dormitory_3' },
                        { 'buildingName': 'Dormitory_2', 'objectName': 'Dormitory_2' },
                        { 'buildingName': 'Dormitory_1', 'objectName': 'Dormitory_1' },
                        { 'buildingName': 'ActiveCenter', 'objectName': 'ActiveCenter' },
                        { 'buildingName': 'Tower', 'objectName': 'Tower' },
                        { 'buildingName': 'Canteen', 'objectName': 'Canteen' }
		    ],
		    'conveyGate': [
                        { 'startPos': cc.p(5, 29), starEdge: 3, 'targetMap': 'map3', 'tagetPos': cc.p(5, 0), tagetEdge: 1 },
                        { 'startPos': cc.p(6, 29), starEdge: 3, 'targetMap': 'map3', 'tagetPos': cc.p(6, 0), tagetEdge: 1 },
                        { 'startPos': cc.p(7, 29), starEdge: 3, 'targetMap': 'map3', 'tagetPos': cc.p(7, 0), tagetEdge: 1 },
                        { 'startPos': cc.p(8, 29), starEdge: 3, 'targetMap': 'map3', 'tagetPos': cc.p(8, 0), tagetEdge: 1 }
		    ]
		},
	{
	    'name': 'map3',
	    'ground': 'floor',
	    'buildings': [
                    { 'buildingName': 'Dormitory_4', 'objectName': 'Dormitory_4' },
                    { 'buildingName': 'Dormitory_3', 'objectName': 'Dormitory_3' },
                    { 'buildingName': 'Dormitory_2', 'objectName': 'Dormitory_2' },
                    { 'buildingName': 'Dormitory_1', 'objectName': 'Dormitory_1' },
                    { 'buildingName': 'ActiveCenter', 'objectName': 'ActiveCenter' },
                    { 'buildingName': 'Tower', 'objectName': 'Tower' },
                    { 'buildingName': 'Canteen', 'objectName': 'Canteen' }
	    ],
	    'conveyGate': [
                    { 'startPos': cc.p(5, 0), starEdge: 1, 'targetMap': 'map3', 'tagetPos': cc.p(5, 29), tagetEdge: 3 },
                    { 'startPos': cc.p(6, 0), starEdge: 1, 'targetMap': 'map3', 'tagetPos': cc.p(6, 29), tagetEdge: 3 },
                    { 'startPos': cc.p(7, 0), starEdge: 1, 'targetMap': 'map3', 'tagetPos': cc.p(7, 29), tagetEdge: 3 },
                    { 'startPos': cc.p(8, 0), starEdge: 1, 'targetMap': 'map3', 'tagetPos': cc.p(8, 29), tagetEdge: 3 }
	    ]
	}
);