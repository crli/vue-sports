/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 存储cookie
 */
export const setCookie = (objName, objValue, objHours=30) =>{
  var str = objName + "=" + escape(objValue);
  if (objHours != null) {
      var date = new Date();
      var ms = objHours * 3600 * 1000 * 24;
      date.setTime(date.getTime() + ms);
      str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
}

/**
 * 获取cookie
 */
export const getCookie = (objName) => {
  var search = objName + "="  ;
  if (document.cookie.length > 0) {
    var offset = document.cookie.indexOf(search);
    if(offset != -1) {
        offset += search.length;
        var end = document.cookie.indexOf(";", offset);
        if(end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(offset, end));
    }else {
        return '';
    }
  }
}
/**
 * 删除cookie
 */
export const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if(cval!=null){
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
}
/**
 * 删除所有cookie
 */
export const clearCookie = () => {
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
  }
}
export const hasClass = (obj, cls) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export const addClass = (obj, cls) => {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

export const removeClass = (obj, cls)=> {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
export const dealurl = (url) => {
  if(url.indexOf("?")>-1){
    let queryStr = url.split("com/")[1];
    return 'type=' + queryStr.split("?")[0] + '?' + queryStr.split("?")[1]
  }else if(url.indexOf("mp4")>-1){
    // 视频
    return 'type=' + url
  }else{
    // 首页单个视频
    return 'video=' + url
  }
}
