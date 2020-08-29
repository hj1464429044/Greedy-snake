/* 
    工具类函数 
*/


/* 
    检测一个字符串是否是可回文字符串
    @param a 要检测的字符串
    @return 返回值是一个布尔值  
*/
function fn(a) {
    return a.split('').reverse().join('') === a ? true : false
}

/* 
    求两个数之间的随机数
 */
function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}

/* 
    获取随机颜色
 */
function getColor() {
    return "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"
}

/*
    改变body的背景色为随机颜色
 */
function changeColor() {
    var color = getColor()
    document.body.style.backgroundColor = color
}

/* 
    求数组中的最大数
*/
function maxNum(arr) {
    res = arr.sort(function(a,b){
        return b-a
    })
    return res[0]
}

/* 
    求数组中的最小数
*/
function minNum() {
    res = arr.sort(function(a,b){
        return a-b
    })
    return res[0]
}

/* 
    获取一个元素的样式属性 也可以设置一个元素的样式
    @param ele 元素
    @param attr 要获取/设置的属性
    @param value 要获取/设置的属性值
    @return 获取/设置好的属性值
*/
function setStyle(ele, attr, value) {
    if (value) {
        ele.style[attr] = value
    }
    return window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr]
}

/* 
    通过选择器获取元素
    @param selector 要获取的元素的 id/className/tagName
    @param context 从哪个范围获取
    @return 获取到的元素或者元素伪数组
*/
function my$(selector, context) {
    context = context || document
    if (selector.indexOf("#") === 0) {
        return document.getElementById(selector.slice(1))
    }
    else if (selector.indexOf(".") === 0) {
        return context.getElementsByClassName(selector.slice(1))
    }
    return context.getElementsByTagName(selector)
}

/* 
    绑定事件的兼容处理
    @param ele  要绑定事件的元素
    @param type 事件类型
    @param fn 事件处理函数
*/
function on(ele, type, fn) {
    if (ele.addEventListener) {
        if (type.indexOf("on") === 0) {
            type = type.slice(2)
        }
        ele.addEventListener(type, fn)
    }
    else {
        if (type.indexOf("on") !== 0) {
            type = "on" + type
        }
        ele.attachEvent(type, fn)
    }
}

/* 
    对IE8不支持pageX和pageY的兼容处理
    @param e event 对象
    @return 光标距离页面左边和上边的距离数据对象
*/
function page(e) {
    if (e.pageX) {
        return { x: Element.pageX, y: Element.pageY }
    }
    var _x = document.documentElement ? document.documentElement.scrollLeft + e.clientX : document.body.scrollLeft + e.clientX
    var _y = document.documentElement ? document.documentElement.scrollTop + e.clientY : document.body.scrollTop + e.clientY
}

/* 
    运动框架函数
    @param ele 执行运动的元素 
    @param options 终点值 是一个对象
    @param duration 运动的总时间
    @param fn 运动执行完毕的回调函数

*/
function animate(ele, options, duration, fn) {

    clearInterval(ele.timer)   //清除定时器
    const start = {}, range = {}   //start初始值，range运动范围
    for (let key in options) {  //遍历终点值
        start[key] = parseFloat(setStyle(ele, key))  //获取元素身上的初始值，并加到start中
        range[key] = options[key] - start[key]  //终点值减去初始值，就是运动的范围
    }
    const startTime = +new Date()  //记录开始时间
    ele.timer = setInterval(() => {  //设置定时器
        let nowTime = +new Date()  //记录当前时间
        let timeDifference = Math.min(nowTime - startTime, duration)  //当前时间和开始时间之间的时间差，即运动时间，因为单位是ms，不能让时间差刚好等于duration，所以最后取小的那个
        for (let attr in options) {  //遍历终点值
            let result = start[attr] + range[attr] / duration * timeDifference   //要设置的值=初始值+运动的距离（总的运动距离/总的运动时间*时间差）
            result = attr === 'opacity' ? result : result + 'px'  //判断属性attr是不是opacity，如果是，result就是opacity的值，如果不是，result就是result的值加上单位'px'
            ele.style[attr] = result  //设置ele的样式
        }
        if (timeDifference === duration) {//运动执行完毕
            clearInterval(ele.timer)   //清除定时器（运动结束，不让它继续运动下去）
            fn && fn()  //有fn就执行，没有就不执行
        }
    }, 10)
}

/* 
    淡入
    @param ele  执行运动的元素
    @param time  执行运动的时间
    @param fn  运动执行完毕的回调函数
*/
function fadeIn(ele, time, fn) {
    setStyle(ele, 'display', 'block')  //不管ele是否隐藏，都让它显示
    setStyle(ele, 'opacity', '0')   //不管ele的透明度是多少，都让它全透明
    animate(ele, { opacity: 1 }, time, fn)   //调用运动函数，把ele的透明度设置为不透明
}

/* 
    淡出
    @param ele  执行运动的元素
    @param time  执行运动的时间
    @param fn  运动执行完毕的回调函数
*/
function fadeOut(ele, time, fn) {
    setStyle(ele, 'display', 'block')   //不管ele是否隐藏，都让它显示
    setStyle(ele, 'opacity', '1')   //不管ele的透明度是多少，都让它不透明
    animate(ele, { opacity: 0 }, time, fn)   //调用运动函数，把ele的透明度设置为全透明
}