<script setup lang="ts">
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";

const email = ref("");
const store = useUsersStore();

const login = () => {
  store.login(email.value);
};
</script>

<template>
  <div class="form">
    <MyInput v-model="email" placeholder="Email" />
    <MyButton @click="login">Next</MyButton>
  </div>
</template>
