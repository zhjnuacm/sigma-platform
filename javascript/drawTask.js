var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

var MAXN = 150;
var graph = new Array();
var maxTask = -1;
/*
 * 初始化图
 */
function graphInit() {
	for(var i = 0; i < MAXN; i++) {
		graph[i] = new Array();
		for(var j = 0; j < MAXN; j++) {
			graph[i][j] = 0;
		}
	}
	document.write("<br>");
	for(var i = 0; i < jsData.length; i++) {
		var fa = jsData[i]['task_pretask'];
		var son = jsData[i]['task_id'];
		if(fa > maxTask) maxTask = fa;
		if(son > maxTask) maxTask = son;
		//document.write(fa + "  "+ son  + "<br>");
		if(fa == son) graph[0][fa] = 1;
		else
			graph[fa][son] = 1; 
	}
}

/*
 * 输出图
 */
function output() {
	for(var i = 0; i < 7; i++) {
		for(var j = 0; j < 7; j++) {
			document.write(graph[i][j] + " ");
		}
		document.write("<br>");
	}
}


/*
 * 参数：园中心坐标，任务ID
 */
function createTaskImg(_x, _y, taskId) {
	var x = _y, y = _x;
	cxt.fillStyle="#FF0000";
	cxt.beginPath();
	cxt.arc(x, y, 20, 0, Math.PI*2, true);
	cxt.closePath();
	cxt.fill();
	
	cxt.fillStyle="#000000";
	cxt.font = "40pt Calibri";
	cxt.fillText(taskId, x-12, y+15);
}

/*
 * 参数：起点(x, y), 终点(x, y)
 */
function createTaskArrow(_sx, _sy, _ex, _ey) {
	var sx = _sy, sy = _sx, ex = _ey, ey = _ex;
	var a1=new window.mapleque.arrow();
	a1.set({x:sx,y:sy},{x:ex,y:ey});
	a1.setPara({
		arrow_size:0.15,
		arrow_sharp:0.05
	})
	a1.paint(cxt);
}


//output();

//test for Array
/*var tmp = new Array();
tmp[0] = new Array();
tmp[1] = new Array();

var t = 1;
tmp[t^1].push(3);
var len = tmp[0].push(5);
tmp[0].push(6);
document.write(len + " " + tmp[0][0]);
tmp[1] = tmp[0];
document.write(tmp[1][1]);*/

/*
 * 这里两个函数drawTask与drawArrow有空最好重构一下
 * 或者将这个文件用类封装一下
 */
function drawTask() {
	var Gap = 100;
	var ind = 0;
	var row, col = 50;
	while(true) {
		row = 50;
		var rrow = 50;
		for(var i = 0; i < que[ind].length; i++) {
			var tmp = que[ind][i];
			//document.write(tmp + " ");
			createTaskImg(row, col, tmp);
			for(var j = 0; j <= maxTask; j++)  {
				if(0 != graph[tmp][j]) {
					que[ind^1].push(j);
				//	createTaskArrow(row, col, rrow, col+Gap);
					rrow = rrow + Gap;
				}
			}
			row = row + Gap;
		}
		col = col + Gap;
		while(true) {
			var flag = que[ind].pop();
			if(undefined == flag)
				break;
		}
		
		document.write("<br>");
		ind = ind ^ 1;
		if(0 == que[ind].length)
			break
	}
}

function drawArrow() {
	var Gap = 100;
	var ind = 0;
	var row, col = 50;
	while(true) {
		row = 50;
		var rrow = 50;
		for(var i = 0; i < que[ind].length; i++) {
			var tmp = que[ind][i];
			//document.write(tmp + " ");
			for(var j = 0; j <= maxTask; j++)  {
				if(0 != graph[tmp][j]) {
					que[ind^1].push(j);
					createTaskArrow(row, col, rrow, col+Gap);
					rrow = rrow + Gap;
				}
			}
			row = row + Gap;
		}
		col = col + Gap;
		while(true) {
			var flag = que[ind].pop();
			if(undefined == flag)
				break;
		}
		
		document.write("<br>");
		ind = ind ^ 1;
		if(0 == que[ind].length)
			break
	}
}

graphInit();

var que = new Array();
que[0] = new Array();//队列1
que[1] = new Array();//队列2
for(var i = 0; i <= maxTask; i++) {
	if(0 != graph[0][i]) {
		que[0].push(i);
	}
}

drawTask();
for(var i = 0; i <= maxTask; i++) {
	if(0 != graph[0][i]) {
		que[0].push(i);
	}
}
drawArrow();