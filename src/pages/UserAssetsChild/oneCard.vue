<template>
	<div class="oneCard-right">
		<div class="UserAssets-right-top">
			<div class="user-left">
				<span class="user-word">一卡通</span>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="conB">
			<div class="UserAssets-right-text">
				<div class="textBox">
					<img src="../../assets/images/search.png" class="sear-img">
					<el-input v-model="input" placeholder="请输入关键字进行查找" class="textWord" clearable></el-input>
				</div>
				<div>
					<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
				</div>
				<div>
					<el-button type="success" icon="el-icon-circle-plus-outline" @click="addDialogVisible = true,value1 = ''">添加
					</el-button>
				</div>
			</div>
			<div class="changeMode">
				<div @click="flagT" v-if="changeList == false">
					<img src="../../assets/images/changeList.png" alt="" style="width: 35px;height: 35px;">
				</div>
				<div @click="flagF" v-show="changeList == true">
					<img src="../../assets/images/changeIcon.png" alt="" style="width: 35px;height: 35px;">
				</div>
			</div>
		</div>
		<div style="height: 700px;">
			<div v-if="changeList == true">
				<template>
					<el-table :data="cardList" stripe style="width: 100%">
						<el-table-column prop="id" label="ID">
						</el-table-column>
						<el-table-column prop="uid" label="用户ID">
						</el-table-column>
						<el-table-column prop="operator_name" label="用户名">
						</el-table-column>
						<el-table-column prop="number" label="卡号">
						</el-table-column>
						<el-table-column prop="valid" label="状态">
							<template slot-scope="scope">
								<div v-if="scope.row.valid == true">
									已激活
								</div>
								<div v-else>
									未激活
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="type" label="类型">
							<template slot-scope="scope">
								<div v-if="scope.row.type == 1">
									鉴权卡
								</div>
								<div v-else-if="scope.row.type == 2">
									网络卡
								</div>
								<div v-else>
									其他
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="amount" label="余额">
						</el-table-column>
						<el-table-column prop="date_created" label="注册时间">
						</el-table-column>
						<el-table-column prop="address" label="操作" width="200">
							<template slot-scope="scope">
								<div class="operation">
									<!-- @click="userMssage(scope.row.id,scope.row.operator_name) -->
									<div>
										<img src="../../assets/images/see.png" style="width: 15px;height: 11px;"
											title="详情">
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</div>
			<div v-else class="tubiaobox">
				<div v-for="item in cardList">
					<div
						:class="item.type == 3?'imgBoxOff':item.valid == true?'imgBoxB':item.valid == false?'imgBoxR':''">
						<div class="imgBoxTop">
							<el-switch v-model="item.scope" active-color="#e9e9e9" inactive-color="#13ce66">
							</el-switch>
						</div>
						<div class="imgBoxCon">
							<div class="imgBoxConL">
								<div
									:class="item.type == 3?'netImg3':item.valid == true?'netImg':item.valid == false?'netImg1':''">
									<img src="../../assets/images/offlineCard.png" v-if="item.type == 3">
									<img src="../../assets/images/NetworkCard.png" v-else-if="item.type == 2">
									<img src="../../assets/images/authentication.png" v-else-if="item.type == 1">
									<img src="../../assets/images/offlineCard.png" v-else>
								</div>
								<div class="netWord">
									<div class="netWord1" v-if="item.type == 1">鉴权卡</div>
									<div class="netWord1" v-else-if="item.type == 2">网络卡</div>
									<div class="netWord1" v-else-if="item.type == 3">离线卡</div>
									<div class="netWord1" v-else>其他</div>
									<div class="netWord2">{{item.number}}</div>
								</div>
							</div>
							<div class="imgBoxBotM">
								<div class="money">￥{{item.amount}}</div>
								<div class="chongzhi" @click="chongzhi(item.id)">充值</div>
							</div>
						</div>
						<div class="imgBoxBot">
							<div class="imgBoxBotW">
								<div class="imgWord">有效期至{{item.date_expired}}</div>
								<div class="seeBox">
									<!-- <img src="../../assets/images/checkCard.png" style="width: 16px;height: 11px;"> -->
									<img src="../../assets/images/deleteCard.png" title="删除" style="width: 16px;height: 20px;cursor: pointer;" @click="removeUserByID(item.id)">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="UserAssets-bottom" v-if="changeList == true">
			<div class="UserAssets-bottom-left" :data="cardList">
				<span>共{{total}}张卡</span>
			</div>
			<div class="UserAssets-bottom-right">
				<el-pagination background :current-page.sync.number="pagenum" @current-change="handleCurrentChange"
					:page-size="pagesize" layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
		<div class="UserAssets-bottom" v-else>
			<div class="UserAssets-bottom-left" :data="cardList">
				<span>共{{total}}张卡</span>
			</div>
			<div class="UserAssets-bottom-right">
				<el-pagination background :current-page.sync.number="pagenum2" @current-change="handleCurrentChange2"
					:page-size="pagesize" layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 添加设备 -->
		<el-dialog title="添加卡" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
				<el-form-item label="卡号" prop="number">
					<el-input v-model="addForm.number" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<div class="youxiao">
				<div>卡类型:</div>
				<select class="select" v-model="select" @change="selectMes">
					<option value="2" selected="selected">网络卡</option>
					<option value="1">鉴权卡</option>
					<option value="3">离线卡</option>
				</select>
			</div>
			<div class="youxiao">
				<div>有效期:</div>
				<template>
					<div class="block">
						<el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyyMMdd">
						</el-date-picker>
					</div>
				</template>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addbut">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 卡充值 -->
		<el-dialog title="卡充值" :visible.sync="addDialogVisible1" width="30%" @close="addDialogClosed1">
			<el-form :model="addForm1" label-width="80px">
				<el-form-item label="充值金额" prop="amount">
					<el-input v-model="addForm1.amount" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<el-form :model="addForm1" label-width="80px">
				<el-form-item label="支付金额" prop="pay">
					<el-input v-model="addForm1.pay" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<el-form :model="addForm1" label-width="80px">
				<el-form-item label="备注" prop="memo">
					<el-input v-model="addForm1.memo" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="chongzhif">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改设备 -->
		<!-- <el-dialog title="修改设备" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
			<el-form :model="editForm" ref="editFormRef" label-width="80px">
				<el-form-item label="设备名称" prop="name">
					<el-input v-model="editForm.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="编号" prop="dev_id">
					<el-input v-model="editForm.dev_id" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="设备机号" prop="mac">
					<el-input v-model="editForm.mac" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editChargerInfo">确 定</el-button>
			</span>
		</el-dialog> -->
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
				select: 1,
				chongzhiID:'',
				username: '',
				value1: '',
				total: 1, //数据总条数
				isActive: true,
				dialogVisible: false,
				addDialogVisible: false,
				addDialogVisible1:false,
				add: false,
				typeList: [{
						name: '鉴权卡',
						id: 1
					},
					{
						name: '网络卡',
						id: 2
					},
					{
						name: '离线卡',
						id: 3
					}
				],
				changeList: false,
				selected: 0, //下拉框
				pagenum: 1, //分页
				pagenum2: 1, //分页
				token: '', //token令牌
				pagesize: 7, //每次查询条数
				type: 0,
				addForm: {
					token: localStorage.getItem('token').replace(/\"/g, ""),
					number: '',
					valid: true
				}, 
				addForm1: {
					token: localStorage.getItem('token').replace(/\"/g, ""),
					amount: '',
					pay: '',
					memo:''
				}, 
				input: '',
				addFormRules: {
					// name: [{
					// 	required: true,
					// 	message: '请输入信息',
					// 	trigger: 'blur'
					// }, {
					// 	min: 1,
					// 	max: 10,
					// 	message: '请输入正确的信息',
					// 	trigger: 'blur'
					// }],
					// dev_id: [{
					// 	required: true,
					// 	message: '请输入信息',
					// 	trigger: 'blur'
					// }, {
					// 	min: 1,
					// 	max: 10,
					// 	message: '请输入正确的信息',
					// 	trigger: 'blur'
					// }],
				},
				value: true,
				date_expired: '',
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
		mounted() {},
		created() {
			console.log(this.changeList)
			this.token = localStorage.getItem('token')
			if (this.changeList == true) {
				this.getUserMes()
			} else if (this.changeList == false) {
				this.getImg()
			}
		},
		methods: {
			userMssage(id, operator_name) {
				console.log(id)
				sessionStorage.setItem('id', id)
				sessionStorage.setItem('username', operator_name)
				this.$router.push({
					path: '/oneCardjiben',
				})
			},
			search(){
				if (this.changeList == true) {
					this.getUserMes()
				} else if (this.changeList == false) {
					this.getImg()
				}
			},
			flagF() {
				this.changeList = false
				this.getImg()
			},
			flagT() {
				this.changeList = true
				this.getUserMes()
			},
			//添加套餐对话框关闭事件
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},
			addDialogClosed1() {
				this.addDialogVisible = false
			},
			//获取用户卡信息列表
			getUserMes() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				//console.log(toKen)
				this.$axios.get("admin/api/cards/?token=" + toKen + "&page=" + this.pagenum + "&row=14&keyword=" +this.input)
					.then(res => {
						console.log(res)
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.cardList = res.data.cards //用户列表数据
							this.total = res.data.total
							console.log(this.cardList)
							this.pagesize = 14
						}
					})
			},
			getImg() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				//console.log(toKen)
				this.$axios.get("admin/api/cards/?token=" + toKen + "&page=" + this.pagenum2 + "&row=9&keyword=" +this.input)
					.then(res => {
						if (res.status == 200) {
							this.cardList = res.data.cards //用户列表数据
							this.total = res.data.total
							this.pagesize = 9
							console.log(this.cardList)
						}
					})
			},
			addbut() {
				let year = this.value1.slice(0,4)
				let mouth = this.value1.slice(4,6)
				let day = this.value1.slice(6,8)
				let date = year + '-' + mouth + '-' + day
				console.log(date)
				this.addDialogVisible = false
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				//console.log(toKen)
				this.$axios.post("/admin/api/card", {
						token: toKen,
						number: this.addForm.number,
						valid: this.addForm.valid,
						type: this.select,
						date_expired: date
					})
					.then(res => {
						if (res.status == 200) {
							setTimeout(() => {
								this.getImg() //刷新设备数据
							}, 1000);
						}
					})
			},
			async removeUserByID(id) {
				console.log(id)
				let toKen = this.token.replace(/\"/g, "")
				const confirmRes = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
				// console.log(confirmRes)
				if (confirmRes !== 'confirm') {
					return this.$message.info('已取消删除')
				}
				this.$axios.delete("/admin/api/card/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res.status)
						if (res.status == 200) {
							this.$message.success('删除数据成功')
							setTimeout(() => {
								this.getImg()
							}, 1000);
						} else {
							this.$message.error('删除数据失败')
						}
					})
				//删除设备提示
			},
			selectMes() {
				console.log(this.select)
			},
			chongzhi(id) {
				this.addDialogVisible1 = true
				this.chongzhiID = id
			},
			chongzhif(){
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.post("admin/api/card/"+ this.chongzhiID +"/charge",this.addForm1).then(res =>{
					console.log(res)
					if(res.data.error == 0){
						this.$message.success('充值成功')
						this.addForm1.amount = ''
						this.addForm1.pay = ''
						this.addForm1.memo = ''
					}else{
						this.$message.error('充值失败')
					}
					setTimeout(() => {
						this.getImg()
					}, 1000);
					this.addDialogVisible1 = false
				})
			},
			// addbut() {
			// 	console.log(this.select)
			// 	console.log(this.value1)
			// },
			changeIcon() {
				this.changeList = !this.changeList
				console.log(this.changeList)
			},

			//监听页码值改变
			handleCurrentChange(newPage) {

				this.pagenum = newPage
				this.getUserMes()
			},
			handleCurrentChange2(newPage) {

				this.pagenum2 = newPage
				this.getImg()

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

	.youxiao>>>.el-input {
		border: solid 1px gainsboro;
		display: flex;
		flex-direction: row;
		align-items: center;

	}

	.youxiao>>>.el-input__icon {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.imgBoxBotM {
		display: flex;
		flex-direction: column;
		height: 60px;
		justify-content: space-between;
		color: white;
		align-items: center;
	}

	.youxiao {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30px;
		padding: 10px 0px;
	}

	.select {
		width: 220px;
		height: 30px;
		margin-left: 3px;
		border: solid 1px #1E69FE;
		border-radius: 5px;
	}

	.money {
		font-size: 22px;
	}

	.chongzhi {
		width: 50px;
		height: 18px;
		border: solid 1px white;
		border-radius: 9px;
		text-align: center;
		line-height: 18px;
		cursor: pointer;
	}

	.netWord {
		margin-left: 30px;
		height: 65px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.netWord1 {
		font-size: 18px;
		color: white;
	}

	.netWord2 {
		font-size: 28px;
		color: white;
	}

	.imgBoxConL {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.netImg {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #71b7f2;
		text-align: center;
		line-height: 50px;
	}

	.netImg1 {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #eb9494;
		text-align: center;
		line-height: 50px;
	}

	.netImg2 {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #8ea4be;
		text-align: center;
		line-height: 50px;
	}

	.netImg3 {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #c0c0c0;
		text-align: center;
		line-height: 50px;
	}

	.imgWord {
		color: #dedede;
		font-size: 13px;
	}

	.seeBox {
		width: 35px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.imgBoxCon {
		width: 90%;
		height: 90px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	}

	.imgBoxBotW {
		width: 90%;
		height: 30px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.imgBoxBot {
		width: 100%;
		height: 30px;

		border-top: dashed 1px #dedede;
	}

	.tubiaobox {
		width: 95%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 20px;
	}

	.tub {
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: -90px;
		align-items: center;
	}

	.imgBoxTop {
		width: 95%;
		margin: 0 auto;
		height: 30px;
		display: flex;
		flex-direction: column;
		text-align: right;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.imgBoxB {
		width: 450px;
		height: 160px;
		background: linear-gradient(to right, #479ae8, #3a6cd6);
		border-radius: 20px;
		box-shadow: 1px 1px 10px 2px #cccccc;
		margin: 20px 30px;
	}

	.imgBoxR {
		width: 450px;
		height: 160px;
		background: linear-gradient(to right, #e06e6e, #e44a4a);
		border-radius: 20px;
		box-shadow: 1px 1px 10px 2px #cccccc;
		margin: 20px 30px;
	}

	.imgBoxG {
		width: 450px;
		height: 160px;
		background: linear-gradient(to right, #6781a2, #567193);
		border-radius: 20px;
		box-shadow: 1px 1px 10px 2px #cccccc;
		margin: 20px 30px;
	}

	.imgBoxOff {
		width: 450px;
		height: 160px;
		background: linear-gradient(to right, #567193, #567193);
		border-radius: 20px;
		box-shadow: 1px 1px 10px 2px #cccccc;
		margin: 20px 30px;
	}

	.conB {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 95%;
		margin: 0 auto;
	}

	.el-table td {
		padding: 0 0;
	}

	.el-input__inner {
		height: 30px;
		border: none;
	}

	.el-table td div {
		margin: 0 auto;
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
		width: 650px;
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
		width: 68%;
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
