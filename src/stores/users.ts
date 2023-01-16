import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    isAuth: JSON.parse(localStorage.getItem("auth") || "false"),
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    login(email: string, token: string) {
      if (!email) {
        return;
      }
      this.email = email;
      this.token = token;
      this.isAuth = !this.isAuth;
      localStorage.setItem("auth", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    logout() {
      this.email = "";
      this.token = null;
      this.isAuth = false;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.setItem("auth", "false");
    },
  },
});
