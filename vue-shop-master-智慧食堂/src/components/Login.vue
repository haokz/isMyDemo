<template>
	<div class="login_container" id="app">
		<!-- 内部文本框盒子 -->
		<div class="login_box">
			<!-- 头像区域进行绘制 -->
			<div class="avatar_box">
				<img src="../assets/logo.png" alt="">
			</div>

			<!-- 用户和密码框区域 以及按钮区域 element-ui 本身就是写页面的一个库 -->
			<el-form label-width="0px" class="login_form" :rules="LoginFormRules" :model="LoginForm" ref="LoginFormRef">
				<el-form-item prop="username">
					<el-input v-model="LoginForm.username" prefix-icon="iconfont icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="LoginForm.password" prefix-icon="iconfont icon-3702mima">
					</el-input>
				</el-form-item>
				<el-form-item class="btns">
					<!-- 按钮区域 -->
					<el-button type="primary" @click="login">登录</el-button>
					<!-- 利用表单的属性进行清空 因为是this 所以用的this会指向表单-->
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>

		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			LoginForm: {
				username: '',
				password: ''
			},
			LoginFormRules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		resetLoginForm() {
			// 利用表单的属性进行清空 因为是this 所以用的this会指向表单
			// this 是指向整个组件  那么this.$refs 就是指向的当前form表单对象
			this.$refs.LoginFormRef.resetFields();
		},
		async login() {
			// 向后端发送请求必须要做的事情
			//我第一步 是不是要挂载axios
			// 是不是应该把axios 挂载到我的vue原型上

			// username password
			// promise 对象 需要用await进行简化   
			// async / await 是ES7提出的基于Promise的解决异步的最终方案。

			//解构赋值
			const { data: res } = await this.$http.post('login', this.LoginForm)
			console.log(res);
			if (res.meta.status !== 200) return this.$message.error('登录失败');

			this.$message.success('登录成功');

			//我把token 这个（相当于）钥匙存储到我session当中进行保存
			// 方便接口的调用

			// 通过sessionStorage.setItem('name', item.name)存储item.name

			// 利用sessionStorage.getItem('name')获取存储数据
			window.sessionStorage.setItem('token', res.data.token);


			//剩余逻辑  跳转地址
			//我通过  $router.push 进行跳转
			this.$router.push('/home');

		}
	}
}
</script>

<!-- 第三方图标库的使用  阿里巴巴矢量图库  -->


<!-- lang 代表我写的样式 是less语法的样式  scoped 这个必须要写 代表该样式只在当前vue组件生效 -->
<style lang="less" scoped>
.login_container {
	background-color: #2b4b6b;
	height: 100%;
}

.login_box {
	background-color: #FFFFFF;
	width: 450px;
	height: 300px;
	// 圆角
	border-radius: 3px;

	position: absolute;
	left: 50%;
	top: 50%;

	transform: translate(-50%, -50%); // 记得再往回拉一点
}

.avatar_box {
	width: 130px;
	height: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #eee;

	// 定位去解决
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #FFFFFF;

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #eee;
	}
}

.login_form {
	position: absolute;
	//让我的form  贴底
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
}

.btns {
	display: flex;
	justify-content: flex-end;
}
</style>
