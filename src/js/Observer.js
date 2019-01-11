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
                    computed.forEach(function (item) {
                        item.update();
                    })
                }
            }
        })
    }

};
