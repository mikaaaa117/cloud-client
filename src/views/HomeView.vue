<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import File from "@/components/File.vue";
import { useFilesStore } from "@/stores/files";
import { onMounted } from "vue";

const userStore = useUsersStore();
const filesStore = useFilesStore();
console.log(filesStore.files);
onMounted(() => {
  filesStore.fetchFiles();
});

const changeDir = () => {
  filesStore.fetchFiles();
};
</script>

<template>
  <h1 v-if="userStore.email === ''">You need to auth</h1>
  <main class="files" v-else>
    <div class="files__header">
      <MyButton>+ Add</MyButton>
      <MySelect></MySelect>
    </div>
    <div class="files-table">
      <div class="table__title">
        <h3>Type</h3>
        <h3>Name</h3>
        <h3>Last modified</h3>
        <h3>File size</h3>
      </div>
      <File
        :key="file._id"
        @changeDir="changeDir"
        :file="file"
        v-for="file in filesStore.files"
      />
    </div>
  </main>
</template>

<style scoped>
.files {
  margin-top: 1em;
  background-color: white;
  border-radius: 12px;
  padding: 1.6em 2.6em;
}

.files-table {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.table__title {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 2fr 1fr;
}
</style>
