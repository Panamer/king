<template>
  <div>
    <h3>{{ parentText }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    parentText: {
      type: String,
      default: "没有拿到值"
    }
  }
};
</script>

<style>
</style>