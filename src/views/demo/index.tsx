import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    protected render() {
        return <div>helloword</div>;
    }
}


// import { mixins } from 'vue-class-component';
// import MyMixin from '@/mixins/index';
// @Component
// export class App extends mixins(MyMixin) {
//     created() {
//         console.log(1111,this.mixinValue) // -> Hello
//     }
//     protected render() {
//         return <div>helloword</div>;
//     }
// }