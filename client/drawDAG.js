<<<<<<< HEAD
/***
 *获取字段，绘图
 */

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
		document.write(fa + "  "+ son  + "<br>");
		if(fa == son) graph[0][fa] = 1;
		else
			graph[fa][son] = 1; 
	}
}

function output() {
	for(var i = 0; i < 7; i++) {
		for(var j = 0; j < 7; j++) {
			document.write(graph[i][j] + " ");
		}
		document.write("<br>");
	}
}

graphInit();

/*graph[4][0] = 1;
graph[4][1] = 1;*/
/*for(var i = 0; i < 5; i++)
	document.write(graph[i].length + "<br>");
for(var i = 0; i < 5; i++) {
	for(var j = 0; j < 5; j++) {
		if(graph[i][j] == undefined) {
			alert("not");
		}
		else
			document.write(graph[i][j] + "<br>");
	}
}*/

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.fillStyle="#FF0000";
cxt.beginPath();
cxt.arc(200,200,20,0,Math.PI*2,true);
cxt.closePath();
cxt.fill();


=======
/***
 *获取字段，绘图
 */

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
		document.write(fa + "  "+ son  + "<br>");
		if(fa == son) graph[0][fa] = 1;
		else
			graph[fa][son] = 1; 
	}
}

function output() {
	for(var i = 0; i < 7; i++) {
		for(var j = 0; j < 7; j++) {
			document.write(graph[i][j] + " ");
		}
		document.write("<br>");
	}
}

graphInit();

/*graph[4][0] = 1;
graph[4][1] = 1;*/
/*for(var i = 0; i < 5; i++)
	document.write(graph[i].length + "<br>");
for(var i = 0; i < 5; i++) {
	for(var j = 0; j < 5; j++) {
		if(graph[i][j] == undefined) {
			alert("not");
		}
		else
			document.write(graph[i][j] + "<br>");
	}
}*/

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.fillStyle="#FF0000";
cxt.beginPath();
cxt.arc(200,200,20,0,Math.PI*2,true);
cxt.closePath();
cxt.fill();


>>>>>>> 14c4b42d8bd43d91c197da51deaab9c708335b28
