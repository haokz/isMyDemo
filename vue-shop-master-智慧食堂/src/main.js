import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'



//全局进行引用css才能生效
import './assets/global.css'
//进行全局引用之后  才能使用
import './assets/fonts/iconfont.css'

// 引入我的echarts 再全局进行引入
import echarts from 'echarts'

//  ！！！错误： 把我这个echarts对象  挂在到我的vue原型上 并且从新命名为$echarts
// 不用挂载了！！！  //但是在main.js 当中依旧需要引入echarts文件






// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)










import TreeTable from 'vue-table-with-tree-grid'
// 并且注册成一个组件
Vue.component('tree-table', TreeTable)


// 在main.js 当中  去定义我的过滤器  （含义: 把我的数据 去做成我想要的格式）
// dateFormat 这是咱们定义的过滤器的函数名
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const day = (dt.getDate() + '').padStart(2, '0')
  const hour = (dt.getHours() + '').padStart(2, '0')
  const minute = (dt.getMinutes() + '').padStart(2, '0')
  const second = (dt.getSeconds() + '').padStart(2, '0')

  // 可注意的点  就是必须得有return  
  // 你给我解释一下什么叫过滤器
  // 你在项目当中 哪点使用过vue的过滤器  处理时间戳的时候进行使用  订单板块
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})




import axios from 'axios'
//设置我的接口地址
axios.defaults.baseURL = 'http://vueshop.pixiv.download/api/private/v1/'
Vue.prototype.$http = axios
//把 我的axios 挂载到我的 vue原型上



// （获取菜单列表）    保证用户有获取数据的权限
//axios 请求预处理  不用特殊的记  能找到地方复制粘贴就行
// 因此，我们可以利用 axios 中interceptors属性，其中有一个成员 request，此时我们可以通过 use 函数为请求拦截器挂载一个回调函数，只要向服务器端发送了一个 axios 请求，会优先调用 use 函数。

// 首先，在 main.js添加如下代码：

axios.interceptors.request.use(config => {
  //像header请求头当中添加参数
  config.headers.Authorization = window.sessionStorage.getItem('token');

  //一定要有返回  才能生效
  return config;
})

// 此时，在Network就能查看到有一个 Authorization 字段了，但这里是为 null，因为我们进行的是登录请求，在登录期间，服务器是不会颁发令牌(token)。如果登录之后，调用其它 api 接口的话，就会颁发相应的token令牌。




// 综上所述， 有了Vue.config.productionTip = false这句代码，它会阻止你显示显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
