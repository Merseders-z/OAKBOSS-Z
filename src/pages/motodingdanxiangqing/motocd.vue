<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">充电详情</span>
				</div>
				<div class="jiben-right">
					<myhead></myhead>
				</div>
			</div>
			<div class="myhead2">
				<div class="myhead2-left">
					<!-- <img src="../../assets/images/timgr.png" style="width: 53px;height: 53px;" /> -->
					<span class="jiben-nameWord">{{motoDealno}}</span>
					<!-- 	<span class="jiben-green">(运行中)</span> -->
					<div class="myhead2-but-box">
						<router-link to="/motoOrder">
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
		</div>
		<div class="motoCon">
			<div class="motoConTitle">
				<div class="wordBox" v-for="item in navList" :class="{ BGactive:item.id == isActive }"
					@click="changeBg(item.id)">
					{{item.name}}
				</div>
			</div>
			<div class="MotoconBox" v-show="isActive == 2 && motoState !== '4'">
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
						<div class="quanBlue"></div>
						<div>基本信息</div>
						<div class="quanBlue"></div>
					</div>
					<div class="motoconConBox">
						<!-- <div class="intBox">
							<div style="font-size: 18px;">账号ID</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{uid}}
								</div>
							</div>
						</div> -->
						<div class="intBox">
							<div style="font-size: 18px;">用户ID:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{id}}
								</div>
							</div>
						</div>
						<!-- <div class="intBox">
							<div style="font-size: 18px;">计费方式:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{type}}
								</div>
							</div>
						</div> -->
						<div class="intBox">
							<div style="font-size: 18px;">开始时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{starttime}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">结束时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{endtime}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">端口号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{gun}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">电桩编号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{chargerId}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">电桩名称:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{chargerName}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">用户账户:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{account}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">结束原因:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{typeList[cause]}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 费用明细 -->
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
						<div class="quanBlue"></div>
						<div>费用明细</div>
						<div class="quanBlue"></div>
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">总费用:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">电量:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{energy}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">开始电量:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{start_p}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">结束电量:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{end_p}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">电费:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount_energy}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">服务费:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount_service}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">停车费:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount_parking}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">闲置费:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount_vacant}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 网关明细 -->
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
						<div class="quanBlue"></div>
						<div>电池信息</div>
						<div class="quanBlue"></div>
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">开始SOC:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{start_soc}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">结束SOC:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{end_soc}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">最大需求电压:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{req_v}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">最大需求电流:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{req_i}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">BMS重试次数:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{retries}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">电池容量:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{vol}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">VIN:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{vin}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="motoCon1" v-show="isActive == 2 && motoState == '4'">
				
				<img src="../../assets/images/notMoto.png" style="width: 280px;height: 320px;">
				<div style="font-size: 26px;color: #757575;">未找到充电记录</div>
			</div>
			<div class="MotoconBox1" v-show="isActive == 1">
				<div class="motoword">电流曲线</div>
				<div class="chartsbox" id="myEcharts">

				</div>
			</div>
		</div>
		<!-- <div class="motoCon1" v-show="motoState !== 8">
			<img src="../../assets/images/notMoto.png" style="width: 280px;height: 320px;">
			<div style="font-size: 26px;color: #757575;">未找到充电记录</div>
		</div> -->
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
				inputUserID: '',
				inputScore: '',
				inputAmount: '',
				country: '',
				vin: '',
				vol: '',
				retries: '',
				typeList:[
					'已支付',
					'已退款',
					'已完成',
					'退款中',
					'进行中',
					'退款失败',
					'等待开始',
					'等待结束',
					'订单结束',
				],
				req_i: '',
				req_v: '',
				end_soc: '',
				start_soc: '',
				amount_vacant: '',
				account: '',
				amount: '',
				id: '',
				amount_service: '',
				amount_energy: '',
				uid: '',
				chargerId: '',
				gun: '',
				type: '',
				flag: true,
				starttime: '',
				start_p: '',
				amount_parking: '',
				end_p: '',
				dianya:[],
				dianliu:[],
				gonglv:[],
				quxianTime:[],
				isActive: 1,
				inputFax: '',
				cause:'',
				motoId: '',
				endtime: '',
				motoState:'',
				energy: '',
				chargerName: '',
				motoDealno: '',
				navList: [{
						name: '充电曲线',
						id: 1
					},
					{
						name: '充电详情',
						id: 2
					}
				]
			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.motoId = localStorage.getItem('motoId')
			this.motoDealno = localStorage.getItem('motoDealno')
			this.motoState = localStorage.getItem('motoState')
			console.log(typeof this.motoState)
		},
		mounted() {
			this.getUserMe()
			this.getUserMe1()
		},
		methods: {
			getUserMe() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				// console.log(toKen)
				this.$axios.get("admin/api/cdr/dealno/" + this.motoDealno + "?token=" + toKen)
					.then(res => {
						console.log(res)
						this.id = res.data.cdr.id
						this.uid = res.data.cdr.uid
						if (res.data.cdr.type == 0) {
							this.type = '自动充满'
						} else if (res.data.cdr.type == 1) {
							this.type = '按金额'
						} else if (res.data.cdr.type == 2) {
							this.type = '按电量'
						} else if (res.data.cdr.type == 3) {
							this.type = '按时间'
						} else if (res.data.cdr.type == 4) {
							this.type = '其他'
						}
						this.endtime = res.data.cdr.endtime
						this.starttime = res.data.cdr.starttime
						this.gun = res.data.cdr.gun
						this.chargerId = res.data.cdr.charger.id
						this.account = res.data.cdr.account
						this.amount = res.data.cdr.amount
						this.energy = res.data.cdr.energy
						this.end_p = res.data.cdr.end_p
						this.start_p = res.data.cdr.start_p
						this.amount_energy = res.data.cdr.amount_energy
						this.amount_parking = res.data.cdr.amount_parking
						this.amount_service = res.data.cdr.amount_service
						this.amount_vacant = res.data.cdr.amount_vacant
						this.chargerName = res.data.cdr.charger.name
						this.vin = res.data.cdr.vin
						this.vol = res.data.cdr.vol
						this.retries = res.data.cdr.retries
						this.req_i = res.data.cdr.req_i
						this.req_v = res.data.cdr.req_v
						this.end_soc = res.data.cdr.end_soc
						this.start_soc = res.data.cdr.start_soc
						this.cause = res.data.cdr.cause
					})
			},
			getUserMe1() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				// console.log(toKen)
				this.$axios.get("/admin/api/payment/" + this.motoDealno + "/values?token=" + toKen)
					.then(res => {
						console.log(res)
						for(let i in res.data.values){
							this.dianliu.push(res.data.values[i].i)
							this.dianya.push(res.data.values[i].v)
							this.gonglv.push(res.data.values[i].p)
							this.quxianTime.push(res.data.values[i].time)
						}
						console.log(this.dianliu)
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
					grid: {
					},
					legend: {
						data: ['电流曲线', '电压曲线', '功率曲线'],
						orient: 'vertical', //垂直显示
						// y: 'centre', //延Y轴居中
						x: 'right', //居右显示
						itemGap: 30, //图例间隔
						textStyle: {
							fontSize: 16
						},
						show: true,
						borderWidth: 2,
						shadowColor: 'rgba(0, 0, 0, 0.3)',
						shadowBlur: 5,
						borderRadius: 10,
						padding: [20, 10],
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
							symbolSize:10,
							itemStyle: {
								normal: {
									lineStyle: {
										width:5
									}
								}
							},
						},
						{
							name: '电压曲线',
							type: 'line',
							data: this.dianya,
							smooth: false,
							symbolSize:10,
							itemStyle: {
								normal: {
									lineStyle: {
										width:5
									}
								}
							},
						},
						{
							name: '功率曲线',
							type: 'line',
							data: this.gonglv,
							smooth: false,
							symbolSize:10,
							itemStyle: {
								normal: {
									lineStyle: {
										width:5
									}
								}
							},
						}
					]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
			changeBg(id) {
				this.isActive = id
			},
			reset() {
				this.getUserMe() //表单重置
			},
			shua() {
				this.$router.go(0); //刷新
			},
			back() {
				this.$router.push({name:'motoOrder'})
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

	.chartsbox {
		width: 1500px;
		height: 530px;
		margin: 0 auto;
	}

	.motoword {
		font-size: 22px;
		font-weight: 600;
		margin: 0 auto;
		padding: 20px 0px;
	}

	.motoInp {
		width: 300px;
		height: 30px;
		border-radius: 10px;
		border: solid 2px #bfbfbf;
		margin-left: 15px;
	}

	.inpDiv {
		margin: 0 auto;
		width: 90%;
		height: 30px;
		line-height: 30px;
		font-size: 18px;
		color: #787878;
	}

	.intBox {
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin: 25px 5px;
	}

	.motoconConBox {
		width: 100%;
		height: 600px;
		border-top: solid 1px #7d7d7d;
	}

	.threeTitle {
		width: 30%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		color: #1e69fe;
		font-size: 22px;
		padding: 20px 0px;
	}

	.quanBlue {
		width: 8px;
		height: 8px;
		background-color: #1e69fe;
		border-radius: 50%;
	}

	.MotoconBoxTitle {
		width: 30%;
		height: 600px;
		display: flex;
		flex-direction: column;

	}

	.MotoconBox {
		width: 100%;
		height: 600px;
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.MotoconBox1 {
		width: 100%;
		height: 600px;
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.wordBox {
		width: 200px;
		height: 100%;
		color: #7b7b7b;
		text-align: center;
		line-height: 70px;
		font-size: 25px;
		cursor: pointer;
	}

	.motoConTitle {
		width: 100%;
		height: 70px;
		display: flex;
		flex-direction: row;
	}

	.motoCon {
		width: 95%;
		height: 700px;
		margin: 0 auto;
		border-radius: 15px;
		box-shadow: 0px 0px 5px 2px gainsboro;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	
	.motoCon1 {
		width: 95%;
		height: 700px;
		margin: 0 auto;
		border-radius: 15px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.con-bottom {
		width: 250px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.but1 {
		width: 100px;
		height: 35px;
		border-radius: 5px;
		border: solid 1px #ccc;
		color: #635e5e;
		line-height: 35px;
		text-align: center;
		cursor: pointer;
	}

	.but2 {
		width: 100px;
		height: 35px;
		border-radius: 5px;
		color: white;
		line-height: 35px;
		text-align: center;
		background-color: #1e69fe;
		cursor: pointer;
	}

	.two {
		width: 150px !important;
	}

	.twoInput {
		width: 800px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.title-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sex {
		width: 200px !important;
	}

	.con-con .div el-input {
		margin-left: 50px !important;
	}

	.con-con1 {
		display: flex;
		flex-direction: column;
		height: 200px;
		justify-content: space-between;
		margin-top: 30px;
	}

	.con-con2 {
		display: flex;
		flex-direction: column;
		height: 250px;
		justify-content: space-between;
		margin-top: 30px;
	}

	.con-con {
		display: flex;
		flex-direction: column;
		height: 450px;
		justify-content: space-between;
		margin-top: 30px;
	}

	.banInput {
		cursor: no-drop;
	}

	.jibenInput {
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		height: 40px;
		line-height: 40px;
		outline: 0;
		padding: 0 15px;
		width: 100%;
	}

	.con-con-box input:focus {
		border-style: solid;
		border-color: #1e69fe;
	}

	.con-con-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.con-con-box div {
		width: 400px;
	}

	.con-con span {
		font-family: PingFangSC-Regular;
		font-size: 15px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
		width: 120px;
		text-align: right;
	}

	.con-con1 span {
		font-family: PingFangSC-Regular;
		font-size: 15px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
		width: 120px;
		text-align: right;
	}

	.con-con2 span {
		font-family: PingFangSC-Regular;
		font-size: 15px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
		width: 120px;
		text-align: right;
	}

	.userMes {
		display: flex;
		flex-direction: column;
		width: 35%;
	}

	.blue-dian {
		width: 16px;
		height: 16px;
		background-color: #1e69fe;
		border-radius: 100%;
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

	.el-button--default {
		border-radius: 10px;
		padding: 10px 20px;
	}

	.jiben-green {
		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #4ea805;
		margin-left: 10px;
	}

	.myhead2-right-box {
		display: block;
		float: right;
	}

	.myhead2-but-box {
		width: 200px;
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
		width: 400px;
		text-align: center;
		line-height: 30px;
	}

	.jiben-right-top {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 20px auto;
		margin-top: 35px;
	}

	.jiben-left {
		width: 50%;
	}

	.BGactive {
		color: #2a71fe;
		border-bottom: solid 2px #2a71fe;
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

	.myhead2 {
		display: flex;
		flex-direction: row;
		padding: 20px 0;
		border-bottom: solid 1px gray;

	}
</style>
