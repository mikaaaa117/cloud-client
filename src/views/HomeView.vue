<script setup lang="ts">
import { useUsersStore } from "@/stores/users";

const store = useUsersStore();
</script>

<template>
  <main>
    <h1 v-if="store.email !== ''">{{ store.email }}</h1>
    <h1 v-else>Hello world!</h1>
  </main>
</template>
