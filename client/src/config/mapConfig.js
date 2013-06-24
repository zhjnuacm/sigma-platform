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
                        {'startPos':cc.p(2,0), starEdge: 1,'targetMap':'map3','tagetPos':cc.p(5,18), tagetEdge: 3},
        				{'startPos':cc.p(3,0), starEdge: 1,'targetMap':'map3','tagetPos':cc.p(6,18), tagetEdge: 3},
        				{'startPos':cc.p(4,0), starEdge: 1,'targetMap':'map3','tagetPos':cc.p(7,18), tagetEdge: 3},
        				{'startPos':cc.p(5,0), starEdge: 1,'targetMap':'map3','tagetPos':cc.p(8,18), tagetEdge: 3},
        				
        				{'startPos':cc.p(2,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(2,1), tagetEdge: 1},
        				{'startPos':cc.p(3,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(3,1), tagetEdge: 1},
        				{'startPos':cc.p(4,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(4,1), tagetEdge: 1},
        				{'startPos':cc.p(5,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(5,1), tagetEdge: 1},
        				
        				{'startPos':cc.p(11,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(11,1), tagetEdge: 1},
        				{'startPos':cc.p(12,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(12,1), tagetEdge: 1},
        				{'startPos':cc.p(13,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(13,1), tagetEdge: 1},
        				{'startPos':cc.p(14,19), starEdge: 3,'targetMap':'map2','tagetPos':cc.p(14,1), tagetEdge: 1}

		    ]
		},
		{
			'name':'map2',
			'ground':'floor',
			'buildings':[
						],
			'conveyGate':[
						{'startPos':cc.p(2,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(2,18), tagetEdge: 3},
						{'startPos':cc.p(3,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(3,18), tagetEdge: 3},
						{'startPos':cc.p(4,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(4,18), tagetEdge: 3},
						{'startPos':cc.p(5,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(5,18), tagetEdge: 3},
						
						{'startPos':cc.p(11,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(11,18), tagetEdge: 3},
						{'startPos':cc.p(12,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(12,18), tagetEdge: 3},
						{'startPos':cc.p(13,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(13,18), tagetEdge: 3},
						{'startPos':cc.p(14,0),starEdge: 1, 'targetMap':'map1','tagetPos':cc.p(14,18), tagetEdge: 3},
						]
		},
		{
			'name':'map3',
			'ground':'floor',
			'buildings':[
						],
			'conveyGate':[
						{'startPos':cc.p(5,19),starEdge: 3, 'targetMap':'map1','tagetPos':cc.p(2,1), tagetEdge: 1},
						{'startPos':cc.p(6,19),starEdge: 3, 'targetMap':'map1','tagetPos':cc.p(3,1), tagetEdge: 1},
						{'startPos':cc.p(7,19),starEdge: 3, 'targetMap':'map1','tagetPos':cc.p(4,1), tagetEdge: 1},
						{'startPos':cc.p(8,19),starEdge: 3, 'targetMap':'map1','tagetPos':cc.p(5,1), tagetEdge: 1},
						]
		}
		
);