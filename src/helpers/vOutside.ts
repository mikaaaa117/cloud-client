const vOutside = {
  mounted(el: any, binding: any) {
    const button = binding.value.ref.$el;
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
