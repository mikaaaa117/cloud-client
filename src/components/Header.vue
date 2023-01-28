<script setup lang="ts">
import Logo from "@/assets/Logo.vue";
import DiskSpace from "./DiskSpace.vue";
import { useUsersStore } from "../stores/users";

const store = useUsersStore();
</script>

<template>
  <div class="header">
    <RouterLink class="header__logo" to="/">
      <Logo />
    </RouterLink>
    <div class="header__nav">
      <DiskSpace v-if="store.isAuth" />
      <RouterLink to="/auth">
        <MyButton v-if="!store.isAuth">Sign In</MyButton>
      </RouterLink>
      <MyButton @click="store.logout()" v-if="store.isAuth">Log out</MyButton>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background-color: white;
  border-radius: 12px;
  justify-content: space-between;
}
.header__logo {
  height: 40px;
  display: flex;
  align-items: center;
}

.header__nav {
  display: flex;
  gap: 2em;
  align-items: center;
}
</style>
