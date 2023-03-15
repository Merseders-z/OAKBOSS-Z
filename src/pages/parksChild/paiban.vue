<template>
	<div class="oneCard-right">
		<div class="UserAssets-right-top">
			<div class="user-left">
				<span class="user-word">排班管理</span>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="paibanBox">
			<div class="paibanLeft">
				<div class="PLTbox">
					<el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
					<el-button icon="el-icon-delete" @click="deleteGroup">删除</el-button>
				</div>
				<div class="PLCbox">
					<template>
						<el-table :data="stationList" stripe style="width: 100%">
							<el-table-column show-overflow-tooltip>
								<template slot-scope="scope">
									<div class="timeBox" :class="{BGactive1:isActive1 == scope.row.id}"
										@click="changeBg1(scope.row.id,scope.row.from,scope.row.to)">
										<div
											style="width: 50px;display: flex;flex-direction: row;justify-content: center;">
										</div>
										<div class="timeWord">{{scope.row.from}}~{{scope.row.to}}</div>
										<div class="banW">{{scope.row.name}}</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
				<div class="UserAssets-bottom">
					<div class="road-bottom-right1">
						<el-pagination background :current-page.sync.number="newpark" @current-change="parksNumber"
							:page-size="pagepark" layout="prev, pager, next" :total="total" small :pager-count='5'>
						</el-pagination>
					</div>
				</div>
			</div>
			<div class="paibanRight">
				<div class="PRTbox">
					<div class="dateBox" v-for="item in week" :class="{BGactive:isActive == item.id}"
						@click="changeBg(item.id,item.num)">
						{{item.name}}
					</div>
				</div>
				<div class="PRBbox">
					<div class="grayBox" v-for="item in adminList" @click="chooseID(item.id,item.fullname)">
						<div style="font-size: 18px;height: 30px;">{{item.fullname}}</div>
						<div style="display: flex;flex-direction: row;align-items: center;" v-show="!item.schedules">
							<div style="width: 20px;">
								<img src="../../assets/images/ExclamationMark.png" style="width: 15px;height: 15px;">
							</div>
							<div style="font-size: 15px;color: #7d7d7d;">暂无排班</div>
						</div>
						<div style="display: flex;flex-direction: row;align-items: center;" v-show="item.schedules">
							<div style="width: 20px;">
								<img src="../../assets/images/allow.png" style="width: 15px;height: 15px;">
							</div>
							<div style="font-size: 15px;color: #7d7d7d;">已排<span
									style="color: #5BBA17;">{{item.num}}</span>个泊位</div>
						</div>
					</div>
				</div>
				<div class="UserAssets-bottom">
					<div class="road-bottom-left" :data="adminList">
						<span style="font-size: 16px;">共{{yuangongTotal}}条信息</span>
					</div>
					<div class="road-bottom-right">
						<el-pagination background :current-page.sync.number="pagenum"
							@current-change="handleCurrentChange" :page-size="pagesize" layout="prev, pager, next"
							:total="yuangongTotal">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<!-- 添加设备 -->
		<el-dialog title="添加时间" :visible.sync="addDialogVisible" width="30%">
			<el-form :model="addForm" label-width="80px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="开始时间" prop="from">
					<div class="sel1">
					<template>
						<el-time-picker v-model="addForm.from" placeholder="开始时间" value-format="HH:mm:ss">
						</el-time-picker>
					</template>
					</div>
				</el-form-item>
				<el-form-item label="结束时间" prop="to">
					<!-- <el-input v-model="addForm.to" class="addinput"></el-input> -->
					<div class="sel1">
						<template>
							<el-time-picker v-model="addForm.to" placeholder="结束时间" value-format="HH:mm:ss">
							</el-time-picker>
						</template>
					</div>
				</el-form-item>
				<el-form-item label="星期" prop="">
					<el-select v-model="addForm.date" placeholder="请选择" class="sel">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addgroup">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加收费员泊位 -->
		<el-dialog title="添加泊位" :visible.sync="boweiDialogVisible" width="50%">
			<div class="addBox">
				<div class="addBoxL">
					<div class="addBoxLTop">
						收费员信息
					</div>
					<div class="addBoxLBot">
						<div class="imgbox">
							<img src="../../assets/images/shoufeiyuantx.png" style="width:100px;height:100px;">
							{{chooseSFYName}}
						</div>
						<div class="imgBword">
							<div style="display: flex;flex-direction: row;align-items: center;">
								<div style="color: gray;width: 100px;text-align: right;line-height: 30px;">工号:</div>
								<div
									style="margin-left: 15px;width: 150px;height: 30px;line-height: 30px;font-weight: 600;">
									{{no}}
								</div>
							</div>
							<div style="display: flex;flex-direction: row;align-items: center;">
								<div style="color: gray;width: 100px;text-align: right;line-height: 30px;">班次:</div>
								<div
									style="margin-left: 15px;width: 150px;height: 30px;line-height: 30px;font-weight: 600;">
									早班</div>
							</div>
							<div style="display: flex;flex-direction: row;align-items: center;">
								<div style="color: gray;width:100px;text-align: right;line-height: 30px;">上班时间:</div>
								<div
									style="margin-left: 15px;width: 150px;height: 30px;line-height: 30px;font-weight: 600;">
									{{from}}
								</div>
							</div>
							<div style="display: flex;flex-direction: row;align-items: center;">
								<div style="color: gray;width: 100px;text-align: right;line-height: 30px;">下班时间:</div>
								<div
									style="margin-left: 15px;width: 150px;height: 30px;line-height: 30px;font-weight: 600;">
									{{to}}
								</div>
							</div>
							<div style="display: flex;flex-direction: row;align-items: center;">
								<div style="color: gray;width: 100px;text-align: right;line-height: 30px;">手机号:</div>
								<div
									style="margin-left: 15px;width: 150px;height: 30px;line-height: 30px;font-weight: 600;">
									{{telephone}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="addBoxR">
					<div class="addBoxLTop" v-show="flag == false">
						已排泊位号<span style="color:#3a78f6;">{{ax.length}}</span>个
					</div>
					<div class="notPlate" v-show="flag == true">
						<img src="../../assets/images/NoScheduling.png" style="width: 200px;height: 180px;">
						<div style="font-size: 18px;color: gray;">暂无泊位号</div>
						<div class="addBut" @click="addpark">
							<img src="../../assets/images/ADD(1).png" style="width: 15px;height: 15px;">
							添加泊位号
						</div>
					</div>
					<div class="plateBox" v-show="flag == false">
						<div class="boweiBox">
							<div class="bowei" v-for="item in ax">
								<div style="display: flex;flex-direction: row;justify-content: flex-end;width: 90%;font-size: 15px;margin: 0 auto;cursor: pointer;" @click="shanbowei(item.id)">X</div>
								<div class="boweiNum">{{item.name}}</div>
							</div>
						</div>
						<div class="botBox">
							<div class="addBut" @click="addpark">
								<img src="../../assets/images/ADD(1).png" style="width: 15px;height: 15px;">
								添加泊位号
							</div>
							<div class="addBut1" @click="xiugai">
								保存
							</div>
						</div>
						<!-- <div class="UserAssets-bottom">
							<div class="road-bottom-left" :data="adminList">
								<span style="font-size: 16px;">共{{yuangongTotal}}条信息</span>
							</div>
							<div class="road-bottom-right">
								<el-pagination background :current-page.sync.number="pagenum"
									@current-change="handleCurrentChange" :page-size="pagesize" layout="prev, pager, next"
									:total="yuangongTotal">
								</el-pagination>
							</div>
						</div> -->
					</div>
				</div>
			</div>
		</el-dialog>
		<!-- 选择泊位号弹出窗 -->
		<el-dialog title="排班管理" :visible.sync="roadDialogVisible" width="50%">
			<div class="addBox">
				<div class="addBoxL">
					<div class="addBoxLTop">
						道路/站点
					</div>
					<div class="addBoxLBot">
						<div class="shurukuang">
							<input type="text" style="width: 87%;" v-model="shuru">
							<div class="bluesearch" @click="fristRoad">
								<img src="../../assets/images/roadsearch.png"
									style="width: 15px;height: 15px;border: none;">
							</div>
						</div>
						<div class="roadBox">
							<div class="roadName" v-for="item in stationAll" @click="chooseBowei(item.id)"
								:class="{chooseBoweiBg:item.id == stationID}">
								<div style="font-size: 18px;">{{item.name}}</div>
								<!-- <div style="font-size: 16px;">{{item.stat.total}}/{{item.stat.idle}}</div> -->
							</div>
						</div>
						<div class="UserAssets-bottom">
							<!-- <div class="road-bottom-left1" :data="adminList">
								<span>共{{roadTotal}}条</span>
							</div> -->
							<div class="road-bottom-right2">
								<el-pagination background :current-page.sync.number="newparkRoad"
									@current-change="roadNum" :page-size="pagesizeRoad" layout="prev, pager, next"
									:total="roadTotal" small :pager-count='5'>
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="addBoxR">
					<div class="addBoxLTop">
						添加泊位号
					</div>
					<div class="plateBox">
						<div class="boweiBox1">
							<div class="bowei1" v-for="(item,index) in boweiList">
								<el-checkbox-group v-model="checkList" @change="checkChange(item,index)">
									<el-checkbox :label="item.id" :disabled="item.dispatched">
										{{item.name}}
									</el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
						<div class="botBox">
							<div class="addBut" @click="addBowei">
								<img src="../../assets/images/ADD(1).png" style="width: 15px;height: 15px;">
								确定
							</div>
							<div class="addBut1" @click="quxiao">
								<img src="../../assets/images/empty.png" style="width: 15px;height: 18 px;">
								清空选项
							</div>
							<div class="addBut1" @click="goback">
								
								返回
							</div>
						</div>
						<div class="UserAssets-bottom">
							<div class="road-bottom-left" :data="adminList">
								<span style="font-size: 16px;">共{{boweiTotal}}个泊位号</span>
							</div>
							<div class="road-bottom-right">
								<el-pagination background :current-page.sync.number="boweinewpark"
									@current-change="boweiNum" :page-size="pagesizeBowei" layout="prev, pager, next"
									:total="boweiTotal">
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
			</div>
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
				option: '',
				username: '',
				roadDialogVisible: false,
				parkTotal: 0,
				value: '',
				newpark: 1,
				roadTotal: 0,
				checkList: [],
				boweiTotal: 0,
				telephone: '',
				newparkRoad: 1,
				boweiDialogVisible: false,
				pagepark: 8,
				isActive: true,
				dialogVisible: false,
				chargerTotal: 0,
				tongxue: [],
				yuangongNes: [],
				no: '',
				total: 0,
				stationTotal: 0,
				options: [{
						label: '周一',
						value: 'w1',
					},
					{
						label: '周二',
						value: 'w2',
					},
					{
						label: '周三',
						value: 'w3',
					},
					{
						label: '周四',
						value: 'w4',
					},
					{
						label: '周五',
						value: 'w5',
					},
					{
						label: '周六',
						value: 'w6',
					},
					{
						label: '周日',
						value: 'w7',
					}
				],
				stationList: [],
				addForm: {
					token: localStorage.getItem('token').replace(/\"/g, ""),
					name: '',
					from: '',
					to: '',
					date: '',
				},
				chargerList: [],
				fullname: '',
				flag: true,
				fristID: '',
				add: false,
				selected: 0, //下拉框
				pagenum: 1, //分页
				token: '', //token令牌
				pagesize: 25, //每次查询条数
				pagesizeRoad: 5, //每次查询条数
				type: 0,
				input: '',
				yuangongTotal: 0,
				pagesizeBowei: 28,
				boweiList: [],
				boweinewpark: 1,
				isActive: 'w1',
				addDialogVisible: false,
				chooseSFYName: '',
				chooseSFYID: '',
				from: '',
				to: '',
				fristBoweiId: '',
				stationID: '',
				isActive1: 1,
				isbowei: [],
				addList: [],
				newarr: [],
				shuru: '',
				ax: [],
				w: 6,
				adminList: [],
				stationAll: [],
				guolu:[],
				week: [{
						id: 'w1',
						name: '星期一',
						num: 6
					}, {
						id: 'w2',
						name: '星期二',
						num: 5
					},
					{
						id: 'w3',
						name: '星期三',
						num: 4
					},
					{
						id: 'w4',
						name: '星期四',
						num: 3
					},
					{
						id: 'w5',
						name: '星期五',
						num: 2
					},
					{
						id: 'w6',
						name: '星期六',
						num: 1
					},
					{
						id: 'w7',
						name: '星期日',
						num: 0
					}
				],
				arr2: []
			}
		},
		created() {
			this.token = localStorage.getItem('token')
			this.firstLeft()
			// this.yuangongList()
			this.fristRoad()
		},

		mounted() {

		},
		methods: {
			changeBg(id, num) {
				this.isActive = id;
				this.w = num
				this.yuangongList()
				this.firstLeft()
				console.log(this.isActive)
			},
			changeBg1(id, froms, to) {
				console.log(id)
				this.isActive1 = id;
				this.from = froms;
				this.to = to;
				this.yuangongList()
			},
			fristRoad() {
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/stations/3?token=" + toKen + "&page=" + this.newparkRoad +
						"&row=5&attach=schedule&keyword=" + this.shuru)
					.then(res => {
						if (res.status == 200) {
							console.log(res)
							this.stationAll = res.data.stations
							this.stationID = res.data.stations[0].id
							this.roadTotal = res.data.total
							this.fristBowei()
						}
					})
			},
			fristBowei() {
				console.log(this.stationID)
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/station/" + this.stationID + "/workgroup/" + this.isActive1 + "/parks?token=" +
						toKen + "&page=" + this.boweinewpark + "&row=28")
					.then(res => {
						if (res.status == 200) {

							this.boweiTotal = res.data.total || 0
							this.boweiList = res.data.chargers
						}
					})
			},
			deleteGroup() {
				let toKen = this.token.replace(/\"/g, "")
				if (confirm("确认删除吗?")) {
					this.$axios.delete("/admin/api/workgroup/" + this.isActive1+"?token=" + toKen)
						.then(res => {
							if (res.status !== 200) {
								return this.$message.error('删除失败!')
							}
							this.$message.success('删除成功!')
							this.firstLeft()
						})
				}
			},
			firstLeft() {

				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/date/" + this.isActive + "/workgroups?token=" + toKen + "&page=" + this
						.newpark + "&row=8")
					.then(res => {
						if (res.status == 200) {
							console.log(res)
							this.stationList = res.data.workgroups
							this.isActive1 = res.data.workgroups[0].id
							this.from = res.data.workgroups[0].from
							this.to = res.data.workgroups[0].to
							this.total = res.data.total
							this.yuangongList()
						}
					})
			},
			chooseBowei(id) {
				console.log(id)
				this.stationID = id
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/station/" + this.stationID + "/workgroup/" + this.isActive1 + "/parks?token=" +
						toKen + "&page=" + this.boweinewpark + "&row=28")
					.then(res => {
						if (res.status == 200) {
							console.log(res)
							this.boweiTotal = res.data.total || 0
							this.boweiList = res.data.chargers
						}
					})
			},
			//添加时间段
			addgroup() {
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.post("admin/api/workgroup", this.addForm)
					.then(res => {
						if (res.status !== 200) {
							return this.$message.error('添加失败!')
						}
						this.$message.success('添加成功!')
						this.addDialogVisible = false
						setTimeout(() => {
							this.firstLeft()
						}, 1000);
					})
			},
			qingkong() {
				this.checkList = []
			},
			checkChange(item,index) {
				const obj = {
					id: item.id,
					name: item.name
				}
				this.arr2.push(obj)
			},
			
			shanbowei(id){
				// console.log(id)
				// console.log(this.ax)
				this.guolu = []
				this.ax.forEach((item,index) => {
					if(item.id == id){
						// console.log(index)
						this.ax.splice(index,1)
					}
				})
				for(let z in this.ax){
					this.guolu.push(this.ax[z].id)
				}
				console.log(this.guolu)
			},
			xiugai(){
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.put("/admin/api/administrator/"+ this.chooseSFYID +"/workgroup/"+this.isActive1+"/schedules/"+this.isActive,{
					token:toKen,
					charger_list:this.guolu
				}).then(res=>{
					if(res.status == 200){
						this.$message.success("修改成功")
						this.shuaxin()
						this.yuangongList()
					}
				})
			},
			quxiao() {
				this.checkList = []
				console.log(this.checkList)
			},
			yuangongList() {
				let toKen = this.token.replace(/\"/g, "")
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$axios.get("/admin/api/workgroup/" + this.isActive1 + "/date/" + this.isActive +
						"/administrators?token=" + toKen + "&page=" + this
						.pagenum + "&row=25")
					.then(res => {
						console.log(res)
						if (res.data.error == 0) {
							if(res.data.admins){
								this.adminList = res.data.admins
								this.yuangongTotal = res.data.total
								this.adminList.forEach((item,index) => {
									if (!item.schedules) {
										return
									}
									const schedules = item.schedules
									let count = 0
									schedules.forEach(item => {
										if (!item.charger_list) {
											return
										}
										const length = item.charger_list.length
										count += length
									})
									this.adminList[index].num = count
								})
								loading.close()
							}else{
								loading.close()
								this.$message.error("暂无数据")
							}				
						}
					})
			},
			singleID(arr) {
				let toKen = this.token.replace(/\"/g, "")
				let a = 0
				for (let i = 0; i < arr.length; i++) {
					arr[i].num = 0
					this.$axios.get("admin/api/administrator/" + arr[i].id + "/workgroup/" + this.isActive1 +
							"/schedules/" + this.isActive + "?token=" + toKen + "&attach=charger")
						.then(res => {
							if (res.data.admin_schedules) {
								for (let g = 0; g < res.data.admin_schedules.length; g++) {
									if (res.data.admin_schedules[g].charger_list.length != 0) {
										arr[i].num += res.data.admin_schedules[g].charger_list.length
									}
								}
							}
						})
				}
				this.tongxue = arr
			},
			addpark() {
				this.roadDialogVisible = true
				this.checkList = []
				this.arr2 = []
				this.fristBowei()
				this.fristRoad()
			},
			chooseID(id, fullname) {
				console.log(id, fullname)
				this.chooseSFYID = id
				this.chooseSFYName = fullname
				this.boweiDialogVisible = true
				this.ax = []
				this.newarr = []
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/administrator/" + id + "/workgroup/" + this.isActive1 + "/schedules/" + this
						.isActive + "?token=" + toKen + "&attach=charger")
					.then(res => {
						console.log(res)
						if (res.status == 200) {
							for (var b in res.data.admin_schedules) {
								this.newarr.push(res.data.admin_schedules[b].charger_list)
							}
							console.log(this.newarr)
							var xin = []
							var c = xin.concat(...this.newarr)
							this.ax = Array.from(new Set(c))
							console.log(this.ax)
							if (res.data.admin_schedules) {
								this.flag = false
								console.log(this.flag)
							} else {
								this.flag = true
								console.log(this.flag)
							}
						}
					})
			},
			shuaxin() {
				this.ax = []
				this.newarr = []
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("admin/api/administrator/" + this.chooseSFYID + "/workgroup/" + this.isActive1 +
						"/schedules/" + this
						.isActive + "?token=" + toKen + "&attach=charger")
					.then(res => {
						console.log(res)
						if (res.status == 200) {
							for (var b in res.data.admin_schedules) {
								this.newarr.push(res.data.admin_schedules[b].charger_list)
							}
							console.log(this.newarr)
							var xin = []
							var c = xin.concat(...this.newarr)
							this.ax = Array.from(new Set(c))
							console.log(this.ax)
							if (res.data.admin_schedules) {
								this.flag = false
								console.log(this.flag)
							} else {
								this.flag = true
								console.log(this.flag)
							}
						}
					})
			},
			goback(){
				this.roadDialogVisible= false
				this.checkList = []
				this.arr2 = []
			},
			unique(arr) {
			  const res = new Map();
			  return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
			},
			addBowei() {
				this.flag = false
				this.guolu = []
				this.roadDialogVisible= false
				
				const arr3 = [...this.ax,...this.arr2]
				const arr4 = this.unique(arr3)
				this.ax = arr4
				for(let z in this.ax){
					this.guolu.push(this.ax[z].id)
				}
			},
			parksNumber(parknum) {
				this.newpark = parknum
				this.firstLeft()
			},
			//监听页码值改变
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage
				this.yuangongList()
			},

			roadNum(newPage) {
				this.newparkRoad = newPage
				this.fristRoad()
			},
			boweiNum(newPage) {
				this.boweinewpark = newPage
				this.fristBowei()
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

	.bluesearch {
		width: 30px;
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #0000FF;
		cursor: pointer;
	}

	.roadName {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border-bottom: solid 1px gainsboro;
		cursor: pointer;
	}

	.roadBox {
		width: 100%;
		height: 300px;
	}

	.shurukuang {
		width: 90%;
		margin: 0 auto;
		height: 30px;
		border-radius: 10px;
		border: solid 1px #0000FF;
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	.boweiNum {
		font-size: 20px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 100%;
		line-height:20px;
	}

	.closeBox {
		margin: 0 auto;
		width: 90%;
		text-align: right;
		font-size: 16px;
	}

	.bowei {
		width: 120px;
		height: 50px;
		border: solid 2px black;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		margin: 10px 20px;
	}

	.bowei1 {
		width: 88px;
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 10px 20px;
	}

	.bowei1>>>.el-checkbox__label {
		font-size: 22px !important;
	}

	.bowei1>>>.el-checkbox__inner {
		width: 18px !important;
		height: 18px !important;
	}

	.botBox {
		width: 90%;
		margin: 0 auto;
		margin-bottom: 20px;
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.plateBox {
		display: flex;
		flex-direction: column;
		height: 440px;
		justify-content: space-between;
	}

	.boweiBox {
		width: 95%;
		height: 350px;
		overflow: auto;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.boweiBox1 {
		width: 95%;
		height: auto;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.addBut {
		width: 130px;
		height: 40px;
		border-radius: 20px;
		background-color: #3a78f6;
		line-height: 40px;
		font-size: 20px;
		color: white;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.bowei1>>>.el-checkbox__label {
		width: 90px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.chooseBoweiBg {
		background-color: #d2e1ff;
	}

	.addBut1 {
		width: 130px;
		height: 40px;
		border-radius: 20px;
		background-color: white;
		border: solid 1px #3a78f6;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
		color: #3a78f6;
		cursor: pointer;
	}

	.notPlate {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 400px;
		align-items: center;
		justify-content: space-around;
	}

	.imgbox {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 18px;
		font-weight: 600;
	}

	.imgBword {
		width: 90%;
		margin: 0px auto;
		height: 230px;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;
	}

	.addBoxLTop {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		border-bottom: solid 1px gainsboro;
	}

	.addBoxLBot {
		width: 90%;
		height: 400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

	}

	.addBoxL {
		width: 35%;
		height: 500px;
		display: flex;
		flex-direction: column;
		border: solid 1px gainsboro;
		border-radius: 10px;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
	}

	.addBoxR {
		width: 60%;
		height: 500px;
		display: flex;
		flex-direction: column;
		border: solid 1px gainsboro;
		border-radius: 10px;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
	}

	.addBox {
		width: 100%;
		height: 500px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.road-bottom-left1 {
		width: 20%;
		font-size: 12px !important;
	}

	.addinput {
		border: solid #1C6FF9 1px;
		border-radius: 10px;
	}

	.PRBbox {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 10px;
		margin-left: 5px;
		height: 660px;
	}

	.grayBox {
		width: 200px;
		height: 100px;
		background-color: #eeeeee;
		border-radius: 10px;
		margin: 15px 25px;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.dateBox {
		width: 180px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 20px;
		cursor: pointer;
		box-sizing: border-box;
	}

	.paibanRight {
		width: 1260px;
		height: 800px;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
		border-radius: 10px;
	}

	.PRTbox {
		width: 100%;
		height: 80px;
		display: flex;
		flex-direction: row;
	}

	.PLCbox {
		height: 650px;
	}

	.timeWord {
		font-size: 16px;
		width: 134px;
	}

	.checkSize {
		width: 20px;
		height: 20px;
	}

	.banW {
		font-size: 16px;
		width: 80px;
	}

	.road-bottom-right {
		width: 60%;
		text-align: right;
	}

	.road-bottom-right2 {
		width: 100%;
		text-align: center;
	}

	.road-bottom-right1 {
		width: 100%;
		text-align: center;
	}

	.timeBox {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 78px;
		align-items: center;
		justify-content: space-around;
		cursor: pointer;
	}

	.PLCbox>>>.el-table__header-wrapper {
		height: 0px;
	}

	.butB {}

	.paibanLeft {
		width: 300px;
		height: 800px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
	}

	.PLTbox {
		width: 100%;
		height: 65px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		border-bottom: solid 1px gainsboro;
	}

	.Gword {
		font-size: 16px;
		color: #7d7d7d;
	}

	.gBot {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.inpBoxBot {
		margin-top: 20px;
	}

	.inpConBox {
		width: 100%;
		height: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: solid 1px gainsboro;
	}


	.gBox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 55%;
		align-items: center;

	}

	.el-table td {
		padding: 0 0;
	}

	.smollBox {
		width: 190px;
		height: 85px;
		background-color: #e5e5e5;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 10px 15px 5px 16px;
	}

	.blueBot {
		width: 10%;
		height: 40px;
		background-color: #1e69fe;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.inpBoxCon {
		height: 520px;
		width: 100%;
	}

	.inpBox {
		width: 100%;
		height: 80px;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.inp {
		width: 90%;
		height: 40px;
		margin: 0 auto;
		border-radius: 10px;
		border: solid 2px #1e69fe;
		display: flex;
		flex-direction: row;
	}

	.paiInp {
		width: 80%;
		height: 90%;
		border: none;
	}

	.el-input__inner {
		height: 30px;
		border: none;
	}

	.paibanBotL {
		width: 30%;
		height: 100%;
		box-shadow: 0px 0px 16px 0px rgba(107, 130, 153, 0.15);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.paibanBotR {
		width: 68%;
		height: 100%;
		box-shadow: 0px 0px 16px 0px rgba(107, 130, 153, 0.15);
		border-radius: 10px;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
	}

	.week {
		width: 14.2%;
		height: 100px;
		background-color: white;
		line-height: 100px;
		text-align: center;
		font-size: 22px;
		color: #707070;
		box-sizing: border-box;
	}

	.BGactive {
		background-color: #bed3ff;
		border-bottom: solid 5px #1e69fe;
	}

	.BGactive1 {
		background-color: #bed3ff;
	}


	.paibanBox {
		width: 95%;
		height: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.paibanTop {
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-radius: 5px;
		box-shadow: 0px 0px 16px 0px rgba(107, 130, 153, 0.15);
		overflow: hidden;
		cursor: pointer;
	}

	.paibanBot {
		width: 100%;
		height: 680px;
		box-shadow: 0px 0px 16px 0px rgba(107, 130, 153, 0.15);
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
		height: 37px;
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
		margin-left: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.sel {
		width: 150px;
		height: 40px;
		border: solid 1px #1e69fe;
		border-radius: 10px;
	}
	
	.sel1 {
		width: 220px;
		height: 40px;
		border: solid 1px #1e69fe;
		border-radius: 10px;
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
		align-items: center;
		justify-content: space-between;
		margin: 0 auto !important;
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
