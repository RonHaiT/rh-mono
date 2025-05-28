<script setup lang="ts">
import { useAntdStore } from "@/stores/antd";
const antdvStore = useAntdStore();

const open = ref<boolean>(false);

const afterOpenChange = (bool: boolean) => {
  console.log("open", bool);
};

const showDrawer = () => {
  open.value = true;
};
</script>
<template>
  <div><a-button type="primary" @click="showDrawer">设置</a-button></div>
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="系统设置"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <div class="">内置主题</div>
    <div class="w-full h-32 flex flex-row gap-x-1.5 flex-wrap">
      <div
        class="w-10 h-10 cursor-pointer"
        :style="{ backgroundColor: item }"
        v-for="(item, index) in antdvStore.colorList"
        :key="index"
        @click="antdvStore.color = item"
      ></div>
    </div>
    <div class="">圆角</div>
    <div class="w-full h-32 flex flex-row gap-x-1.5 flex-wrap">
      <div
        class="w-10 h-10 cursor-pointer bg-amber-800 text-white flex justify-center items-center"
        v-for="(item, index) in antdvStore.borderRadiusList"
        :key="index"
        @click="antdvStore.borderRadius = item"
      >
        {{ item / 50 }}
      </div>
    </div>
  </a-drawer>
</template>

<style scoped lang="less"></style>
