<template>
	<div class="oneCard-right">
		<div class="UserAssets-right-top">
			<div class="user-left">
				<span class="user-word">实时停车</span>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="UserAssets-right-text">
			<div class="textBox">
				<img src="../../assets/images/search.png" class="sear-img">
				<el-input v-model="input" placeholder="请输入关键字进行查找" class="textWord" clearable></el-input>
			</div>
			<div style="width: 400px;text-align: center;border: solid 1px #1e69fe;border-radius: 5px;">
				<template>
					<div class="block">
						<el-date-picker v-model="value1" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				</template>
			</div>
			<div>
				<el-button type="primary" icon="el-icon-search" @click="getUserMes">搜索</el-button>
			</div>
		</div>
		<div>
			<template>
				<el-table :data="cardList" stripe style="width: 100%">
					<el-table-column prop="id" label="ID">
					</el-table-column>
					<el-table-column prop="dealno" label="订单号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="plate" label="车牌">
					</el-table-column>
					<el-table-column prop="station_name" label="道路">
					</el-table-column>
					<el-table-column prop="enter_devname" label="泊位">
					</el-table-column>
					<el-table-column prop="enter_time" label="驶入时间">
					</el-table-column>
					<el-table-column prop="duration" label="停车时长">
						<template slot-scope="scope">
							<div>{{getTime(scope.row.duration)}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="" label="停车费(已缴/总费用)">
						<template slot-scope="scope">
							<div>{{scope.row.paid}}/{{scope.row.amount}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="操作" width="200">
						<template slot-scope="scope">
							<div class="operation">
								<div @click="gotopark(scope.row.id,scope.row.plate)">
									<el-button type="text"><img src="../../assets/images/see.png" /></el-button>
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
		<div class="UserAssets-bottom">
			<div class="UserAssets-bottom-left" :data="cardList">
				<span>共{{total}}条信息</span>
			</div>
			<div class="UserAssets-bottom-right">
				<el-pagination background :current-page.sync.number="pagenum" @current-change="handleCurrentChange"
					:page-size="pagesize" layout="prev, pager, next" :total="total">
				</el-pagination>
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
				cardList: [], //卡数据
				userList: [], //这个是我新建的
				option: '',
				username: '',
				startTime:0,
				endTime:0,
				value1:'',
				total: 1, //数据总条数
				isActive: true,
				dialogVisible: false,
				add: false,
				stateList:[
					'未知',
					'停车中',
					'已完成',
					'代取证',
					'等待入场',
					'等待出场',
					'待付款',
					'已关闭',
					'欠费',
					'退款中'
				],
				selected: 0, //下拉框
				pagenum: 1, //分页
				token: '', //token令牌
				pagesize: 14, //每次查询条数
				type: 0,
				input: '',
				typeList: [{
						id: 0,
						type: '所有'
					},
					{
						id: 1,
						type: '手机'
					},
					{
						id: 2,
						type: '微信'
					},
					{
						id: 3,
						type: '支付宝'
					}
				]
			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.getUserMes()
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.option)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			getTime(time){
				// var jinrutime = this.enter_time.replace(/-/g, "/")
				// var time = (new Date(jinrutime)).valueOf()
				// var time1 = (new Date()).valueOf()
				
				var time2 = time*1000
				let days = Math.floor(time2 / (1000 * 60 * 60 * 24));
				let hours = Math.floor((time2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				let minutes = Math.floor((time2 % (1000 * 60 * 60)) / (1000 * 60));
				let seconds = Math.round((time2 % (1000 * 60)) / 1000);
				return days + "天" + hours + "小时" + minutes + "分钟";
				
			},
			gotopark(id,plate) {
				localStorage.setItem("parkOrderId",id);
				localStorage.setItem("parkOrderPlate",plate);
				// this.$router.go(-1);
				this.$router.push({
					path: "/parkjiben"
				});
			},
			//获取用户卡信息列表
			getUserMes() {
				console.log(this.value1)
				if(this.value1 !== '' && this.value1 !== null){
					this.startTime = this.value1[0]
					this.endTime = this.value1[1]
				}else if(this.value1 == null){
					this.startTime = 0
					this.endTime = 0
				}else{
					this.startTime = 0
					this.endTime = 0
				}
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				console.log(toKen)
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$axios.get("admin/api/pdrs/service/21/state/1?token=" + toKen + "&page=" + this.pagenum + "&row=14&keyword=" + this.input +"&from=" + this.startTime + "&to=" + this.endTime)
					.then(res => {
						console.log(res.data)
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.cardList = res.data.pdrs //用户列表数据
							this.total = res.data.total
							console.log(this.cardList)
							var pn = this.pagenum
							loading.close()
						}
					})
			},
			//监听页码值改变
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage
				this.getUserMes()
			},
		}
	}
