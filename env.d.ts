declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "*.css" {}
declare module "*.scss" {}
declare module "uno.css" {}
declare module "virtual:group-icons.css" {}
