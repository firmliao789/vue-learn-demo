#vue-learn-dome

##仿照VUE思路自定义一个简单的VUE学习小样
1. 包括数据双向绑定
2. 解析指令
3. 更新视图
4. 解析computed

##数据双向绑定
1. new myVue实例
2. 通过definedProperty劫持监听所有属性
3. 解析指令
4. 建立Watcher和Updater函数
5. 指令通过Updater函数初始化视图同时通过Watcher订阅数据监听
6. 数据更新通过Watcher通知Updater更新视图
