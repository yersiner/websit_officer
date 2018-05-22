import util from "./util.js"

    util.addEvent(util.byEls(".has_sub_menu")[0],"mouseover",function () {
        if(util.hasClass(util.byEls(".drop_down")[0],"drop_down_leave")){
            util.removeClass(util.byEls(".drop_down")[0],"drop_down_leave")
        }
        util.addClass(util.byEls(".drop_down")[0],"drop_down_hover");
    })
    util.addEvent(util.byEls(".has_sub_menu")[0],"mouseleave",function () {
        if(util.hasClass(util.byEls(".drop_down")[0],"drop_down_hover")){
            util.removeClass(util.byEls(".drop_down")[0],"drop_down_hover")
        }
        util.addClass(util.byEls(".drop_down")[0],"drop_down_leave");
    })


