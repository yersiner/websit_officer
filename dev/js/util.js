export default {
    hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
    addClass(elem, cls) {
        if (!this.hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    },
    removeClass(elem, cls) {
        if (this.hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    addEvent(ele,type,fn){
        if(window.addEventListener){
            ele.addEventListener(type,fn,false);
        }else if(window.attachEvent){
            ele.attachEvent("on"+type,fn);
        }else{
            ele["on"+type] = fn;
        }
    },
    delEvent(el,type,fn){
        if(window.removeEventListener){
            el.removeEventListener(type,fn,false)
        }else if(window.detachEvent){
            el.detachEvent("on"+type,fn)
        }else{
            el["on"+type] = null;
        }
    },
    byEls(el){
        if(!el){
            new Error("获取元素参数错误")
        }
        if(/\./.test(el)){
            el = el.replace(/\./,"")
            let _dom = document.getElementsByClassName(el)
            return[..._dom]
        }else if(/#/.test(el)){
            el = el.replace(/#/,"");
            return document.getElementById(el);
        }else{
            let tag = document.getElementsByTagName(el);
            return [...tag]
        }
    },
    isIE(){
        if(!!window.ActiveXObject||"ActiveXObject" in window){
            return true;
        }else{
            return false;
        }
    }
}