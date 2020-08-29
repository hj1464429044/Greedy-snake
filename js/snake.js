class Snake {
    constructor(options, food) {
        options = options || {}
        this.food = food
        this.width = options.width || 20
        this.height = options.height || 20
        this.map = document.querySelector(".map")
        this.timer = null
        this.direction = "right"
        this.body = [
            {
                x: 3,
                y: 2,
                ele: document.createElement("div"),
                color: "#0f0"
            },
            {
                x: 2,
                y: 2,
                ele: document.createElement("div"),
                color: "pink"
            },
            {
                x: 1,
                y: 2,
                ele: document.createElement("div"),
                color: "pink"
            }
        ]
        this.init()
    }
    init() {
        this.body.forEach(item => {
            setStyle(item.ele, "width", this.width + "px")
            setStyle(item.ele, "height", this.height + "px")
            setStyle(item.ele, "background-color", item.color)
            setStyle(item.ele, "border-radius", "50%")
            setStyle(item.ele, "position", "absolute")
            setStyle(item.ele, "left", item.x * this.width + "px")
            setStyle(item.ele, "top", item.y * this.height + "px")
            this.map.appendChild(item.ele)
        })
    }
    move() {
        this.timer = setInterval(() => {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x
                this.body[i].y = this.body[i - 1].y
            }
            const head = this.body[0]
            switch (this.direction) {
                case "right":
                    head.x++
                    break
                case "left":
                    head.x--
                    break
                case "up":
                    head.y--
                    break
                case "down":
                    head.y++
                    break
            }
            this.body.forEach(item => {
                setStyle(item.ele, "left", item.x * this.width + "px")
                setStyle(item.ele, "top", item.y * this.height + "px")
            })
            if (head.x < 0 || head.y < 0 || head.x > Math.floor(this.map.offsetWidth / this.width - 1) || head.y > Math.floor(this.map.offsetHeight / this.height - 1)) {
                alert("Game Over!")
                clearInterval(this.timer)
            }
            // 判断是否吃到食物
            if (head.x === this.food.randomW && head.y === this.food.randomH) {
                // 吃到食物以后，食物重新生成一次
                this.food.init()
                // 蛇添加一节
                this.body.push({
                    x: this.body[this.body.length - 1].x,
                    y: this.body[this.body.length - 1].y,
                    ele: document.createElement("div"),
                    color: getColor()
                })
                // 吃到食物以后，重新生成一次身体
                this.init()
            }
            // 判断是否吃到自己
            for(let j=4;j<=this.body.length;j++){
                if(head.x===this.body[j].x&&head.y===this.body[j].y){
                    alert("Game Over!")
                    clearInterval(this.timer)
                }
            }
        }, 300)
    }
}