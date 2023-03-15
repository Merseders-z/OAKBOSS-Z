<template>
	<div class="tem-right">
		<div class="tem-right-top">
			<div class="top-left">
				<div class="top-left-word">
					历史订单
				</div>
			</div>
			<div class="users-right">
				<myhead></myhead>
			</div>
		</div>
		<div class="right-con">
			<div class="right-con-right">
				<div class="right-con-top">
					<div class="textBox input_right">
						<img src="../../assets/images/search.png" class="sear-img" />
						<el-input placeholder="请输入订单信息" clearable v-model="shuru"></el-input>
					</div>
					<div class="timeBox">
						<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
					<div class="zhandian">
						<el-button style="width: 100px" type="primary" icon="el-icon-plus" class="but but2" @click="searchMes">查询
						</el-button>
					</div>
					<!-- <div class="zhandian">
            <el-button
              style="width: 100px; height: 100%"
              icon="el-icon-plus"
              class="but"
              >添加</el-button
            >
          </div> -->
				</div>
				<template>
					<el-table :data="parkList" stripe style="width: 100%">
						<el-table-column prop="id" label="ID"></el-table-column>
						<el-table-column prop="deal_no" show-overflow-tooltip label="订单号"></el-table-column>
						<el-table-column label="状态">
							<template slot-scope="scope">
								<div>{{ staty[scope.row.state] }}</div>
							</template>
						</el-table-column>
						<el-table-column prop="paid_time" show-overflow-tooltip label="支付时间"> </el-table-column>
						<el-table-column prop="gateway" label="支付方式">
							<template slot-scope="scope">
								<div v-if="scope.row.gateway == 'cash' ">
									现金支付
								</div>
								<div v-else-if="scope.row.gateway == 'wechat' ">
									微信支付
								</div>
								<div v-else-if="scope.row.gateway == 'alipay' ">
									支付宝支付
								</div>
								<div v-else-if="scope.row.gateway == 'userpay' ">
									钱包支付
								</div>
								<div v-else-if="scope.row.gateway == 'cardpay' ">
									储值卡支付
								</div>
								<div v-else>
									其他
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="amount" label="订单金额"> </el-table-column>
						<el-table-column prop="pay" label="支付金额">
						</el-table-column>
						<el-table-column prop="refund" label="退款金额"> </el-table-column>
						<el-table-column prop="cdr" label="结束原因">
							<template slot-scope="scope">
								<div v-if="scope.row.cdr === null || scope.row.cdr.cause === 0">
									正常结束
								</div>
								<div v-else-if="scope.row.cdr.cause == 1 ">
									手动结束
								</div>
								<div v-else-if="scope.row.cdr.cause == 2 ">
									达到预设条件
								</div>
								<div v-else-if="scope.row.cdr.cause == 3 ">
									电池满s载
								</div>
								<div v-else-if="scope.row.cdr.cause == 4 ">
									余额不足
								</div>
								<div v-else-if="scope.row.cdr.cause == 5 ">
									鉴权超时
								</div>
								<div v-else-if="scope.row.cdr.cause == 6 ">
									等待超时
								</div>
								<div v-else-if="scope.row.cdr.cause == 7 ">
									远程结束
								</div>
								<div v-else-if="scope.row.cdr.cause == 8 ">
									远程结束
								</div>
								<div v-else-if="scope.row.cdr.cause == 9 ">
									远程结束
								</div>
								<div v-else-if="scope.row.cdr.cause == 10 ">
									按键结束
								</div>
								<div v-else-if="scope.row.cdr.cause == 11 ">
									到达预设金额
								</div>
								<div v-else-if="scope.row.cdr.cause == 12 ">
									到达预设电量
								</div>
								<div v-else-if="scope.row.cdr.cause == 13 ">
									到达预设时间
								</div>
								<div v-else-if="scope.row.cdr.cause == 14 ">
									到达最大金额
								</div>
								<div v-else-if="scope.row.cdr.cause == 15 ">
									设备离线
								</div>
								<div v-else-if="scope.row.cdr.cause == 16 ">
									继电器超时
								</div>
								<div v-else-if="scope.row.cdr.cause == 17 ">
									断电
								</div>
								<div v-else-if="scope.row.cdr.cause == 18 ">
									超时
								</div>
								<div v-else-if="scope.row.cdr.cause == 1000">
									系统故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 1001 ">
									即停故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 1002 ">
									进线关闭
								</div>
								<div v-else-if="scope.row.cdr.cause == 1003 ">
									进线故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 1004 ">
									防雷故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 2000 ">
									设备故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 2001 ">
									采样板离线
								</div>
								<div v-else-if="scope.row.cdr.cause == 2002 ">
									模块离线
								</div>
								<div v-else-if="scope.row.cdr.cause == 2003 ">
									电表离线
								</div>
								<div v-else-if="scope.row.cdr.cause == 2004 ">
									读卡器离线
								</div>
								<div v-else-if="scope.row.cdr.cause == 2005 ">
									采样板故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 2006 ">
									模块故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 2007 ">
									电表故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 2008 ">
									读卡器故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3000 ">
									充电口故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3001 ">
									急停故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3002 ">
									防雷故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3003 ">
									极性故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3004 ">
									插座断开
								</div>
								<div v-else-if="scope.row.cdr.cause == 3005 ">
									链路故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3006">
									继电器故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3007 ">
									短路
								</div>
								<div v-else-if="scope.row.cdr.cause == 3008 ">
									电压故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3009 ">
									缺少需求电压
								</div>
								<div v-else-if="scope.row.cdr.cause == 3010 ">
									过压
								</div>
								<div v-else-if="scope.row.cdr.cause == 3011 ">
									欠压
								</div>
								<div v-else-if="scope.row.cdr.cause == 3012 ">
									电流故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3013 ">
									缺少需求电流
								</div>
								<div v-else-if="scope.row.cdr.cause == 3014">
									电流过小
								</div>
								<div v-else-if="scope.row.cdr.cause == 3015">
									过温
								</div>
								<div v-else-if="scope.row.cdr.cause == 3016">
									内部过温
								</div>
								<div v-else-if="scope.row.cdr.cause == 3017">
									CAN通信故障
								</div>
								<div v-else-if="scope.row.cdr.cause == 3018">
									BMS重试次数过多
								</div>
								<div v-else-if="scope.row.cdr.cause == 3019">
									过流
								</div>
								<div v-else-if="scope.row.cdr.cause == 3020">
									过功率
								</div>
								<div v-else-if="scope.row.cdr.cause == 3021">
									插座离线
								</div>
								<div v-else-if="scope.row.cdr.cause == 3022">
									功率爬升故障
								</div>
								<div v-else>
									未知原因
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="dev_name" label="设备">
						</el-table-column>
						<el-table-column prop="port" label="端口">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
							<div class="operation">
								<div @click="getoXQ(scope.row.id,scope.row.deal_no,scope.row.state)">
									<el-button type="text"><img src="../../assets/images/see.png" /></el-button>
								</div>
							</div>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<div class="UserAssets-bottom aa">
					<div class="road-bottom-left" :data="parkList">
						<span>共{{ parkTotal }}条信息</span>
					</div>
					<div class="road-bottom-right">
						<el-pagination background :current-page="newpark" @current-change="parksNumber"
							:page-size="pagepark" layout="prev, pager, next" :total="parkTotal" small>
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myhead from "../../components/myhead";
	export default {
		props: ["getData"],
		components: {
			myhead
		},
		data() {
			return {
				total: 1,
				parkTotal: 0,
				token: "",
				pagenum: 1, //分页
				pagesize: 6,
				pagepark: 16,
				newpark: 1, //分页
				tableData: [],
				parkList: [],
				flag:0,
				shuru:'',
				start:'',
				end:'',
				value: '',
				staty: [
					"已支付",
					"已退款",
					"已完成",
					"退款中",
					"充电中",
					"退款失败",
					"等待开始",
					"等待结束",
					"充电完成",
				],
			};
		},
		created() {
			this.token = localStorage.getItem("token");
			this.getParksMes();
		},
		// admin/api/payments?token=d6000e35a58aa4872e800e4fe9dc34b5&page=1&row=16&keyword=333&service=13&state=2
		methods: {
			getParksMes() {
				 const loading = this.$loading({
				        lock: true,
				        text: 'Loading',
				        spinner: 'el-icon-loading',
				        background: 'rgba(0, 0, 0, 0.7)'
				      });
				let toKen = this.token.replace(/\"/g, "");
				this.$axios
					.get(
						"/admin/api/service/13/state/2/payments?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=16&attach=cdr"
					)
					.then((res) => {
						
						this.parkList = res.data.payments;
						this.parkTotal = res.data.total;
						loading.close();
					});
			},
			searchMes() {
				console.log(this.value)
				if(this.value){
					this.start = this.value[0]
					this.end = this.value[1]
				}else{
					this.start = ''
					this.end = ''
				}
				 const loading = this.$loading({
				        lock: true,
				        text: 'Loading',
				        spinner: 'el-icon-loading',
				        background: 'rgba(0, 0, 0, 0.7)'
				      });
				this.flag = 1
				let toKen = this.token.replace(/\"/g, "");
				this.$axios
					.get(
						"admin/api/payments?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=16&service=13&state=2&keyword=" + this.shuru +"&from=" + this.start + "&to=" + this.end
					)
					.then((res) => {
						console.log(res);
						this.parkList = res.data.payments;
						this.parkTotal = res.data.total;
						loading.close();
					});
			},
			getoXQ(id,dealno,state){
				localStorage.setItem("motoId",id)
				localStorage.setItem("motoDealno",dealno)
				localStorage.setItem("motoState",state)
				this.$router.push({name:'motojiben'})
			},
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage;
				this.getRoadMes();
			},
			parksNumber(parknum) {
				this.newpark = parknum;
				if(this.flag == 1){
					this.searchMes()
				}else{
					this.getParksMes();
				}
			},
		},
	};
</script>

<style scoped="scoped">
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

	.el-form>>>.el-form-item__label {
		width: 96px !important;
		text-align: center;
	}

	.right-con-right {
		width: 100%;
	}
	
	.timeBox {
		width: 350px;
		height: 35px;
		border-radius: 10px;
		border: solid 1px #1e69fe;
	}

	.input_right {
		width:400px !important;
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
		width: 900px;
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
