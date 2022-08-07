import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/user/Users.vue'
import Welcome from '../components/Welcome.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Echarts from '../components/echars/echarts.vue'
import Order from '../components/order/order.vue'
import Cate from '../components/goods/cate.vue'
import Params from '../components/goods/params.vue'
import List from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Edit from '../components/goods/Edit.vue'
Vue.use(VueRouter)


// vue-router基本用法
// （1）安装vue-router
// npm install vue-router
// （2）创建路由实例
// 路由器完全依赖于路由表来分发路由请求，因此创建路由器实例时，需要使用routes配置项来声明请求路径（path）和组件（component）的对应关系。
// （3）向Vue实例注入路由器
// 如果在一个Vue实例的模板中需要使用router-link和router-view组件，需要首先向这个Vue实例注入路由器对象，因为这两个组件都依赖于路由器对象：
// 
// 在创建Vue实例时，使用router配置项将路由器对象注入Vue实例的$router属性。
// const myrouter=new VueRoutre({})
// const vm=new Vue({router:myrouter})
// console.log(vm.$router)   //打印 输出router

// 4）声明路由出口
// 在模板中，使用标签<router-view>声明路由视图元素。
// 声明一个路由视图：
// <router-view><router-view>

// （5）声明路由请求接口（说白了就是实现跳转呗）
// 使用<router-link>标签声明路由链接元素。
// <router-link to='/about'>About<router-link>  //声明了一个目标路径为/about的路由链接
// 
// 该模板对应于DOM结构：
// <a href="...">About</a>


// 建立路由表是嘛？？
const routes = [
	//重定向操作  我只要访问的是path中的/ 就是自动到了login这里
	//redirect v. （以新的方式或目的）重新使用；改寄，改变投递方向
	{ path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    // 当请求路径/时，路由器将选中组件Home；当请求路径/about时，路由器将选中组件About。
	{
		path: '/home',
		component: Home,
		redirect: '/welcome',
		children: [
			{ path: '/welcome', component: Welcome },
			{ path: '/users', component: Users },
			{ path: '/rights', component: Rights },
			{ path: '/roles', component: Roles },
			{ path: '/reports', component: Echarts },
			{ path: '/orders', component: Order },
			{ path: '/categories', component: Cate },
			{ path: '/params', component: Params },
			{ path: '/goods', component: List },
			{ path: '/goods/add', component: Add },
			{ path: '/goods/edit', component: Edit }
		]
	}
]

// 这是在干吗？？？？？？？？？？？？？？？？？？
// 我觉得就是建立个路由器吧？？？？？？？？？
// 毕竟vueRouter需要new       VueRouter是第三方库
const router = new VueRouter({
	routes
})

//路由守卫
//一共有三个参数  to 从哪来  from 到哪去  next 放行

// ①to: Route: 即将要进入的目标路由对象（to是一个对象，是将要进入的路由对象，可以用to.path调用路由对象中的属性）
// ②from: Route: 当前导航正要离开的路由
// ③next: Function: 这是一个必须需要调用的方法，执行效果依赖 next 方法的调用参数。
router.beforeEach((to, from, next) => {
	//to即将访问的路径  from代表从哪个跳转而来  next是一个函数  代表执行下一步操作
	if (to.path === "/login") return next();
	//获取token   如果没有，跳转到登录账号页面
	const token = window.sessionStorage.getItem('token');
	if (!token) return next('/login');
	next();
})

export default router
