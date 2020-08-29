class Map{
    constructor(options){
        options=options||{}
        this.map=options.map||null
        this.width=options.width||800
        this.height=options.height||600
        this.bgColor=options.color||"#333"
        this.init()
    }
    init(){
        this.map=document.createElement("div")
        this.map.className="map"
        setStyle(this.map,"width",this.width+"px")
        setStyle(this.map,"height",this.height+"px")
        setStyle(this.map,"background-color","#333")
        setStyle(this.map,"margin","100px auto")
        setStyle(this.map,"position","relative")
        document.body.appendChild(this.map)
    }
}