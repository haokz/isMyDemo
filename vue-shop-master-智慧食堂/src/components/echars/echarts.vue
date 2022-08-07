<template>


    <div id="myChart" :style="{width: '100%', height: '100%'}">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb> 

        <div>


        </div>
    </div>


</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')


export default {
        
    // 生命周期   需要用  mounted 挂载后的生命周期  
    // 是因为我挂载后  可以获取到我的html结构层
	  mounted() {
	    this.drawLine();
	  },
	  methods: {
	    async drawLine() {
		  const {data:res} = await this.$http.get('reports/type/1');
		  // console.log(res); 
		  //  解构赋值出来的东西  res.data  是不是就相当于咱们的option

            // 注意 option已经从服务器获取到了 所以这里不需用data


	      // 基于准备好的dom，初始化echarts实例
	      // 初始化就这么写 不要纠结为什么
		  let myChart = echarts.init(document.getElementById('myChart'))
	      // 绘制图表
		  // res.data 相当于 我案例当中的option
	      myChart.setOption(res.data);

         












		  // 第一步  需要 npm install 安装我的echarts
		  // npm install echarts --save
		  
		  // 第二步
		  // 需要再我的mian.js当中引入我的echarts文件
		 // import echarts from 'echarts'
		 
		 // 第三步  在我的组件当中  单独引入我的echarts内部文件
		  // 引入基本模板
		  //let echarts = require('echarts/lib/echarts')
		  // 引入柱状图组件
		  //require('echarts/lib/chart/bar')
		  // 引入提示框和title组件
		  //require('echarts/lib/component/tooltip')
		  //require('echarts/lib/component/title')
		  
		  
		  //第四步骤
		  // mounted() {
		  //   this.drawLine();
		  // }, 生命周期  需要用  mounted 挂载后的生命周期  是因为我挂载后  可以获取到我的html结构层
		  
		  // 渲染  myChart.setOption(res.data);  res.data 就相当于 option数据层
		  // 只是option 是咱们从线上接口获取的数据
	    }
		
	  }
	}
</script>

<style>
</style>
