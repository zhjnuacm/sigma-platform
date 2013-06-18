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

function genPushMapMessageUrl(mapStr, row, col) {
	var para = "&mapStr=" + mapStr + "&row=" + row + "&col=" + col;
	return head + "npc/AjaxGetMapMatrix" + encodeURI(para);
}

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

function genSubmitTaskUrl(taskId,answer) {
	return head + "task/submittask&taskId=" + taskId + "&answer="+answer;
}

function genMapConfToNpcControllerMessageUrl(mapInfo) {
	return head + "npc/SetGlobalMapConf&mapConfStr=" + mapInfo;
}

function genGetFriendInfoUrl() {
	return head + "UserFriend/getMyfriendInfo";
}

function genGetFriendOfSearchUrl(name) {
	return head + "UserFriend/getFriendOfSearch&name=" + name;
}

//根据userPosition 获取当前场景是否有新用户登录
function getNewUserDataUrl(userPosition){
	return ;
}

//根据userPosition 获取当前场景中用户的position
function getUserNewPosition(userPosition){
	return ;
}



/**
 * @ Jopix  信息类
 * @ 2013年4月5日 22:41:27
 * @ [将字符串自动换行] 长度为maxlenth
 * @ 并保持信息所占的高度
 */

var Message = function () {
    this._string;
    this._height;
    this._lk;
    this._fSize;

    /**
    * [字符串换行]
    * @param  {[string]} String            [要转换的字符串]
    * @param  {[num]} maxLenth             [每行字符数]
    * @param  {[num]} fontSize             [字体大小]
    * @param  {[bool]} isTable             [是否空两个]
    */

    this.init = function (String, maxLenth, fontSize) {
        // alert(String);
        // /<summary>获得字符串实际长度，中文2，英文1</summary>
        // /<param name="str">要获得长度的字符串</param>
        this._string = '';
        this._lk = 1;
        this._fSize = fontSize * 1.2;
        var realLength = 0, len = String.length, charCode = -1, b = 0, k = maxLenth;
        for (var i = 0; i < len; i++) {
            charCode = String.charCodeAt(i);
            if (charCode < 299)
                realLength += 1;
            else
                realLength += 2;

            if (realLength > k) {
                this._string += String.substring(b, i);
                this._string += "\n";
                b = i;
                k += maxLenth;
                this._lk++;
            }
        }
        this._string += String.substring(b, len);
        this._string += "\n";
        this._height = this._lk * this._fSize;
        return true;
    };


    this.init2 = function (String, maxLenth, fontSize) {
        // alert(String);
        // /<summary>获得字符串实际长度，中文2，英文1</summary>
        // /<param name="str">要获得长度的字符串</param>
        this._string = '';
        this._lk = 1;
        this._fSize = fontSize * 1.2;

        var realLength = 0, len = String.length, charCode = -1, b = 0, k = maxLenth;
        for (var i = 0; i < len; i++) {
            charCode = String.charCodeAt(i);
            if (charCode < 299)
                realLength += 1;
            else
                realLength += 2;

            if (realLength > k) {
                this._string += String.substring(b, i);
                this._string += "\n    ";
                //alert(newStr);
                realLength += 4;
                b = i;
                k += maxLenth;
                this._lk++;
            }
        }
        this._string += String.substring(b, len);
        this._string += "\n";
        this._height = this._lk * this._fSize;
        return true;
    };

    this.getString = function () {
        return this._string;
    };
    this.getHeight = function () {
        return this._height;
    }
};


/**
* [字符串换行]
* @param  {[string]} String            [要转换的字符串]
* @param  {[num]} maxLenth             [每行字符数]
* @param  {[num]} fontSize             [字体大小]
* @param  {[num]} form                 [是否空两个]
*        如果 form = 0; 正常换行
*             form = 1; 首行空两格
*             form = 2; 除首行之外每行空两格
*
* @return {[string]} ret               [信息类]
*/


Message.create = function(String, maxLenth, fontSize, form){
    var ret = new Message();
    switch (form) {
        case 0:
            if (ret && ret.init(String, maxLenth, fontSize)){
                return ret;
            }
            return null;
            break;

        case 1:
            if (ret && ret.init(String + "    ", maxLenth, fontSize)) {
                return ret;
            }
            return null;
            break;

        case 2:
            if (ret && ret.init2(String, maxLenth, fontSize)) {
                return ret;
            }
            return null;
            break;

        default:
            throw "Message.create(): Argument must be non-nil ";
            break;
    }
}

