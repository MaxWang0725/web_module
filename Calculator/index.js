

function Calculator(id){
    this.el = document.querySelector(id)
    this.inp = this.el.querySelectorAll('.value')[0].querySelectorAll('input')[0]
    this.data = []
    this.num = ''
    this.ope = ''
    this.end 
    this.init()
}

Calculator.prototype = {
    init:function(){
        this.addEvent()
    },
    addEvent:function(){
        var that = this
        var span = this.el.querySelectorAll('span')
        for(let i = 0;i < span.length;i++){
            span[i].addEventListener('mousedown',function(){
                var val = this.innerText
                that.addData(val)
            })
        }
    },
    addData:function(val){
        //var len = this.data.length
                switch(val){
                    case '+':
                    if(this.num.length !== 0){
                        this.data.push(parseFloat(this.num),'+')
                        if(this.data.length == 4) this.ariData()
                        this.num = '' 
                    }
                        break;
                    case '-':
                        this.data.push(parseFloat(this.num),'-')
                        if(this.data.length == 4) this.ariData()
                        this.num = '' 
                        break;
                    case 'x':
                        this.data.push(parseFloat(this.num),'x')
                        if(this.data.length == 4) this.ariData()
                        this.num = '' 
                        break;
                    case '/':
                        this.data.push(parseFloat(this.num),'/')
                        if(this.data.length == 4) this.ariData()
                        this.num = '' 
                        break;
                    case '%':
                        this.data.push(parseFloat(this.num),'%')
                        if(this.data.length == 4) this.ariData()
                        this.num = '' 
                    case '--':
                        
                        break;
                    case '.':
                        break;
                    case 'AC':
                        this.num = ''
                        this.data = []
                        this.inp.value = 0
                        break;
                    case '=':
                        if(this.num.length !== 0){
                            this.data.push(parseFloat(this.num))
                            this.ariData()
                            
                        }
                        break;
                    default:
                        if(this.num.length == 0){
                            this.num = val
                        }else{
                            this.num += val
                        }
                        this.inp.value = this.num
                        break;
                }
                console.log(this.data + ' | ' + this.num)
    },
    ariData(){
        //data = [num,'+',num,'=']
        //console.log(this.data)
        for(let i = 0;i < this.data.length;i++){
            switch(this.data[i]){
                case '+':
                    this.end = this.data[i-1] - this.data[i+1]
                    this.data.splice(0,3,this.end)
                    this.
                    break;
                case '-':
                    if(this.data.length !== 0){
                        this.end = this.data[i-1] - this.data[i + 1]
                        this.data.splice(0,3,this.end)
                        this.num = this.end
                        this.inp.value = this.num
                    }
                    break;
                case 'x':
                    if(this.data.length !== 0){
                        this.end = this.data[i-1] * this.data[i + 1]
                        this.data.splice(0,3,this.end)
                        this.num = this.end
                        this.inp.value = this.num
                    }
                    break;
                case '/':
                    if(this.data.length !== 0){
                        this.end = this.data[i-1] / this.data[i + 1]
                        this.data.splice(0,3,this.end)
                        this.num = this.end
                        this.inp.value = this.num
                    }
                    break;
                case '=':
                    
                default :
                    
                    break;
            }
            
        }
    }



}