<template>
	<div class="oneCard-right" id="container">
		<div class="UserAssets-right-top">
			<div class="user-left">
				<span class="user-word">汽车充电全景图</span>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="mapConbox">
			<div class="input_right">
				<img src="../../assets/images/search.png" class="sear-img" />
				<!-- <input type="text" class="mapInput" placeholder="查找关键词" v-model="biaoji" @keyup.enter.native="searchcharger"> -->
				<el-input placeholder="请输入关键字" class="mapInput" v-model="biaoji" clearable @keyup.enter.native="searchcharger"></el-input>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="60%">
			<div class="danchuBox">
				<div class="danchuTitle">
					<div style="display: flex;flex-direction: row;">
						<div class="navList" v-for="item in navList" :class="{ BGactive:item.id == isActive }" @click="changeBg(item.id)">{{item.name}}</div>
					</div>
					<div>
						<img src="../../assets/images/NoSignalX.png" style="width: 41px;height: 31px;" v-show="online == false">
						<img src="../../assets/images/Full signal.png" v-show="online == true&&signal>75">
						<img src="../../assets/images/signal3.png" v-show="online == true&&signal<75&&signal>50">
						<img src="../../assets/images/signal2.png" v-show="online == true&&signal<50&&signal>20">
						<img src="../../assets/images/signal1.png" v-show="online == true&&signal<25&&signal>0">
						<img src="../../assets/images/TemporarilyNoData.png" style="width: 41px;height: 31px;" v-show="online == true&&!signal">
					</div>
				</div>
				<div style="width: 100%;display: flex;flex-direction: row;height: 100%;justify-content: space-between;" v-show="this.isshow == 1">
					<div class="conLeft">
						<div class="leftInp">
							<div>名称</div>
							<input type="text" class="inpt" disabled v-model="c_name">
						</div>
						<div class="leftInp">
							<div>类型</div>
							<input type="text" class="inpt" disabled v-model="c_type">
						</div>
						<div class="leftInp">
							<div>机号</div>
							<input type="text" class="inpt" disabled v-model="c_mac">
						</div>
						<div class="leftInp">
							<div>端口号</div>
							<input type="text" class="inpt" disabled v-model="c_gun">
						</div>
						<div class="leftInp">
							<div>站点</div>
							<input type="text" class="inpt" disabled v-model="c_station">
						</div>
						<div class="leftInp">
							<div>地址</div>
							<input type="text" class="inpt" disabled v-model="c_address">
						</div>
					</div>
					<div class="conRight">
						<div class="conBot">
							<div class="offline">{{this.instate}}</div>
							<div class="reOn" :class="{gColor:online == false}" @click="reOn()">重启设备</div>
						</div>
						<div class="ani">
							<img src="../../assets/images/zhi.png" alt="">
						</div>
						<div class="jingwei">
							经纬度&nbsp;&nbsp; ( {{lng}} , {{lat}} )&nbsp;&nbsp;&nbsp;
							<img src="../../assets/images/compileg.png" @click="showEditDialog">
						</div>
					</div>
				</div>
				<div style="width: 100%;display: flex;flex-direction: row;height: 100%;" v-show="this.isshow == 2">
					<div class="tanchuCon">
						<div class="chongdianBox" v-for="(item,index) in this.duan" :class="{ blue:index == choose }" @click="chooseDuan(index,item.state)">
							<div>{{index+1}}</div>
							<div v-if="item.state !== 0">充电中</div>
							<div v-if="item.state == 0">空闲</div>
							<img src="../../assets/images/smallIntng.png">
						</div>
					</div>
					<div class="tanchuCon1">
						<div style="width: 60%;height: 100%; display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
							<div v-show="shua == 0">
								<img src="../../assets/images/free.png">
							</div>
							<div v-show="shua !== 0" class="chongING">
								<img src="../../assets/images/Inthecharging.png">
								<div>充电中...</div>
							</div>
							<div class="kongxian" v-show="shua == 0">设备空闲中...</div>
							<div style="width:90%;display: flex;flex-direction: row;align-items: center; height: 80px;box-shadow: 1px 1px 20px 10px #edf1f5;align-items: center;justify-content: space-around;"
							 v-show="shua !== 0">
								<div style="font-size: 18px;text-align: center;">
									<div>{{this.v}}V</div>
									<div>电压</div>
								</div>
								<div style="font-size: 18px;text-align: center;">
									<div>{{this.i}}A</div>
									<div>电流</div>
								</div>
								<div style="font-size: 18px;text-align: center;">
									<div>{{this.p}}W</div>
									<div>功率</div>
								</div>
							</div>
							<!-- <div class="kongxian" v-show="ifchongdian !== 0">设备充电中...</div> -->
							<div class="qidong" @click="qidong" v-show="shua == 0">启动充电</div>
							<div class="qidong" @click="shop" v-show="shua !== 0">停止充电</div>
						</div>
						<div class="zhangdan" v-show="shua !== 0">
							<div class="zhanTitle">订单号：{{dealno}}</div>
							<div class="zhanCon">
								<div class="zhanBox">
									<div>开始时间:</div>
									<div>{{startTime}}</div>
								</div>
								<div class="zhanBox">
									<div>充电方式:</div>
									<div v-if="charge_type == 3">按时间</div>
								</div>
								<div class="zhanBox">
									<div>充电金额:</div>
									<div>{{amount}}</div>
								</div>

							</div>
							<img src="../../assets/images/picture.png">
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="修改设备经纬度" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
			<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="editForm.longitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="editForm.latitude" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editChargerInfo">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog :title="getName" :visible.sync="chongdian" width="30%">
			<div class="timeBox">
				<div class="chongTime">
					<div class="leftInp1">
						<div>端口号</div>
						<input type="text" class="inpt1" disabled v-model="gunNum">
					</div>
					<div class="leftInp1">
						<div>启动方式</div>
						<select disabled="disabled" style="width: 285px;height: 30px;">
							<option>按时长</option>
						</select>
					</div>
					<div class="leftInp1">
						<div>时间/分</div>
						<input type="text" class="inpt1" v-model="inpTime">
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="chongdian = false">取 消</el-button>
				<el-button type="primary" @click="chongdian = false,sure()">确 定</el-button>
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
				chargers: [],
				isActive: 1,
				choose: 0,
				biaoji:'',
				dealno: '',
				lnglat: '',
				online:'',
				v:'',
				signal:'',
				p:'',
				inpTime:10,
				dialogVisible: false,
				dialogVisible1: false,
				chongdian: false,
				lng: '', //经度
				lat: '', //纬度
				editDialogVisible: false, //控制修改设备对话框显示隐藏
				getID: '', //点击坐标点获取到的id
				getName: '',
				startTime:'',
				isshow: 1,
				editForm: {},
				instate: '',
				editFormRules: {
					longitude: [{
						required: true,
						message: '请输入正确的信息',
						trigger: 'blur'
					}, {
						min: 1,
						message: '输入内容不能为空',
						trigger: 'blur'
					}],
					latitude: [{
						required: true,
						message: '请输入正确的信息',
						trigger: 'blur'
					}, {
						min: 1,
						message: '输入内容不能为空',
						trigger: 'blur'
					}]
				},
				c_name: '',
				c_address: '',
				c_gun: '',
				gunNum: 1,
				jingdu: '',
				shua: 0,
				out: 0,
				i:'',
				weidu: '',
				mapShow: true,
				state: '',
				c_mac: '',
				amount: '',
				c_station: '',
				c_type: '',
				ifchongdian: '',
				charge_type:'',
				duan: '',
				token: localStorage.getItem('token').replace(/\"/g, ""),
				navList: [{
						name: '基本信息',
						id: 1
					},
					{
						name: '充电状态',
						id: 2
					}
				]
			}
		},
		mounted() {
			this.biaoji = sessionStorage.getItem('shuru')
			console.log(this.biaoji)
			if(this.biaoji == null){
				this.biaoji = ''
			}
			this.getMap()
		},
		created() {

		},
		methods: {
			changeBg(id) {
				this.isActive = id
				this.isshow = id
				setInterval(() => {
					if (this.dialogVisible) {
						this.getcharger()
						setTimeout(() => {
							this.getNum()
						}, 500);
					}
				}, 3000);
			},
			sure() {
				this.$axios.post("admin/api/charger/" + this.getID + "/" + this.gunNum + "/session", {
						token: this.token,
						type: 3,
						duration: this.inpTime
					}) //根据id点击修改的id查询设备信息
					.then(res => {
						// setInterval(() => {
						// 	this.getcharger()
						// 	this.getNum()
						// }, 3000);
						console.log(res)
					})
			},
			getNum() {
				this.shua = this.duan[this.gunNum - 1].state
				console.log(this.shua)
				this.dealno = this.duan[this.gunNum - 1].dealno
				this.i = (this.duan[this.gunNum - 1].i).toFixed(2)
				this.v = (this.duan[this.gunNum - 1].v).toFixed(2)
				this.p = (this.duan[this.gunNum - 1].p).toFixed(2)
				this.startTime = this.duan[this.gunNum - 1].start_time
				this.amount = (this.duan[this.gunNum - 1].amount).toFixed(2)
				this.charge_type = this.duan[this.gunNum - 1].charge_type
			},
			shop() {
				if(confirm("确认停止充电吗？")){
					this.$axios.delete("admin/api/charger/" + this.getID + "/" + this.gunNum + "/session?token=" + this.token) //根据id点击修改的id查询设备信息
						.then(res => {
							// this.daojishi(this.out)
							console.log(res)
							setTimeout(() => {
								this.getcharger()
							}, 2000);
						})
				}
			},
			// daojishi(jishi) {
			// 	let t = jishi * 60000
			// 	console.log(t)
			// 	setTimeout(() => {
			// 		setTimeout(() => {
			// 			this.getcharger()
			// 			this.ifchongdian = 0
			// 		}, 6000);
			// 	}, t);
			// },
			qidong() {
				this.chongdian = true
			},
			chooseDuan(index, state) {

				this.choose = index
				console.log(this.choose, index)
				this.gunNum = index + 1
				this.shua = state
				this.getNum()
			},
			cleanMap() {
				location.reload();
			},
			showEditDialog() {
				this.editDialogVisible = true
				// console.log(toKen)
				this.$axios.get("admin/api/charger/" + this.getID + "?token=" + this.token + "&attach=state") //根据id点击修改的id查询设备信息
					.then(res => {
						//console.log(res.status)
						if (res.status == 200) {
							this.editForm = res.data.charger
							console.log(res.data.charger)
						}
					})
			},
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
			},
			//提交修改后的设备信息
			editChargerInfo() {
				let toKen = this.token.replace(/\"/g, "")
				this.$refs.editFormRef.validate(valid => {
					if (!valid) {
						return this.$message.error("请输入正确的信息")
					} else {
						if (confirm("确认修改吗?")) {
							this.$axios.put("/admin/api/charger/" + this.editForm.id, {
									token: toKen,
									longitude: this.editForm.longitude,
									latitude: this.editForm.latitude,
								})
								.then(res => {
									if (res.status !== 200) {
										return this.$message.error('设备修改失败!')
									}
									this.$message.success('设备修改成功!')
									this.addDialogVisible = false
									//刷新设备列表
									setTimeout(() => {
										this.cleanMap()
									}, 500);
									//关闭对话框
									this.editDialogVisible = false
								})
						}

					} //若表单正则验证未通过，则不允许添加
				})
				//如果验证通过，则发起添加修改设备请求
			},
			reOn(){
				if(this.online == true){
					if(confirm('确定重启设备吗?')){
						this.$axios.post("admin/api/charger/"+ this.getID +"/reboot/?token=" + this.token).then(res => {
							console.log(res)
							if(res.data.error == 0){
								this.$message.success("设备重启成功")
							}else{
								this.$message.error("设备重启失败")
							}
						})
					}
				}else{
					this.$message.error("设备已离线")
				}	
			},
			getcharger() {
				this.$axios.get("/admin/api/charger/" + this.getID + "/?token=" + this.token + "&attach=state,ports").then(res => {
					console.log(res)
					this.c_name = res.data.charger.name
					this.c_mac = res.data.charger.mac
					this.c_gun = res.data.charger.gun
					this.c_station = res.data.charger.station
					this.c_address = res.data.charger.address
					this.duan = res.data.charger.ports
					this.state = res.data.charger.state
					this.online = res.data.charger.online
					this.signal = res.data.charger.state.signal
					console.log(this.signal)
					if (res.data.charger.type == 4) {
						this.c_type = '电摩慢充'
					} else {
						this.c_type = res.data.charger.type
					}
					if (res.data.charger.online == true) {
						this.instate = '设备在线'
					} else {
						this.instate = '设备离线'
					}

				})
			},
			searchcharger() {
				sessionStorage.setItem("shuru",this.biaoji)
				window.location.reload();
			},
			getMap() {
				console.log(this.biaoji)
				this.$axios.get("/map/gd/chargers/4?keyword=" + this.biaoji).then(res => {
					for (let i = 0; i < res.data.chargers.length; i++) {
						if (res.data.chargers[i].online == true) {
							res.data.chargers[i].style = 0;
						} else if(res.data.chargers[i].online == false){
							res.data.chargers[i].style = 1;
						}
					}
					this.chargers = res.data.chargers;
					var map = new AMap.Map("container", {
						zoom: 4,
						center: [102.342785, 35.312316]
					});
					var style = [];

					style[1] = {
						url: require("../../assets/images/diandancheG.png"),
						anchor: new AMap.Pixel(6, 6),
						size: new AMap.Size(35, 40)
					};
					style[0] = {
						url: require("../../assets/images/diandanche.png"),
						anchor: new AMap.Pixel(6, 6),
						size: new AMap.Size(35, 40)
					};

					// var style = [{
					// 	url: require("../../assets/images/diandanche.png"),
					// 	anchor: new AMap.Pixel(6, 6),
					// 	size: new AMap.Size(35, 40)
					// },
					// {
					// 	url: require("../../assets/images/diandancheG.png"),
					// 	anchor: new AMap.Pixel(6, 6),
					// 	size: new AMap.Size(35, 40)
					// }];

					// console.log(style);
					console.log(this.chargers);
					var mass = new AMap.MassMarks(this.chargers, {
						opacity: 0.8,
						zIndex: 111,
						cursor: "pointer",
						style: style,
					});

					var marker = new AMap.Marker({
						content: " ",
						map: map
					});

					let _this = this;
					//点击标记点，弹窗
					mass.on("click", (e) => {
						if(e.data){
							console.log(e)
							this.getID = e.data.id
							this.lnglat = e.lnglat
							this.lng = e.data.lnglat[0]
							this.lat = e.data.lnglat[1]
							console.log(e.data.style)
							this.dialogVisible = true
							this.getName = e.data.name
							this.getcharger()
						}else{
							this.$message.error('设备未找到')
							}
						}),

						mass.on("mouseover", function(e) {
							marker.setPosition(e.data.lnglat);
							marker.setLabel({
								content: e.data.name
							});
						});
					mass.setMap(map);
				});
			}
		},
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
		width: 100%;
	}

	.zhangdan {
		width: 300px;
		height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow: 1px 1px 20px 10px #edf1f5;
	}

	.zhanTitle {
		font-size: 15px;
		font-weight: 600;
		color: #000000;
		margin: 20px auto;
	}

	.chongING {
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
	}

	.inpt1 {
		width: 280px;
		height: 30px;
	}


	.chongTime {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.timeBox {
		height: 200px;
		width: 70%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.leftInp1 {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.kongxian {
		font-size: 20px;
		color: gray;
	}

	.chongdianBox {
		width: 90%;
		height: 35px;
		background-color: lightblue;
		color: white;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin: 10px auto;
		cursor: pointer;
	}

	.blue {
		background-color: dodgerblue;
	}

	.qidong {
		width: 100px;
		height: 35px;
		border-radius: 20px;
		background-color: #00AEFF;
		cursor: pointer;
		line-height: 35px;
		text-align: center;
		color: white;
		font-size: 15px;
	}

	.zhanCon {
		height: 150px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.in {
		border: none;
		width: 100px;
		background: rgba(255, 255, 255, 0);
		text-align: center;
		height: 20px;
		line-height: 20px;
	}

	.addinput {
		border: solid #1C6FF9 1px;
		border-radius: 10px;
	}

	.jingwei {
		width: 100%;
		background-color: #dde8ff;
		height: 30px;
		font-size: 18px;
		border: dashed 1px #007DDB;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.offline {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}


	.ani {
		width: 60%;
		height: 200px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.reOn {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 15px;
		background-color:#00AEFF;
		color: white;
		cursor: pointer;
	}

	.conRight {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 55%;
		height: 100%;
	}

	.leftInp {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.inpt {
		width: 275px;
		height: 30px;
	}

	.zhanBox {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		font-size: 16px;
		color: gray;
		justify-content: space-between;
		align-items: center;
	}

	.conLeft {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.conBot {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}

	.tanchuCon {
		width: 20%;
		display: flex;
		flex-direction: column;
		background-color: whitesmoke;
		height: auto;
		overflow: auto;
	}

	.tanchuCon1 {
		width: 80%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.BGactive {
		color: #0C52DE;
		border-bottom: solid 1px #0C52DE;
	}

	.navList {
		width: 100px;
		cursor: pointer;
		text-align: center;
	}

	.danchuTitle {
		margin: 30px auto;
		margin-top: -30px;
		width: 100%;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.danchuBox {
		width: 90%;
		margin: 0 auto;
		height: 400px;
		display: flex;
		flex-direction: column;
	}

	.input_right {
		width: 350px !important;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: solid 1px #0000FF;
		border-radius: 10px;
		background-color: white;
	}

	.mapInput {
		width: 300px;
		height: 30px;
		border: none;
		margin-left: 20px;
	}

	.sear-img {
		width: 15px;
		height: 15px;
		margin-left: 10px;
	}

	.mapConbox {
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		height: 35px;
		position: relative;
		z-index: 99;
	}


	.UserAssets-right-top {
		display: flex;
		flex-direction: row;
		width: 95%;
		margin: 20px auto;
		margin-top: 40px;
	}

	.user-left {
		width: 50%;
		position: relative;
		z-index: 99;
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
		position: relative;
		z-index: 99;
	}

	.user-right span {
		color: #8a9199;
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
	
	.gColor{
		background-color: grey;
	}
</style>
