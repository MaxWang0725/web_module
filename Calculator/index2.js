function Calculator(id){
    this.el = document.querySelector(id)
    this.data = []
    this.num = ''
    this.arith

    this.init()
}

Calculator.prototype = {
    init:function(){
        this.inp = this.el.querySelector('input')
        this.p = this.el.querySelector('p')
        this.addEvent()
    },
    addEvent:function(){
        var span = this.el.querySelectorAll('span')
        var that = this
        for(let i = 0;i < span.length;i++){
            span[i].addEventListener('mousedown',function(){
                var val = this.innerText
                that.addData(val)
                if(that.num.length !== 0){
                    document.querySelector('.cow1').querySelector('span').innerText = 'C'
                }else{
                    document.querySelector('.cow1').querySelector('span').innerText = 'AC'
                }
                that.p.innerText = that.data + '||' + that.num + '||' + that.arith
            })
        }
        

    },
    //1. 输入num
    //2. 输入运算符号       a.[num,'+']    
    //3  输入num            
    //4  输入运算符号       b.[num,'+',num]     arith = '+'    num = end
    //4  输入==号           b.[num,'+',num]     
    //5  求和 + 运算符      求和
    addData:function(val){
        switch(val){
            case "+":
            this.arith = "+"
            /*
            if(typeof this.data[1] !== 'number' && this.data.length === 2 && this.num.length !== 0){     
                this.data[2] = parseFloat(this.num)
                this.ariData()
            }else if(this.data.length == 2){
                this.data[1] = this.arith
            }else if(this.num.length !== 0){
                this.data[0] = parseFloat(this.num)
                this.data[1] = this.arith
            }
            this.num = ''
            */
            this.judgement()
            break;
            case "-":
                this.arith = "-"
                this.judgement()
                break;
            case "x":
                this.arith = 'x'
                this.judgement()
                break;
            case '/':
                this.arith = '/'
                this.judgement()
                break;
            case '%':
                this.arith = '%'
                this.judgement()
                break;
            //
            case '--':
                this.num = -this.num
                break;
            case '.':
                this.num += '.'
                break;    
            case '=':
                this.arith = '='
                if(this.data.length !==1  && this.num.length !== 0){
                    this.data[2] = parseFloat(this.num)
                    this.ariData()
                }
                this.num = ''
                break;
            case 'AC':
                this.data = []
                this.num = ''
                this.arith = ''
                this.inp.value = '0'
                break;
            case 'C':
                this.num = ''
                this.inp.value = 0
                break;
            default:
                if(this.data[1] == '=' && typeof this.end == 'number'){         //判断是否初始化
                    this.data = []
                }   
                this.num += val
                this.inp.value = this.num
                break;
        }
    },
    ariData:function(){
        //[num,'+',num]
        switch(this.data[1]){
            case '+':
                this.end = this.data[0] + this.data[2]
                this.data.splice(0,3,this.end,this.arith)
                this.inp.value = this.end
                break;
            case '-':
                this.end = this.data[0] - this.data[2]
                this.data.splice(0,3,this.end,this.arith)
                this.inp.value = this.end            
                break;
            case 'x':
                this.end = this.data[0] * this.data[2]
                this.data.splice(0,3,this.end,this.arith)
                this.inp.value = this.end            
                break;
            case '/':
                this.end = this.data[0] / this.data[2]
                this.data.splice(0,3,this.end,this.arith)
                this.inp.value = this.end            
                break;
            case '%':
                this.end = this.data[0] % this.data[2]
                this.data.splice(0,3,this.end,this.arith)
                this.inp.value = this.end            
                break;
            case '=':
                
                break;
        }
    },
    judgement:function(){
        if(typeof this.data[1] !== 'number' && this.data.length === 2 && this.num.length !== 0){     
            this.data[2] = parseFloat(this.num)
            this.ariData()
        }else if(this.data.length == 2){
            this.data[1] = this.arith
        }else if(this.num.length !== 0){
            this.data[0] = parseFloat(this.num)
            this.data[1] = this.arith
        }
        this.num = ''
    }
}