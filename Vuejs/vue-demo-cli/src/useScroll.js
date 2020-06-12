import { ref, onMounted, onUnmounted } from 'vue'

// 独立的功能 返回滚动高度

export default function useScroll() {
  const top = ref(0)
  function update() {
    top.value = window.scrollY
  }
  // 防抖节流 补充一下

  // 监听滚动事件
  onMounted(() => {
    window.addEventListener('scroll', update)
  })
    // 清除监听事件
  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { top }
}