<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">充电曲线</span>
				</div>
				<div class="jiben-right">
					<myhead></myhead>
				</div>
			</div>
			<div class="myhead2">
				<div class="myhead2-left">
					<!-- <img src="../../assets/images/timgr.png" style="width: 53px;height: 53px;" /> -->
					<span class="jiben-nameWord">{{charName}}</span>
					<span class="jiben-green">(运行中)</span>
					<div class="myhead2-but-box">
						<router-link to="/motoAll">
							<div class="myhead2-but">返回上一级页面</div>
						</router-link>
					</div>
				</div>
				<div class="myhead2-right">
					<div class="myhead2-right-box">
						<el-button icon="el-icon-refresh" @click="shua">刷新</el-button>
					</div>
				</div>
			</div>
			<div class="charCon">
				<div style="font-size: 18px;margin-right: 20px;">请选择端口号:</div>
				<div class="tiemBox">
					<template>
						<el-select v-model="value" placeholder="端口1">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</template>
				</div>
				<div style="margin-left: 20px;">
					<el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
				</div>
				<div style="margin-left: 500px;">
					<template>
						<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
							</el-date-picker>
						</div>
					</template>
				</div>
				<div style="margin-left: 20px;">
					<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
				</div>
			</div>
			<div class="motoCon" id="myEcharts">

			</div>
		</div>
	</div>
</template>

<script>
	import myhead from '../../components/myhead.vue'
	export default {
		components: {
			myhead
		},
		data() {
			return {
				charName: '',
				options: [{
						label: '端口1',
						value: 1
					},
					{
						label: '端口2',
						value: 2
					},
					{
						label: '端口3',
						value: 3
					},
					{
						label: '端口4',
						value: 4
					},
					{
						label: '端口5',
						value: 5
					}
				],
				token: '',
				value1:0,
				value: 1,
				chooseport: '',
				dianliu: [],
				dianya: [],
				gonglv: [],
				quxianTime: [],
			}
		},
		created() {
			this.token = localStorage.getItem("token");
			this.charName = localStorage.getItem("charName");
			this.charId = localStorage.getItem("charId");
			this.charMac = localStorage.getItem("charMac");
			console.log(this.charId, this.charName, this.charMac)
		},
		mounted() {
			this.getcharger()
		},
		methods: {
			shua() {
				this.$router.go(0); //刷新
			},
			back() {
				this.$router.push({
					name: 'motoAll'
				})
			},
			CPort(value) {
				console.log(value)
			},
			search() {
				
				let toKen = this.token.replace(/\"/g, "")
				this.dianliu = []
				this.dianya = []
				this.gonglv = []
				this.quxianTime = []
				this.$echarts.init(document.getElementById("myEcharts")).dispose();
				this.$axios.get("/admin/api/charger/" + this.charMac + "/port/" + this.value + "/values?token=" +
					toKen + "&from=" + this.value1 + "&to=" + this.value1).then(res => {
					console.log(res)
					for (let i in res.data.values) {
						this.dianliu.push(res.data.values[i].i)
						this.dianya.push(res.data.values[i].v)
						this.gonglv.push(res.data.values[i].p)
						this.quxianTime.push(res.data.values[i].time)
					}
					console.log(this.quxianTime)
					this.$nextTick(() => {
						this.drawChart();
					});
				})
			},
			getcharger() {
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("/admin/api/charger/" + this.charMac + "/port/" + this.value + "/values?token=" + toKen)
					.then(res => {
						console.log(res)
						for (let i in res.data.values) {
							this.dianliu.push(res.data.values[i].i)
							this.dianya.push(res.data.values[i].v)
							this.gonglv.push(res.data.values[i].p)
							this.quxianTime.push(res.data.values[i].time)
						}
						this.$nextTick(() => {
							this.drawChart();
						});
					})
			},
			drawChart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById("myEcharts"));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					color: ['#ff7200', '#00cc57', '#238ae1'],
					grid: {},
					legend: {
						data: ['电流曲线', '电压曲线', '功率曲线'],
						orient: 'horizontal', //垂直显示
						y: 'bottom', //延Y轴居中
						x: 'center', //居右显示
						itemGap: 30, //图例间隔
						textStyle: {
							fontSize: 16
						},
						show: true,
						selectedMode: 'single',
					},
					xAxis: {
						data: this.quxianTime,
						fontSize: 18,
					},
					yAxis: {
						type: 'value',
						name: '电流/A，电压/V，功率/P'
					},
					series: [{
							name: '电流曲线',
							type: 'line',
							data: this.dianliu,
							smooth: false,
							symbolSize: 10,
							itemStyle: {
								normal: {
									lineStyle: {
										width: 5
									}
								}
							},
						},
						{
							name: '电压曲线',
							type: 'line',
							data: this.dianya,
							smooth: false,
							symbolSize: 10,
							itemStyle: {
								normal: {
									lineStyle: {
										width: 5
									}
								}
							},
						},
						{
							name: '功率曲线',
							type: 'line',
							data: this.gonglv,
							smooth: false,
							symbolSize: 10,
							itemStyle: {
								normal: {
									lineStyle: {
										width: 5
									}
								}
							},
						}
					]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
		}
	}
</script>

<style scoped="scoped">
	.jiben {
		width: 100%;
		height: 100vh;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	.se {
		border: none;
		font-size: 16px;
	}

	.tiemBox {
		width: 200px;
		height: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: solid 1px gainsboro;
		border-radius: 5px;
		justify-content: space-around;
	}

	.charCon {
		display: flex;
		flex-direction: row;
		height: 50px;
		width: 95%;
		margin: 20px auto;
		justify-content: center;
		align-items: center;
	}

	.motoCon {
		width: 95%;
		height: 600px;
		margin: 0 auto;
		border-radius: 15px;
		box-shadow: 0px 0px 5px 2px gainsboro;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.jiben-green {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #4ea805;
		margin-left: 10px;
	}

	.jiben-left {
		width: 50%;
	}

	.el-button--default {
		border-radius: 10px;
		padding: 10px 20px;
	}

	.jiben-right-top {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 20px auto;
		margin-top: 35px;
	}

	.myhead2 {
		display: flex;
		flex-direction: row;
		border-bottom: solid 1px gray;
		padding: 20px 0px;
	}


	.myhead2-but-box {
		width: 200px;
	}

	.myhead2-right-box {
		display: block;
		float: right;
	}

	.myhead2-but {
		width: 135px;
		height: 30px;
		background-color: #1e69fe;
		margin: 0 auto;
		color: white;
		line-height: 30px;
		text-align: center;
		border-radius: 5px;
		font-size: 12px;
		cursor: pointer;
	}

	.jiben-nameWord {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 30px;
		width: 300px;
		line-height: 30px;
		text-align: center;
	}

	.myhead2-right {
		display: block;
		width: 50%;
		line-height: 53px;
	}

	.myhead2-left {
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.user-word {
		width: 47px;
		height: 23px;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
	}

	.jiben-right {
		width: 50%;
	}

	.myhead1 {
		display: flex;
		flex-direction: row;
	}

	.jiben-right-conWord {
		font-family: PingFangSC-Regular;
		font-size: 20px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
		margin-left: 15px;
	}

	.jiben-right-con {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 30px auto;
		justify-content: space-between;
		height: 1100px;
	}
</style>
