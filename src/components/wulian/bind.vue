<template>
	<div class="tem-right">
		<div class="tem-right-top">
			<div class="top-left">
				<div class="top-left-word">已绑定</div>
			</div>
			<!-- 设备确认 -->
			<el-dialog title="提示" :visible.sync="flag" width="30%">
				<span>确定修改或者添加？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="flag = false">取 消</el-button>
					<el-button type="primary" @click="(flag = false), (dialogVisible = false), add()">确 定</el-button>
				</span>
			</el-dialog>

			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="right-con">
			<div class="right-con-right">
				<div class="right-con-top">
					<div class="textBox input_right">
						<img src="../../assets/images/search.png" class="sear-img" />
						<el-input v-model="msgss" @keyup.enter.native="cha" class="" placeholder="请输入一码通信息" clearable>
						</el-input>
					</div>
					<div class="zhandian">
						<el-button style="width: 100px" type="primary" icon="el-icon-search" class="but but2"
							@click="cha">查询</el-button>
					</div>
					<div class="zhandian">
						<el-button style="width: 100px; height: 100%" icon="el-icon-plus" class="but"
							@click="addDialogVisible = true">生成</el-button>
					</div>
					<div class="zhandian">
						<el-button style="width: 100px; height: 100%" icon="el-icon-plus" class="but"
							@click="daochuDialogVisible = true">批量导出</el-button>
					</div>
					<div class="changeList">
						<div @click="falgs" v-if="changeList == true">
							<img src="../../assets/images/changeList.png" alt="" style="width: 35px; height: 35px" />
						</div>
						<div @click="falgss" v-show="changeList == false">
							<img src="../../assets/images/changeIcon.png" alt="" style="width: 35px; height: 35px" />
						</div>
					</div>
				</div>
				<div class="tus">
					<template v-if="changeList == false">
						<el-table :data="parkList" stripe style="width: 100%">
							<el-table-column prop="id" label="ID"> </el-table-column>
							<el-table-column prop="code" label="代码"> </el-table-column>
							<el-table-column prop="batch" label="批号"> </el-table-column>
							<el-table-column prop="station" label="站点ID"> </el-table-column>
							<el-table-column prop="charger" label="设备 ID">
							</el-table-column>
							<el-table-column prop="gun" label="端口"> </el-table-column>
							<el-table-column prop="update_time" label="创建日期">
								<template slot-scope="scope">
									<div>{{timeFormat(scope.row.update_time)}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="state" label="状态">
								<template slot-scope="scope">
									<div style="text-align: center;" v-if="scope.row.state == 0">未绑定</div>
									<div style="text-align: center;" v-if="scope.row.state == 1">绑定设备</div>
									<div style="text-align: center;" v-if="scope.row.state == 2">绑定端口</div>
									<div style="text-align: center;" v-if="scope.row.state == 3">绑定站点</div>
								</template>
							</el-table-column>
							<el-table-column prop="address" label="操作" width="200">
								<template slot-scope="scope">
									<div class="operation">
										<div style="width: 100px;text-align: center;">
											<el-button type="text"><img @click="removeUserByID(scope.row.id)"
													src="../../assets/images/delete.png" /></el-button>
										</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<div v-else class="quans">
						<div class="moshi" v-for="item in qrlist" :key="item.id">
							<div class="moshiss">{{ item.id }}</div>
							<div class="one">
								<div class="qrBox">
									<img :src="item.qrimg">
								</div>
							</div>
							<div class="tow">
								<div class="tows">{{ item.dev_name || '未绑定'}}</div>
								<img src="../../assets/images/QRexport@.png" style="width: 18px;height: 18px;cursor: pointer;" title="导出" @click="xiazai(item.id)"/>
								
								<img src="../../assets/images/shanchu.png" style="width: 15px;height:20px;cursor: pointer;" title="删除" @click="removeUserByID(item.id)"/>
							</div>
						</div>
					</div>
				</div>
				<div class="UserAssets-bottom aa" v-if="changeList == false">
					<div class="road-bottom-left" :data="parkList">
						<span>共{{ parkTotal }}条信息</span>
					</div>
					<div class="road-bottom-right">
						<el-pagination background :current-page="newpark" @current-change="parksNumber"
							:page-size="pagepark" layout="prev, pager, next" :total="parkTotal">
						</el-pagination>
					</div>
				</div>
				<div class="UserAssets-bottom aa" v-else>
					<div class="road-bottom-left" :data="parkList">
						<span style="font-size: 18px;">共{{ parkTotal }}条信息</span>
					</div>
					<div class="road-bottom-right">
						<el-pagination background :current-page="newparks" @current-change="parksNumbers"
							:page-size="pagepark" layout="prev, pager, next" :total="parkTotal">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="添加二维码" :visible.sync="addDialogVisible" width="35%" @close="addDialogClosed">
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
				<el-form-item label="长度(6-12)" prop="length">
					<el-input v-model="addForm.length" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="数量(1-500)" prop="count">
					<el-input v-model="addForm.count" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="chargersUser">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 导出弹出框 -->
		<el-dialog title="批量导出" :visible.sync="daochuDialogVisible" width="35%">
			<el-form label-width="80px">
				<el-form-item label="批号" prop="batch">
					<el-input v-model="batch" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="daochuDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="piliangdanchu">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="绑定二维码" :visible.sync="bangDialogVisible" width="50%">
			<div class="qrhezi">
				<div class="qrLeft">
					<div style="width: 100%;font-size: 16px;text-align: center;height: 30px;line-height: 30px;">{{qrcodeW}}</div>
					<div style="width: 250px;height: 200px;background-color: #0000FF;margin: 0 auto;">
						<img :src="chooseQR" style="width: 250px;height: 200px;">
					</div>
					<div style="width: 100%;height: 30px;text-align: center;font-size: 18px;line-height: 30px;margin-top: 15px;">请选择要绑定的类型:</div>
					<div class="typeBox">
						<div class="typeBut" :class="{blueBg:ischoose == item.id}" @click="chooseType(item.id)" v-for="item in typeList">{{item.name}}</div>
					</div>
				</div>
				<div class="qrRight">
					<div class="qrRightTop">
						<div class="qrtopBox">
							<div class="shurukuang">
								<input type="text" style="width: 87%;" v-model="shuru" placeholder="查找站点设备信息">
								<div class="bluesearch" @click="getStation">
									<img src="../../assets/images/roadsearch(1).png" style="width: 15px;height: 15px;">
								</div>
							</div>
							<div class="selBox">
								<el-select v-model="gun" placeholder="请选择端口" @change="dada" class="sel" v-show="ischoose == 3">
									<el-option v-for="item in ports" :key="item.port" :label="item.port" :value="item.port">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="qrconBox">
							<div class="qrcon">
								<div class="bowei1" v-for="item in stationList">
									<el-radio v-model="checkList" @change="stationID" :label="item.id">{{item.name}}</el-radio>
								</div>
							</div>
							<div class="UserAssets-bottom">
								<div class="road-bottom-left" :data="stationList">
									<span style="font-size: 16px;">共{{stationTotal}}条信息</span>
								</div>
								<div class="road-bottom-right">
									<el-pagination background :current-page.sync.number="yemashu"
										@current-change="handleCurrentChange1" :page-size="fenyeshu" layout="prev, pager, next"
										:total="stationTotal" small>
									</el-pagination>
								</div>
							</div>
						</div>
						<div class="qrbotBox">
							<div class="queren" @click="bangding">
								<img src="../../assets/images/SURE.png" style="width: 20px;height:20px;margin-right: 15px;">
								确认
							</div>
							<div class="quxiao" @click="checkList = ''">
								<img src="../../assets/images/QRcancel.png" style="width: 20px;height: 20px;margin-right: 15px;">
								取消
							</div>
						</div>
					</div>
				</div>
			</div>	
<!-- 			<el-button @click="bangDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="bangding">确 定</el-button> -->		
		</el-dialog>
	</div>
</template>

<script>
	import myhead from "../../components/myhead";
	import vueQr from 'vue-qr';
	import {
		loginConfig
	} from "../../config.js";
	export default {
		props: ["getData"],
		components: {
			myhead,
			vueQr
		},
		data() {
			return {
				msgss: "",
				qrcodeW:'',
				checkList:'',
				yemashu:1,
				fenyeshu:21,
				stationList:[],
				stationTotal:0,
				shuru:'',
				gun:'',
				total: 1,
				typeList:[{
					name:'站点',
					id:1
				},
				{
					name:'设备',
					id:2
				},
				{
					name:'端口',
					id:3
				}],
				qrimg:'',
				ischoose:1,
				chooseQR:'',
				options: [{
						label: '端口1',
						value: 1,
					},
					{
						label: '端口2',
						value: 2,
					},
					{
						label: '端口3',
						value: 3,
					},
					{
						label: '端口4',
						value: 4,
					},
					{
						label: '端口5',
						value: 5,
					}
				],
				batch:'',
				ports:[],
				name: "qecode",
				addDialogVisible: false,
				bangDialogVisible:false,
				parkTotal: 0,
				token: "",
				pagenum: 1, //分页
				pagesize: 6,
				qrlist:[],
				pagepark: 16,
				newpark: 1, //分页
				daochuDialogVisible:false,
				newparks: 1,
				bang:{
					token: localStorage.getItem('token').replace(/\"/g, ""),
					station:'',
					charger:'',
					gun:''
				},
				addForm: {
					token: localStorage.getItem('token').replace(/\"/g, ""),
					length: '',
					count: '',
				}, //添加设备添加数据
				tableData: [],
				addFormRules: {
					length: [{
						required: true,
						message: '请输入信息',
						trigger: 'blur'
					}, {
						min: 1,
						message: '请输入正确的信息',
						trigger: 'blur'
					}],
					count: [{
						required: true,
						message: '请输入信息',
						trigger: 'blur'
					}, {
						min: 1,
						message: '请输入正确的信息',
						trigger: 'blur'
					}]
				},
				parkList: [],
				dialogVisible: false,
				flag: false,
				bangStation:'',
				qrcodeURL:'',
				a: "",
				b: "",
				c: "",
				d: "",
				name: "",
				lest_id: "",
				changeList: true,
			};
		},
		created() {
			this.qrcodeURL = loginConfig.qrcodeURL
			this.token = localStorage.getItem("token");
			if (this.changeList == false) {
				this.getParksMesList()
			} else if (this.changeList == true) {
				this.getParksMesTu()
			}
			this.getStation()
		},

		methods: {
			falgs() {
				this.changeList = !this.changeList;
				this.getParksMesList();

			},
			dada(){
				console.log(this.gun)
			},
			falgss() {
				this.changeList = !this.changeList;
				this.getParksMesTu();
			},
			stationID(){
				if(this.ischoose == 3){
					let toKen = this.token.replace(/\"/g, "")
					this.$axios.get("admin/api/charger/"+ this.checkList +"?token=" + toKen +"&attach=ports").then(res =>{
						console.log(res.data)
						this.ports = res.data.charger.ports
					})
				}
			},
			choose(id,code){
				this.chooseid = id
				this.qrcodeW = code
				this.chooseQR = this.qrImg(id)
				console.log(this.chooseid)
			},
			chooseType(id){
				this.ischoose = id
				this.getStation()
			},
			choosebdID(){
				console.log(1)
			},
			bangding(){
				let toKen = this.token.replace(/\"/g, "")
				if(this.ischoose == 1){
					this.$axios.put("/admin/api/qr/"+this.chooseid,{
						token:toKen,
						station:this.checkList
					}).then(res => {
							if (res.status !== 200) {
								return this.$message.error('绑定失败!')
							}
							this.$message.success('绑定成功!')
							this.bangDialogVisible = false
							this.getParksMesTu()
							console.log(res)
						})
				}else if(this.ischoose == 2){
					this.$axios.put("/admin/api/qr/"+this.chooseid,{
						token:toKen,
						charger:this.checkList,
						gun:this.gun
					}).then(res => {
							if (res.status !== 200) {
								return this.$message.error('绑定失败!')
							}
							this.$message.success('绑定成功!')
							this.bangDialogVisible = false
							this.getParksMesTu()
							console.log(res)
						})
				}else if(this.ischoose == 3){
					this.$axios.put("/admin/api/qr/"+this.chooseid,{
						token:toKen,
						charger:this.checkList,
				
					}).then(res => {
							if (res.status !== 200) {
								return this.$message.error('绑定失败!')
							}
							this.$message.success('绑定成功!')
							this.bangDialogVisible = false
							this.getParksMesTu()
							console.log(res)
						})
				}
			
			},
			piliangdanchu(){
				this.daochuDialogVisible = false
				var piliang = this.qrcodeURL +'/admin/api/qr/batch/'+ this.batch + '/file'
				window.open(piliang,'_self')
			},
			xiazai(id){
					var wangzhi = this.qrcodeURL +'/admin/api/qr/'+ id + '/file'
					window.open(wangzhi,'_self')
			},
			getStation(){
				let toKen = this.token.replace(/\"/g, "")
				if(this.ischoose == 1){
					this.$axios.get("admin/api/stations?token=" + toKen +"&page="+ this.yemashu +"&row=21&keyword="+this.shuru).then(res =>{
						this.stationList = res.data.stations
						this.stationTotal = res.data.total
					})
				}else if(this.ischoose == 2){
					this.$axios.get("admin/api/chargers?token=" + toKen +"&page="+ this.yemashu +"&row=21&keyword="+this.shuru).then(res =>{
						this.stationList = res.data.chargers
						this.stationTotal = res.data.total
					})
				}else if(this.ischoose == 3){
					this.$axios.get("admin/api/chargers?token=" + toKen +"&page="+ this.yemashu +"&row=21&keyword="+this.shuru +"&attach=ports").then(res =>{
						console.log(res)
						this.stationList = res.data.chargers
						this.stationTotal = res.data.total
						this.ports = res.data.chargers.ports
					})
				}
			},
			cha() {
				if (this.changeList == false) {
					this.getParksMesList()
				} else if (this.changeList == true) {
					this.getParksMesTu()
				}
			},
			async removeUserByID(id) {
				console.log(id);
				let toKen = this.token.replace(/\"/g, "");
				const confirmRes = await this.$confirm(
					"此操作将永久删除该信息, 是否继续?",
					"提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					}
				).catch((err) => err);
				console.log(confirmRes);
				if (confirmRes !== "confirm") {
					return this.$message.info("已取消删除");
				}
				this.$axios
					.delete("/admin/api/qr/" + id + "?token=" + toKen)
					.then((res) => {
						console.log(res);
						if (res.status == 200) {
							this.$message.success("删除信息成功");
							if (this.changeList == false) {
								this.getParksMesList()
							} else if (this.changeList == true) {
								this.getParksMesTu()
							}
							//刷新用户数据
						} else {
							this.$message.error("删除信息失败");
						}
					});
				//删除用户提示
			},
			idd(id) {
				this.name = "修改一码通";
				this.lest_id = id;
				console.log(this.lest_id);
			},
			names() {
				this.name = "添加一码通";
				this.a = "";
				this.b = "";
				this.c = "";
				this.d = "";
			},
			getParksMesList() {
				let toKen = this.token.replace(/\"/g, "");
				this.$axios
					.get(
						"/admin/api/qrs/used/1?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=12&keyword=" + this.msgss
					)
					.then((res) => {
						console.log(res);
						// console.log(res.data.users)
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.parkList = res.data.qrcodes; //用户列表数据
							this.pagepark = 12;
							this.parkTotal = res.data.total;
							//   console.log(this.parkList);
						}
					});
			},
			getParksMesTu() {
				let toKen = this.token.replace(/\"/g, "");
				this.$axios
					.get(
						"/admin/api/qrs/used/1?token=" +
						toKen +
						"&page=" +
						this.newparks +
						"&row=8&keyword="+ this.msgss
					)
					.then((res) => {
						console.log(res);
						// console.log(res.data.users)
						// console.log(res.status)//打印状态码
						if (res.status == 200) {
							this.parkList = res.data.qrcodes; //用户列表数据
							this.pagepark = 8;
							this.parkTotal = res.data.total;
							console.log(res)
							if(res.data.qrcodes){
								for(var a = 0;a<res.data.qrcodes.length;a++){
									this.parkList[a].qrimg = this.qrImg(res.data.qrcodes[a].id)
								}
								this.qrlist = this.parkList
							}else{
								this.qrlist = []
							}
						}
					});
			},
			qrImg(id){
				return this.qrimg = this.qrcodeURL +'/admin/api/qr/'+ id + '/format/jpg'
			},
			chargersUser() {
				let toKen = this.token.replace(/\"/g, "")

				this.$axios.post("admin/api/qrs", this.addForm)
					.then(res => {
						if (res.status !== 200) {
							return this.$message.error('添加失败!')
						}
						this.$message.success('添加成功!')
						this.addDialogVisible = false
						console.log(this.addForm)
						console.log(res)
						//刷新用户列表
						if (this.changeList == false) {
							this.getParksMesList()
						} else if (this.changeList == true) {
							this.getParksMesTu()
						}
					})

			},
			timeFormat(timestamp){
			    var time = new Date(timestamp*1000);
			    var year = time.getFullYear();
			    var month = time.getMonth()+1;
			    var date = time.getDate();
			    var hours = time.getHours();
			    var minutes = time.getMinutes();
			    var seconds = time.getSeconds();
			    return year + '-' + this.addZero(month) + '-' + this.addZero(date) + ' ' + this.addZero(hours) + ':' + this.addZero(minutes) + ':' + this.addZero(seconds)
			},
			addZero(num) { return num < 10 ? '0' + num : num },
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},
			handleCurrentChange1(newPage){
				this.yemashu = newPage
				this.getStation()
			},
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage;
				this.getRoadMes();
			},
			parksNumber(parknum) {
				this.newpark = parknum;
				this.getParksMesList();
			},
			parksNumbers(parknum) {
				this.newparks = parknum;
				this.getParksMesTu();
			},
		},
	};
</script>

<style scoped="scoped">
	.changeList {
		position: absolute;
		right: 53px;
		top: 115px;
	}
	
	.qrcon{
		width: 100%;
		height: 320px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.queren{
		width: 150px;
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #3A78F6;
		border-radius: 20px;
		color: white;
		font-size: 16px;
		cursor: pointer;
	}
	
	.qrbotBox{
		width: 90%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	
	.quxiao{
		width: 150px;
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: white;
		border: solid 1px #3A78F6;
		border-radius: 20px;
		color: #3A78F6;
		font-size: 16px;
		cursor: pointer;
	}
	
	.qrconBox{
		width: 90%;
		height: 380px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.el-select{
		width: 150px !important;
	}
	
	.selBox{
		width: 40%;
		height: 30px;
		border-radius: 15px;
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
	
	.shurukuang {
		width: 50%;
		margin: 0 auto;
		height: 30px;
		border-radius: 10px;
		border: solid 1px #0000FF;
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}
	
	.qrtopBox{
		width: 95%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.qrRightTop{
		width: 100%;
		height: 40px;
	}
	
	.typeBut{
		width: 90%;
		margin: 0 auto;
		height: 35px;
		background-color: #E5E5E5;
		border-radius: 15px;
		text-align: center;
		line-height: 35px;
		font-size: 16px;
		cursor: pointer;
		color: #424242;
	}
	
	.blueBg{
		background-color: #3A78F6;
		color: white;
	}
	
	.typeBox{
		margin: 20px auto;
		width: 90%;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	
	.qrLeft{
		width: 35%;
		height: 500px;
		border-radius: 15px;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
	}
	
	.qrRight{
		width: 60%;
		height: 500px;
		border-radius: 15px;
		box-shadow: 0px 0px 6px 0px rgba(50, 50, 50, 0.39);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.qrhezi{
		width: 90%;
		height: 500px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.tus {
		height: 700px;
	}

	.tow {
		display: flex;
		justify-content: center;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.quans {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		align-items: center;
		height: 100%;

	}

	.tows {
		text-align: center;
		font-size: 15px;
		font-weight: 400;
		color: #333333;
		flex: 7;
		margin-left: 60px;
	}

	.tow img {
		width: 12px;
		height: 12px;
		margin-right: 10px;
	}

	.qrBox {
		width: 215px;
		height: 215px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		box-shadow: 0px 0px 5px 2px gainsboro;
	}
	
	.bowei1 {
		width: 100px;
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 10px 20px;
		text-overflow: ellipsis; 
		overflow: hidden; 
		white-space: nowrap; 
	}

	.one img {
		width: 241px;
	}

	.moshis {
		font-size: 11px;
		font-family: PingFang SC;
		font-weight: 400;
		color: #818181;
		border-bottom: 1px dashed #bfbfbf;
	}

	.moshiss {
		font-size: 15px;
		font-family: PingFang SC;
		font-weight: 600;
		color: #857373;
		line-height: 36px;
	}

	/* .moshi::after {
  content: '';
  width:10px;
  height: 10px;
  background: red;
} */
	.moshi {
		margin: 20px 60px;
		box-shadow: 0px 1px 10px 0px rgba(9, 9, 9, 0.2);
		border-radius: 10px;
		width: 280px;
		height: 330px;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.UserAssets-bgcolor .el-button--primary {
		background: #1e69fe;
	}

	.el-select {
		border: 1px solid #1e69fe !important;
		width: 33%;
	}

	.el-table td div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tus>>>.el-table {
		overflow: visible !important;
	}

	.el-form>>>.el-form-item__label {
		width: 96px !important;
		text-align: center;
	}

	.addinput {
		border: 1px solid #1e69fe !important;
		width: 70% !important;
	}

	.right-con-right {
		width: 100%;
	}

	.input_right {
		/* margin-left: -63px; */
		width: 65% !important;
	}

	.aa {
		margin-top: 41px !important;
	}

	.zhandian .el-button {
		padding: 0px !important;
	}

	.parkName {
		height: 15%;
		margin: 4%;
	}

	.dingwei {
		display: inline-block;
		float: left;
		margin-right: 3%;
	}

	.el-table td div {
		text-align: left;
	}

	.tem-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
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

	.but {
		width: 140px;
		padding-top: -10px;
	}

	.parkIcon {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.parkIcon div {
		margin-right: 3%;
		text-align: center !important;
		background-color: #f2d0bd;
		height: 22px;
		width: 55px;
		line-height: 22px;
		border-radius: 5px;
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
		width: 30%;
		box-shadow: 10px 10px 15px #edf1f5;
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
		width: 70%;
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

	.right-con-top {
		width: 1000px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 15px;
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
