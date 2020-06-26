<template>
  <div id="content"></div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";

export default {
  mounted() {
    /**
     * 👌👌👌👌👌👌
     * Vue.extend( options )
     * 使用vue基础构造器  创建一个子类  得到的是一个构造函数
     * 参数是一个包含组件选项的对象，参数中的data必须是一个函数
     * 可以直接将 .vue文件import 作为入参
     */
    var Ctor = Vue.extend({
      template: "<p>{{firstName}} {{lastName}} aka {{alias}}</p>",
      data: function() {
        return {
          firstName: "Walter",
          lastName: "White",
          alias: "Heisenberg"
        };
      }
    });
    // 创建 Profile 实例，并挂载到一个元素上。
    new Ctor().$mount("#content");
  }
};
</script>

<style lang="scss" scoped>
</style>