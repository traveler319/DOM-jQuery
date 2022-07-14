window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  // 根据传入参数是选择器还是数组进行适配
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      // 查找div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); // 删除多余的空格
    return container.content.firstChild;
  }

  const api = Object.create(jQuery.prototype);
  /**
   * 创建一个对象，这个对象的__proto__为括号里面的东西
   * 相当于const api = {__proto__:jQuery.prototype}
   */

  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  // api.elements = elements;
  // api.oldApi = selectorOrArrayOrTemplate.oldApi;
  return api;
  // 返回一个可以直接操作元素elements的对象api
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true, // ?

  // 增
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el));
      // 遍历elements，对每个el进行node.appendChild操作
    } else if (node.jquery == true) {
      this.each((el) => node.get(0).appendChild(el));
      // 遍历elements，对每个el进行node.get(0).appendChild(el)操作
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  // 删

  // 改
  // 闭包：函数访问外部变量
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },

  // 查
  get(index) {
    return this.elements[index]; // this就是api
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      array = array.concat(
        Array.from(this.elements[i].querySelectorAll(selector))
      );
    }
    /**
     * 用之前的空数组array连接上新的元素，然后把连接了新元素的新数组array放回空数组array
     * 另外，this.elements[i].querySelectorAll(selector)是一个伪数组
     */
    array.oldApi = this; // this是旧的api（当前的对象）
    return jQuery(array);

    /**
     * 等价于
     * const newApi = jQuery(array);
     * return newApi;
     */

    /**
     * 目的是防止
     * this.elements = array;
     * return this;
     * "污染"this.elements
     */
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i); // this为null，或者说fn不支持this
    }
    return this; // this是api对象
  },
  print() {
    console.log(this.elements); // elements是对应的元素们，与this所指的对象要区分开
  },
  end() {
    return this.oldApi; // this是新的api（当前的api）
  },
  parent() {
    const array = [];
    this.each((node) => {
      // 去除重复的父亲结点
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array); // array没有什么可操作性，所以返回一个jQuery封装后的对象
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
      /**
       * 直接采用
       * array.push(node.children);
       * 得到的是一个数组的数组，不符合要求
       * ...展开操作符的意思是将node.children拆开，第一个元素当作第一个参数，第二个元素当作第二个参数
       * 等价于
       * array.push(node.children[0], node.children[1], node.children[2]...)
       */
    });
    return jQuery(array);
  },
};
