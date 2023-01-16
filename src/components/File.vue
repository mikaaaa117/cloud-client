<script setup lang="ts">
import { defineProps, onMounted, defineEmits } from "vue";
import { useFilesStore } from "@/stores/files";
export interface File {
  _id: string;
  type: string;
  name: string;
  date: string;
  size: number;
}
const filesStore = useFilesStore();

const emit = defineEmits<{
  (e: "changeDir"): void;
}>();

const props = defineProps<{
  file: File;
}>();

onMounted(() => {
  console.log(props.file);
});

const changeDir = () => {
  if (props.file.type === "directory") {
    filesStore.changeDir(props.file._id);
    console.log(filesStore.currentDir);
    emit("changeDir");
  }
};
</script>

<template>
  <div @click="changeDir" className="file">
    <img
      className="file__img"
      :src="
        file.type === 'directory'
          ? 'src/assets/directory-icon.svg'
          : 'src/assets/file-icon.svg'
      "
    />
    <div className="file__name">{{ props.file.name }}</div>
    <div className="file__date">{{ props.file.date }}</div>
    <div className="file__size">{{ props.file.size }}</div>
  </div>
</template>

<style scoped>
.file {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 2fr 1fr;
}
</style>
