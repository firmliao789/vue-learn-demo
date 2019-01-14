前一篇大概讲了Vue的数据双向绑定，并实现了一个小的dome，这一篇接着上一篇的思想，实现一个简单的计算属性过程，用来帮助理解Vue计算属性的实现。



1、更新new Vue实例，添加一个计算属性

window.onload = function () {

    let vue = new myVue({

        el: "#app",

        data: {

            number: 222,

            input: 2

        },

        methods: {

            add: function () {

                this.number++;

            }

        },

       computed: {

            getNumber: function () {

                return this.number + this.input;

            }

        }

    })

}



2、页面之所以能根据计算属性的值的变化更新数据，也是利用Object.definedProperty()这个方法来劫持监听属性值变化。所以先定义computed到this.data上面。


myVue.propote.definedComputed= 

function (computeds) {

    const _this = this;

    for (let key in computeds) {

        //我们只测试能get的计算属性，set暂不管

        Object.defineProperty(_this.$data, key, {

            get: function () {

                return  computeds[key].call(_this.$data);

            }

        })

    }

}

3、上面页面能通过v-bind获取到计算属性的值,但是getNumber这个计算属性依赖的number和input的值如果改变，还不能监听更改。下面我们就把这两个依赖的变更加入监听。

(1)、先定一个 updateComputed方法用来更新计算熟悉

        const updateComputed = function (directives) {

                this.directives = directives;

         }

(2)、在updateComputed原型上面定一个update方法，帮助我们在依赖属性值更新时，更新视图。

updateComputed.prototype.update = function () {

    this.directives.forEach((item) => {

        item.update();

    })

}

(3)、为每个计算属性添加updateComputed更新依赖，调整definedComputed方法。

          第一篇数据双向绑定时，我们在myVue上定了一个this._binding来保存指令的依赖，我们现在也把计算属性的依赖放进this._binding里面。

          同时我们还要在myVue上面定义一个依赖标志位，来告诉依赖属性的是否有计算属性依赖。

(4)、修改myVue方法：

let myVue = function (options) {

    this.$el = document.querySelector(options.el);

    this.$data = options.data;

    this.$methods = options.methods;

    this.$computed = options.computed;

   this.Dep = {

        target: null

    }



    //通过binding建立属性与指令的联系

    this._binding = [];



    this._observer(this.$data);

    //定义计算属性

    this._definedComputed(this.$computed);

    this._compile(this.$el);

}

(5)、修改 definedComputed方法：

myVue.propote.definedComputed=

function (computeds) {

    const _this = this;

    for (let key in computeds) {

        let value;

        this._binding[key] = {

            directives: []

        };

        //获取指令绑定计算属性的依赖

        let directives = _this._binding[key].directives;

        Object.defineProperty(_this.$data, key, {

            get: function () {

                //设置依赖标志位

                _this.Dep.target = new updateComputed(directives);

                value = computeds[key].call(_this.$data);

                _this.Dep.target = null;

                return value;

            }

        })

    }

}

(6)、 修改_observer

//遍历所有属性 监听劫持数据变化

export default function (obj) {

    const _this = this;

    for (let key in obj) {

        let value = obj[key];

        //遍历所有属性

        if (value && typeof value === 'object')

            this._observer(value);

        //给指令订阅数据变化

        this._binding[key] = {

            directives: [],

            computed: []

        }

        let directives = this._binding[key].directives;

        let computed = this._binding[key].computed;

        //监听劫持属性

        Object.defineProperty(this.$data, key, {

            get: function () {

                //判断是否有计算属性依赖

                if (_this.Dep.target)

                    _this._binding[key].computed.push(_this.Dep.target);

                return value;

            },

            set: function (newValue) {

                if (newValue != value) {

                    value = newValue;

                    console.log(`监听到数据变化${newValue}`);

                    directives.forEach(function (item) {

                        item.update();

                    });

                    //通知所有的计算属性依赖更新

                   computed.forEach(function (item) {

                        item.update();

                    })

                }

            }

        })

    }

};



以上代码就基本实现了一个简单的Vue计算属性



完整代码链接：

https://github.com/firmliao789/vue-learn-demo.git






