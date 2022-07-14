window.jQuery = function(selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === "string") elements = document.querySelectorAll(selectorOrArray);
    else if (selectorOrArray instanceof Array) elements = selectorOrArray;
    // 返回一个可以直接操作元素的对象
    return {
        find (selector) {
            let array = [];
            for(let i = 0; i < elements.length; i++)array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
            /**
       * 用之前的空数组array连接上新的元素，然后把连接了新元素的新数组array放回空数组array
       * 另外，elements[i].querySelectorAll(selector)是一个伪数组
       */ array.oldApi = this; // this是旧的api
            return jQuery(array);
        /**
       * 等价于
       * const newApi = jQuery(array);
       * return newApi;
       */ /**
       * 目的是防止
       * elements = array;
       * return this;
       * "污染"elements
       */ },
        each (fn) {
            for(let i = 0; i < elements.length; i++)fn.call(null, elements[i], i); // this为null，或者说fn不支持this
            return this; // this是api对象
        },
        parent () {
            const array = [];
            this.each((node)=>{
                // 去除重复的父亲结点
                if (array.indexOf(node.parentNode) === -1) array.push(node.parentNode);
            });
            return jQuery(array); // array没有什么可操作性，所以返回一个jQuery封装后的对象
        },
        children () {
            const array = [];
            this.each((node)=>{
                array.push(...node.children);
            /**
         * 直接采用
         * array.push(node.children);
         * 得到的是一个数组的数组，不符合要求
         * ...展开操作符的意思是将node.children拆开，第一个元素当作第一个参数，第二个元素当作第二个参数
         * 等价于
         * array.push(node.children[0], node.children[1], node.children[2]...)
         */ });
            return jQuery(array);
        },
        print () {
            console.log(elements); // elements是对应的元素们，与this所指的对象要区分开
        },
        // 闭包：函数访问外部变量
        addClass (className) {
            for(let i = 0; i < elements.length; i++)elements[i].classList.add(className);
            return this;
        },
        oldApi: selectorOrArray.oldApi,
        end () {
            return this.oldApi; // this是新的api（当前的api）
        }
    };
/**
   * 等价于
   * const api = {}；
   * return api;
   */ };

//# sourceMappingURL=index.3e2f9b55.js.map
