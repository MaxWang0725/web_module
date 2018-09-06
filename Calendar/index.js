var Calendar = function (id){
    this.id = id
    this.date = {}
    this.newYear
    this.nowMonth
    this.nowDate 
    this.init()
    
}

Calendar.prototype = {
    init:function(){
        //初始化时间
        this.initData()
        this.template()
        //
        this.createCol()
        this.listener()

    },

    initData:function(){
        this._proto()
        var date = new Date()
        this.date = {
            year:date.getFullYear(),
            month:date.getMonth(),
            date:date.getDate(),
            day:date.getDay(),
            fDay:date.getfirstDay(),
            mDate:date.getMonthNums(),
            pMDate:date.getprveMonthNums()
        }

        this.nowYear = this.date.year
        this.nowMonth = this.date.month
        this.nowDate = this.date.date
        console.log(this.date)
    },
    reviseData:function(){
        var year = this.date.year
        var month = this.date.month
        var date = new Date()
        date.setFullYear(year)
        date.setMonth(month)
        date.setDate(1)
        
        this.date = {
            year:date.getFullYear(),
            month:date.getMonth(),
            day:date.getDay(),
            //date:date.getDate(),
            fDay:date.getfirstDay(),
            mDate:date.getMonthNums(),
            pMDate:date.getprveMonthNums()
        }
        console.log(this.date)
        
    },

    template:function(){
        this.id.innerHTML = '<table><tbody><tr class="title"><td><</td><td colspan="5" align="center"></td><td>></td></tr><tr class="days"><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></body></table>'
        var days = this.id.querySelector('.days').querySelectorAll('th')
        var tbody = this.id.querySelector('tbody')
        for(let i = 0;i < 6;i++){
            let a = this.createEle('tr',tbody,{'class':"col"})
            for(let j = 0;j < days.length;j++){
                this.createEle('td',a)
            }
        }
    },

    createCol:function(){
        this.createCol_Year()
        this.createCol_Date()
        this.createCol_prveDate()
        //this.createCol_nextDate()
    },
    createCol_Year:function(){
        var title = this.id.querySelector('.title').querySelectorAll('td')[1]
        title.innerText = this.date.year + '年' + (this.date.month + 1) + '月'
    },
    createCol_Date:function(){
        var tr = this.id.querySelectorAll('.col')
        var num = 1
        var nextNum = 1
        //第一行
        for(let i = this.date.fDay;i < tr[0].childNodes.length;i++){
            tr[0].childNodes[i].innerText = num
            tr[0].childNodes[i].style = ''
            
            if(num == this.newDate && this.date.year == this.nowYear && this.date.month == this.nowMonth) {
                tr[0].childNodes[i].style.color = 'blue'
            }
            num++
        }
        //第N行
        for(let i = 1;i < tr.length;i++){
            for(let j = 0;j < tr[i].childNodes.length;j++){
                if(num > this.date.mDate){
                    tr[i].childNodes[j].innerText = nextNum
                    tr[i].childNodes[j].style.color = 'gray'
                    nextNum++
                }else{
                    tr[i].childNodes[j].innerText = num
                    tr[i].childNodes[j].style = ''
                    if(num == this.nowDate && this.date.year == this.nowYear && this.date.month == this.nowMonth){
                        console.log(num)
                        tr[i].childNodes[j].style.color = 'blue'
                    }
                    num++
                }

                
            }
        }
    },
    createCol_prveDate:function(){
        var tr = this.id.querySelectorAll('.col')[0]
        var len = tr.childNodes.length
        var num = this.date.pMDate
        //console.log(tr.childNodes[1].lastChild !== null )
        for(let i = this.date.fDay - 1;i > -1;i--){
            tr.childNodes[i].innerText = num
            tr.childNodes[i].style.color = 'gray'
            num--
        }
    },
    createCol_nextDate:function(){
        var le = this.id.querySelectorAll('.col').length
        var tr = this.id.querySelectorAll('.col')[le - 1]
        var len = tr.childNodes.length
        var num = 1
        for(let i = 0;i < len;i++){
            if(tr.childNodes[i].firstChild === null){
                tr.childNodes[i].innerText = num
                tr.childNodes[i].style.color = 'gray'
                num++
            }
        }
    },


    listener:function(){
        this.cleanPreListener()
        this.prveListener()
        this.nextListener()
    },
    prveListener:function(){
        var that = this
        var btn = this.id.querySelector('.title').querySelectorAll('td')[0]
        btn.style.cursor = 'pointer'
        btn.addEventListener('mousedown',function(){
            if(that.date.month === 0){
                that.date.year = that.date.year - 1
                that.date.month = 11
            }else{
                that.date.month = that.date.month - 1
            }

            that.reviseData()
            that.createCol()
            
        })
    },
    nextListener:function(){
        var that = this
        var btn = this.id.querySelector('.title').querySelectorAll('td')[2]
        btn.style.cursor = 'pointer'
        btn.addEventListener('mousedown',function(){
            if(that.date.month == 11){
                that.date.year = that.date.year + 1
                that.date.month = 0
            }else{
                that.date.month = that.date.month + 1
            }

            that.reviseData()
            that.createCol()

        })
    },
    cleanPreListener:function(){
        var th = this.id.querySelectorAll('th')
        var td = this.id.querySelectorAll('td')
        for(let i = 0;i < th.length;i++){
            th[i].addEventListener('mousedown',function(e){
                e.preventDefault();
            })
        }
        for(let i = 0;i < td.length;i++){
            td[i].addEventListener('mousedown',function(e){
                e.preventDefault();
            })
        }
    },




    _proto:function(){
        //本月份一号的星期数
        Date.prototype.getfirstDay = function(){
            var year = this.getFullYear()
            var month = this.getMonth()
            var date = new Date()
            date.setFullYear(year)
            date.setMonth(month)
            date.setDate(1)
            var a = date.getDay()
            return a
        }
        //本月份的总天数
        Date.prototype.getMonthNums = function(){
            var year = this.getFullYear()
            var month = this.getMonth()
            var date = new Date()
            date.setFullYear(year)
            date.setMonth(month + 1)
            date.setDate(0)
            var a = date.getDate()
            return a
        }
        //上月份的总天数
        Date.prototype.getprveMonthNums = function(){
            var year = this.getFullYear()
            var month = this.getMonth()
            var date = new Date()
            date.setFullYear(year)
            date.setMonth(month)
            date.setDate(0)
            var a = date.getDate()
            return a
        }
    },
    createEle:function(ele,parent,attr,text){
        var el = document.createElement(ele)
        parent.appendChild(el)

        if(typeof attr === 'object'){
            for (const key in attr) {
                if (attr.hasOwnProperty(key)) {
                    el.setAttribute(key,attr[key])
                }
            }
        }
        
        if(typeof text === 'string'){
            console.log(text)
            el.innerHTML = text
        }
        
        return el
    }
}