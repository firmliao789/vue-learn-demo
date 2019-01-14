我把Vue的双向绑定分为6个步奏：

1、new 一个MVVM实例

2、通过defindProperty劫持监听所有属性

3、根据页面模版解析指令，初始化视图

4、建立Watcher和Updater函数

5、视图指令通过Watcher订阅数据变化

6、数据变化通过Watcher通知Updater更新视图



页面模版：

<div id="app">
   <form>
       <input type="text"  placeholder="请输入"

         v-model="input">
       <button type="button" v-click="add">

            增加

        </button>
   </form>
   <div v-bind="number"></div>

</div>



head初始化：

window.onload = function () {

    var vue = new myVue({

        el: "#app",

        data: {

            number: 1,

            input: 2

        },

        methods: {

            add: function () {

                this.number++;

            }

        }

    })

}



1、创建myVue函数

function myVue(options) {
   this.$el = document.querySelector(options.el);
   this.$data = options.data;
   this.$methods = options.methods;
   //通过binding建立属性与指令的联系
   this._binding = [];
   this._observer(this.$data);
   this._compile(this.$el);

}



2、遍历所有属性 监听劫持数据变化

myVue.prototype._observer = function (obj) {

    for (let key in obj) {

        let value = obj[key];

        //遍历所有属性

        if (value && typeof value === 'object')

            this._observer(value);

        //给指令订阅数据变化

        this._binding[key] = {directives: []}

        let directives = this._binding[key].directives;

        //监听劫持属性

        Object.defineProperty(this.$data, key, {

            get: function () {

                return value;

            },

            set: function (newValue) {

                if (newValue != value) {

                    value = newValue;

      console.log(`监听到数据变化${newValue}`);

                    directives.forEach(function (item) {

                        item.update();

                    })

                }

            }

        })

    }

};



3、解析指令

myVue.prototype._compile = function (root) {

    const nodes = root.children;

    const _this = this;

    for (let i = 0; i < nodes.length; i++) {

        let node = nodes[i];

        //遍历所有的控件

        if (node.children.length > 0)

            _this._compile(node);

        //v-click指令

        if (node.hasAttribute('v-click')) {

            node.onclick = (function () {

                const attrVal = node.getAttribute('v-click');

                return _this.$methods[attrVal].bind(_this.$data);

            })();

        }

        //v-model指令

        if (node.hasAttribute('v-model')

        && (node.tagName === 'INPUT' 

        || node.tagName === 'TEXTAREA')) {

            node.addEventListener('input', (function () {

                const attrVal = node.getAttribute('v-model');

                _this._binding[attrVal].directives

                .push(new Watcher(node, _this, 'value', attrVal));

                return function () {

                    _this.$data[attrVal] = node.value

                }

            })())

        }

        //v-bind

        if (node.hasAttribute("v-bind")) {

            const attrVal = node.getAttribute('v-bind');

            _this._binding[attrVal].directives

           .push(new Watcher(node, _this, 'innerText', attrVal));

        }

    }

};



4、建立Watcher

function Watcher(el, vm, attr, exp) {

    this.el = el;

    this.vm = vm;

    this.attr = attr;

    this.exp = exp;

    //初始化数据

    this.update();

}



5、建立Update

Watcher.prototype.update = function () {

    this.el[this.attr] = this.vm.$data[this.exp];

}

