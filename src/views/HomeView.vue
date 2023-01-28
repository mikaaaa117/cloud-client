<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import File from "@/components/File.vue";
import { useFilesStore } from "@/stores/files";
import { onMounted, ref, TransitionGroup } from "vue";

import AddModal from "@/components/AddModal.vue";
import MyDialog from "@/components/UI/MyDialog.vue";

const userStore = useUsersStore();
const filesStore = useFilesStore();

onMounted(() => {
  filesStore.fetchFiles();
});

const modalButton = ref(null);

const modalVisible = ref(false);
const showDialog = ref(false);
const dirName = ref<string | null>(null);

onMounted(() => console.log(modalButton.value));

const backDir = () => filesStore.backDir();

const createDir = () => {
  if (dirName.value !== null) filesStore.createDir(dirName.value);
};
</script>

<template>
  <h1 v-if="userStore.email === ''">You need to auth</h1>
  <main class="files" v-else>
    <div class="files__header">
      <MyButton ref="modalButton" @click="modalVisible = !modalVisible"
        >+ Add</MyButton
      >
      <AddModal
        @handleShowDialog="showDialog = !showDialog"
        v-model:show="modalVisible"
      />
      <div @click="backDir" class="header__back-button">
        <img src="@/assets/left-arrow.svg" alt="left arrow" />
      </div>
      <MySelect></MySelect>
    </div>
    <div class="files-table">
      <div class="table__title">
        <h3>Type</h3>
        <h3>Name</h3>
        <h3>Last modified</h3>
        <h3>File size</h3>
      </div>
      <TransitionGroup :duration="{ enter: 500, leave: 0 }">
        <File :key="file._id" v-for="file in filesStore.files" :file="file" />
      </TransitionGroup>
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
  display: flex;
  gap: 1em;
  align-items: center;
}

.header__back-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__back-button:hover {
  cursor: pointer;
}

.table__title {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 2fr 1fr;
  margin-bottom: 12px;
}

.v-enter-active {
  transition: all 0.3s ease-out;
  animation: files-enter 300ms forwards;
}

.v-leave-active,
.v-leave-to {
  opacity: 0;
  transition: 10ms;
}

@keyframes files-enter {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 10;
    transform: translateY(0);
  }
}
</style>
