import  util from "./util.js"
class statePage{
    constructor(click,show){
           this.click = click;
           this.show = show;
    }
    init (){
        this.getCurrentObj()
        this.clickObj()
    }
    getUrl(){
        const {hash} = location;
        return   hash;
    }
    getCurrentObj(){
        let type = this.getUrl();
        if(!type){
            type = "#law"
        }
        const childs = this.click.getElementsByTagName("li");
        const s_title = document.getElementsByClassName("s_title")[0].getElementsByTagName("p")[0]

        type = type.replace(/#/,"");
        const currentM = document.getElementsByClassName(type)[0];
        for(let i=0;i<childs.length;i++){
            if(childs[i].getAttribute("state")==type){
                s_title.innerText =  childs[i].getElementsByTagName("a")[0].innerText
                util.addClass(childs[i],"active");
                util.removeClass(currentM,"hide");
            }
        }
    }
    clickObj(){
        const childs = this.click.getElementsByTagName("li");
        const s_title = document.getElementsByClassName("s_title")[0].getElementsByTagName("p")[0]
        const shows = this.show.children;
        let _self = this;
        for(let i=0;i<childs.length;i++){
            childs[i].onclick = function () {
                s_title.innerText =  childs[i].getElementsByTagName("a")[0].innerText
                for(let n =0;n<childs.length;n++){
                    util.removeClass(childs[n],"active");
                }
                util.addClass(childs[i],"active");
                let type = this.getAttribute("state");
                for(let y=0;y<shows.length;y++){
                   if(!util.hasClass(shows[y],"hide")){
                       util.addClass(shows[y],"hide")
                   }
                };
                util.removeClass(document.getElementsByClassName(type)[0],"hide");
            }
        }
    }
}
    const {pathname} = location;
    if(pathname.indexOf("state")>0){
        new statePage(document.getElementsByClassName("state_nav")[0],document.getElementsByClassName("s_des")[0]).init();
    }

    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    wow.init();



