<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>

<style>
.my-button {
  background-color: darkcyan;
  color: white;
  border-radius: 0.4rem;
  border: none;
  font-size: 16px;
  padding: 0.6rem 1.2rem;
  width: max-content;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.my-button:hover {
  cursor: pointer;
  background-color: rgb(0, 155, 155);
  transform: scale(1.05);
}
</style>
