
//  export default {
//      props: {
//          showCard:{
//              type: Boolean,
//              default: false
//          },
//          callCb:{
//              type:Function,
//          }
//      },
//      methods: {
//           change(){

//           }
//       }
//  }


import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class DownArrow extends Vue {
    @Prop(Boolean) readonly showCard: boolean | undefined

    // 方法
    @Emit('titleChanged')
    onShowChange() { }

    protected render() {
        // return (
        //     <div>
        //         <i class="[{ rotateZ180: !showCard }, 'el-icon-arrow-down']" onClick={this.onShowChange}></i>
        //     </div>
        // );
        return (
            <el-button
                type="primary"
                size="medium"
                round
                loading>
                按钮
    </el-button>
        );
    }
}
