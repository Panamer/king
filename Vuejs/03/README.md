# 你知道vue中key的作用和原理吗？ 谈谈对它的理解
 源码： /src/core/vdom/patch.js  updateChildren()、 sameVnode、 patchVnode

 现象： 
 不设置key时 key是undefined，sameVnode返回为true，进入patchVnode以后oldVnode === vnode条件为false，然后执行了下面的更新方法，导致性能差。
 当设置了key 并且新老节点的key相同时，sameVnode返回也是true，同样进入patchVnode，但是oldVnode === vnode条件为真，直接return了。这个逻辑对吗？ 大佬们

结论：
1、key的主要作用是高效的更新虚拟DOM，其原理是vue在patch的过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减小DOM操作，提高性能。
2、另外，不设置key有可能在列表更新时引起一些隐藏的bug
3、vue中在使用相同标签名元素的过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。