<template>
	<div class="tem-right">
		<div class="tem-right-top">
			<div class="top-left">
				<div class="top-left-word">
					实时订单
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
				shuru:'',
				start:'',
				end:'',
				value: '',
				flag:0,
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
		methods: {
			getParksMes() {
				const loading = this.$loading({
				       lock: true,
				       text: 'Loading',
				       spinner: 'el-icon-loading',
				       background: 'rgba(0, 0, 0, 0.7)'
				     });
				let toKen = this.token.replace(/\"/g, "");
				console.log(this.token)
				this.$axios
					.get(
						"/admin/api/service/13/state/4/payments/?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=16"
					)
					.then((res) => {
						console.log(res);
						this.parkList = res.data.payments;
						this.parkTotal = res.data.total;
						console.log(this.parkList)
						loading.close()
					});
			},
			getoXQ(id,dealno,state){
				localStorage.setItem("motoId",id)
				localStorage.setItem("motoDealno",dealno)
				localStorage.setItem("motoState",state)
				this.$router.push({name:'motojiben'})
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
						"&row=16&service=13&state=4&keyword=" + this.shuru +"&from=" + this.start + "&to=" + this.end
					)
					.then((res) => {
						console.log(res);
						this.parkList = res.data.payments;
						this.parkTotal = res.data.total;
						loading.close()
					});
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

	.right-con-right {
		width: 100%;
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
	
	.timeBox {
		width: 350px;
		height: 35px;
		border-radius: 10px;
		border: solid 1px #1e69fe;
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
