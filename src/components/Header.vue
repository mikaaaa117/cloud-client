<script setup lang="ts">
import Logo from "@/assets/Logo.vue";
import { useUsersStore } from "@/stores/users";
const store = useUsersStore();
console.log(store.isAuth);
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <Logo />
    </RouterLink>
    <RouterLink to="/auth">
      <MyButton v-if="!store.isAuth">Sign In</MyButton>
    </RouterLink>
    <MyButton @click="store.logout()" v-if="store.isAuth">Log out</MyButton>
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
</style>
