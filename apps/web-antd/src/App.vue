<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
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
