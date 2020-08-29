class Main {
    constructor(btn) {
        this.btn = btn || document.querySelector("input")
        this.map = new Map()
        this.food = new Food()
        this.snake = new Snake({}, this.food)
        this.control=document.querySelector("ul")
        this.init()
    }
    init() {
        this.keyEvent()
        this.mouseEvent()
        this.startRun()
    }
    keyEvent() {
        on(document, "keydown", (e) => {
            const code = e.keyCode
            switch (code) {
                case 37:
                    this.snake.direction != "right" && (this.snake.direction = "left")
                    break
                case 38:
                    this.snake.direction != "down" && (this.snake.direction = "up")
                    break
                case 39:
                    this.snake.direction != "left" && (this.snake.direction = "right")
                    break
                case 40:
                    this.snake.direction != "up" && (this.snake.direction = "down")
                    break
            }
        })
    }
    mouseEvent(){
        on(this.control,"click",(e)=>{
            e=e||window.event
            const target=e.target||e.srcElement
            if(target.nodeName==="LI"&&target.className==="up"){
                this.snake.direction!="down"&&(this.snake.direction="up")
            }
            else if(target.nodeName==="LI"&&target.className==="down"){
                this.snake.direction!="up"&&(this.snake.direction="down")
            }
            else if(target.nodeName==="LI"&&target.className==="left"){
                this.snake.direction!="right"&&(this.snake.direction="left")
            }
            else if(target.nodeName==="LI"&&target.className==="right"){
                this.snake.direction!="left"&&(this.snake.direction="right")
            }
        })
    }
    startRun(){
        on(this.btn,"click",()=>{
            this.snake.move()
        })
    }
}