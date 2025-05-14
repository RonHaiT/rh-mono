<script setup lang="ts">
import Setting from "@/components/system/Setting.vue";
import { useCounterStore } from "@/stores/time";
const counter = useCounterStore();
const text = ref("111");
const test = () => {
  text.value = "333";
};
let checked = ref(false);
onMounted(() => {
  counter.increment();
});
onBeforeUnmount(() => {
  counter.timer = null;
});
</script>
<template>
  <div>
    <div>数量：{{ counter.count }}</div>
    <Setting />
    <router-link append to="/login"> login </router-link>
    <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
  </div>
</template>

<style scoped lang="less"></style>
