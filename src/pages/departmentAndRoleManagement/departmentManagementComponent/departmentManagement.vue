<template>
	<div class="zyhDepartmentManagementMainPage">
		<header>
			<div class="infoArea">
				<div class="pageName">员工管理</div>
				<div class="profile">
					<myhead></myhead>
				</div>
			</div>
		</header>
		<section>
			<div class="asidePart">
				<div class="wrapper">
					<div class="searchArea">
						<el-input placeholder="查找关键词" v-model="input2" @keyup.enter="getDepartmentsInfoMes">
						</el-input>
						<img src="../../../assets/images/search.png" />
						<el-button type="primary" icon="el-icon-circle-plus-outline"
							@click="createDepartmentDialogVisible = true">
							添加部门
						</el-button>
					</div>
					<div class="departmentListArea">
						<el-tree :data="tableData1" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
					</div>
				</div>
			</div>
			<div class="mainPart">
				<div class="wrapper">
					<div class="searchArea">
						<el-input placeholder="请输入员工用户名或工号" v-model="input">
						</el-input>
						<img src="../../../assets/images/search.png" />
						<el-button icon="el-icon-search" @click="getDepartmentsInfoMes">查询</el-button>
						<el-button type="primary" icon="el-icon-circle-plus-outline"
							@click="createStaffDialogVisible = true">
							添加员工
						</el-button>
						<el-button icon="el-icon-refresh" @click="refresh">刷新</el-button>
						<!-- <el-button type="primary" icon="el-icon-circle-plus-outline"
              >分配角色</el-button
            > -->
					</div>
					<template>
						<el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%"
							stripe>
							<el-table-column show-overflow-tooltip type="selection">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="username" label="用户名">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="fullname" label="员工名">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="password" label="密码">
							</el-table-column>
							<!-- <el-table-column show-overflow-tooltip prop="role" label="角色">
              </el-table-column> -->
							<el-table-column show-overflow-tooltip prop="telephone" label="手机">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="email" label="邮箱">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="weixin" label="微信">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="address" label="操作" width="200">
								<template slot-scope="scope">
									<div class="operation">
										<div @click="deleteStaff(scope.row.id)">
											<img src="../../../assets/images/delete.png" title="删除" style="cursor: pointer;" />
										</div>
										<div @click="getBasicInformation(scope.row.id)">
											<img src="../../../assets/images/compile.png" title="修改" style="cursor: pointer;"/>
										</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<div class="pageNumArea">
						<div class="total" :data="tableData2">
							<span>共{{ tableData2Total }}条信息</span>
						</div>
						<el-pagination background layout="prev, pager, next" :total="tableData2Total"
							:current-page.sync.number="Pagenum" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
			</div>
		</section>
		<!-- 添加部门 -->
		<el-dialog title="添加部门" :visible.sync="createDepartmentDialogVisible" width="30%"
			@close="createDepartmentDialogClosed">
			<el-form :model="createDepartmentBody" ref="createDepartmentBodyRef" label-width="80px">
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="createDepartmentBody.name"></el-input>
				</el-form-item>
				<el-form-item label="部门主管" prop="managner">
					<el-input v-model="createDepartmentBody.manager"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="createDepartmentDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="createDepartment">
					确 定
				</el-button>
			</span>
		</el-dialog>
		<!-- 添加员工 -->
		<el-dialog title="添加员工" :visible.sync="createStaffDialogVisible" width="30%" @close="createStaffDialogClosed">
			<el-form :model="createStaffBody" ref="createStaffBodyRef" label-width="80px">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="createStaffBody.username"></el-input>
				</el-form-item>
				<el-form-item label="员工名" prop="fullname">
					<el-input v-model="createStaffBody.fullname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="createStaffBody.password"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="telephone">
					<el-input v-model="createStaffBody.telephone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="createStaffBody.email"></el-input>
				</el-form-item>
				<el-form-item label="微信" prop="weixin">
					<el-input v-model="createStaffBody.weixin"></el-input>
				</el-form-item>
				<el-form-item label="在职情况" prop="employeed">
					<el-input v-model="createStaffBody.employeed"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="createStaffDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="createStaff">
					确 定
				</el-button>
			</span>
		</el-dialog>
		<!-- 修改员工-->
		<el-dialog title="修改员工" :visible.sync="modifyDialogVisible" width="30%">
			<el-form :model="modifyForm" ref="modifyFormRef" label-width="80px">
				<el-form-item label="员工名" prop="fullname">
					<el-input v-model="modifyForm.fullname"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="telephone">
					<el-input v-model="modifyForm.telephone"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="modifyForm.password"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="">
					<el-select v-model="value1" placeholder="请选择" class="sel" @change="aa">
						<el-option v-for="item in option1" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" prop="">
					<el-select v-model="value2" placeholder="请选择" class="sel">
						<el-option v-for="item in option2" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click.native="modifyDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="staffModified">
					确 定
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import myhead from "../../../components/myhead";
	import md5 from "js-md5";
	export default {
		components: {
			myhead
		},
		data() {
			return {
				option: "",
				isActive: true,
				dialogVisible: false,
				selected: "所有",
				token: "",
				chooseID:'',
				tableData1: [],
				currentScanCodePackageId: "",
				tableData2: [],
				tableData2Total: 0,
				Pagenum: 1,
				option1:[],
				option2:[{
					label:'我',
					id:1
				},
				{
					label:'你',
					id:2
				}],
				value1:'',
				value2:'',
				defaultProps: {
					label: 'name'
				},
				tableData: [],
				input2: '',
				multipleSelection: [],
				createDepartmentDialogVisible: false,
				createDepartmentBody: {
					token: "",
					name: "",
					manager: ""
				},
				retrieveDepartmentInput: "",
				createStaffDialogVisible: false,
				createStaffBody: {
					token: "",
					username: "",
					fullname: "",
					telephone: "",
					email: "",
					weixin: "",
					employeed: "",
					password: "",
					modifyDialogVisible: false,
				},
				modifyId: 0,
				modifyForm: {},
				modifyDialogVisible: false,
				input: ""
			};
		},
		mounted() {
			this.token = localStorage.getItem("token").replace(/\"/g, "");
			this.getDepartmentManagementMes();
			this.jueseList()
		},
		methods: {
			//部门搜索
			aa(){
				console.log(this.value1)
			},
			jueseList(){
				this.$axios
					.get(
						"/admin/api/roles?token=" + this.token
					)
					.then(res => {
						if (res.data.error == 0) {
							this.option1 = res.data.roles
						}
					})
			},
			//取消添加部门
			createDepartmentDialogClosed() {
				this.$refs.createDepartmentBodyRef.resetFields();
			},
			//添加部门
			createDepartment() {
				let url = "/admin/api/department ";
				this.createDepartmentBody.token = this.token;
				this.$axios
					.post(url, this.createDepartmentBody)
					.then(res => {
						console.log(res)
						if (res.data.error !== 0) {
							return this.$message.error(res.data.errmsg);
						} else {
							this.$message.success('添加成功！')
							this.getDepartmentsInfoMes()
							this.createDepartmentDialogVisible = false
						}
					})
			},
			//取消添加员工
			createStaffDialogClosed() {
				this.$refs.createStaffBodyRef.resetFields();
			},
			//添加员工
			createStaff() {
				let url = "/admin/api/administrator";
				this.createStaffBody.token = this.token;
				this.createStaffBody.department = this.currentId;
				this.createStaffBody.password = md5(this.createStaffBody.password);
				this.$axios
					.post(url, this.createStaffBody)
					.then(res => {
						console.log(res);
						if (res.data.error !== 0) {
							return this.$message.error(res.data.errmsg);
						} else {
							this.createStaffDialogVisible = false;
							this.$message.success("添加成功!")
							setTimeout(() => {
								this.getDepartmentsInfoMes()
							}, 888);
						}
					})
			},
			//删除员工账号
			deleteStaff(id) {
				let enterState = true;
				let url = "/admin/api/administrator/" + id;
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
						setTimeout(() => {
							this.getDepartmentsInfoMes()
						}, 888);
					})
					.then(() => {
						this.$message({
							type: "success",
							message: "删除成功!"
						});
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
			//获取员工信息列表
			getBasicInformation(id) {
				this.chooseID = id
				this.modifyDialogVisible = true
				this.$axios
					.get(
						"/admin/api/administrator/" + id + "/?token=" + this.token
					)
					.then(res => {
						if (res.status == 200) {
							console.log(res)
							this.modifyForm = res.data.admin;
							this.value1 = res.data.admin.role
							this.value2 = res.data.admin.department
						}
					});
			},
			staffModified() {
				// let url = "/admin/api/administrator/" + this.modifyId;
				// this.modifyForm.token = this.token;
				// this.modifyForm.password = md5(this.modifyForm.password);
				// this.$axios
				// 	.put(url, this.modifyForm)
				// 	.then(res => {
				// 		if (res.data.error == 0) {
				// 			this.$message.success("修改员工信息成功!");
				// 			this.addDialogVisible = false;
				// 			this.getDepartmentsInfoMes()
				// 		}else{
				// 			this.$message.error(res.data.errmsg)
				// 		}
				// 	})
				this.$axios
					.put("admin/api/administrator/" + this.chooseID,{
						token:this.token,
						fullname:this.modifyForm.fullname,
						telephone:this.modifyForm.telephone,
						password:this.modifyForm.password,
						role:this.value1,
						department:this.value2,
					})
					.then(res => {
						if (res.data.error == 0) {
							console.log(res)
							this.$message.success('修改成功!')
							this.modifyDialogVisible = false
							this.getDepartmentsInfoMes()
						}else{
							this.$message.error(res.data.errmsg)
						}
					});
			},

			//刷新页面
			refresh() {
				this.$router.push("/refresh");
			},
			// 获取部门列表
			getDepartmentManagementMes() {
				this.$axios
					.get("/admin/api/departments/?token=" + this.token)
					.then(res => {
						if (res.status == 200) {
							this.tableData1 = [{
								id:1,
								name: '所有',
								children: res.data.departments
							}];
							console.log(res.data.departments)
							this.option2 = res.data.departments
						}
					})
			},
			//获取部门信息
			getDepartmentsInfoMes() {
				this.$axios
					.get(
						"/admin/api/department/" +
						this.currentId +
						"/administrators/?token=" +
						this.token +
						"&page=" +
						this.Pagenum +
						"&row=11&keyword=" +
						this.input2
					)
					.then(res => {
						if (res.status == 200) {
							console.log(res)
							this.tableData2 = res.data.admins;
							this.tableData2Total = res.data.total || 0;
						}
					});
			},
			handleNodeClick(data) {
				console.log(data.id)
				this.currentId = data.id
				this.getDepartmentsInfoMes()
			},
			// 监听scanCodePackage页码值改变
			handleCurrentChange(newPage) {
				this.Pagenum = newPage;
				this.getDepartmentsInfoMes();
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.sel {
		width: 50%;
	}
</style>
