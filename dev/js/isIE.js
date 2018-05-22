var util = {
    hasClass: function hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
    addClass: function addClass(elem, cls) {
        if (!this.hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    },
    css : function css(ele,obj) {
          if(typeof obj == "object"){
                for(var key in obj){
                    ele.style[key] = obj[key]
                }
          }
    },
    removeClass: function removeClass(elem, cls) {
        if (this.hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    addEvent: function addEvent(ele, type, fn) {
        if (window.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else if (window.attachEvent) {
            ele.attachEvent("on" + type, fn);
        } else {
            ele["on" + type] = fn;
        }
    },
    delEvent: function delEvent(el, type, fn) {
        if (window.removeEventListener) {
            el.removeEventListener(type, fn, false);
        } else if (window.detachEvent) {
            el.detachEvent("on" + type, fn);
        } else {
            el["on" + type] = null;
        }
    },
    isIE: function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }
    },
    ieNum : function ieNum() {
        var agent =  /MSIE\s(\d*)/.exec(window.navigator.userAgent);
        if(agent==null){
            agent=12;
        }else{
            agent = agent[1];
        }
        return agent;
    },
    d_height : function d_height() {
        return window.innerHeight?window.innerHeight:window.body.clientHeight;
    },
    rect_des : function rect_des(dom) {
        var _rect = dom.getBoundingClientRect();
        var _client_top = document.documentElement.clientTop
        var _client_left = document.documentElement.clientLeft;
        return {
            left : _rect.left - _client_left,
            top : _rect.top - _client_top
        }
    }
};
function getElementsByClassName(className) {
    if(document.getElementsByClassName){
        return document.getElementsByClassName(className);
    }else{
        var children = document.getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j=0; j<classNames.length; j++){
                if (classNames[j] == className){
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    }
};
function getElementsByTagName(tag) {
    if(document.getElementsByTagName){
        return document.getElementsByTagName(tag);
    }else{
        var children = document.getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
            var child = children[i];
            var classNames = child.nodeName
            for (var j=0; j<classNames.length; j++){
                if (classNames[j] == tag.toUpperCase()){
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    }
}
//导航
(function () {
    var hasSub = getElementsByClassName("has_sub_menu")[0],
        drop_down = getElementsByClassName("drop_down")[0];
        if(util.ieNum()>9){
            util.addEvent(hasSub,"mouseover",function () {
                if(util.hasClass(drop_down,"drop_down_leave")){
                    util.removeClass(drop_down,"drop_down_leave")
                }
                util.addClass(drop_down,"drop_down_hover");
            })
            util.addEvent(hasSub,"mouseleave",function () {
                if(util.hasClass(drop_down,"drop_down_hover")){
                    util.removeClass(drop_down,"drop_down_hover")
                }
                util.addClass(drop_down,"drop_down_leave");
            })
        }else{
            util.addClass(drop_down,"hide")
            util.addEvent(hasSub,"mouseover",function () {
                if(util.hasClass(drop_down,"hide")){
                    util.removeClass(drop_down,"hide")
                }
              //  util.addClass(drop_down,"drop_down_hover");
            })
            util.addEvent(hasSub,"mouseleave",function () {
                if(!util.hasClass(drop_down,"hide")){
                    util.addClass(drop_down,"hide");
                }
               // util.addClass(drop_down,"drop_down_leave");
            })
        }

    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?6fc94fb33515bad08437d52ff7c45c96";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
})();
/*声明*/
(function () {
        /*控制页面显示*/
    function runPage() {
        var _type = "";
        //点击导航
        var _nav = document.getElementById("state_nav"),
            _navChild = _nav.children,
            _showBox = getElementsByClassName("s_des")[0],
            _showChild = _showBox.children,
            _title = getElementsByClassName("s_title");
        if(location.hash===""){
            _type = "law";
            util.removeClass(getElementsByClassName(_type)[0],"hide");
            util.addClass(_navChild[0],"active");
            _title[0].children[0].innerText = _navChild[0].children[0].innerHTML;
        }else{
            _type = (location.hash).replace(/#/,"");
            util.removeClass(getElementsByClassName(_type)[0],"hide");
            for(var x=0;x<_navChild.length;x++){
                if(_navChild[x].getAttribute("state")){
                    if(_navChild[x].getAttribute("state")==_type){
                        util.addClass(_navChild[x],"active");
                        _title[0].children[0].innerText = _navChild[x].children[0].innerText;
                    }
                }else{
                    if(_navChild[x].state==_type){
                        util.addClass(_navChild[x],"active");
                        _title[0].children[0].innerText = _navChild[x].children[0].innerText;
                    }
                }
            }
        }
        //点击事件
        for(var i=0;i<_navChild.length;i++){
            (function (i) {
                util.addEvent(_navChild[i],"click",function () {
                    _title[0].children[0].innerText = _navChild[i].children[0].innerHTML;
                    //增加导航的active
                    for(var m=0;m<_navChild.length;m++){
                        util.removeClass(_navChild[m],"active");
                    }
                    util.addClass(_navChild[i],"active");
                    if(this.getAttribute){
                        _type = _navChild[i].getAttribute("state");
                    }else{
                        _type = _navChild[i].state;
                    }
                    for(var n=0;n<_showChild.length;n++){
                        util.addClass(_showChild[n],"hide");
                    }
                    util.removeClass(getElementsByClassName(_type)[0],"hide");
                })
            })(i)
        }

    }
    if(/state/.test(location.pathname)){
            runPage();
    }
    if(util.ieNum()>9){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    }
})();
/*点击回到顶部*/
(function () {
    var isTop = true;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    var btnBack = document.getElementById('backTop');
    var timer = null;
    //添加点击事件
    util.addEvent(btnBack, 'click', function () {
        timer = setInterval(function () {
            //获取滚动条到顶部的距离
            //我们需要兼容一些浏览器的写法 所以需要使用||兼容chrome
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;

            //返回一个整数
            var speed = Math.floor(-osTop / 5);
            //滚动事件
            isTop = true;
            //设置滚动条到顶部的距离
            //我们需要兼容一些浏览器的写法 所以需要使用||兼容chrome
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            //这里必须设置为真 如果为假 在触发滚动事件的时候 就会关闭定时器
            if (osTop <= 0) {
                clearInterval(timer);
            }
        }, 50);
    });
    window.onscroll = document.onscroll = function () {
        //获取滚动条到顶部的距离
        //我们需要兼容一些浏览器的写法 所以需要使用||兼容chrome
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(getElementsByClassName("arrow_down")[0]){
            if(osTop>0){
                util.addClass(getElementsByClassName("arrow_down")[0],"hide")
            }else{
                util.removeClass(getElementsByClassName("arrow_down")[0],"hide");
            }
        }
        //滚动到第二屏的时候 会出现回到顶部的按钮
        if (osTop > 200) {
            util.removeClass(btnBack,"hide")
            if(util.ieNum()>10){
                util.addClass(btnBack,"animated bounceInDown")
            }
        }
        else {
           util.addClass(btnBack,"hide")
            if(util.ieNum()>10){
                util.removeClass(btnBack,"animated bounceInDown");
            }
        }

        if (isTop<0) {
            clearInterval(timer);
        }
        isTop = false;
    }
})();
/*智能设备*/
(function () {
    function runEffect() {
      var p_dev_content  = getElementsByClassName("p_dev_content"),
          p_dev_item = getElementsByClassName("p_dev_item"),
          p_footer = getElementsByClassName("footer"),
          p_dev_header = getElementsByClassName("p_dev_header"),
          p_roll = getElementsByClassName("roll_item"),
          d_height = util.d_height();
/*页面初始化*/
      util.css(p_dev_content[0],{height:"100%"});
      util.css(p_footer[0],{display:"none"});

       for(var item=0;item<p_dev_item.length;item++){
           util.css(p_dev_item[item],{height:d_height+"px"})
       }
      util.addClass(p_dev_header[0],"fixed_top");
      util.addClass(getElementsByTagName("body")[0],"body");
      var scroll = false,
          active = 0;

      function to_roll(active) {
          for(var i=0;i<p_roll.length;i++){
              util.removeClass(p_roll[i],"active")
              if(i==active){
                  util.addClass(p_roll[i],"active")
              }
          }
      }
      to_roll(active)
      util.addEvent(document,"mousewheel",function (event) {
          if(event.wheelDelta<0){
              if(!scroll){
                  if(active<p_dev_item.length-1){
                      scroll = true;
                      setTimeout(function () {
                          active ++;
                          util.css(p_dev_content[0],{transform: "translate3d(0,"+(-d_height*active)+"px,0)"});
                          scroll = false;
                          to_roll(active)
                      },500)
                  }
                 console.log("active向下:"+active)
              }
          }else{
              if(!scroll){
                  if(active>0){
                      scroll = true;
                      setTimeout(function () {
                          active --;
                          util.css(p_dev_content[0],{transform: "translate3d(0,"+(-d_height*active)+"px,0)"});
                          scroll = false;
                          to_roll(active)
                      },500)
                      console.log("active向上:"+active)
                  }
              }
          }
      });
      util.addEvent(document,"DOMMouseScroll",function (event) {
          if(event.detail>0){
              if(!scroll){
                  if(active<p_dev_item.length-1){
                      scroll = true;
                      setTimeout(function () {
                          active ++;
                          util.css(p_dev_content[0],{transform: "translate3d(0,"+(-d_height*active)+"px,0)"});
                          scroll = false;
                          to_roll(active)
                      },500)
                  }
                  console.log("active向下:"+active)
              }
          }else{
              if(!scroll){
                  if(active>0){
                      scroll = true;
                      setTimeout(function () {
                          active --;
                          util.css(p_dev_content[0],{transform: "translate3d(0,"+(-d_height*active)+"px,0)"});
                          scroll = false;
                          to_roll(active)
                      },500)
                      console.log("active向上:"+active)
                  }
              }
          }
      })
    }
    if(/dev/.test(location.pathname)){
        runEffect();
    }
})()