<template>
  <div>
    <prop-son :parentText="text"></prop-son>
  </div>
</template>

<script>
import PropSon from '@/components/PropSon.vue';
  export default {
  name: 'props',
    components: {
      PropSon,
    },
    data(){
      return {
        text: "父子组件通信： 这个值是父组件传进去的！！"
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>