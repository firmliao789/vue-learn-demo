//建立Watcher
const Watcher = function (el, vm, attr, exp) {
    this.el = el;
    this.vm = vm;
    this.attr = attr;
    this.exp = exp;

    //初始化数据
    this.update();
}

//建立Update
Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp];
}

export default Watcher;
