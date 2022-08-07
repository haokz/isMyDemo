<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>


        <el-container>
            <!-- 左侧下拉 -->
            <!-- 应该有两个宽度
			 200  64 两个值
			 也就是说  我再width这个属性的时候  也是动态绑定的属性
			 
			 -->


            <el-aside :width="isCollapse?'64px':'200px'">



                <div class="toggle-button" @click="toggleCollapse">|||</div>

                <!-- :collapse-transition="false"  关闭折叠动画 默认是开启 -->
                <el-menu class="el-menu-vertical-demo" background-color="#333744" text-color="#fff"
                    active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router
                    :default-active="activepath">

                    <!-- 这为什么要写key  因为规定这个唯一标识符 -->
                    <!-- :index需要一个字符串类型 为什么？？？？？？？？？？？？？？？？？？？  设置他的意义是什么 -->
                    <!-- :index需要一个字符串类型 为什么可以治好那个毛病 -->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">

                        <template slot="title">
                            <!-- object[105]这是个什么？？？？？？？？？？？？？ -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 一级导航的各个名字 -->
                            <!-- 想知道authName是不是后台的？？？？？？？ -->
                            <span>{{item.authName}}</span>
                        </template>

                        <!-- 当我menu 开启路由模式的时候  menu会把index属性的值作为我跳转的地址 -->
                        <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 默认boolean — false -->
                        <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id"
                            @click="saveNavState('/'+subitem.path)">
                            <!-- 由于每个二级菜单都有一个路由链接，不妨将路由路径 path 存储在 sessionStorage 中，具体做法就是给二级菜单绑定一个事件： -->



                            <template slot="title">

                                <i class="el-icon-menu"></i>
                                <span>{{subitem.authName}}</span>
                            </template>

                        </el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>



            <el-main>
                <!-- 路由占位符  这样才能呈现我的子组件 ！！！！！！！！！！！！！！！！！！！-->
                <router-view></router-view>
            </el-main>
        </el-container>



    </el-container>
</template>

<script>
	export default {
		data(){
			return{
				//思路 必须要在这定义变量进行承接
                //总结规律  凡是能从接口当中 读取回来的数据  一般都用数据进行定义和承接
				menulist:[],
				
				//一般能从页面上获取的数据 都用{} 对象来承接 eg form{}
				
				//图标 每一个图标都不一样  每个都不一样  也就是所谓的动态属性
				//我把图标手动编写成 key和value的组合方式  那么key是什么呢
				// 服务器返回对象的时候  只有id是唯一的  那么我就用id作为我的key值  
                iconsObj: {
                    // 为什么这个id是一个数字 而且为什么一直是固定的呢？？？？？？？？？？？？？？？？？？
				  '125': 'iconfont icon-user',
				  '103': 'iconfont icon-tijikongjian',
				  '101': 'iconfont icon-shangpin',
				  '102': 'iconfont icon-danju',
				  '145': 'iconfont icon-baobiao'
                },

                
				//控制我的菜单是折叠还是展开的选项
				isCollapse:false,
				activepath:''
			} 
		},
		//生命周期函数
        // 页面一加载完 我就用这个函数
		created() {
			this.getMenuList();
			// 错误点  每次页面刷新的时候  我的activepath  都是空的
			// 我就在我的生命周期函数当中  直接给我的activepath 进行赋值  我的值就是从我的session
			//当中获取的
            this.activepath = window.sessionStorage.getItem('activepath');
            console.log(this.activepath);
		},
    methods: {

            // 退出功能
			logout() {
				//最开始通过token 保存到session当中  进行我是否登录的判断  token是你的唯一凭证
				//就是我把token在session当中进行了删除
				// 然后通过我路由跳转的方式  跳转回了我的login组件

				//清除了浏览器当中所有的session
            window.sessionStorage.clear();
                // 进行跳转到登录页面
				this.$router.push('/login');
        },
// 存在一个小bug 路由首位

            
			//专门像服务器  请求左侧列表的函数
        async getMenuList () {
                // 解构赋值
                //注意这里就是调用接口 已经从后端写好的接口获取了
				const {data:res} = await this.$http.get('menus');
				console.log(res);
				// 现在res 才是我data里面的东西
				this.menulist = res.data;
        },

            
			toggleCollapse(){
				this.isCollapse = !this.isCollapse
			},
			saveNavState(activepath)
			{
				// 我将把path 路径存储到我的session当中
				// console.log(path);
				window.sessionStorage.setItem('activepath',activepath);
				this.activepath = activepath;
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.home-container {
		height: 100%;
	}

	//小技巧 特性 就是标签的名字  就是你class的名字
    //头部导航
	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;

		>div {
			display: flex;

// text-align: center 实现文字居中对齐与 align-items:center 实现div内所有标签对齐

			align-items: center;

			span {
				margin-left: 15px;
			}
		}

// 只设置宽度 让图片不失真
		img {
			width: 13%;
		}
	}
	


	.el-aside {
		background-color: #333744;  //通栏颜色
		.el-menu{
			border-right: none;
		}
	}
	
	.iconfont{
		margin-right: 10px;
	}
	
	.toggle-button{
		background-color: #4a5064;
		color: #fff;
		font-size: 10px;
		line-height: 24px;
		text-align: center;
		// 我让我的三个||| 彼此之间不要那么近 有一定距离 0.3em
		letter-spacing: 0.3em;
		// 变成小手的样式
		cursor: pointer;
	}
</style>
