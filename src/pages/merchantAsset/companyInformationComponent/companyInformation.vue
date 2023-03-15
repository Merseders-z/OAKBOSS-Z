<template>
	<div class="zyhSingleLineListMainPage">
		<header>
			<div class="infoArea">
				<div class="pageName">公司资料</div>
				<div class="profile">
					<myhead></myhead>
				</div>
			</div>
			<div class="searchArea">
				<div class="inputFrame">
					<img src="../../../assets/images/search.png" />
					<el-input placeholder="请输入账号、手机号在全局中进行查找" class="inputBlank" v-model="input" clearable></el-input>
				</div>
				<div class="searchButton">
					<el-button type="primary" icon="el-icon-search" @click.native="getMerchantAccountMes">
						搜索
					</el-button>
				</div>
				<div class="addButton">
					<el-button icon="el-icon-circle-plus-outline" type="primary" @click="addDialogVisible = true">
						添加
					</el-button>
				</div>
			</div>
		</header>
		<section>
			<template>
				<el-table :data="tableData" stripe style="width: 100%">
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
					<el-table-column show-overflow-tooltip prop="address" label="操作">
						<template slot-scope="scope">
							<div class="operation">
								<div @click="merchantAccountDeleted(scope.row.id)">
									<img src="../../../assets/images/delete.png" title="删除" style="cursor: pointer;" />
								</div>
								<div @click="modifyDialogPop(scope.row)">
									<img src="../../../assets/images/compile.png" title="修改" style="cursor: pointer;" />
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</section>
		<footer>
			<div class="total" :data="tableData">
				<span>共{{ total }}条信息</span>
			</div>
			<el-pagination background :current-page.sync.number="pagenum" @current-change="handleCurrentChange"
				:page-size="pagesize" layout="prev, pager, next" :total="total">
			</el-pagination>
		</footer>
		<template>
			<!-- 添加商户账号 -->
			<el-dialog title="添加公司信息" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
				<el-form :model="addForm" ref="addFormRef" label-width="80px">
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
					<el-button type="primary" @click="merchantAccountAdded">
						确 定
					</el-button>
				</span>
			</el-dialog>
			<!-- 修改商户账号 -->
			<el-dialog title="修改公司信息" :visible.sync="modifyDialogVisible" width="30%">
				<el-form :model="modifyForm" ref="modifyFormRef" label-width="80px">
					<el-form-item label="名称:" prop="name">
						<el-input v-model="modifyForm.name"></el-input>
					</el-form-item>
					<el-form-item label="类型" prop="">
						<el-select v-model="value" placeholder="请选择" class="sel">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="机构代码" prop="licence">
						<el-input v-model="modifyForm.licence"></el-input>
					</el-form-item>
					<el-form-item label="联系人" prop="contact">
						<el-input v-model="modifyForm.contact"></el-input>
					</el-form-item>
					<el-form-item label="法人" prop="corpration">
						<el-input v-model="modifyForm.corpration"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="modifyForm.email"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="modifyForm.address"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="telephone">
						<el-input v-model="modifyForm.telephone"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="modifyDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="merchantAccoutModified">
						确 定
					</el-button>
				</span>
			</el-dialog>
		</template>
	</div>
</template>

<script>
	import myhead from "../../../components/myhead";
	import Vue from "vue";
	export default {
		components: {
			myhead
		},
		data() {
			return {
				tableData: [],
				option: "",
				total: 1,
				isActive: true,
				selected: "所有",
				pagenum: 1,
				token: "",
				value:'',
				pagesize: 12,
				addDialogVisible: false,
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
				},
				modifyDialogVisible: false,
				modifyId: "",
				chooseID:'',
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
				modifyForm: {},
				input: ""
			};
		},

		mounted() {
			this.token = localStorage.getItem("token").replace(/\"/g, "");
			this.getMerchantAccountMes();
		},
		methods: {
			//获取用户信息列表
			getMerchantAccountMes() {
				let url =
					"/admin/api/companies/?token=" +
					this.token +
					"&page=" +
					this.pagenum +
					"&row=12&keyword=" + this.input;
				this.$axios.get(url).then(res => {
					if (res.status == 200) {
						console.log(res);
						this.tableData = res.data.companies
						this.total = res.data.total || 0;
					}
				});
			},
			//监听页码值改变
			handleCurrentChange(newPage) {
				this.pagenum = newPage;
				this.getMerchantAccountMes();
			},
			//添加对话框关闭事件
			addDialogClosed() {
				this.$refs.addFormRef.resetFields();
			},
			//增加商户账号
			merchantAccountAdded() {
				this.$axios
					.post("/admin/api/company", this.addForm)
					.then(res => {
						if (res.status !== 200) {
							return this.$message.error("添加用户失败!");
						}
					})
					.then(() => {
						this.$message.success("添加用户成功!");
						this.addDialogVisible = false;
						setTimeout(()=>{
							this.getMerchantAccountMes()
						},500)
					});
			},
			//删除商户账号
			merchantAccountDeleted(id) {
				let enterState = true;
				let url = "/admin/api/company/" + id;
				this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.$axios.delete(url, {
							params: {
								token: this.token
							}
						});
					})
					.then(() => {
						this.$message({
							type: "success",
							message: "删除成功!"
						});
						setTimeout(()=>{
							this.getMerchantAccountMes()
						},500)
					})
					.catch(() => {
						if (enterState || false) {
							this.$message({
								type: "info",
								message: "已取消删除"
							});
						} else {
							this.$message({
								type: "info",
								message: "删除失败"
							});
						}
					});
			},
			//弹出商户账号修改对话框
			modifyDialogPop(row) {
				this.modifyId = row.id;
				this.getBasicInformation();
				this.modifyDialogVisible = true;
			},
			//获取商户信息列表
			getBasicInformation() {
	
				this.$axios
					.get(
						"admin/api/company/" + this.modifyId + "/?token=" +
						this.token +
						"&page=" +
						this.pagenum +
						"&row=10"
					)
					.then(res => {
						if (res.status == 200) {
							console.log(res)
							this.modifyForm = res.data.company;
						}
					});
			},
			merchantAccoutModified() {
				let url = "/admin/api/company/" + this.modifyId;
				this.modifyForm.token = this.token;
				this.$axios
					.put(url, this.modifyForm)
					.then(res => {
						console.log("res");
						console.log(res);
						if (res.status !== 200) {
							return this.$message.error("修改失败!");
						}
					})
					.then(() => {
						this.$message.success("修改成功!");
						this.modifyDialogVisible = false;
						setTimeout(()=>{
							this.getMerchantAccountMes()
						},500)
					});
			},

			merchantMessage(id, username, valid) {
				sessionStorage.setItem("merchantId", id);
				sessionStorage.setItem("merchantName", username);
				sessionStorage.setItem("merchantValid", valid);
				let merchantValid = sessionStorage.getItem("merchantValid");
			}
		},
		watch: {
			$route() {
				this.getMerchantAccountMes();
			}
		}
	};
</script>

<style lang="stylus" scoped>
	//
	.sel {
		border: 1px solid #1e69fe !important;
		width: 33%;
	}
</style>
