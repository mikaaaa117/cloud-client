import axios from "axios";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import type { File } from "@/components/File.vue";

export const useFilesStore = defineStore("files", {
  state: () => ({
    files: [] as File[],
    currentDir: "",
  }),
  actions: {
    async fetchFiles() {
      const usersStore = useUsersStore();
      const response = await axios.get(
        `http://localhost:5000/file${
          this.currentDir !== "" ? "?id=" + this.currentDir : ""
        }`,
        {
          headers: { Authorization: `Bearer ${usersStore.token}` },
        }
      );

      const data = await response.data;

      console.log(JSON.stringify(data, null, 2));
      this.files = data;
    },
    changeDir(path: string) {
      this.currentDir = path;
    },
  },
});
