// import Vue from 'vue'
// import Component from 'vue-class-component'

// @Component
// export class IndexMixin extends Vue {
//   private pages: any = {
//     pageSize: 10,
//     pageNum: 1,
//   }
//   private pageSizes: number[] = [10, 20, 30, 40]
//   private totalRecord: number = 0
//   private errorMsg: any = {
//     'no-search': '请输入搜索内容',
//     'no-checklist': '请先勾选列表',
//   }
//   private showCard: boolean = true
//   private classObject: any = {
//     'el-icon-arrow-down': true,
//     'rotateZ180': this.showCard
//   }
//   private changeShow() {
//     this.showCard = !this.showCard
//   }
//   private mixResetPage() {
//     this.pages = {
//       pageSize: 10,
//       pageNum: 1
//     }
//   }
//   //FromData不为空
//   private mixCheckFromData(formData: string) {
//     let _type = Object.values(formData).filter((it: any) => {
//       return it !== '' && it !== [];
//     });
//     return _type.length ? true : false;
//   }
// }

import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare a mixin as the same style as components.
@Component
export default class MyMixin extends Vue {
  mixinValue = 'Hello'
}