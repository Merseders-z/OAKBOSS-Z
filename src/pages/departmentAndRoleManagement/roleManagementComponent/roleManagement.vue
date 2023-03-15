<template>
	<div class="oneCard-right">
		<div class="UserAssets-right-top">
			<div class="user-left">
				<span class="user-word">角色管理</span>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="conB">
			<div class="UserAssets-right-text">
				<div style="color:gray;font-size: 15px;">
					根据员工的职能选择角色，新增角色下的员工账号
				</div>
			</div>
			<div class="changeMode">
				<el-button type="primary" round icon="el-icon-circle-plus-outline" @click="addjuese">新增角色</el-button>
			</div>
		</div>
		<div class="jueseCon">
			<div class="jueseBox" v-for="item in tableData">
				<div class="xx" @click="deleteJs(item.id)">x</div>
				<div class="jueseTouxiangBox">
					<div class="jueseT">
						<img src="../../../assets/images/Customerservice.png" style="width: 40px;height: 48px;">
					</div>
				</div>
				<div class="jueseWord">
					<div style="font-size: 20px;font-weight: 600;">{{item.name}}</div>
					<div style="color: #9E9E9E;">{{item.id}}</div>
					<div style="color: #9E9E9E;">{{item.memo}}</div>
				</div>
				<div class="quanxianBot" @click="peizhi(item.id),resetChecked()">配置权限</div>
			</div>
		</div>
		<div class="UserAssets-bottom">
			<div class="UserAssets-bottom-left" :data="tableData">
				<span>共{{total}}条信息</span>
			</div>
			<div class="UserAssets-bottom-right">
				<el-pagination background :current-page.sync.number="pagenum" @current-change="handleCurrentChange"
					:page-size="pagesize" layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 添加弹出框 -->
		<el-dialog title="新增角色" :visible.sync="addDialogVisible" width="30%">
			<el-form :model="addForm" label-width="80px">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="addForm.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input v-model="addForm.memo" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addsure">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加弹出框 -->
		<el-dialog title="配置权限" :visible.sync="addQuanxian" width="50%">
			<div class="quanxianBox">
				<div class="quanxianL">
					<el-tree :data="dataList" show-checkbox node-key="id" :default-checked-keys="checkList"
						:props="defaultProps" key="label" ref="tree" @check="aa">
					</el-tree>
				</div>
				<div class="quanxianR">
					<div class="showTitle">已选权限:{{showList.length}}</div>
					<div class="showBox" v-for="item in showList">
						{{item}}
					</div>
				</div>
			</div>
			<div class="footBot">
				<el-button type="primary" icon="el-icon-circle-check" @click="editSure">确认</el-button>
				<el-button icon="el-icon-circle-close" @click="addQuanxian = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import myhead from '../../../components/myhead.vue'
	export default {
		components: {
			myhead
		},
		data() {
			return {
				tableData: [], //卡数据
				userList: [], //这个是我新建的
				option: '',
				checkList:[],
				editId: '',
				showList: [],
				dataList: [{
						id: 'MENU.USER',
						label: '会员资产',
						children: [{
								id: 'MENU.USER.DASHBOARD',
								label: '看板',
							},
							{
								id: 'MENU.USER.ACCOUNT',
								label: '用户账号',
							},
							{
								id: 'MENU.USER.CARD',
								label: '一卡通',
							},
							{
								id: 'MENU.USER.COUPON',
								label: '优惠券',
							},
							{
								id: 'MENU.USER.PLAN',
								label: '套餐',
							},
							{
								id: 'MENU.USER.CERTIFICATE',
								label: '实名认证',
							},
							{
								id: 'MENU.USER.PLATE',
								label: '车牌',
							},
							{
								id: 'MENU.USER.TRUSTPAY',
								label: '无感支付',
							},
							{
								id: 'MENU.USER.REPORT',
								label: '用户/报表',
							}
						]
					}, {
						id: 'MENU.AGENT',
						label: '商户资产',
						children: [{
								id: 'MENU.AGENT.DASHBOARD',
								label: '商户/看板'
							}, {
								id: 'MENU.AGENT.ACCOUNT',
								label: '商户账号'
							},
							{
								id: 'MENU.AGENT.FINANCE',
								label: '财务'
							},
							{
								id: 'MENU.AGENT.GATEWAY',
								label: '应用网关'
							},
							{
								id: 'MENU.AGENT.COMPANY',
								label: '公司'
							},
							{
								id: 'MENU.AGENT.PARTNER',
								label: '开发接口'
							},
							{
								id: 'MENU.AGENT.REPORT',
								label: '商户/报表'
							}
						]
					}, {
						id: 'MENU.FINANCE',
						label: '财务',
						children: [{
								id: 'MENU.FINANCE.DASHBOARD',
								label: '财务/看板'
							}, {
								id: 'MENU.FINANCE.PAYMENT',
								label: '财务'
							},
							{
								id: 'MENU.FINANCE.RECEIPT',
								label: '发票'
							},
							{
								id: 'MENU.FINANCE.SHARE',
								label: '结算'
							},
							{
								id: 'MENU.FINANCE.WITHDRAW',
								label: '提现'
							},
							{
								id: 'MENU.FINANCE.REPORT',
								label: '财务/报表'
							}
						]
					},
					{
						id: 'MENU.HR',
						label: '人力资源',
						children: [{
								id: 'MENU.HR.DASHBOARD',
								label: '人力/看板'
							}, {
								id: 'MENU.HR.DEPARTMENT',
								label: '部门'
							},
							{
								id: 'MENU.HR.ROLE',
								label: '角色'
							},
							{
								id: 'MENU.HR.TOLL',
								label: '收费'
							},
							{
								id: 'MENU.HR.REPORT',
								label: '人力/报表'
							}
						]
					},
					{
						id: 'MENU.PROMOTION',
						label: '促销优惠',
						children: [{
								id: 'MENU.PROMOTION.DASHBOARD',
								label: '促销/看板'
							}, {
								id: 'MENU.PROMOTION.ACTIVITY',
								label: '促销/活动'
							},
							{
								id: 'MENU.PROMOTION.PAYMENT',
								label: '促销/充值'
							},
							{
								id: 'MENU.PROMOTION.COUPON',
								label: '促销/优惠券'
							},
							{
								id: 'MENU.PROMOTION.PLAN',
								label: '促销/套餐'
							},
							{
								id: 'MENU.PROMOTION.REPORT',
								label: '促销/报表'
							}
						]
					},
					{
						id: 'MENU.MANAGMENT',
						label: '系统运维',
						children: [{
								id: 'MENU.MANAGMENT.DASHBOARD',
								label: '运维/看板'
							}, {
								id: 'MENU.MANAGMENT.DEVICE',
								label: '设备日志'
							},
							{
								id: 'MENU.MANAGMENT.SYSTEM',
								label: '系统日志'
							},
							{
								id: 'MENU.MANAGMENT.OPERATOR',
								label: '操作日志'
							},
							{
								id: 'MENU.MANAGMENT.RULE',
								label: '访问规则'
							},
							{
								id: 'MENU.MANAGMENT.NODE',
								label: '节点日志'
							}
						]
					},
					{
						id: 'MENU.IOT',
						label: '物联中心',
						children: [{
								id: 'MENU.IOT.DASHBOARD',
								label: '物联/看板'
							}, {
								id: 'MENU.IOT.DEVICE',
								label: '物联/设备'
							},
							{
								id: 'MENU.IOT.SIM',
								label: 'SIM卡'
							},
							{
								id: 'MENU.IOT.QR',
								label: '物联/一码通'
							}
						]
					},
					{
						id: 'MENU.SERVICE',
						label: '客户服务',
					},
					{
						id: 'MENU.CHARGE_EV',
						label: '汽车充电',
						children: [{
								id: 'MENU.CHARGE_EV.DASHBOARD',
								label: '汽车/看板'
							}, {
								id: 'MENU.CHARGE_EV.DEVICE',
								label: '汽车/资源'
							},
							{
								id: 'MENU.CHARGE_EV.PAYMENT',
								label: '汽车/充电订单'
							},
							{
								id: 'MENU.CHARGE_EV.PLAN',
								label: '套餐'
							},
							{
								id: 'MENU.CHARGE_EV.QR',
								label: '汽车/一码通'
							},
							{
								id: 'MENU.CHARGE_EV.REPORT',
								label: '汽车/报表'
							}
						]
					},
					{
						id: 'MENU.CHARGE_BC',
						label: '单车充电',
						children: [{
								id: 'MENU.CHARGE_BC.DASHBOARD',
								label: '电单车/看板'
							}, {
								id: 'MENU.CHARGE_BC.DEVICE',
								label: '电单车/资源'
							},
							{
								id: 'MENU.CHARGE_BC.PAYMENT',
								label: '充电订单'
							},
							{
								id: 'MENU.CHARGE_BC.PLAN',
								label: '电单车/套餐'
							},
							{
								id: 'MENU.CHARGE_BC.QR',
								label: '电单车/一码通'
							},
							{
								id: 'MENU.CHARGE_BC.REPORT',
								label: '电单车/报表'
							}
						]
					},
					{
						id: 'MENU.CHARGE_PB',
						label: '共享电池',
					},
					{
						id: 'MENU.PARK_LOTS',
						label: '停车场',
						children: [{
								id: 'MENU.PARK_LOTS.DASHBOARD',
								label: '停车场/看板'
							}, {
								id: 'MENU.PARK_LOTS.DEVICE',
								label: '停车场/资源'
							},
							{
								id: 'MENU.PARK_LOTS.PLAN',
								label: '停车场/套餐'
							},
							{
								id: 'MENU.PARK_LOTS.RATE',
								label: '计费规则'
							},
							{
								id: 'MENU.PARK_LOTS.PDR',
								label: '停车记录'
							},
							{
								id: 'MENU.CHARGE_BC.QR',
								label: '停车场/一码通'
							},
							{
								id: 'MENU.PARK_LOTS.REPORT',
								label: '停车场/报表'
							}
						]
					},
					{
						id: 'MENU.PARK_ROAD',
						label: '路边停车',
						children: [{
								id: 'MENU.PARK_ROAD.DASHBOARD',
								label: '路边/看板'
							}, {
								id: 'MENU.PARK_ROAD.DEVICE',
								label: '路边/资源'
							},
							{
								id: 'MENU.PARK_ROAD.TOLL',
								label: '收费管理'
							},
							{
								id: 'MENU.PARK_ROAD.PLAN',
								label: '路边/套餐'
							},
							{
								id: 'MENU.PARK_ROAD.RATE',
								label: '计费规则'
							},
							{
								id: 'MENU.PARK_ROAD.QR',
								label: '一码通'
							},
							{
								id: 'MENU.PARK_ROAD.REPORT',
								label: '路边/报表'
							}
						]
					},
					{
						id: 'MENU.PARK_SHARE',
						label: '共享车位',
					}
				],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				yinsheList: [{
						id: 'MENU.USER',
						label: '会员资产'
					},
					{
						id: 'MENU.USER.DASHBOARD',
						label: '看板',
					},
					{
						id: 'MENU.USER.ACCOUNT',
						label: '用户账号',
					},
					{
						id: 'MENU.USER.CARD',
						label: '一卡通',
					},
					{
						id: 'MENU.USER.COUPON',
						label: '优惠券',
					},
					{
						id: 'MENU.USER.PLAN',
						label: '套餐',
					},
					{
						id: 'MENU.USER.CERTIFICATE',
						label: '实名认证',
					},
					{
						id: 'MENU.USER.PLATE',
						label: '车牌',
					},
					{
						id: 'MENU.USER.TRUSTPAY',
						label: '无感支付',
					},
					{
						id: 'MENU.USER.REPORT',
						label: '用户/报表',
					},
					{
						id: 'MENU.AGENT',
						label: '商户资产',
					},
					{
						id: 'MENU.AGENT.DASHBOARD',
						label: '商户/看板'
					}, {
						id: 'MENU.AGENT.ACCOUNT',
						label: '商户账号'
					},
					{
						id: 'MENU.AGENT.FINANCE',
						label: '财务'
					},
					{
						id: 'MENU.AGENT.GATEWAY',
						label: '应用网关'
					},
					{
						id: 'MENU.AGENT.COMPANY',
						label: '公司'
					},
					{
						id: 'MENU.AGENT.PARTNER',
						label: '开发接口'
					},
					{
						id: 'MENU.AGENT.REPORT',
						label: '商户/报表'
					},
					{
						id: 'MENU.FINANCE',
						label: '财务',
					},
					{
						id: 'MENU.FINANCE.DASHBOARD',
						label: '财务/看板'
					}, {
						id: 'MENU.FINANCE.PAYMENT',
						label: '财务'
					},
					{
						id: 'MENU.FINANCE.RECEIPT',
						label: '发票'
					},
					{
						id: 'MENU.FINANCE.SHARE',
						label: '结算'
					},
					{
						id: 'MENU.FINANCE.WITHDRAW',
						label: '提现'
					},
					{
						id: 'MENU.FINANCE.REPORT',
						label: '财务/报表'
					},
					{
						id: 'MENU.HR',
						label: '人力/资源',
					},
					{
						id: 'MENU.HR.DASHBOARD',
						label: '人力/看板'
					}, {
						id: 'MENU.HR.DEPARTMENT',
						label: '部门'
					},
					{
						id: 'MENU.HR.ROLE',
						label: '角色'
					},
					{
						id: 'MENU.HR.TOLL',
						label: '收费'
					},
					{
						id: 'MENU.HR.REPORT',
						label: '人力/报表'
					},
					{
						id: 'MENU.PROMOTION',
						label: '促销优惠',
					},
					{
						id: 'MENU.PROMOTION.DASHBOARD',
						label: '促销/看板'
					}, {
						id: 'MENU.PROMOTION.ACTIVITY',
						label: '促销/活动'
					},
					{
						id: 'MENU.PROMOTION.PAYMENT',
						label: '促销/充值'
					},
					{
						id: 'MENU.PROMOTION.COUPON',
						label: '促销/优惠券'
					},
					{
						id: 'MENU.PROMOTION.PLAN',
						label: '促销/套餐'
					},
					{
						id: 'MENU.PROMOTION.REPORT',
						label: '促销/报表'
					},
					{
						id: 'MENU.MANAGMENT',
						label: '系统运维',
					},
					{
						id: 'MENU.MANAGMENT.DASHBOARD',
						label: '运维/看板'
					}, {
						id: 'MENU.MANAGMENT.DEVICE',
						label: '设备日志'
					},
					{
						id: 'MENU.MANAGMENT.SYSTEM',
						label: '系统日志'
					},
					{
						id: 'MENU.MANAGMENT.OPERATOR',
						label: '操作日志'
					},
					{
						id: 'MENU.MANAGMENT.RULE',
						label: '访问规则'
					},
					{
						id: 'MENU.MANAGMENT.NODE',
						label: '节点日志'
					},
					{
						id: 'MENU.IOT',
						label: '物联中心',
					},
					{
						id: 'MENU.IOT.DASHBOARD',
						label: '物联/看板'
					}, {
						id: 'MENU.IOT.DEVICE',
						label: '物联/设备'
					},
					{
						id: 'MENU.IOT.SIM',
						label: 'SIM卡'
					},
					{
						id: 'MENU.IOT.QR',
						label: '物联/一码通'
					},
					{
						id: 'MENU.SERVICE',
						label: '客户服务',
					},
					{
						id: 'MENU.CHARGE_EV',
						label: '汽车充电',
					},
					{
						id: 'MENU.CHARGE_EV.DASHBOARD',
						label: '汽车/看板'
					}, {
						id: 'MENU.CHARGE_EV.DEVICE',
						label: '汽车/资源'
					},
					{
						id: 'MENU.CHARGE_EV.PAYMENT',
						label: '充电订单'
					},
					{
						id: 'MENU.CHARGE_EV.PLAN',
						label: '汽车/套餐'
					},
					{
						id: 'MENU.CHARGE_EV.QR',
						label: '汽车/一码通'
					},
					{
						id: 'MENU.CHARGE_EV.REPORT',
						label: '汽车/报表'
					},
					{
						id: 'MENU.CHARGE_BC',
						label: '单车充电',
					},
					{
						id: 'MENU.CHARGE_BC.DASHBOARD',
						label: '电单车/看板'
					}, {
						id: 'MENU.CHARGE_BC.DEVICE',
						label: '电单车/资源'
					},
					{
						id: 'MENU.CHARGE_BC.PAYMENT',
						label: '充电订单'
					},
					{
						id: 'MENU.CHARGE_BC.PLAN',
						label: '电单车/套餐'
					},
					{
						id: 'MENU.CHARGE_BC.QR',
						label: '电单车/一码通'
					},
					{
						id: 'MENU.CHARGE_BC.REPORT',
						label: '电单车/报表'
					},
					{
						id: 'MENU.CHARGE_PB',
						label: '共享电池',
					},
					{
						id: 'MENU.PARK_LOTS',
						label: '停车场',
					},
					{
						id: 'MENU.PARK_LOTS.DASHBOARD',
						label: '停车场/看板'
					}, {
						id: 'MENU.PARK_LOTS.DEVICE',
						label: '停车场/资源'
					},
					{
						id: 'MENU.PARK_LOTS.PLAN',
						label: '停车场/套餐'
					},
					{
						id: 'MENU.PARK_LOTS.RATE',
						label: '计费规则'
					},
					{
						id: 'MENU.PARK_LOTS.PDR',
						label: '停车记录'
					},
					{
						id: 'MENU.CHARGE_BC.QR',
						label: '停车场/一码通'
					},
					{
						id: 'MENU.PARK_LOTS.REPORT',
						label: '停车场/报表'
					},
					{
						id: 'MENU.PARK_ROAD',
						label: '路边停车',
					},
					{
						id: 'MENU.PARK_ROAD.DASHBOARD',
						label: '路边/看板'
					}, {
						id: 'MENU.PARK_ROAD.DEVICE',
						label: '路边/资源'
					},
					{
						id: 'MENU.PARK_ROAD.TOLL',
						label: '路边/收费管理'
					},
					{
						id: 'MENU.PARK_ROAD.PLAN',
						label: '路边/套餐'
					},
					{
						id: 'MENU.PARK_ROAD.RATE',
						label: '计费规则'
					},
					{
						id: 'MENU.PARK_ROAD.QR',
						label: '路边/一码通'
					},
					{
						id: 'MENU.PARK_ROAD.REPORT',
						label: '路边/报表'
					},
					{
						id: 'MENU.PARK_SHARE',
						label: '共享车位',
					}
				],
				username: '',
				addQuanxian: false,
				total: 1, //数据总条数
				isActive: true,
				editForm: {},
				dialogVisible: false,
				add: false,
				checkList: '',
				changeList: false,
				selected: 0, //下拉框
				pagenum: 1, //分页
				token: '', //token令牌
				addDialogVisible: false,
				pagesize: 10, //每次查询条数
				type: 0,
				input: '',
				addForm: {
					token: localStorage.getItem('token').replace(/\"/g, ""),
					name: '',
					memo: '',
					permissions: '',
				}, //添加设备添加数据

			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.getUserMes()
		},
		methods: {
			//获取用户卡信息列表
			getUserMes() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "")
				//console.log(toKen)
				this.$axios.get("admin/api/roles?token=" + toKen + "&page=" + this.pagenum + "&row=10&keyword=" + this
						.input)
					.then(res => {
						console.log(res)
						if (res.data.error == 0) {
							this.tableData = res.data.roles
							this.total = res.data.total
						} else {
							this.$message.error(res.data.errmsg)
						}
					})
			},
			resetChecked() {
				this.$nextTick(() => {
					this.$refs.tree.setCheckedKeys([this.checkList]);
				});
				this.showList = this.checkList
			},
			aa() {
				this.checkList = this.$refs.tree.getCheckedKeys()
				let checkLabel = this.$refs.tree.getCheckedNodes()
				// console.log(this.changeList,this.showList)
				this.showList = checkLabel.map(item => {
					return item.label
				})
				console.log(this.showList)
				console.log(this.checkList)
			},
			addsure() {
				this.addDialogVisible = false
				this.$axios.post("/admin/api/role", this.addForm)
					.then(res => {
						console.log(res)
						if (res.data.error == 0) {
							this.$message.success('添加成功')
							setTimeout(() => {
								this.getUserMes()
							}, 500)
						} else {
							this.$message.error(res.data.errmsg)
						}
					})
			},
			editSure() {
				this.addQuanxian = false
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.put("/admin/api/role/" + this.editId, {
					token: toKen,
					permissions: this.checkList
				}).then(res => {
					console.log(res)
					if (res.data.error == 0) {
						this.$message.success('配置成功!')
						setTimeout(() => {
							this.getUserMes()
						}, 500)
					} else {
						this.$message.error(res.data.errmsg)
					}
				})
			},
			deleteJs(id) {
				let toKen = this.token.replace(/\"/g, "")
				if (confirm('确认删除吗?')) {
					this.$axios.delete("/admin/api/role/" + id + "?token=" + toKen)
						.then(res => {
							console.log(res)
							if (res.data.error == 0) {
								this.$message.success('删除成功')
								setTimeout(() => {
									this.getUserMes()
								}, 500)
							} else {
								this.$message.error(res.data.errmsg)
							}
						})
				}
			},
			peizhi(id) {
				this.editId = id
				this.addQuanxian = true
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/role/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res)
						if (res.data.error == 0) {
							this.editForm = res.data.role
							console.log(this.editForm)
							if (res.data.role.permissions) {
								this.checkList = res.data.role.permissions
								console.log(this.showList)
								let ax = []
								let newArr = this.yinsheList.map((a,index)=>{
									let fanhui = this.checkList.map((item)=>{
										if(a.id == item){
											console.log(a.label)
											ax.push(a.label)
										}
									})
								})
								this.showList = ax
							} else {
								this.checkList = ''
								this.showList = ''
							}
						} else {
							this.$message.error(res.data.errmsg)
						}
					})
			},
			addjuese() {
				this.addDialogVisible = true
				this.addForm.name = ''
				this.addForm.memo = ''
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

	.showTitle {
		width: 100%;
		height: 50px;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.showBox {
		width: 26%;
		height: 40px;
		border-radius: 10px;
		border: solid 1px #BFBFBF;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 40px;
		margin: 10px 10px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.quanxianL>>>.el-tree-node__label {
		font-size: 16px !important;
	}

	.footBot {
		height: 50px;
		width: 50%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.quanxianL {
		width: 60%;
		height: 500px;
		background-color: white;
		border-top: solid 2px #7D7D7D;
		overflow-y: auto;
	}

	.quanxianR {
		width: 40%;
		height: 500px;
		background-color: #F6F6F6;
		border-top: solid 2px #7D7D7D;
		overflow-y: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
	}

	.quanxianBox {
		height: 500px;
		background-color: yellow;
		display: flex;
		flex-direction: row;
	}

	.quanxianBot {
		width: 100px;
		height: 30px;
		border: solid 2px #1F69FC;
		background-color: red;
		border-radius: 10px;
		margin: 0 auto;
		text-align: center;
		line-height: 30px;
		color: #1F69FC;
		background-color: #e8f0ff;
		font-size: 15px;
		cursor: pointer;
	}

	.jueseWord {
		width: 80%;
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100px;
		font-size: 15px;
	}

	.jueseTouxiangBox {
		width: 100%;
		height: 90px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.jueseT {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background-color: #D8D9D8;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.xx {
		width: 80%;
		height: 30px;
		margin: 10px auto;
		color: #D8D9D8;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		cursor: pointer;
	}

	.jueseCon {
		width: 95%;
		margin: 0 auto;
		height: 700px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.jueseBox {
		width: 300px;
		height: 330px;
		border-radius: 10px;
		box-shadow: 0px 2px 6px 0px rgba(134, 134, 134, 0.64);
		margin: 10px 10px;
	}

	.tubiaoBoxBotImg {
		height: 50px;
		width: 50px;
		display: flex;
		margin: 0 auto;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tubiaoBoxTop {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.posWord1 {
		font-size: 22px;
		font-weight: 500;
	}

	.posWord2 {
		font-size: 15px;
		color: #8b8b8b;
		font-weight: 600;
	}

	.posWord3 {
		font-size: 22px;
		color: #8b8b8b;
	}

	.offline {
		width: 28px;
		height: 28px;
		border-radius: 14px;
		border: solid 3px #8e8e8e;
		background-color: #b5b5b5;
		box-sizing: border-box;
	}

	.online {
		width: 28px;
		height: 28px;
		border-radius: 14px;
		border: solid 3px #8e8e8e;
		background-color: #44ca41;
		box-sizing: border-box;
	}

	.tubiaoBox {
		width: 300px;
		height: 200px;
		background-color: #007DDB;
		margin: 20px 11px 10px 11px;
		border-radius: 10px;
		background-color: #eff2f4;
		box-shadow: 0px 2px 6px 0px rgba(134, 134, 134, 0.64);
	}

	.el-table td {
		padding: 0 0;
	}

	.el-input__inner {
		height: 30px;
		border: none;
	}

	.tubiao {
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.tanchu {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.conB {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 95%;
		margin: 0 auto;
	}

	.tubiaoBoxCon {
		width: 90%;
		height: 90px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
