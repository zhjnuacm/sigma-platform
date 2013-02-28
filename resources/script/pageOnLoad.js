function getWindowInfo() {
    // 获取窗口宽度 
    if (window.innerWidth) 
        winWidth = window.innerWidth; 
    else if ((document.body) && (document.body.clientWidth)) 
        winWidth = document.body.clientWidth; 
    // 获取窗口高度 
    if (window.innerHeight) 
        winHeight = window.innerHeight; 
    else if ((document.body) && (document.body.clientHeight)) 
        winHeight = document.body.clientHeight;
    document.body.style.width = winWidth;
}

function getStyle(obj, prop) {
    if (obj.currentStyle) {
        return obj.currentStyle[prop];
    } else if (window.getComputedStyle) {
        propprop = prop.replace(/([A-Z])/g, "-$1");
        propprop = prop.toLowerCase();
        return document.defaultView.getComputedStyle(obj, null)[prop];

    }
    return null;
}