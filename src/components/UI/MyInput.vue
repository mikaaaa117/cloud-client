<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="my-input"
    type="text"
  />
</template>

<script lang="ts">
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
  },
};
</script>

<style>
.my-input {
  padding: 0.4rem 0;
  border-bottom: 1px solid silver;
  font-size: 17px;
  width: 100%;
}
</style>
