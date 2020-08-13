<template>
  <div>
    <prop-son :parentText="text"></prop-son>
    <p>{{ textAsync }}</p>
  </div>
</template>

<script>
import PropSon from "@/components/PropSon.vue";
import { log } from "util";
export default {
  name: "props",
  components: {
    PropSon,
  },
  data() {
    return {
      text: "父子组件通信： 这个值是父组件传进去的！！",
    };
  },
  computed: {
    textAsync: {
      // getter
      get: function () {
        Promise.resolve().then(() => {
          this.text = "更新啦"
        });
        setTimeout(() => {
          this.text = "bian啦"
        }, 3000)
        return "计算属性" + this.text
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>