</script>

<style scoped="scoped">
	.oneCard-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	.el-table td {
		padding: 0 0;
	}

	.el-input__inner {
		height: 30px;
		border: none;
	}

	.tanchu {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tanchu-text {
		width: 248px;
		height: 17px;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #7b7b7b;
		margin-left: 5px;
	}

	.el-dialog {
		margin-top: 30vh !important;
	}

	.stateColor-red {
		color: red;
	}

	.stateColor-green {
		color: #2ec23c;
	}

	.active {
		background-color: white;
	}

	.operation {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70px;
		margin: 0 auto;
	}

	.el-table__footer-wrapper,
	.el-table__header-wrapper {
		margin-top: 10px;
		background-color: #edf1f5;
	}

	.textWord {
		width: 390px;
		height: 30px;
		border: none;
	}

	/*  .is-opened>div::nth-child(1) {
	  background-color: white !important;
	} */

	.cell {
		text-align: center;
		font-size: 15px;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.el-table .cell {
		line-height: 44px;
	}

	.UserAssets-bgcolor {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.UserAssets-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	/* 顶部按钮 */
	.el-button--primary {
		border-radius: 10px;
		height: 37px;
	}

	.el-button--success {
		border-radius: 10px;
		height: 37px;
	}

	.el-button--default {
		border-radius: 10px;
		padding: 10px 20px;
	}

	.addinput {
		border: 1px solid #1e69fe;
		border-radius: 10px;
	}

	.el-table {
		color: #908e8e;
	}

	.UserAssets-right-top {
		display: flex;
		flex-direction: row;
		width: 95%;
		margin: 20px auto;
		margin-top: 40px;
	}


	.el-col-12 {
		width: 100%;
		text-align: center;
	}

	/* 字体 */
	.vive {
		font-size: 20px;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: row;
		margin: 20px 55px;

	}

	.el-submenu__title {
		font-size: 20px;
		width: 100%;
	}

	/* 按钮字体 */
	.el-button {
		font-size: 16px;
		padding: 10px 20px;
	}


	.el-menu-item {
		font-size: 16px;
		color: #dbdbdb;
	}

	.menu-op {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-left: 8%;
	}

	.menu-op div {
		padding: 0px 15px;
		width: 40px;
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

	.el-button--primary {
		color: #FFF;
		background-color: #1e69fe;
		border-color: #1e69fe;
	}

	.el-button--success {
		color: #1e69fe;
		background-color: #fff;
		border-color: #1e69fe;
	}



	.user-left {
		width: 50%;
	}

	.users-right-w {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 150px;
		justify-content: space-between;
		float: right;
	}

	.users-right {
		width: 50%;
	}

	.user-right span {
		color: #8a9199;
	}

	.user-img {
		height: 40px;
		width: 40px;
		overflow: hidden;
		border-radius: 100%;

	}

	.el-menu-item.is-active {
		border-radius: 400px;
		background-color: white !important;
	}

	.el-menu-item.is-active:hover {
		background-color: #1e69fe;
	}

	.UserAssets-right-text {
		width: 1000px;
		margin-left: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.select1 {
		width: 200px;
		height: 34px;
		border-radius: 10px;
		border: solid 1px #1e69fe;
		font-size: 16px;
		padding: 0 2%;
		margin: 0;
	}

	.textBox {
		width: 400px;
		height: 34px;
		border-radius: 10px;
		border: solid 1px #1e69fe;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.UserAssets-bottom {
		display: flex;
		flex-direction: row;
		width: 95%;
		margin: 29px auto;
	}

	.UserAssets-bottom-left {
		width: 50%;
	}

	.UserAssets-bottom-right {
		width: 50%;
		text-align: right;
	}

	.UserAssets-bottom-left span {
		width: 137px;
		height: 18px;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		font-weight: 600;
		font-stretch: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #333333;
	}

	.set {
		width: 40px;
	}

	.select1 option {
		text-align: center;
	}

	.sear-img {
		width: 15px;
		height: 15px;
		margin-left: 20px;
	}

	/* 第一行数据类型 */
	.el-table thead {
		color: black;
	}
</style>
