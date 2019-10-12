export default {
    install: function (Vue, options) {
        Vue.myGlobalMethod = function () {
            console.log('myGlobalMethod');
        }

        Vue.directive('my', {
            bind(el, binding, vnode, oldNode) {

            }
        })

        Vue.mixin({
            created: function () {
                console.log('created')
            }
        })

        Vue.prototype.$myMethod = function () {
            console.log('$myMethod');
        }

    }
}