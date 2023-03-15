<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">事件日志</span>
				</div>
				<div class="jiben-right">
					<myhead></myhead>
				</div>
			</div>
			<div class="myhead2">
				<div class="myhead2-left">
					<!-- <img src="../../assets/images/timgr.png" style="width: 53px;height: 53px;" /> -->
					<span class="jiben-nameWord">{{charName}}</span>
					<span class="jiben-green">(运行中)</span>
					<div class="myhead2-but-box">
						<router-link to="/motoAll">
							<div class="myhead2-but">返回上一级页面</div>
						</router-link>
					</div>
				</div>
				<div class="myhead2-right">
					<div class="myhead2-right-box">
						<el-button icon="el-icon-refresh" @click="shua">刷新</el-button>
					</div>
				</div>
			</div>
			<div class="charCon">
				<div class="tiemBox">
					<select class="se" @change="chooseLevel()" v-model="chooseId">
						<option value="全部">全部</option>
						<option value="0">宕机</option>
						<option value="1">警报</option>
						<option value="2">严重</option>
						<option value="3">错误</option>
						<option value="4">告警</option>
						<option value="5">通知</option>
						<option value="6">信息</option>
						<option value="7">调试</option>
					</select>
				</div>
				<div style="margin-left: 30px;">
					<template>
						<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyyMMdd">
							</el-date-picker>
						</div>
					</template>
				</div>
				<div style="margin-left:750px;">
					<el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
				</div>
				<!-- <div style="margin-left: 20px;">
					<el-button icon="el-icon-delete" @click="delectjb">清空</el-button>
				</div> -->
			</div>
			<div class="motoX">
				<template>
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column prop="id" label="节点ID">
						</el-table-column>
						<el-table-column prop="object" label="对象ID">
						</el-table-column>
						<el-table-column prop="port" label="端口号">
						</el-table-column>
						<el-table-column prop="time" label="时间">
							<template slot-scope="scope">
								<div>{{timestampToTime(scope.row.time)}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="code" label="设备事件">
							<template slot-scope="scope">
								<div v-if="scope.row.code == 'EVT_START'">
									启动
								</div>
								<div v-else-if="scope.row.code == 'EVT_STOP'">
									停止
								</div>
								<div v-else-if="scope.row.code == 'EVT_OFFLINE'">
									离线
								</div>
								<div v-else-if="scope.row.code == 'EVT_ONLINE'">
									上线
								</div>
								<div v-else-if="scope.row.code == 'EVT_RESTART'">
									重启
								</div>
								<div v-else-if="scope.row.code == 'EVT_OVER_LOAD'">
									过载
								</div>
								<div v-else-if="scope.row.code == 'EVT_ZOMBIE'">
									死机
								</div>
								<div v-else-if="scope.row.code == 'EVT_BUSY'">
									设备忙
								</div>
								<div v-else-if="scope.row.code == 'EVT_FREE'">
									设备闲
								</div>
								<div v-else-if="scope.row.code == 'EVT_AVALIABLE'">
									设备可用
								</div>
								<div v-else-if="scope.row.code == 'EVT_UNAVALIABLE'">
									设备不可用
								</div>
								<div v-else-if="scope.row.code == 'EVT_PARK_IN'">
									车辆驶入
								</div>
								<div v-else-if="scope.row.code == 'EVT_PARK_OUT'">
									车辆驶离
								</div>
								<div v-else-if="scope.row.code == 'EVT_PDR_FINISHED'">
									订单完成
								</div>
								<div v-else-if="scope.row.code == 'EVT_PDR_DEBT'">
									欠费
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="level" label="事件等级">
							<template slot-scope="scope">
								<div class="gaojing" v-if="scope.row.level == 0">
									<img src="../../assets/images/outage.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#4c0001;font-size: 14px;">宕机</span>
								</div>
								<div class="gaojing" v-if="scope.row.level == 1">
									<img src="../../assets/images/warning.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#960708;font-size: 14px;">警告</span>
								</div>
								<div class="gaojing" v-if="scope.row.level == 2">
									<img src="../../assets/images/serious.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#d23e3f;font-size: 14px;">严重</span>
								</div>
								<div class="gaojing" v-if="scope.row.level == 3">
									<img src="../../assets/images/error.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#f77a7b;font-size: 14px;">错误</span>
								</div>
								<div class="gaojing" v-if="scope.row.level == 4">
									<img src="../../assets/images/alarm.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#f0a8a9;font-size: 14px;">告警</span>
								</div>
								<div class="gaojing" v-else-if="scope.row.level == 5">
									<img src="../../assets/images/notice.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#0054ff;font-size: 15px;">通知</span>
								</div>
								<div class="gaojing" v-if="scope.row.level == 6">
									<img src="../../assets/images/information.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#4f89ff;font-size: 14px;">信息</span>
								</div>
								<div class="gaojing" v-if="scope.row.level == 7">
									<img src="../../assets/images/debugging.png" alt="" style="width: 25px;height: 20px;">
									<span style="color:#83acff;font-size: 14px;">调试</span>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</template>
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
				charName: '',
				token: '',
				value1: '',
				tableData: [],
				total: 0,
				pagenum: 1,
				pagesize: 10,
				charMac: '',
				chooseId:'全部',
				codeList:[{
					code:'EVT_ONLINE',
					name:'上线'
				}],
				istype:3,
			}
		},
		created() {
			this.token = localStorage.getItem("token");
			this.charName = localStorage.getItem("charName");
			this.charId = localStorage.getItem("charId");
			this.charMac = localStorage.getItem("charMac");
			console.log(this.charId, this.charName)
			let date = new Date
			let getYear = date.getFullYear()
			let getMonth = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() +
				1)
			let getDate = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
			let tiemr = getYear + '' + getMonth + getDate
			this.value1 = tiemr
		},
		mounted() {
			this.getRz()
		},
		methods: {
			search() {
				console.log(this.value1)
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("/monitor/api/class/device/object/" + this.charMac + "/events?token=" + toKen + "&page=" +
					this.pagenum + "&row=10&dt=" + this.value1).then(res => {
					console.log(res)
					if (res.data.error == 0) {
						this.tableData = res.data.events
						this.total = res.data.total
						this.istype = 1
					}
					
				})
			},
			delectjb(){
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.delete("/monitor/api/alarm/" + this.charId +"?token=" + toKen).then(res => {
					console.log(res)
				})
			},
			timestampToTime(timestamp) {
			        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
			        var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
			        var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
			        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
			        var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
			        return Y+M+D+h+m+s;
			    },
			chooseLevel(){
				let toKen = this.token.replace(/\"/g, "")
				console.log(this.chooseId)
				if(this.chooseId == '全部'){
					this.getRz()
				}else{
					this.$axios.get("/monitor/api/class/device/object/" + this.charMac + "/events/level/" + this.chooseId + "?token=" + toKen + "&page=" +
						this.pagenum + "&row=10&dt=" + this.value1).then(res => {
						console.log(res)
						if (res.data.error == 0) {
							this.tableData = res.data.events
							this.total = res.data.total
							this.istype = 2
						}
					})
				}
			},
			getRz() {
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("/monitor/api/class/device/object/" + this.charMac + "/events?token=" + toKen + "&page=" +
					this.pagenum + "&row=10&dt=" + this.value1).then(res => {
					console.log(res)
					if (res.data.error == 0) {
						this.tableData = res.data.events
						this.total = res.data.total
						this.istype = 3
					}
					
				})
			},
			shua() {
				this.$router.go(0); //刷新
			},
			back() {
				this.$router.push({
					name: 'motoAll'
				})
			},
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage
				if(this.istype == 3){
					this.getRz()
				}else if(this.istype == 2){
					this.chooseLevel()
				}else if(this.istype == 1){
					this.search()
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.jiben {
		width: 100%;
		height: 100vh;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}
	
	.gaojing{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	.charCon>>>.el-table th.is-leaf{
		text-align: center;
	}

	.charCon>>>.el-button--primary {
		border-radius: 10px;
		padding: 10px 20px;
		background-color: #1E69FE;
	}

	.motoX>>>.el-table__body-wrapper {
		height: 500px;
	}
	
	.motoX>>>.el-table td div{
		text-align: center;
	}
	
	.motoX>>>.el-table th>.cell{
		text-align: center;
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

	.se {
		border: none;
		font-size: 16px;
		color: #919191;
		width: 80%;
	}

	.tiemBox {
		width: 200px;
		height: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: solid 1px gainsboro;
		border-radius: 5px;
		justify-content: space-around;
	}

	.charCon {
		display: flex;
		flex-direction: row;
		height: 50px;
		width: 95%;
		margin: 20px auto;
	}

	.chooseTimeBox {
		width: 95%;
		margin: 20px auto;
		height: 50px;
		background-color: cadetblue;
	}

	.jiben-green {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #4ea805;
		margin-left: 10px;
	}

	.jiben-left {
		width: 50%;
	}

	.el-button--default {
		border-radius: 10px;
		padding: 10px 20px;
	}

	.jiben-right-top {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 20px auto;
		margin-top: 35px;
	}

	.myhead2 {
		display: flex;
		flex-direction: row;
		border-bottom: solid 1px gray;
		padding: 20px 0px;
	}


	.myhead2-but-box {
		width: 200px;
	}

	.myhead2-right-box {
		display: block;
		float: right;
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

	.jiben-nameWord {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 30px;
		width: 300px;
		line-height: 30px;
		text-align: center;
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

	.jiben-right-conWord {
		font-family: PingFangSC-Regular;
		font-size: 20px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
		margin-left: 15px;
	}

	.jiben-right-con {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 30px auto;
		justify-content: space-between;
		height: 1100px;
	}
</style>
