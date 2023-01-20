<script setup lang="ts">
import { ref } from "vue";
import { useFilesStore } from "@/stores/files";

const inputFile = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (e: "handleShowDialog"): void;
}>();

const props = defineProps<{
  show: boolean;
}>();

const handleFileInput = () => {
  inputFile?.value?.click();
};

const uploadFile = (e: Event) => {
  const filesList = (e.target as HTMLInputElement).files;
  const fileData = new FormData();
  if (filesList !== null) {
    const filesStore = useFilesStore();
    fileData.append("file", filesList[0], filesList[0].name);
    filesStore.createFile(filesList[0]);
  }
};
</script>

<template>
  <div v-if="props.show" class="modal">
    <div @click="handleFileInput" class="modal__row">
      <div class="row__icon">
        <img src="@/assets/add-file.svg" alt="Add file" />
      </div>
      <p class="row__title">Add file</p>
      <input
        @change="uploadFile"
        ref="inputFile"
        type="file"
        class="row__input"
      />
    </div>
    <div @click="emit('handleShowDialog')" class="modal__row">
      <div class="row__icon">
        <img src="@/assets/add-directory.svg" alt="Add directory" />
      </div>
      <p class="row__title">Add directory</p>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  max-width: max-content;
  padding: 12px;
  margin-top: 20px;
  left: -30px;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  z-index: 2;
}

.modal__row {
  display: flex;
  position: relative;
  gap: 1em;
  align-items: center;
  cursor: pointer;
  padding: 0.4em;
  border-radius: 8px;
}

.modal__row:hover {
  background-color: #fafafa;
}

.row__icon {
  display: flex;
  align-items: center;
}

.row__title {
  font-family: "Rounded Mplus 1c";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}

.row__input {
  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
