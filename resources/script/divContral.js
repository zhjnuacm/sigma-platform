//第一次建立窗口标签的标记
var divMessageFlag = true;
var divQuickFlag = true;

//当前访问标记
var visitFlag = true;//可访问

//鼠标是否在区域内
var isInMouse = false;

function createDivMessage() {
    var obj = document.createElement("div");
    obj.id = "messageDiv";
    obj.style.border = "1px solid #8c9cbb";
    obj.style.height = "350px";
    obj.style.width = "280px";
    //obj.style.filter = "alpha(opacity=70)";
    obj.style.margin = "10px";
    obj.style.borderRadius = "5px";
    // obj.algin = "center";
    //obj.innerHTML="<a href='#"+obj.id+"'>ssssssssss</a>";
    obj.style.position = "absolute";
    obj.style.left = "110px";
    obj.style.top = "120px";
    obj.style.backgroundColor = "#fff";
    obj.style.boxShadow = "2px 2px 3px #b4b4b4";
    obj.onmousemove ="isInMouse = true;";
    obj.onmouseout = "isInMouse = false;";
    document.body.appendChild(obj);
    document.getElementById("messageDiv").innerHTML = "<span class=\"closeBox\" onclick=\"hideDivMessage()\">×</span>";
}


function showDivMessage() {
    if (visitFlag) {
        if (divMessageFlag) {
            createDivMessage();
            divMessageFlag = false;
        }
        else {
            document.getElementById("messageDiv").style.display = "block";
        }
        visitFlag = false;
    }
}

//--关闭div
function hideDivMessage() {
    document.getElementById("messageDiv").style.display = "none";
    visitFlag = true;
}

function createDivQuick() {

    var obj = document.createElement("div");
    obj.id = "menuListFast";
    obj.style.border = "1px solid #8c9cbb";
    obj.style.height = "150px";
    obj.style.width = "120px";
    obj.style.margin = "10px";
    obj.style.margin = "0px";
    obj.style.padding = "0px";
    obj.style.boxShadow = "2px 2px 3px #b4b4b4";
    obj.style.position = "absolute";
    obj.style.left = "316px";
    obj.style.top = "36px";
    obj.style.borderRadius = "5px";
    obj.style.backgroundColor = "#fff";
    obj.onmousemove = "isInMouse = true;";
    obj.onmouseout = "isInMouse = false;";

    document.body.appendChild(obj);
    //  document.getElementById("messageDiv").innerHTML = "<span class=\"closeBox\" onclick=\"hide()\">×</span>";
}

function showDivQuick() {

    if (visitFlag) {
        if (divQuickFlag) {
            createDivQuick();
            divQuickFlag = false;
        } else {
            document.getElementById("menuListFast").style.display = "block";
        }
        visitFlag = false;
    }
}

function hideDivQuick() {
  //  alert("在哪");
    document.getElementById("menuListFast").style.display = "none";
    visitFlag = true;
}

document.onclick = function () {
  //  alert(visitFlag + "+" + isInMouse);
    if (visitFlag == false && isInMouse == false && divQuickFlag == false) {
        hideDivQuick();
    }
}




