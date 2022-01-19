declare module "*.vue" {
	// import { Component } from "vue";
	// const component: Component;
	// export default component;


	// import { defineComponent,FunctionalComponent} from 'vue';
	// const component:ReturnType<typeof defineComponent> | FunctionalComponent;
	// export default component;

	import { DefineComponent} from 'vue';
	const component:DefineComponent<{},{},any>;
	export default component;



}
// declare module "*.css" {
// 	const classes : { [key: string]: string };
// 	export default classes;
// }
/**
 * shims-vue.d.ts是为了 typescript 做的适配定义文件，因为.vue 文件不是一个常规的文件类型，ts 是不能理解 vue 文件是干嘛的，
   加这一段是是告诉 ts，vue 文件是这种类型的。
 */
