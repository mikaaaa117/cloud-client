<script setup lang="ts">
import Logo from "@/assets/Logo.vue";
import router from "@/router";
import { useUsersStore } from "@/stores/users";
import { onMounted, ref } from "vue";
import axios from "axios";

const email = ref("");
const userId = ref();
const OTP = ref("");
const error = ref();

const store = useUsersStore();

const viewedAnswer = ref(false);

onMounted(() => {
  if (store.isAuth) {
    router.push("/");
  }
});

const checkAnswer = () => {
  viewedAnswer.value = !viewedAnswer.value;
};

const login = async () => {
  const response = await axios.post("http://localhost:5000/auth", {
    email: email.value,
  });

  userId.value = response.data;
};

const submitOTP = async () => {
  const response = await axios.post("http://localhost:5000/auth/OTP", {
    id: userId.value,
    OTP: OTP.value,
  });

  store.login(email.value, response.data);
  router.push("/");
};
</script>

<template>
  <div class="form__wrapper">
    <div class="form">
      <div class="form__header">
        <Logo />
      </div>

      <div v-if="!viewedAnswer && !userId" class="form__body">
        <div class="form__input">
          <h1>Sign In</h1>
          <p>to continue to fluffy cloud</p>
          <MyInput @keyup.enter="login" v-model="email" placeholder="Email" />
        </div>
        <div class="form__submit">
          <span @click="checkAnswer()">I don't have an account</span>
          <MyButton @click="login">Next</MyButton>
        </div>
      </div>

      <div v-if="!viewedAnswer && userId" class="form__body">
        <div class="form__input">
          <h1>Sign In</h1>
          <p>Enter you OTP-code from your Email</p>
          <MyInput
            @keyup.enter="submitOTP"
            v-model="OTP"
            placeholder="OTP..."
          />
        </div>
        <div class="form__submit">
          <span @click="checkAnswer()">I don't have an account</span>
          <MyButton @click="submitOTP">Next</MyButton>
        </div>
      </div>

      <div v-if="viewedAnswer" class="form__answer">
        <h1>I don't have an account!</h1>
        <p>
          If you don't have an account yet, it will be created automatically
          when you try to login.
        </p>
        <MyButton @click="checkAnswer()">Back</MyButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form__wrapper {
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  border-radius: 12px;
  padding: 0 1.2rem;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 400px;
  background-color: #fff;
}
.form__header {
  padding: 1.5em 0;

  width: 100%;
  height: 78px;
}
.form__body {
  display: flex;
  height: 70%;
  padding-top: 1em;
  width: 60%;
  margin: 0 auto;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 3em;
}
.form__answer {
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  width: 80%;
  margin: 1em auto;
}
.form__answer h1 {
  font-size: 28px;
}
.form__answer p {
  font-size: 19px;
}
.form__input {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.form__input h1 {
  font-size: 32px;
  line-height: 110%;
}
.form__input p {
  font-size: 22px;
  line-height: 110%;
}
.form__input input {
  margin-top: 1em;
}
.form__submit {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form__submit span {
  text-decoration: none;
  color: darkcyan;
}
.form__submit span:hover {
  cursor: pointer;
}
</style>
