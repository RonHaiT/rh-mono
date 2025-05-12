<script setup lang="ts">
const text = ref("111");
const test = () => {
  text.value = "333";
};
</script>
<template>
  <div>
    <a-radio>Radio</a-radio>
    <a-checkbox>Checkbox</a-checkbox>
    <div class="bg-amber-300" @click="test">test tailwindcss{{ text }}</div>
    <a-button type="primary">Primary Button</a-button>
  </div>
</template>

<style scoped lang="less"></style>
