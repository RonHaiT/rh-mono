<script setup lang="ts">
import { useAntdStore } from "@/stores/antd";
const antdStore = useAntdStore();
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: antdStore.color,
        borderRadius: antdStore.borderRadius,
      },
      components: {
        Radio: {
          colorPrimary: '#000000',
        },
      },
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<style scoped></style>
