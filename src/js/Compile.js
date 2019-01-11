import Watcher from './Watcher';

//解析指令
export default function (root) {
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
        if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
            node.addEventListener('input', (function () {
                const attrVal = node.getAttribute('v-model');
                _this._binding[attrVal].directives.push(new Watcher(node, _this, 'value', attrVal));

                return function () {
                    _this.$data[attrVal] = node.value
                }
            })())
        }
        //v-bind
        if (node.hasAttribute("v-bind")) {
            const attrVal = node.getAttribute('v-bind');
            _this._binding[attrVal].directives.push(new Watcher(node, _this, 'innerText', attrVal));
        }
    }

};
