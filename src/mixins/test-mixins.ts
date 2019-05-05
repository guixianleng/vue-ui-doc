import { Vue, Component } from 'vue-property-decorator';
// 设置全局 mixins
// declare module 'vue/types/vue' {
//   interface Vue {
//     testMixinArg: string
//     testMixinFunc (): void
//   }
// }

/**
 * Mixin test
 *
 * @export
 * @class TestMixin
 * @extends {Vue}
 */
@Component({})
export default class TestMixin extends Vue {
  public testMixinArg = 'this is test mixin arg';

  public testMixinFunc (): void {
    console.log('this string is from test mixin console.log');
  }
}
