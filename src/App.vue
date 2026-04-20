<script setup lang="ts"></script>

<template>
  <RouterView class="w-app__main" />
</template>

<style>
.w-app__main {
  container: app-main / inline-size;
  grid-area: main;
  min-block-size: 100vb;
}
</style>
