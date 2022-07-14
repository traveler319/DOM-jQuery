// jQuery(".test") // 链式操作
//   .addClass("red") // this就是返回的对象，如obj.fn(p1)等价于obj.fn.call(obj,p1)
//   .addClass("blue") // this就是返回的对象，即jQuery(".test").addClass("red")
//   .addClass("green"); // this就是返回的对象，即jQuery(".test").addClass("red").addClass("blue")
// /**
//  * 等价于window.jQuery('.test')，一个全局函数，其中this就是window
//  * jQuery(选择器)用于获取对应的元素，但它却不返回这些元素
//  * 相反，它返回一个对象，称为jQuery构造出来的对象
//  * 这个对象可以操作对应的元素
//  */
// /**
//  * jQuery是构造函数吗？
//  * 是，因为jQuery函数确实构造出了一个对象
//  * 不是，因为不需要写new jQuery()就能构造一个对象，以前讲的构造函数都要结合new才行
//  * 总结：
//  * jQuery是一个不需要加new的构造函数
//  * jQuery不是常规意义上的构造函数，这是因为jQuery用了一些技巧
//  */
const x = jQuery(".test");
x.children().print();

//# sourceMappingURL=index.de158e3a.js.map
