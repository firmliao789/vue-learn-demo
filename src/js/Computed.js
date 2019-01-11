const updateComputed = function (directives) {
    this.directives = directives;
}
updateComputed.prototype.update = function () {
    this.directives.forEach((item) => {
        item.update();
    })
}

export default function (computeds) {
    const _this = this;
    for (let key in computeds) {
        let value;
        this._binding[key] = {
            directives: []
        };
        let directives = _this._binding[key].directives;
        Object.defineProperty(_this.$data, key, {
            get: function () {
                _this.Dep.target = new updateComputed(directives);
                value = computeds[key].call(_this.$data);
                _this.Dep.target = null;
                return value;
            }
        })
    }
}
