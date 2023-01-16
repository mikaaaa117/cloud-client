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
  name: "MyInput",
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
  padding: 10px 16px;
  border-bottom: 1px solid silver;
  font-size: 17px;
  width: 100%;
  border: 1px solid #dadce0;
  border-radius: 6px;
  outline: none;
  transition: border 0.1s ease-in-out;
}

.my-input:focus {
  border: 2px solid darkcyan;
}
</style>
