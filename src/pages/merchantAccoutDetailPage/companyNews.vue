<template>
	<div class="oneCard-right">
		<div class="UserAssets-right-top">
			<div class="user-left">
				<span class="user-word">公司资料</span>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="myhead2">
			<div class="myhead2-left">
				<img src="../../assets/images/timgr.png" style="width: 53px;height: 53px;" />
				<span class="jiben-nameWord">{{merchantName}}用户</span>
				<span class="jiben-green">(运行中)</span>
				<div class="myhead2-but-box">
					<div class="myhead2-but" @click="back">返回上一级页面</div>
				</div>
			</div>
			<div class="myhead2-right">
				<div class="myhead2-right-box">
					<el-button>注销账号</el-button>
					<el-button icon="el-icon-refresh" @click="getUserMes">刷新</el-button>
				</div>
			</div>
		</div>
		<div class="UserAssets-right-text">
			<div class="textBox">
				<img src="../../assets/images/search.png" class="sear-img">
				<input type="text" v-model="input" placeholder="请输入关键字进行查找" class="textWord" />
			</div>
			<div>
				<el-button type="primary" icon="el-icon-search" @click="getUserMes">搜索</el-button>
			</div>
			<div>
				<el-button icon="el-icon-plus" @click="addBox">添加</el-button>
			</div>
		</div>
		<div class="he">
			<template>
				<el-table :data="cardList" stripe style="width: 100%">
					<el-table-column show-overflow-tooltip prop="id" label="ID">
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="name" label="名称">
					</el-table-column>
					<el-table-column show-overflow-tooltip label="类型">
						<template slot-scope="scope">
							<div v-if="scope.row.type == 1">
								业主
							</div>
							<div v-if="scope.row.type == 2">
								买家
							</div>
							<div v-if="scope.row.type == 3">
								卖家
							</div>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="licence" label="机构代码">
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="contact" label="联系人">
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="corpration" label="法人">
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="email" label="邮箱">
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="address" label="地址">
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="telephone" label="电话" width="200">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div class="operation">
								<div>
									<button type="text" @click="removeUserByID(scope.row.id)"><img
											src="../../assets/images/delete.png" style="cursor: pointer;"
											title="删除" /></button>
								</div>
								<div>
									<button type="text" @click="showEditDialog(scope.row.id)"><img
											src="../../assets/images/compile.png" style="cursor: pointer;"
											title="修改" /></button>
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

		<el-dialog title="添加合作方" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
			<el-form :model="addForm" label-width="80px">
				<el-form-item label="名称:" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="">
					<el-select v-model="addForm.type" placeholder="请选择" class="sel">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="机构代码" prop="licence">
					<el-input v-model="addForm.licence"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contact">
					<el-input v-model="addForm.contact"></el-input>
				</el-form-item>
				<el-form-item label="法人" prop="corpration">
					<el-input v-model="addForm.corpration"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="telephone">
					<el-input v-model="addForm.telephone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addPartner">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="修改设备" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
			<el-form :model="editForm" ref="editFormRef" label-width="80px">
				<el-form-item label="名称:" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="">
					<el-select v-model="editForm.type" placeholder="请选择" class="sel">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="机构代码" prop="licence">
					<el-input v-model="editForm.licence"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contact">
					<el-input v-model="editForm.contact"></el-input>
				</el-form-item>
				<el-form-item label="法人" prop="corpration">
					<el-input v-model="editForm.corpration"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="editForm.address"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="telephone">
					<el-input v-model="editForm.telephone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editChargerInfo">确 定</el-button>
			</span>
		</el-dialog>
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
				editForm: {},
				total: 1, //数据总条数
				isActive: true,
				dialogVisible: false,
				addDialogVisible: false,
				editDialogVisible: false,
				add: false,
				selected: 0, //下拉框
				pagenum: 1, //分页
				token: '', //token令牌
				pagesize: 11, //每次查询条数
				type: 0,
				input: '',
				getUserID: '',
				merchantName: '',
				options: [{
					value: 1,
					label: '业主'
				}, {
					value: 2,
					label: '买家'
				},
				{
					value: 3,
					label: '卖家'
				}],
				addForm: {
					token: localStorage.getItem("token").replace(/\"/g, ""),
					name: "",
					licence:'',
					contact:'',
					corpration:'',
					email:'',
					address:'',
					telephone: "",
					type:'',
					agent:sessionStorage.getItem('merchantId'),
				},
			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.getUserID = sessionStorage.getItem('merchantId')
			this.jibenUsername = sessionStorage.getItem('username')
			this.merchantName = sessionStorage.getItem("merchantName");
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

			back() {
				this.$router.go(-1); //返回上一层
			},
			//获取用户信息

			getUserMes() {
				//去掉引号
				let toKen = this.token.replace(/\"/g, "")
				let userID = this.getUserID
				console.log(userID)
				this.$axios.get("admin/api/agent/" + userID + "/companies/?token=" + toKen + "&page=" + this.pagenum +
						"&row=11&keyword=" + this.input)
					.then(res => {
						console.log(res)
						if (res.status == 200) {
							this.cardList = res.data.companys
							this.total = res.data.total
							var pn = this.pagenum
						}
					})
			},
			async removeUserByID(id) {
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
				this.$axios.delete("admin/api/company/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res.status)
						if (res.status == 200) {
							this.$message.success('删除成功')
							setTimeout(() => {
								this.getUserMes()
							}, 500)
						} else {
							this.$message.error('删除失败')
						}
					})
				//删除用户提示
			},
			showEditDialog(id) {
				this.editDialogVisible = true
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				// console.log(toKen)
				this.$axios.get("/admin/api/company/" + id + "?token=" + toKen) //根据id点击修改的id查询设备信息
					.then(res => {
						//console.log(res.status)
						if (res.status == 200) {
							this.editForm = res.data.company
							console.log(res.data.company)
						}
					})
			},
			editChargerInfo() {
				let toKen = this.token.replace(/\"/g, "")
				this.$refs.editFormRef.validate(valid => {
					if (!valid) {
						return this.$message.error("请输入正确的信息")
					} else {
						if (confirm("确认修改吗?")) {
							this.$axios.put("admin/api/company/" + this.editForm.id, {
									token: toKen,
									name: this.editForm.name,
									licence:this.editForm.licence,
									contact:this.editForm.contact,
									corpration:this.editForm.corpration,
									email:this.editForm.email,
									address:this.editForm.address,
									telephone:this.editForm.telephone,
									type:this.editForm.type,
								})
								.then(res => {
									if (res.status !== 200) {
										return this.$message.error('修改失败!')
									}
									this.$message.success('修改成功!')
									this.addDialogVisible = false
									console.log(this.editForm)
									//刷新设备列表
									this.getUserMes()
									//关闭对话框
									this.editDialogVisible = false
								})
						}

					} //若表单正则验证未通过，则不允许添加
				})
				//如果验证通过，则发起添加修改设备请求
			},
			addBox() {
				this.addDialogVisible = true
				this.addForm.name = ''
				this.addForm.telephone = ''
				this.addForm.memo = ''
			},
			//添加合作伙伴
			addPartner() {
				let toKen = this.token.replace(/\"/g, "")

				this.$axios.post("admin/api/company", this.addForm)
					.then(res => {
						if (res.status !== 200) {
							return this.$message.error('添加失败!')
						}
						this.$message.success('添加成功!')
						this.addDialogVisible = false
						console.log(this.addForm, 123)
						console.log(res)
						//刷新用户列表
						setTimeout(() => {
							this.getUserMes()
						}, 500)

					})
				//如果验证通过，则发起添加用户请求
			},
			//监听页码值改变
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage
				this.getUserMes()
			},
			addDialogClosed() {
				this.addDialogVisible = false
			},
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
			}
		}
	}
</script>

<style scoped="scoped">
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
	
	.sel {
		border: 1px solid #1e69fe !important;
		width: 33%;
	}

	.operation {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70px;
		margin: 0 auto;
	}

	.he>>>.el-table th.is-leaf {
		text-align: center;
		font-size: 15px;
		font-weight: 500;
	}

	.he>>>.el-table td {
		text-align: center;
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

	.el-table__body-wrapper {
		height: 530px !important;
	}

	.jiben-nameWord {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #000000;
		margin-left: 10px;
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
		width: 95%;
		margin: 0 auto;
		padding-bottom: 25px;
		border-bottom: solid 1px #ccc;
	}

	/* 分割线 */
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

	.el-table td div {
		margin: 0 auto;
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

	.he {
		height: 600px;
		overflow: hidden;
	}

	/*  .is-opened>div::nth-child(1) {
	  background-color: white !important;
	} */

	.cell {
		text-align: center;
		font-size: 15px;
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
		margin: 5px auto;
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
		margin-top: 15px;
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
		width: 68%;
		height: 40px;
		border-radius: 10px;
		border: solid 1px #1e69fe;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.el-input__inner {
		border: none;
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
