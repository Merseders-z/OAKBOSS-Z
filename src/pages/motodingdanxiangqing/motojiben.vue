<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">基本资料</span>
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
		<!-- 	<div class="motoConTitle">
				<div class="wordBox">
					基本信息
				</div>
			</div> -->
			<div class="MotoconBox" v-show="isActive == 1">
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
						<div class="quanBlue"></div>
						<div>订单信息</div>
						<div class="quanBlue"></div>
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">订单编号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{id}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">订单号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{deal_no}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">用户ID:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{uid}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">设备订单:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{gw_dealno}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">账号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{account}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">支付时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{paid_time}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">站点名:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{station_name}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">设备名:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{dev_name}}
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
							<div style="font-size: 18px;">充值金额:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">支付金额:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{pay}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">收入金额:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{income}}
								</div>
							</div>
						</div>
						<!-- <div class="intBox">
							<div style="font-size: 18px;">优惠金额:</div>
							<div class="motoInp">
								<div class="inpDiv">
									23424
								</div>
							</div>
						</div> -->
						<div class="intBox">
							<div style="font-size: 18px;">退款金额:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{refund}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">退款原因:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{cause}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 网关明细 -->
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
						<div class="quanBlue"></div>
						<div>支付明细</div>
						<div class="quanBlue"></div>
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">支付方式:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{gateway}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">支付方ID:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{payer_id}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">支付方账号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{payer}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">收款方ID:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{payee_id}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">收款方账号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{payee}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">网关订单:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{out_deal_no}}
								</div>
							</div>
						</div>
					</div>
				</div>
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
				inputUserID: '',
				inputScore: '',
				inputAmount: '',
				country: '',
				id:'',
				isActive: 1,
				inputFax: '',
				account:'',
				payer:'',
				dev_name:'',
				pay:'',
				motoId: '',
				motoDealno: '',
				out_deal_no:'',
				deal_no:'',
				gateway:'',
				income:'',
				cause:'',
				station_name:'',
				paid_time:'',
				uid:'',
				refund:'',
				payer_id:'',
				gw_dealno:'',
				amount:'',
				payee_id:'',
				payee:'',
				tableData:[],
				navList: [{
						name: '账单信息',
						id: 1
					},
					{
						name: '充电详情',
						id: 2
					},
					{
						name: '充电曲线',
						id: 3
					}
				]
			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.motoId = localStorage.getItem('motoId')
			this.motoDealno = localStorage.getItem('motoDealno')
			console.log(this.motoDealno, this.motoId)
		},
		mounted() {
			this.getUserMe()
		},
		methods: {
			getUserMe() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				// console.log(toKen)
				this.$axios.get("/admin/api/payment/" + this.motoId + "?token=" + toKen)
					.then(res => {
						if (res.data.error == 0) {
							console.log(res.data.payment)
							this.tableData = res.data.payment
							this.deal_no = res.data.payment.deal_no
							this.account = res.data.payment.account
							this.id = res.data.payment.id
							this.station_name = res.data.payment.station_name
							this.dev_name = res.data.payment.dev_name
							this.paid_time = res.data.payment.paid_time
							this.pay = res.data.payment.pay
							this.refund = res.data.payment.refund
							this.cause = res.data.payment.cause
							if(res.data.payment.gateway == ''){
								this.gateway = '其他'
							}else if(res.data.payment.gateway == 'alipay'){
								this.gateway = '支付宝'
							}else if(res.data.payment.gateway == 'wechat'){
								this.gateway = '微信'
							}else if(res.data.payment.gateway == 'userpay'){
								this.gateway = '钱包'
							}
							this.payer_id = res.data.payment.payer_id
							this.payer = res.data.payment.payer
							this.gw_dealno = res.data.payment.gw_dealno
							this.uid = res.data.payment.uid
							this.amount = res.data.payment.amount
							this.income = res.data.payment.income
							this.out_deal_no = res.data.payment.out_deal_no
							this.payee_id = res.data.payment.payee_id
							this.payee = res.data.payment.payee
						}
					})
			},
			reset() {
				this.getUserMe() //表单重置
			},
			shua() {
				this.$router.go(0); //刷新
			},
			back() {
				this.$router.push({name:'login'})
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
