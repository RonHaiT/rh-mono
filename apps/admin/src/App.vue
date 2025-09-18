<script setup lang="ts">
import "@/styles/root.scss";
</script>

<template>
  <div>
    <RouterLink to="/login">登录</RouterLink>
    <RouterLink to="/register">注册</RouterLink>
    <RouterView />
  </div>
</template>

<style scoped></style>
