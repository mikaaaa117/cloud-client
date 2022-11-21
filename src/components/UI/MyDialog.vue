<template>
  <div v-if="show" class="my-dialog" @click="hideDialog">
    <div @click.stop class="my-dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "my-dialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style>
.my-dialog {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.my-dialog:hover {
  cursor: pointer;
}

.my-dialog__content {
  margin: auto;
  background-color: white;
  border-radius: 0.4rem;
  min-height: 50px;
  min-width: 50px;
  padding: 4rem 2rem;
}

.my-dialog__content:hover {
  cursor: auto;
}
</style>
