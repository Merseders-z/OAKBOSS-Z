<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">时间线</span>
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
				parkPlate:'',
				parkId: '',
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
			this.parkId = localStorage.getItem('parkOrderId')
			this.parkPlate = localStorage.getItem('parkOrderPlate')
			console.log(this.parkId,this.parkPlate)
		},
		mounted() {
			this.getUserMe()
		},
		methods: {
			getUserMe() {
				// let toKen = this.token.replace(/\"/g, "")
				// // console.log(toKen)
				// this.$axios.get("/admin/api/payment/" + this.motoId + "?token=" + toKen)
				// 	.then(res => {
						
				// 	})
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
