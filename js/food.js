class Food {
    constructor(options) {
        options = options || {}
        this.food = null
        this.width = options.width || 20
        this.height = options.height || 20
        this.map = document.querySelector(".map")
        this.randomW = 0
        this.randomH = 0
        this.init()
    }
    init() {
        // 创建之前先判断有没有food,有就删掉
        document.querySelector(".food") ? this.map.removeChild(document.querySelector(".food")) : ""
        this.food = document.createElement("p")
        this.food.className = "food"
        setStyle(this.food, "width", this.width + "px")
        setStyle(this.food, "height", this.height + "px")
        setStyle(this.food, "background-color", getColor())
        this.randomW = getRandom(0, Math.floor(this.map.offsetWidth / this.width - 1))
        this.randomH = getRandom(0, Math.floor(this.map.offsetHeight / this.height - 1))
        setStyle(this.food, "position", "absolute")
        setStyle(this.food, "left", this.width * this.randomW + "px")
        setStyle(this.food, "top", this.height * this.randomH + "px")
        this.map.appendChild(this.food)
    }
}