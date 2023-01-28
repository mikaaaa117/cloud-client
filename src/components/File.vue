<script setup lang="ts">
import { onMounted, defineEmits, ref } from "vue";
import { useFilesStore } from "@/stores/files";
import convertFileSize from "@/helpers/convertFileSize";
export interface File {
  _id: string;
  type: string;
  name: string;
  size: number;
  path: string;
}
const filesStore = useFilesStore();

const props = defineProps<{
  file: File;
}>();

const handleFileClick = () => {
  if (props.file.type === "directory") {
    changeDir();
  }
  if (props.file.type !== "directory" && props.file.type) {
    downloadFile();
  }
};

const changeDir = () => {
  filesStore.changeDir(props.file._id, props.file.path);
};

const deleteFile = () => {
  filesStore.deleteFile(props.file._id);
};

const downloadFile = async () => {
  const blob: Blob | MediaSource | undefined = await filesStore.downloadFile(
    props.file._id,
    props.file.type
  );
  if (blob !== undefined) {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = props.file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
</script>

<template>
  <div className="file">
    <div @click="deleteFile" className="file__delete"></div>
    <img
      @click="handleFileClick"
      className="file__img"
      :src="
        file.type === 'directory'
          ? 'src/assets/directory.svg'
          : 'src/assets/file.svg'
      "
    />
    <div @click="handleFileClick" className="file__name">
      {{ props.file.name }}
    </div>
    <div className="file__date"></div>
    <div className="file__size">{{ convertFileSize(props.file.size) }}</div>
  </div>
</template>

<style scoped>
.file {
  display: grid;
  position: relative;
  align-items: center;
  grid-template-columns: 1fr 6fr 2fr 1fr;
  padding: 0.4em;
  border-radius: 8px;
  transition: transform 300ms;
  overflow: hidden;
}

.file__delete {
  position: absolute;
  width: 32px;
  height: 32px;
  right: -40px;
  transition: right 300ms ease;
  background-color: #a7171a;
  z-index: 3;
}

.file:hover > .file__delete {
  right: 8px;
}

.file:hover {
  cursor: pointer;
  background-color: #fafafa;
  transform: scale(1.005);
}
</style>
