import axios from "axios";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import type { File } from "@/components/File.vue";

interface pathObj {
  parentId: string;
  path: string;
}

export const useFilesStore = defineStore("files", {
  state: () => ({
    files: [] as File[],
    currentDir: "",
    dirHistory: [{ parentId: "", path: "" }] as pathObj[],
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
      this.files = data;
    },
    changeDir(parentId: string, path: string) {
      const data = {
        parentId: parentId,
        path: path,
      };
      this.dirHistory.push(data);
      this.currentDir = parentId;
      this.fetchFiles();
    },
    backDir() {
      if (this.dirHistory.length > 1) {
        this.dirHistory.pop();
        this.currentDir = this.dirHistory[this.dirHistory.length - 1].parentId;
        this.fetchFiles();
      }
    },
    async createFile(file: any) {
      const usersStore = useUsersStore();
      const fileData = new FormData();
      fileData.append("file", file, file.name);
      if (this.currentDir !== "") fileData.append("parent", this.currentDir);
      await axios.post("http://localhost:5000/file/upload", fileData, {
        headers: { Authorization: `Bearer ${usersStore.token}` },
      });

      await this.fetchFiles();
    },
    async createDir(name: string) {
      const usersStore = useUsersStore();
      await axios.post(
        "http://localhost:5000/file/directory",
        {
          name: name,
          type: "directory",
          parent: this.currentDir,
        },
        {
          headers: { Authorization: `Bearer ${usersStore.token}` },
        }
      );
      await this.fetchFiles();
    },
    async downloadFile(id: string, type: string) {
      const usersStore = useUsersStore();
      const response = await axios.get(
        `http://localhost:5000/file/download?id=${id}`,
        {
          headers: { Authorization: `Bearer ${usersStore.token}` },
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: type });
        return blob;
      }
    },
    async deleteFile(fileId: string) {
      try {
        const usersStore = useUsersStore();
        const response = await axios.post(
          "http://localhost:5000/file/delete",
          { fileId: fileId },
          {
            headers: { Authorization: `Bearer ${usersStore.token}` },
          }
        );
        await this.fetchFiles();
      } catch (error) {}
    },
  },
});
