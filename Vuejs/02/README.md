# Vue组件data为什么必须是函数？ 而Vue根实例没有限制

源码： /src/core/instance/state.js line： 112   initData

官方答案：
一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：
https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数

```
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
}
```



结论：
  Vue组件可能存在多个实例，如果使用对象形式定义data 则会导致它们公用一个data对象，那么状态变更则会影响所有组件实例。这是不合理的。
  采用函数形式定义，在initDate时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染的问题。
  而在Vue根实例创建过程中则不存在限制，是因为根实例只有一个。在源码中只对组件的data判断===function