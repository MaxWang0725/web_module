function loadOnDemand(el){
    this.el = el
    this.imgs = el.querySelectorAll('img')
    this.init()
}
loadOnDemand.prototype = {
    init:function(){
        this.addEvent()
    },
    addEvent:function(){
        window.onscroll = function(e){
            var inner = window.innerHeight
            var windowY = window.scrollY
            console.log(windowY)
        }
    }
}