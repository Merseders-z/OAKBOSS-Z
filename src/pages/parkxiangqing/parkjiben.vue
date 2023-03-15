<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">基本信息</span>
				</div>
				<div class="jiben-right">
					<myhead></myhead>
				</div>
			</div>
			<div class="myhead2">
				<div class="myhead2-left">
					<!-- <img src="../../assets/images/timgr.png" style="width: 53px;height: 53px;" /> -->
					<span class="jiben-nameWord">{{parkPlate}}</span>
					<!-- 	<span class="jiben-green">(运行中)</span> -->
					<div class="myhead2-but-box">
						<div class="myhead2-but" @click="back">返回上一级页面</div>
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
			<div class="navListBox">
				<div class="navList" v-for="item in navList" :class="{blue:item.id == isActive}"
					@click="chooseBg(item.id)">{{item.name}}</div>
			</div>
			<div class="MotoconBox" v-show="isActive == 1">
				<div class="MotoconBoxTitle">
					<div class="threeTitle">

					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">订单号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{dealno}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">订单ID:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{deal_id}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">车牌号:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{plate}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">入口:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{enter_devname}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">出口:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{leave_devname}}
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
							<div style="font-size: 18px;">站点ID:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{station}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 费用明细 -->
				<div class="MotoconBoxTitle">
					<div class="threeTitle">

					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">取证时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{confirm_time}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">驶入时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{enter_time}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">驶出时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{leave_time}}
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
							<div style="font-size: 18px;">停车时长:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{shichang}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">结单时间:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{closed_time}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 网关明细 -->
				<div class="MotoconBoxTitle">
					<div class="threeTitle">

					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">优惠金额:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{allowance}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">停车费:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{amount}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">实际支付:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{paid}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">欠费金额:</div>
							<!-- <input type="text" class="motoInp"> -->
							<div class="motoInp">
								<div class="inpDiv">
									{{debts}}
								</div>
							</div>
						</div>
						<!-- <div class="intBox">
							<div style="font-size: 18px;">退款金额:</div>
							<div class="motoInp">
								<div class="inpDiv">
									1
								</div>
							</div>
						</div> -->
						<div class="qrBox">
							<div id="qrcode" ref="qrcode"></div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="MotoconBox" v-show="isActive == 2">
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
				
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">订单号:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{dealno}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">订单ID:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{deal_id}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">车牌号:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{plate}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">入口:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{enter_devname}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">出口:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{leave_devname}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">站点名:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{station_name}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">站点ID:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{station}}
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
				
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">取证时间:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{confirm_time}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">驶入时间:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{enter_time}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">驶出时间:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{leave_time}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">停车时长:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{shichang}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">结单时间:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{closed_time}}
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="MotoconBoxTitle">
					<div class="threeTitle">
				
					</div>
					<div class="motoconConBox">
						<div class="intBox">
							<div style="font-size: 18px;">优惠金额:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{allowance}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">停车费:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{amount}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">实际支付:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{paid}}
								</div>
							</div>
						</div>
						<div class="intBox">
							<div style="font-size: 18px;">欠费金额:</div>
							<div class="motoInp">
								<div class="inpDiv">
									{{debts}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> -->
			<div class="MotoconBox" v-show="isActive == 3">
				<div class="quzheng">
					<div class="threeTitle">
						<div class="quanBlue"></div>
						<div>取证照片</div>
						<div class="quanBlue"></div>
					</div>
					<div class="photoBox1" v-if="mediasList">
						<div class="poi" v-for="item in mediasList">
							<div class="photo" @click="dialogVisible = true">
								<img :src="item.url[0]" style="width: 260px;height: 150px;cursor: pointer;" preview="1" :large="item.url[0]"
									preview-text="点击放大">
							</div>
							<div class="photoWord">{{time(item.time)}}</div>
							<div class="imgBoxConW1">
								<div class="imgBoxConW2">
									{{parkPlate}}
								</div>
							</div>
						</div>
					</div>
					<div class="photoBox" v-else>
						暂无信息
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myhead from '../../components/myhead.vue'
	import QRCode from 'qrcodejs2'
	export default {
		components: {
			myhead,
			QRCode
		},
		data() {
			return {
				inputUserID: '',
				inputScore: '',
				inputAmount: '',
				country: '',
				id: '',
				debts: '',
				isActive: 1,
				inputFax: '',
				account: '',
				payer: '',
				dev_name: '',
				closed_time: '',
				pay: '',
				parkId: '',
				motoDealno: '',
				enter_time: '',
				dialogVisible :false,
				out_deal_no: '',
				deal_id: '',
				dealno: '',
				gateway: '',
				income: '',
				cause: '',
				qr: '',
				station_name: '',
				confirm_time: '',
				leave_time: '',
				paid_time: '',
				paid: '',
				shichang: '',
				uid: '',
				station: '',
				refund: '',
				payer_id: '',
				gw_dealno: '',
				amount: '',
				allowance: '',
				payee_id: '',
				plate: '',
				enter_devname: '',
				leave_devname: '',
				parkPlate: '',
				payee: '',
				tableData: [],
				mediasList: [],
				pdrData: [],
				navList: [{
						name: '订单信息',
						id: 1
					},
					// {
					// 	name: '附加信息',
					// 	id: 2
					// },
					{
						name: '取证信息',
						id: 3
					}
				]
			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.parkId = localStorage.getItem('parkOrderId')
			this.parkPlate = localStorage.getItem('parkOrderPlate')
			console.log(this.parkId, this.parkPlate)
		},
		mounted() {
			this.getUserMe()
		},
		methods: {
			getUserMe() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				// console.log(toKen)
				this.$axios.get("admin/api/pdr/" + this.parkId + "?token=" + toKen + "&attach=media")
					.then(res => {
						console.log(res)
						if (res.data.error == 0) {
							this.dealno = res.data.pdr.dealno
							this.deal_id = res.data.pdr.id
							this.plate = res.data.pdr.plate
							this.enter_devname = res.data.pdr.enter_devname
							this.leave_devname = res.data.pdr.leave_devname
							this.station_name = res.data.pdr.station_name
							this.station = res.data.pdr.station
							this.confirm_time = res.data.pdr.confirm_time

							this.enter_time = res.data.pdr.enter_time
							var jinrutime = this.enter_time.replace(/-/g, "/")
							var time = (new Date(jinrutime)).valueOf()
							var time1 = (new Date()).valueOf()

							var time2 = time1 - time
							let days = Math.floor(time2 / (1000 * 60 * 60 * 24));
							let hours = Math.floor((time2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
							let minutes = Math.floor((time2 % (1000 * 60 * 60)) / (1000 * 60));
							let seconds = Math.round((time2 % (1000 * 60)) / 1000);
							var showTime = days + "天" + hours + "小时" + minutes + "分钟";

							this.shichang = showTime
							this.leave_time = res.data.pdr.leave_time
							this.closed_time = res.data.pdr.closed_time
							this.amount = res.data.pdr.amount
							this.allowance = res.data.pdr.allowance
							this.paid = res.data.pdr.paid
							this.debts = res.data.pdr.debts
							this.qr = res.data.pdr.qr
							this.mediasList = res.data.pdr.medias
							this.$previewRefresh();
							this.qrcodeScan()
						}
					})
			},
			qrcodeScan() { //生成二维码
				let qrcode = new QRCode('qrcode', {
					width: 200, // 二维码宽度 
					height: 200, // 二维码高度
					text: this.qr
				})
			},
			
			time(time) {
				let date = new Date(time*1000);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
			chooseBg(id) {
				console.log(id)
				this.isActive = id
			},
			reset() {
				this.getUserMe() //表单重置
			},
			shua() {
				this.$router.go(0); //刷新
			},
			back() {
				this.$router.go(-1); 
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

	.photoWord {
		font-size: 18px;
	}

	.imgBoxConW1 {
		font-size: 28px;
		color: white;
		width: 200px;
		height: 45px;
		background-color: #0b9066;
		display: flex;
		align-items: center;
		border-radius: 5px;
	}

	.imgBoxConW2 {
		width: 190px;
		height: 37px;
		margin: 0 auto;
		background-color: #0b9066;
		line-height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		border: solid 1px white;
	}

	.poi {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.photo {
		width: 260px;
		height: 150px;
		border-radius: 15px;
		margin: 15px 40px;
		overflow: hidden;
	}

	.photoBox1 {
		width: 100%;
		height: 530px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.photoBox {
		font-size: 20px;
		width: 100%;
		text-align: center;
		line-height: 300px;
	}

	.quzheng {
		width: 90%;
		margin: 0 auto;
	}

	.qrBox {
		width: 215px;
		height: 215px;
		margin: 0 auto;
		margin-top: 85px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		box-shadow: 0px 0px 5px 2px gainsboro;
	}

	.navListBox {
		height: 80px;
		width: 600px;
		display: flex;
		flex-direction: row;
		cursor: pointer;
	}

	.navList {
		width: 200px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 20px;
	}

	.blue {
		border-bottom: solid 3px #1e69fe;
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
	}

	.threeTitle {
		width: 10%;
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
		width: 80%;
		line-height: 53px;
	}

	.myhead2-left {
		width: 20%;
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
