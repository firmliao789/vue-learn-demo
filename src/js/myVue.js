import Observer from './Observer'
import Compile from './Compile'
import Computed from './Computed'

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
    this._definedComputed(this.$computed);
    this._compile(this.$el);

}

myVue.prototype._observer = Observer;
myVue.prototype._compile = Compile;
myVue.prototype._definedComputed = Computed;


export default myVue;
