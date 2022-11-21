import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    isAuth: JSON.parse(localStorage.getItem("auth") || "false"),
    email: "",
  }),
  actions: {
    login(email: string) {
      if (!email) {
        return;
      }
      this.email = email;
      this.isAuth = !this.isAuth;
    },
    logout() {
      this.email = "";
      this.isAuth = false;
    },
  },
});
