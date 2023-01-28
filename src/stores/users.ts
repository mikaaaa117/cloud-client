import { defineStore } from "pinia";
import { useFilesStore } from "./files";

type loginData = {
  token: string;
  diskSpace: number;
  usedSpace: number;
};

export const useUsersStore = defineStore("users", {
  state: () => ({
    isAuth: JSON.parse(localStorage.getItem("auth") || "false"),
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || null,
    disk: JSON.parse(
      localStorage.getItem("disk") || '{"diskSpace": 0, "usedSpace": 0}'
    ),
  }),
  actions: {
    login(email: string, data: loginData) {
      if (!email) {
        return;
      }

      const disk = { diskSpace: data.diskSpace, usedSpace: data.usedSpace };

      this.email = email;
      this.token = data.token;
      this.isAuth = !this.isAuth;
      this.disk = disk;

      localStorage.setItem("auth", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("disk", JSON.stringify(disk));
    },
    logout() {
      const filesStore = useFilesStore();
      this.email = "";
      this.token = null;
      this.isAuth = false;

      this.disk = { diskSpace: 0, usedSpace: 0 };
      filesStore.currentDir = "";
      filesStore.files = [];
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("disk");
      localStorage.setItem("auth", "false");
    },
  },
});
