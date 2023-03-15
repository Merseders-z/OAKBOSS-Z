<template>
	<div class="tem-right">
		<div class="tem-right-top">
			<div class="top-left">
				<div class="top-left-word">
					计费规则
				</div>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="right-con">
			<div class="right-con-left">
				<div class="right-con-top">
					<div class="textBox">
						<img src="../../assets/images/search.png" class="sear-img" />
						<el-input placeholder="请输入关键字" class="textWord" clearable v-model="input1" clearable
							@keyup.enter.native="getRoadMes"></el-input>
					</div>
					<div>
						<el-button type="primary" icon="el-icon-plus" class="but" @click="addDialogVisible1 = true">添加
						</el-button>
					</div>
				</div>
				<template>
					<el-table :data="tableData" stripe style="width:100%">
						<el-table-column prop="id" label="编号"> </el-table-column>
						<el-table-column prop="name" label="规则">
							<template slot-scope="scope">
								<div @click="getParksMes(scope.row.id, scope.row.name)">
									{{ scope.row.name }}
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="address" label="操作">
							<template slot-scope="scope">
								<div class="operation">
									<div>
										<button type="text" @click="removeUserByID1(scope.row.id)">
											<img src="../../assets/images/delete.png" style="cursor: pointer;" />
										</button>
									</div>
									<div>
										<button type="text" @click="showEditDialog1(scope.row.id)">
											<img src="../../assets/images/compile.png" style="cursor: pointer;" />
										</button>
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<div class="UserAssets-bottom">
					<div class="road-bottom-left" :data="tableData">
						<span>共{{ total }}条信息</span>
					</div>
					<div class="road-bottom-right">
						<el-pagination background :current-page.sync.number="pagenum"
							@current-change="handleCurrentChange" :page-size="pagesize" layout="prev, pager, next"
							:total="total" small :pager-count="5">
						</el-pagination>
					</div>
				</div>
			</div>
			<div class="right-con-right">
				<div class="titleG">
					<div class="right-top">
						<div class="blueD"></div>
						{{ topName }}
					</div>
					<div class="blueBut">
						<el-button type="primary" icon="el-icon-plus" class="but" @click="rightADD">添加
						</el-button>
					</div>
				</div>
				<div>
					<template>
						<el-table :data="parkList" stripe style="width:100%">
							<el-table-column prop="id" label="ID"> </el-table-column>
							<el-table-column prop="name" show-overflow-tooltip label="标题"> </el-table-column>
							<el-table-column prop="price" label="价格"> </el-table-column>
							<el-table-column prop="start_time" label="开始时间">
							</el-table-column>
							<el-table-column prop="end_time" label="结束时间">
							</el-table-column>
							<el-table-column prop="address" label="操作">
								<template slot-scope="scope">
									<div class="operation">
										<div>
											<el-button type="text" @click="removeUserByID(scope.row.id)"><img
													src="../../assets/images/delete.png" style="cursor: pointer;" />
											</el-button>
										</div>
										<div>
											<el-button type="text" @click="showEditDialog(scope.row.id)"><img
													src="../../assets/images/compile.png" style="cursor: pointer;" />
											</el-button>
										</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
				<div class="UserAssets-bottom">
					<div class="road-bottom-left" :data="parkList">
						<span>共{{ parkTotal }}条信息</span>
					</div>
					<div class="road-bottom-right">
						<el-pagination background :current-page.sync.number="newpark" @current-change="parksNumber"
							:page-size="pagepark" layout="prev, pager, next" :total="parkTotal">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>

		<!-- 添加规则 -->
		<el-dialog title="添加规则" :visible.sync="addDialogVisible" width="40%">
			<div class="guizeBox">
				<div class="guizeBoxT">
					<div class="intBox">
						<div style="font-size: 20px;font-weight: 600;">
							名称
						</div>
						<input type="text"
							style="width: 80%;height: 40px;border-radius: 10px;border: solid 1px #409EFF;"
							placeholder="请输入名称" v-model="FLname">
					</div>
					<div class="intBox">
						<div style="font-size: 20px;font-weight: 600;">
							时间
						</div>
						<div
							style="width: 80%;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;">
							<el-time-picker v-model="value1" placeholder="开始时间" value-format="HHmmss">
							</el-time-picker>
							至
							<el-time-picker v-model="value2" placeholder="结束时间" value-format="HHmmss">
							</el-time-picker>
						</div>
					</div>
					<div class="intBox">
						<div style="font-size: 20px;font-weight: 600;">
							价格
						</div>
						<input type="text"
							style="width: 80%;height: 40px;border-radius: 10px;border: solid 1px #409EFF;"
							placeholder="请输入价格" v-model="FLprice">
					</div>
				</div>
				<div class="guizeBoxC">
					<div class="conTitle">
						车牌规则
					</div>
					<div class="conRuleBox">
						<div class="rulebox">
							<div class="ruleboxTitle">
								请添加车牌规则
							</div>
							<div class="ruleBoxBot">
								<div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap;">
									<div class="platebox" v-for="item in ruleBox">{{item}}</div>
									<div class="platebox1" @click="addPlate">+添加</div>
								</div>
							</div>
						</div>
						<div class="rulebox">
							<div class="ruleboxTitle">
								请选择颜色规则
							</div>
							<div class="ruleBoxBot1">
								<div style="width: 70%;margin: 40px auto;">
									<template>
										<el-checkbox-group v-model="FLcolor" @change="checkBox">
											<el-checkbox label="black">黑</el-checkbox>
											<el-checkbox label="white">白</el-checkbox>
											<el-checkbox label="yellow">黄</el-checkbox>
											<el-checkbox label="green">绿</el-checkbox>
											<el-checkbox label="blue">蓝</el-checkbox>
										</el-checkbox-group>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="guizeBoxB">
					<el-button type="primary" icon="el-icon-circle-check" round @click="sure">确认</el-button>
					<el-button icon="el-icon-circle-close" round @click="addDialogVisible = false">取消</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 修改规则 -->
		<el-dialog title="修改规则" :visible.sync="editDialogVisible" width="40%">
			<div class="guizeBox">
				<div class="guizeBoxT">
					<div class="intBox">
						<div style="font-size: 20px;font-weight: 600;">
							名称
						</div>
						<input type="text"
							style="width: 80%;height: 40px;border-radius: 10px;border: solid 1px #409EFF;"
							placeholder="请输入名称" v-model="editForm.name">
					</div>
					<div class="intBox">
						<div style="font-size: 20px;font-weight: 600;">
							时间
						</div>
						<div
							style="width: 80%;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;">
							<el-time-picker v-model="editForm.start_time" placeholder="开始时间" value-format="HHmmss">
							</el-time-picker>
							至
							<el-time-picker v-model="editForm.end_time" placeholder="结束时间" value-format="HHmmss">
							</el-time-picker>
						</div>
					</div>
					<div class="intBox">
						<div style="font-size: 20px;font-weight: 600;">
							价格
						</div>
						<input type="text"
							style="width: 80%;height: 40px;border-radius: 10px;border: solid 1px #409EFF;"
							placeholder="请输入价格" v-model="editForm.price">
					</div>
				</div>
				<div class="guizeBoxC">
					<div class="conTitle">
						车牌规则
					</div>
					<div class="conRuleBox">
						<div class="rulebox">
							<div class="ruleboxTitle">
								请添加车牌规则
							</div>
							<div class="ruleBoxBot">
								<div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap;">
									<div class="platebox" v-for="t in edPlateList">{{t}}</div>
									<div class="platebox1" @click="editPlate">+添加</div>
								</div>
							</div>
						</div>
						<div class="rulebox">
							<div class="ruleboxTitle">
								请选择车牌颜色
							</div>
							<div class="ruleBoxBot1">
								<div style="width: 70%;margin: 40px auto;">
									<template>
										<el-checkbox-group v-model="editForm.colors" @change="checkBox1">
											<el-checkbox label="black">黑</el-checkbox>
											<el-checkbox label="white">白</el-checkbox>
											<el-checkbox label="yellow">黄</el-checkbox>
											<el-checkbox label="green">绿</el-checkbox>
											<el-checkbox label="blue">蓝</el-checkbox>
										</el-checkbox-group>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="guizeBoxB">
					<el-button type="primary" icon="el-icon-circle-check" round @click="editChargerInfo">确认</el-button>
					<el-button icon="el-icon-circle-close" round @click="editDialogVisible = false">取消</el-button>
				</div>
			</div>
		</el-dialog>


		<!-- 添加车牌规则 -->
		<el-dialog title="添加车牌规则" :visible.sync="addplateBox" width="30%">
			<el-form :model="addplateList" label-width="80px">
				<el-form-item label="" prop="">
					<el-select v-model="diqu" placeholder="请选择地区" class="sel">
						<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="name">
					<el-input v-model="addplateList.name" placeholder="请输入车牌规则" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addplateBox = false">取 消</el-button>
				<el-button type="primary" @click="addPlateSure">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改的添加车牌规则 -->
		<el-dialog title="添加车牌规则" :visible.sync="EplateBox" width="30%">
			<el-form :model="ax" label-width="80px">
				<el-form-item label="" prop="">
					<el-select v-model="Ediqu" placeholder="请选择地区" class="sel">
						<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="name">
					<el-input v-model="ax.name" placeholder="请输入车牌规则" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="EplateBox = false">取 消</el-button>
				<el-button type="primary" @click="addEdit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 添加规则 -->
		<el-dialog title="添加费率组" :visible.sync="addDialogVisible1" width="30%">
			<el-form :model="addForm1" label-width="80px">
				<el-form-item label="套餐名称" prop="name">
					<el-input v-model="addForm1.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="日封顶" prop="max_perday">
					<el-input v-model="addForm1.max_perday" placeholder="20,blue:30,green:40" class="addinput">
					</el-input>
				</el-form-item>
				<el-form-item label="月封顶" prop="max_permonth">
					<el-input v-model="addForm1.max_permonth" class="addinput" placeholder="200,blue:300,green:400">
					</el-input>
				</el-form-item>
				<el-form-item label="免费时间" prop="free_time">
					<el-input v-model="addForm1.free_time" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="chargersUser1">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改规则 -->
		<el-dialog title="修改费率组" :visible.sync="editDialogVisible1" width="30%">
			<el-form :model="editForm1" label-width="80px">
				<el-form-item label="套餐名称" prop="name">
					<el-input v-model="editForm1.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="日封顶" prop="max_perday">
					<el-input v-model="editForm1.max_perday" placeholder="20,blue:30,green:40" class="addinput">
					</el-input>
				</el-form-item>
				<el-form-item label="月封顶" prop="max_permonth">
					<el-input v-model="editForm1.max_permonth" class="addinput" placeholder="200,blue:300,green:400">
					</el-input>
				</el-form-item>
				<el-form-item label="免费时间" prop="free_time">
					<el-input v-model="editForm1.free_time" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="editChargerInfo1">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import myhead from "../../components/myhead.vue";
	export default {
		components: {
			myhead
		},
		data() {
			return {
				total: 1,
				value1: '',
				Ediqu: '',
				FLname: '',
				ax: {
					name: ''
				},
				FLprice: '',
				diqu: '',
				value2: '',
				parkTotal: 0,
				token: "",
				checkList: [],
				addplateList: {
					name: '',
				},
				options: [{ //这里是地区名
						value: '京',
					},
					{
						value: '津',
						id: 2
					},
					{
						value: '冀',
						id: 3
					},
					{
						value: '晋',
						id: 4
					},
					{
						value: '蒙',
						id: 5
					},
					{
						value: '辽',
						id: 6
					},
					{
						value: '吉',
						id: 7
					},
					{
						value: '黑',
						id: 8
					},
					{
						value: '沪',
						id: 9
					},
					{
						value: '苏',
						id: 10
					},
					{
						value: '浙',
						id: 11
					},
					{
						value: '皖',
						id: 12
					},
					{
						value: '闽',
						id: 13
					},
					{
						value: '赣',
						id: 14
					},
					{
						value: '鲁',
						id: 15
					},
					{
						value: '豫',
						id: 16
					},
					{
						value: '鄂',
						id: 17
					},
					{
						value: '湘',
						id: 18
					},
					{
						value: '粤',
						id: 19
					},
					{
						value: '桂',
						id: 20
					},
					{
						value: '琼',
						id: 21
					},
					{
						value: '渝',
						id: 22
					},
					{
						value: '川',
						id: 23
					},
					{
						value: '贵',
						id: 24
					},
					{
						value: '云',
						id: 25
					},
					{
						value: '藏',
						id: 26
					},
					{
						value: '陕',
						id: 27
					},
					{
						value: '甘',
						id: 28
					},
					{
						value: '青',
						id: 29
					},
					{
						value: '宁',
						id: 30
					},
					{
						value: '新',
						id: 31
					}
				],
				addplateBox: false,
				pagenum: 1, //分页
				pagesize: 12,
				pagepark: 14,
				edPlateList: [],
				editplateList: [],
				ruleBox: [],
				isActive: 0,
				newpark: 1, //分页
				tableData: [],
				parkList: [],
				input1: "",
				input2: "",
				EplateBox: false,
				FLcolor: [],
				tcID: "",
				value: true,
				topName: "计费规则",
				isType: false,
				leftType: "",
				getFristID: "", //页面初次加载时，根据左边第一个id查右边的数据
				editForm: {},
				editForm1: {},
				getName: "",
				addDialogVisible: false,
				addDialogVisible1: false,
				editDialogVisible: false, //控制修改设备对话框显示隐藏
				editDialogVisible1: false, //控制修改设备对话框显示隐藏
				addForm: {
					token: localStorage.getItem("token").replace(/\"/g, ""),
					name: "",
					price: "",
					start_time: "",
					end_time: ""
				}, //添加设备添加数据
				addForm1: {
					token: localStorage.getItem("token").replace(/\"/g, ""),
					name: "",
					max_permonth: '',
					max_perday: '',
					free_time: '',
				}, //添加设备添加数据
				//修改设备表单数据
				editFormRules: {
					name: [{
							required: true,
							message: "请输入标题",
							trigger: "blur"
						},
						{
							min: 1,
							message: "标题的长度在3~50个字符之间",
							trigger: "blur"
						}
					],
					price: [{
							required: true,
							message: "请输入价格",
							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "请输入正确的信息",
							trigger: "blur"
						}
					],
					start_time: [{
							required: true,

							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "请输入正确的时间",
							trigger: "blur"
						}
					]
				},
				//添加表单的验证规则
			};
		},
		created() {
			this.token = localStorage.getItem("token");
			this.getRoadMes();
		},
		methods: {
			//左边列表总信息
			getRoadMes() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get(
						"admin/api/lot_rate/groups?token=" +
						toKen +
						"&page=" +
						this.pagenum +
						"&row=14&keyword=" +
						this.input1
					)
					.then(res => {
						console.log(res.data);
						// console.log(res.data.users)
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.tableData = res.data.rate_groups; //用户列表数据
							this.total = res.data.total;
							this.getFristID = this.tableData[0].id;
							// console.log(this.tableData)
							this.topName = this.tableData[0].name;
							this.getParksMe();
						}
					});
			},
			addPlate() {
				this.addplateBox = true
				this.diqu = ''
				this.addplateList.name = ''
			},
			//第一次进入添加弹出框清空输入框
			rightADD() {
				this.addDialogVisible = true
				this.FLname = ''
				this.value1 = ''
				this.value2 = ''
				this.FLprice = ''
				this.FLcolor = []
				this.ruleBox = []
			},
			addPlateSure() {
				this.addplateBox = false
				let box = this.diqu + this.addplateList.name
				this.ruleBox.push(box)
				console.log(this.ruleBox)
			},
			checkBox() {
				console.log(this.FLcolor)
			},
			checkBox1() {
				console.log(this.editForm.colors)
			},
			// 修改添加框
			addEdit() {
				this.EplateBox = false
				let box1 = this.Ediqu + this.ax.name
				console.log(box1)
				this.edPlateList.push(box1)
				console.log(this.edPlateList)
			},
			editPlate() {
				this.Ediqu = ''
				this.ax.name = ''
				this.EplateBox = true
			},
			sure() {
				let toKen = this.token.replace(/\"/g, "");
				this.$axios.post("admin/api/lot_rate", {
					token: toKen,
					name: this.FLname,
					start_time: this.value1,
					end_time: this.value2,
					price: this.FLprice,
					colors: this.FLcolor,
					plates: this.ruleBox,
					group: this.getFristID,
				}).then(res => {
					if (res.data.error !== 0) {
						return this.$message.error(res.data.error)
					} else {
						this.$message.success('添加成功!')
						this.addDialogVisible = false
						setTimeout(() => {
							this.getParksMe();
						}, 500);
					}
				})
			},
			//根据左边点击id查询右边信息
			getParksMes(id, name) {
				this.leftType = id;
				this.getFristID = id;
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get(
						"/admin/api/lot_rate/group/" +
						id +
						"/lot_rates?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=14"
					)
					.then(res => {
						console.log(res.data.lot_rates);
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.parkList = res.data.lot_rates; //用户列表数据
							this.parkTotal = res.data.total;
							this.isType = true;
							// console.log(this.parkList)
						}
						this.topName = name;
					});
			},
			//右边列表总信息
			getParksMe() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen) /admin/api/lot_rate/group/{group}/lot_rates
				this.$axios
					.get(
						"/admin/api/lot_rate/group/" +
						this.getFristID +
						"/lot_rates?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=14"
					)
					.then(res => {
						console.log(res.data);
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.parkList = res.data.lot_rates; //用户列表数据
							this.parkTotal = res.data.total;
						}
					});
			},
			chargersUser1() {
				let toKen = this.token.replace(/\"/g, "");

				this.$axios
					.post("/admin/api/lot_rate/group", this.addForm1)
					.then(res => {
						if (res.status !== 200) {
							return this.$message.error("添加数据失败!");
						}
						this.$message.success("添加数据成功!");
						this.addDialogVisible1 = false;
						setTimeout(() => {
							this.getRoadMes();
						}, 1000);
					});
			},

			//根据ID删除泊位
			async removeUserByID(id) {
				console.log(id);
				let toKen = this.token.replace(/\"/g, "");
				const confirmRes = await this.$confirm(
					"此操作将永久删除该信息, 是否继续?",
					"提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				).catch(err => err);
				// console.log(confirmRes)
				if (confirmRes !== "confirm") {
					return this.$message.info("已取消删除");
				}
				this.$axios
					.delete("/admin/api/lot_rate/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res.status);
						if (res.status == 200) {
							this.$message.success("删除成功");
							setTimeout(() => {
								this.getParksMe(); //刷新规则数据
							}, 1000);
						} else {
							this.$message.error("删除失败");
						}
					});
				//删除设备提示
			},
			async removeUserByID1(id) {
				console.log(id);
				let toKen = this.token.replace(/\"/g, "");
				const confirmRes1 = await this.$confirm(
					"此操作将永久删除该信息, 是否继续?",
					"提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				).catch(err => err);
				// console.log(confirmRes)
				if (confirmRes1 !== "confirm") {
					return this.$message.info("已取消删除");
				}
				this.$axios
					.delete("/admin/api/lot_rate/group/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res);
						if (res.status == 200) {
							this.$message.success("删除成功");
							setTimeout(() => {
								this.getRoadMes(); //刷新设备数据
							}, 1000);
						} else {
							this.$message.error("删除失败");
						}
					});
				//删除设备提示
			},

			showEditDialog(id) {
				this.editDialogVisible = true;
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get("/admin/api/lot_rate/" + id + "?token=" + toKen) //根据id点击修改的id查询设备信息
					.then(res => {
						//console.log(res.status)
						if (res.data.error == 0) {
							console.log(res)
							this.editForm = res.data.rate;
							this.edPlateList = res.data.rate.plates
						}
					});
			},
			showEditDialog1(id) {
				this.editDialogVisible1 = true;
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get("/admin/api/lot_rate/group/" + id + "?token=" + toKen) //根据id点击修改的id查询设备信息
					.then(res => {
						//console.log(res.status)
						if (res.status == 200) {
							this.editForm1 = res.data.rate_group;
						}
					});
			},

			//提交修改后的设备信息
			editChargerInfo() {
				let toKen = this.token.replace(/\"/g, "");
				this.$axios.put("/admin/api/lot_rate/" + this.editForm.id, {
						token: toKen,
						name: this.editForm.name,
						price: this.editForm.price,
						start_time: this.editForm.start_time,
						end_time: this.editForm.end_time,
						colors: this.editForm.colors,
						plates: this.edPlateList
					})
					.then(res => {
						if (res.data.error !== 0) {
							return this.$message.error("修改失败!");
						} else {
							this.$message.success("修改成功!");
							this.editDialogVisible = false;
							//刷新设备列表
							setTimeout(() => {
								this.getParksMe();
							}, 1000);
							//关闭对话框
						}
					});
			},
			//提交修改后的设备信息
			editChargerInfo1() {
				let toKen = this.token.replace(/\"/g, "");
				if (confirm("确认修改吗?")) {
					this.$axios
						.put("/admin/api/lot_rate/group/" + this.editForm1.id, {
							token: toKen,
							name: this.editForm1.name,
							max_perday: this.editForm1.max_perday,
							max_permonth: this.editForm1.max_permonth,
							free_time: this.editForm1.free_time
						})
						.then(res => {
							if (res.status !== 200) {
								return this.$message.error("修改失败!");
							}
							this.$message.success("修改成功!");
							this.addDialogVisible1 = false;
							console.log(this.editForm1);
							//刷新设备列表
							setTimeout(() => {
								this.getRoadMes(); //刷新设备数据
							}, 1000);
							//关闭对话框
							this.editDialogVisible1 = false;
						});
				}
			},
			//添加设备对话框关闭事件
			addDialogClosed1() {
				this.$refs.addFormRef1.resetFields();
			},
			addDialogClosed() {
				this.$refs.addFormRef.resetFields();
			},
			//修改设备对话框关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields();
			},
			editDialogClosed1() {
				this.$refs.editFormRef1.resetFields();
			},

			//点击改变背景色
			changeBg(id) {
				this.isActive = id;
				console.log(this.isActive);
			},
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage;
				this.getRoadMes();
			},
			parksNumber(parknum) {
				this.newpark = parknum;
				if (this.isType) {
					this.getParksMes(this.leftType);
				} else {
					this.getParksMe();
				}
			}
		}
	};
</script>

<style scoped="scoped">
	.tem-right {
		display: flex;
		flex: 1;
		width: 80%;
		flex-direction: column;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	.sel {
		border: 1px solid #1e69fe !important;
		width: 50%;
	}

	.ruleBoxBot1>>>.el-checkbox__label {
		font-size: 20px !important;
	}

	.platebox {
		width: 60px;
		height: 20px;
		border: solid 2px grey;
		border-radius: 10px;
		text-align: center;
		line-height: 20px;
		background-color: gainsboro;
		margin: 10px 5px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.platebox1 {
		width: 55px;
		height: 25px;
		border-radius: 10px;
		text-align: center;
		line-height: 25px;
		background-color: #3A78F6;
		margin: 10px 10px;
		color: white;
		box-sizing: border-box;
		cursor: pointer;
	}

	.ruleboxTitle {
		font-size: 16px;
	}

	.el-checkbox-group {
		display: flex;
		flex-wrap: wrap;
		height: 80px;
	}

	.ruleBoxBot {
		width: 90%;
		height: 150px;
		border-radius: 15px;
		box-shadow: 0px 0px 10px 5px gainsboro;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		overflow: auto;
		align-items: center;
	}

	.ruleBoxBot1 {
		width: 90%;
		height: 150px;
		border-radius: 15px;
		box-shadow: 0px 0px 10px 5px gainsboro;
	}

	.rulebox {
		width: 49%;
		height: 190px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.conRuleBox {
		width: 100%;
		height: 190px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.conTitle {
		width: 100%;
		text-align: center;
		font-size: 18px;
		height: 28px;
		font-weight: 600;
		color: #000000;
	}

	.el-input__inner {
		height: 40px;
	}

	.intBox {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.guizeBoxC {
		width: 100%;
		height: 220px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.guizeBoxB {
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.guizeBoxT {
		width: 100%;
		height: 150px;
		display: flex;
		flex-direction: column;
	}

	.guizeBox {
		width: 100%;
		height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.parkIcon-word {
		width: 38px;
		height: 13px;
		font-family: PingFangSC-Regular;
		font-size: 13px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #5f6062;
	}

	.titleG {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}

	.BGactive {
		background-color: #bed3ff;
	}

	.parkIcon {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.parkIcon div {
		background-color: #f2d0bd;
		height: 22px;
		width: 55px;
		line-height: 22px;
		border-radius: 5px;
	}

	.textBox .el-input {
		border: none;
	}

	.el-input {
		border: solid 1px #007ddb;
		border-radius: 10px;
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

	.leftBox-con {
		display: flex;
		flex-direction: column;
		width: 40%;
	}

	.leftBox {
		display: flex;
		flex-direction: row;
	}

	.right-con-left {
		width: 26%;
		box-shadow: 1px 1px 20px 10px #edf1f5;
		height: 800px;
		border-radius: 10px;
	}

	.right-con-right {
		width: 70%;
	}

	.parkimg {
		margin: 13px 20px;
	}

	.parkimg img {
		width: 78px;
		height: 78px;
	}

	.el-table .cell {
		line-height: 33px;
	}

	.right-con {
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.road-bottom-right {
		width: 65%;
		text-align: right;
	}

	.road-bottom-left {
		width: 30%;
	}

	.tem-right-top {
		display: flex;
		flex-direction: row;
		width: 95%;
		margin: 20px auto;
		margin-top: 36px;
	}

	.el-table td div {
		margin: 0 auto;
	}

	.right-con-top {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 15px;
	}

	.blueD {
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: #1e69fe;
		margin: 0px 15px;
	}

	.top-right {
		display: flex;
		width: 125px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.top-left {
		flex: 1;
	}

	.textBox {
		width: 60%;
	}

	.right-top {
		background-color: #edf1f5;
		width: 90%;
		height: 55px;
		font-size: 24px;
		line-height: 55px;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #1e69fe;
	}

	.blueBut {
		margin: 15px 0;
	}

	.sear-img {
		width: 15px;
		height: 15px;
		margin-left: 10px;
	}

	.top-left-word {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
	}
</style>
