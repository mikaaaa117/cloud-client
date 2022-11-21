<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap");
* {
  box-sizing: border-box;
  font-family: "M PLUS Rounded 1c", sans-serif;
  padding: 0;
  margin: 0;
}
html {
  background-color: #f5f5f5;
}
.container {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 0;
}
</style>
