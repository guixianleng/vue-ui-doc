import Vue from 'vue';

// 自动加载 global 目录下的 .ts 结尾的文件
const componentsContext = require.context('./global', true, /\index.ts$/);

componentsContext.keys().forEach((component: any) => {
  const componentConfig = componentsContext(component);
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.name, ctrl);
});
