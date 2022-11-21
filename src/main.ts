import { createApp } from "vue";
import { createPinia } from "pinia";

import componets from "@/components/UI/index";
import App from "@/App.vue";
import router from "./router";

const app = createApp(App);

componets.forEach((component) => {
  app.component(component.name, component);
});

app.use(createPinia());
app.use(router);

app.mount("#app");
