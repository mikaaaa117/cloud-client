import type { DirectiveBinding } from "vue";

type CustomElement = HTMLElement & { handleClickOutside: (e: Event) => void };

const vOutside = {
  mounted(el: CustomElement, binding: DirectiveBinding) {
    const button = binding.value.ref.$el;
    console.log(el);
    console.log(binding);
    el.handleClickOutside = function(e: Event) {
      if (
        e.target !== el &&
        !e.composedPath().includes(el) &&
        !e.composedPath().includes(button)
      ) {
        binding.value.handler();
      }
    };
    document.addEventListener("click", el.handleClickOutside);
  },
  unmounted(el: any) {
    document.removeEventListener("click", el.handleClickOutside);
  },
};

export default vOutside;
