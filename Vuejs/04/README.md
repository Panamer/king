# 你怎么理解vue中的diff算法？

- diff算法并非vue专用
源码分析1: 必要性 src/core/instance/lifecycle.js   mountComponent()

vue2.0中 粒度降低 一个组件就对应一个watcher  通过diff算法精确的知道data中的哪个key需要更新

源码分析2: 执行方式 pathch.js  patchVnode() 
- patchVnode() diff发生的地方
- diff策略： 同层比较深度优先
- diff核心： 重排算法 updateChildren 4种猜想之后没有找到相同的，被迫遍历。key的作用就在于此

源码分析3: 高效性：updateChildren() 4种猜想,key的作用就在于此


总结:

1、diff算法是虚拟DOM技术的必然产物： 通过新旧虚拟DOM做对比（即diff），将变化的地方更新在真实DOM上；另外，也需要diff高效的执行对比过程，从而降低时间复杂度为O(n)

2、vue2.x中为了降低watcher粒度，每个组件只有一个watcher与之对应，想要精确找到发生变化的地方，必须引入diff

3、vue中diff执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果oldVnode和新的渲染结果newVnode，此过程称为patch

4、diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次对比尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点；借助key通常可以快速精确找到相同节点，因此整个patch过程非常高效。