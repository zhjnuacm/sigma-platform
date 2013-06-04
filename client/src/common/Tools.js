/**
 * 返回最大值
 * 
 * @param {[type]}
 *            a [description]
 * @param {[type]}
 *            b [description]
 * @return {[type]} [description]
 */
function max(a, b) {
	return a > b ? a : b;
}

/**
 * 返回最小值
 * 
 * @param {[type]}
 *            a [description]
 * @param {[type]}
 *            b [description]
 * @return {[type]} [description]
 */
function min(a, b) {
	return a < b ? a : b;
}

/**
 * [isPointInside 判断一个点是否在一个矩形内]
 * 
 * @param {[poing]}
 *            point [description]
 * @param {[size]}
 *            contentSize [description]
 * @param {[poing]}
 *            archPoint [description]
 * @return {Boolean} [description]
 */

function isPointInside(point, contentSize, archPoint) {
	archPoint.y += contentSize.height / 2;
	archPoint.x += contentSize.width / 2;
	return (Math.abs(point.x - archPoint.x) <= contentSize.width / 2 && Math
			.abs(point.y - archPoint.y) <= contentSize.height / 2);
}

/**
 * 取得随即整数闭区间
 * 
 * @param {[type]}
 *            Min [最小值]
 * @param {[type]}
 *            Max [最大值]
 * @return {[type]} [随机数]
 */

function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}
/**
 * 返回一个二维数组
 * 
 * @param {[type]}
 *            nRow [行]
 * @param {[type]}
 *            nColumn [列]
 * @param {[type]}
 *            value [二维数组的值]
 */

function TArray(nRow, nColumn, value) {

	var tarray = new Array();
	for ( var i = 0; i < nRow; i++) {
		tarray[i] = new Array();
		for ( var j = 0; j < nColumn; j++) {
			tarray[i][j] = value;
		}
	}
	return tarray;
}

var head = "index.php?r=";
function genPushMessageUrl(to, type, msg) {
	var parameter = "&to=" + to + "&type=" + type + "&msg=" + msg;
	return head + "chat/push" + encodeURI(parameter);
}
function genPullMessageUrl() {
	return head + "chat/pull";
}
function genNpcsConfigUrl(mapName) {
	return head + "npc/getnpcs&mapName=" + mapName;
}
function getTasksFromNpcUrl(npcid) {
	return head + "npc/gettasks&npcid=" + npcid;
}

function genGetTaskUrl(taskId) {
	return head + "task/gettask&taskId=" + taskId;
}
function genSubmitTaskUrl(taskId) {
	return head + "task/submittask&taskId=" + taskId;
}