var Carousel = function(obj){
    var Obj = {
        el:null,
        btn:'arrow',
        time:4000,
        mouseEnter:false,
        //
        num:0,
        timer:null,
        times:null,
    }
    this.O = Object.assign(Obj,obj)
    //
    this.pic = this.O.el.querySelectorAll('div')[0]
    this.imgs = this.O.el.querySelectorAll('img')
    this.length = this.imgs.length
    this.Width = this.O.el.offsetWidth
    this.Height = this.O.el.offsetHeight
    //


    this.init()
}
Carousel.prototype = {
    init:function(){
        this.createSlider()
    },
    createSlider:function(){
        // 1.
        this.createStyle()
        this.createBtn()
        //
        this.autoPlay()
    },
    autoPlay:function(){
        var that = this
        this.O.num++
        this.O.timer = setInterval(function(){
            console.log(that.O.num)
            that.animalImg(that)
            that.animalBtn(that)
        },that.O.time)
        
    },
    //create
    createStyle:function(){
        this.O.el.style.overflow = 'hidden'
        this.O.el.style.fontSize = 0
        this.pic.style.width = 100 * this.length + '%'
        //this.pic.style.width = this.Width * this.imgs.length + 'px'
        //this.pic.style.height = this.Height + 'px'
        this.pic.style.position = 'relative'
        for(let i = 0;i < this.length;i++){
            this.imgs[i].style.width = this.Width + 'px'
            this.imgs[i].style.height = this.Height + 'px'
        }
    },
    createBtn:function(){
        var btn = this._createELement('div',this.O.el,"btn")
        for(let i = 0;i < this.length;i++){
            if(i == 0){
                this._createELement('span',btn,'btn_round btn_hover')
            }else{
                this._createELement('span',btn,'btn_round')
            }
        }
        this.btn = this.O.el.querySelectorAll('.btn')[0]
        this.rounds = this.O.el.querySelectorAll('.btn_round')
    },
    _createELement:function(el,parent,classname){
        var a = document.createElement(el)
        a.className = classname
        parent.appendChild(a)
        return a
    },
    //animal
    animalImg:function(that){
        var pLeft = that.pic.offsetLeft
        //console.log(pLeft + '  ' + (-that.O.num * that.Width))
        //                                                           
        // 0. 000      1. -200      2. -400      3. -600
        // 0 * w + w   1 * w + w    2 * w + w    3 * w  + w 
        if(pLeft == 0 && that.O.num == that.length){
            that.O.num = 1
        }else if(that.O.num == that.length ){
            that.pic.style.left = pLeft + (that.Width * (that.length - 1) * 0.1) + 'px'
            that.O.times = setTimeout(function(){that.animalImg(that)},100)
        }else if(pLeft !== (-that.O.num * that.Width)){
            that.pic.style.left =  pLeft - (that.Width * 0.1) + 'px'
            that.O.times = setTimeout(function(){that.animalImg(that)},100)
        }else{
            that.O.num++
        }
    },
    animalBtn:function(that){
        console.log(that.O.num - 1)
        for(let i = 0;i < that.rounds.length;i++){
            if(that.O.num == that.length){
                that.rounds[0].setAttribute('class','btn_round btn_hover')
                that.rounds[that.length - 1].setAttribute('class','btn_round')
            }else if(i == that.O.num){
                that.rounds[i].setAttribute('class','btn_round btn_hover')
            }else{
                that.rounds[i].setAttribute('class','btn_round')
            }
        }
    }

}