# vue-typescript

## vue + typescript 的vue属性和方法的不同之处
> 可以官网了解 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
### 引入vue-property-decorator
```js
  import { Component, Vue, Prop, Emit , Watch } from 'vue-property-decorator'
  
  ## 使用方式
  @Prop  父子组件之间传值
    @Prop({
      type: String,
      default: 'Default Value'
    }) msg: string;
  
  @Model  数据双向绑定
    @Model('change') checked: boolean

  @Watch  监听数据变化    
    //监听路由变化
    @Watch('$route')
    onRouteChanged(route: any, oldRoute: any):void {
      this.$forceUpdate() ## 刷新当前的数据
    }

  @Provide  提供  /  @Inject  注入   
    ## 父
    @Provide('users')
      users = [
        {
          name: 'test',
          id: 0
        }
      ]
    ## 子  
    @Inject('users') users;  
  // 修饰器
  const Log = (msg) => {
    return createDecorator((component, key) => {
      console.log("#Component", component);
      console.log("#Key", key); //log
      console.log("#Msg", msg); //App
    })
  }
  @Log('fullMessage get called')

  // computed
  get fullMessage() {
    return `${this.message} from Typescript`
  }
  // 父子传值
  
  @Emit()
  private methodName(x: number, y: string) {
    console.info('child to parent a value')
  }
```

### 使用命令行创建组件
```shell
  npm run new:comp
```
![图片示例](https://user-gold-cdn.xitu.io/2019/4/24/16a4e59e7697b069?w=528&h=207&f=png&s=12547)

### 使用命令行创建页面
```shell
  npm run new:view
```
![图片示例](https://user-gold-cdn.xitu.io/2019/4/24/16a4e59362d9cc5b?w=350&h=190&f=png&s=7983)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
