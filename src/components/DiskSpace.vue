<script setup lang="ts">
import { ref } from "vue";
import convertFileSize from "@/helpers/convertFileSize";
import { useUsersStore } from "../stores/users";

const store = useUsersStore();

const diskSpace = ref(store.disk.diskSpace);
const usedSpace = ref(store.disk.usedSpace);

const getFilledBarWidth = () => {
  const widthInPercent = Math.ceil(
    ((usedSpace.value * 100) / diskSpace.value) * 100
  );
  return widthInPercent;
};
</script>

<template>
  <div class="disk-space">
    <div class="disk-space__text">
      {{ convertFileSize(usedSpace) }} of {{ convertFileSize(diskSpace) }} used
    </div>
    <div class="disk-space__bar">
      <div
        class="bar__filled"
        :style="{ width: getFilledBarWidth() + '%' }"
      ></div>
      <div class="bar__placeholder"></div>
    </div>
  </div>
</template>

<style scoped>
.disk-space {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.disk-space__text {
  text-align: center;
}

.disk-space__bar {
  width: 100%;
  position: relative;
  height: 8px;
  border-radius: 6px;
  overflow: hidden;
}

.bar__placeholder {
  position: absolute;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #dadce0;
  border-radius: 6px;
}

.bar__filled {
  position: absolute;
  left: 0;
  height: 8px;
  background-color: darkcyan;
  border-radius: 6px;
  z-index: 2;
}
</style>
