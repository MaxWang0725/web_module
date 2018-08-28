function Audio(el,src){
    this.el = el
    this.src = src
    this.audio = this.el.querySelector('audio')
    this.numMusic = 0
    this.deg = 0
    this.timePlay
    this.timeGround
    this.timeCover
    this.timeRotate
    this.timeBar
    this.init()
}
Audio.prototype = {
    init:function(){
        this.addScr()
        this.addGround()
        this.addEvent()
        //console.log(this.src)
    },
    addScr:function(){
        this.audio.src = this.src[this.numMusic].src
        //this.createObj()
    },
    addGround:function(){
        var pName = this.el.querySelector('.bGround').querySelector('.name')
        var pSinger = this.el.querySelector('.bGround').querySelector('.singer')
        //var dBar = this.el.querySelector('.bGround').querySelector('.progressBar')
    
        pName.innerText = this.src[this.numMusic].name
        pSinger.innerText = this.src[this.numMusic].src
    },
    addEvent:function(){
        this.playEvent()
        this.prevEvent()
        this.nextEvent()
        this.progressBarTime()
    },
    //发布-订阅者模式
    createObj:function(){
        var that = this
        this.src.forEach(function(key){
            //key._time = 0
            var val = key.time
            Object.defineProperty(key,'time',{
                get:function(){
                    return val
                },
                set:function(newVal){
                    val = newVal
                    //console.log(this.time)
                    this.timeBar = setTimeout(that.musicTime,1000)    
                }
            })
        });
    },
    musicTime:function(){
        console.log(this.src[this.numMusic].time)
        console.log(parseInt(this.audio.currentTime))
        //this.src[this.numMusic].time = parseInt(this.audio.currentTime)
        
    },
    //Event
    playEvent:function(){
        var that = this
        var play_pause = this.el.querySelector('.play-pause')
        var pSpan = play_pause.querySelectorAll('span')
        var play_pauseColor = window.getComputedStyle(play_pause,null).backgroundColor

        play_pause.addEventListener('mousedown',function(){
            
            if(pSpan[0].getAttribute('class') == 'play-icon'){
                that.playEndTranslate()
                that.bGroundUp()
                that.coverUp()
                that.coverRotate()
                that.audio.play()
                
            }else if(pSpan[0].getAttribute('class') == 'pause-icon'){
                that.pauseEndTranslate()
                that.bGroundDown()
                that.coverDown()
                that.clearRotate()
                that.audio.pause()
            }else{
                console.log('!')
            }
        })
        //mouseout / mouseover
    },
    prevEvent:function(){
        var that = this
        var prev = this.el.querySelector('.prev')
        prev.addEventListener('mousedown',function(){
            if(that.numMusic == 0){
                that.numMusic = that.src.length - 1
            }else{
                that.numMusic--
            }
            that.audio.src = that.src[that.numMusic].src
            that.bGroundUp()
            that.coverRotate()
            that.audio.play()
        })
    },
    nextEvent:function(){
        var that = this
        var next = this.el.querySelector('.next')
        var pSpan = this.el.querySelector('.play-pause').querySelectorAll('span')
        next.addEventListener('mousedown',function(){
            if(that.numMusic == that.src.length - 1){
                that.numMusic = 0
            }else{
                that.numMusic++
            }
            if(pSpan[0].getAttribute('class') == 'play-icon'){
                pSpan[0].setAttribute('class','pause-icon')
                pSpan[1].setAttribute('class','pause-icon')
            }
            that.audio.src = that.src[that.numMusic].src
            that.bGroundUp()
            that.coverRotate()
            that.audio.play()
        })
    },
    progressBarTime:function(){
        var that = this
        var bar = this.el.querySelector('.progressBar')
        var sBar = bar.querySelector('.bar-time')
        var width = parseFloat(window.getComputedStyle(bar,null).width)

        this.audio.addEventListener('timeupdate',function(){
            var time = parseFloat(that.audio.duration).toFixed(2)
            var nTime = parseFloat(that.audio.currentTime).toFixed(2)

            sBar.style.width = (nTime/time) * width + 'px'
        })

    },
    //translate
    bGroundUp:function(){
        clearTimeout(this.timeGround)
        var that = this
        var bGround = this.el.querySelector('.bGround')
        var bTop = parseFloat(window.getComputedStyle(bGround,null).top),
            bOpa = parseFloat(window.getComputedStyle(bGround,null).opacity)
        
        if(bTop > -62){
            bGround.style.opacity = bOpa + 0.05
            bGround.style.top = bTop - 4 + 'px'
            this.timeGround = setTimeout(function(){
                that.bGroundUp()
            },10)
        }
    },
    bGroundDown:function(){
        clearTimeout(this.timeGround)
        var that = this
        var bGround = this.el.querySelector('.bGround')
        var bTop = parseFloat(window.getComputedStyle(bGround,null).top),
            bOpa = parseFloat(window.getComputedStyle(bGround,null).opacity)
        
        if(bTop < 1){
            bGround.style.opacity = bOpa - 0.05
            bGround.style.top = bTop + 4 + 'px'
            this.timeGround = setTimeout(function(){
                that.bGroundDown()
            },10)
        }
    },
    coverUp:function(){
        clearTimeout(this.timeCover)
        var that = this
        var img = this.el.querySelector('.box-cover').querySelector('img')
        var iTop = parseFloat(window.getComputedStyle(img,null).top),
            iLeft = parseFloat(window.getComputedStyle(img,null).left)
            iWidth = parseFloat(window.getComputedStyle(img,null).width),
            iHeight = parseFloat(window.getComputedStyle(img,null).height)

        if(iTop > -35){
            img.style.top = iTop - 3 + 'px'
            img.style.left = iLeft - 1 + 'px'
            img.style.width = iWidth + 1 + 'px'
            img.style.height = iHeight + 1 + 'px'

            this.timeCover = setTimeout(function(){
                that.coverUp()
            },10)
        }
        img.style.boxShadow = '0px 10px 16px 0 #cdcccc'

    },
    coverDown:function(){
        clearTimeout(this.timeCover)
        var that = this
        var img = this.el.querySelector('.box-cover').querySelector('img')
        var iTop = parseFloat(window.getComputedStyle(img,null).top),
            iLeft = parseFloat(window.getComputedStyle(img,null).left)
            iWidth = parseFloat(window.getComputedStyle(img,null).width),
            iHeight = parseFloat(window.getComputedStyle(img,null).height)

            if(iTop < -25){
                img.style.top = iTop + 3 + 'px'
                img.style.left = iLeft + 1 + 'px'
                img.style.width = iWidth - 1 + 'px'
                img.style.height = iHeight - 1 + 'px'
    
                this.timeCover = setTimeout(function(){
                    that.coverDown()
                },10)
            }
            img.style.boxShadow = ''
    },
    coverRotate:function(){
        clearInterval(this.timeRotate)
        var that = this
        var img = this.el.querySelector('.box-cover').querySelector('img')

        this.timeRotate = setInterval(function(){
            img.style.transform = 'rotate(' + that.deg + 'deg)'
            that.deg +=1
            if(that.deg > 360){
                that.deg = 0
            }
        },30)
        
        
    },
    clearRotate:function(){
        clearInterval(this.timeRotate)
    },
    playEndTranslate:function(){
        clearTimeout(this.timePlay)
        var that = this
        var pSpan = this.el.querySelector('.play-pause').querySelectorAll('span'),
            pWidth = parseFloat(window.getComputedStyle(pSpan[0],null).borderWidth)
            pOpa = parseFloat(window.getComputedStyle(pSpan[0],null).opacity)
            //console.log(typeof pOpa)
            if(pOpa > 0){
                pSpan[0].style.opacity = pOpa - 0.1
                pSpan[0].style.borderWidth = pWidth - 0.5 + 'px'
                pSpan[0].style.borderRightWidth = 0
                this.timePlay = setTimeout(function(){
                    that.playEndTranslate()
                },30)
            }else{
                pSpan[0].style = ''
                pSpan[0].setAttribute('class','pause-icon')
                pSpan[1].setAttribute('class','pause-icon')
            }
    },
    pauseEndTranslate:function(){
        clearTimeout(this.timePlay)
        var that = this
        var pSpan = this.el.querySelector('.play-pause').querySelectorAll('span'),
            pLeft_1 = parseFloat(window.getComputedStyle(pSpan[0],null).left),
            pLeft_2 = parseFloat(window.getComputedStyle(pSpan[1],null).left),
            pOpa_1 = parseFloat(window.getComputedStyle(pSpan[0],null).opacity),
            pOpa_2 = parseFloat(window.getComputedStyle(pSpan[1],null).opacity)

            if(pOpa_1 > 0 && pOpa_2 > 0){
                pSpan[0].style.left = pLeft_1 - 1 + 'px'
                pSpan[0].style.opacity = pOpa_1 - 0.2
                pSpan[1].style.left = pLeft_2 + 1 + 'px'
                pSpan[1].style.opacity = pOpa_2 - 0.2
                this.timePlay = setTimeout(function(){
                    that.pauseEndTranslate()
                },50)
            }else{
                pSpan[0].style = ''
                pSpan[1].style = ''
                pSpan[0].setAttribute('class','play-icon')
                pSpan[1].setAttribute('class','')
            }







    },
    //进度条播放
    createMusicTime:function(){
        var that = this
        var bar = this.el.querySelector('.bGround').querySelector('.progressBar')
        var barTime = bar.querySelector('.bar-time')
        var bWidth = parseFloat(window.getComputedStyle(bar,null).width)
        
        this.audio.oncanplay = function(){
            var musicTime = that.audio.duration
            console.log(musicTime)
        }
        
    },
    barTime:function(){

    }
}