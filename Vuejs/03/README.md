# 你知道vue中key的作用和原理吗？ 谈谈对它的理解

 源码： /src/core/vdom/patch.js  

 patch => patchVnode() => updateChildren() =>  sameVnode、 patchVnode => if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text)
    }

根据打断点的对比知道：

 不设置key时 key是undefined，sameVnode返回为true，进入patchVnode以后oldVnode.text !== vnode.text条件为true，然后执行了下面的更新方法，导致性能差。
 当设置了key sameVnode返回false 不会走到patchVnode，直接到了else逻辑。精准的判断两个节点是否相同，对于不同的节点才会做dom创建和销毁，从而提高性能。
 不设置key时 不同的节点也会进入patchVnode，最终经过一系列的if判断会执行dom操作。所以性能差

结论：
1、key的主要作用是高效的更新虚拟DOM，其原理是vue在patch的过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减小DOM操作，提高性能。
2、另外，不设置key有可能在列表更新时引起一些隐藏的bug
3、vue中在使用相同标签名元素的过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。