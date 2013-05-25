var width,height,top,left; 
width=height=100; 
top=left=5; 
var x=10; 
var y=10; 

var c=document.getElementById("myCanvas"); 

var maxwidth = c.width - 5;
var maxheight = c.height - 5;
var cxt = c.getContext("2d");
cxt.strokeStyle = "#00f";
cxt.strokeRect(0, 0, c.width, c.height);

var img = new Image();
img.src = "1.gif";
var MyInterval = null;
start();

function Refresh() {
	cxt.clearRect(left, top, width, height);
	if ((left + x) > (maxwidth - width) || left + x < 0) {
		x = -x;
	}

	if ((top + y) > (maxheight - height) || top + y < 0) {
		y = -y;
	}

	left = left + x;
	top = top + y;
	cxt.drawImage(img, left, top, width, height);
	cxt.font = "20pt 宋体";
	cxt.fillText("破狼", left, top + 25);

}

function start() {
	if (MyInterval == null) {
		MyInterval = setInterval("Refresh()", 100);
	}
}

function stop() {
	if (MyInterval != null) {
		clearInterval(MyInterval);
		MyInterval = null;
	}
}
function InRectangle(x, y, rectx, recty, rwidth, rheight) {
	return (x >= rectx && x <= rectx + rwidth)
			&& (y >= recty && y <= recty + rheight)
}
c.onmouseover = function(e) {
	if (InRectangle(e.clientX, e.clientY, left, top, width, height)) {
		stop();
	}

	c.onmouseout = function(e) {
		start();
	}

	c.onmousemove = function(e) {
		if (InRectangle(e.clientX, e.clientY, left, top, width, height)) {
			if (MyInterval != null) {
				stop();
			}
		} else {
			start();
		}
	}
}