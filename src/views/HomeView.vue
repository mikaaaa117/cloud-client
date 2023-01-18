<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import File from "@/components/File.vue";
import { useFilesStore } from "@/stores/files";
import { onMounted, ref } from "vue";

import AddModal from "@/components/AddModal.vue";
import MyDialog from "@/components/UI/MyDialog.vue";

const userStore = useUsersStore();
const filesStore = useFilesStore();
console.log(filesStore.files);
onMounted(() => {
  filesStore.fetchFiles();
});

const modalVisible = ref(false);
const showDialog = ref(false);
const dirName = ref<string | null>(null);

const changeDir = () => {
  filesStore.fetchFiles();
};

const createDir = () => {
  if (dirName.value !== null) filesStore.createDir(dirName.value);
};
</script>

<template>
  <h1 v-if="userStore.email === ''">You need to auth</h1>
  <main class="files" v-else>
    <div class="files__header">
      <MyButton @click="modalVisible = !modalVisible">+ Add</MyButton>
      <AddModal
        @handleShowDialog="showDialog = !showDialog"
        v-model:show="modalVisible"
      />
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
  <MyDialog v-model:show="showDialog">
    <h2>Input name of a new folder</h2>
    <MyInput @keyup.enter="createDir" v-model="dirName" />
  </MyDialog>
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

.files__header {
  position: relative;
  margin-bottom: 24px;
}

.table__title {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 2fr 1fr;
  margin-bottom: 12px;
}
</style>
