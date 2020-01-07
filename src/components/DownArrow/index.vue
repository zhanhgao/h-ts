 <template>
     <div>
         <i :class="[{ rotateZ180: !showCard }, 'el-icon-arrow-down']" @click="change"></i>
     </div>
 </template>

 <script>
 export default {
     props: {
         showCard:{
             type: Boolean,
             default: false
         },
         callCb:{
             type:Function,
         }
     },
     methods: {
          change(){
              this.callCb();
          }
      }
 }
 </script>
 <style ang="scss" scoped>
    .rotateZ180{
        transform:rotateZ(180deg);
    }
 </style>