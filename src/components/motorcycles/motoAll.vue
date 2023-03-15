<template>
	<div class="tem-right">
		<div class="tem-right-top">
			<div class="top-left">
				<div class="top-left-word">
					电单车充电
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
						<el-input placeholder="请输入关键字" class="textWord" v-model="input1" clearable
							@keyup.enter.native="getInputMes"></el-input>
					</div>
					<div class="but-weizhi1">
						<el-button type="primary" icon="el-icon-search" @click="getInputMes">搜索</el-button>
					</div>
					<div class="but-weizhi2">
						<el-button type="success1" icon="el-icon-circle-plus-outline" @click="addDialogVisible1 = true">添加</el-button>
					</div>
				</div>
				<div class="leftbx">
					<template>
						<el-table :data="tableData" stripe style="width:100%">
							<el-table-column>
								<template slot-scope="scope">
									<div class="leftBox" :class="{ BGactive: scope.row.id == isActive }"
										@click="changeBg(scope.row.id)">
										<div class="parkimg">
											<img src="../../assets/images/motoIcon.png" />
										</div>
										<div class="leftBox-con" @click="getParksMes(scope.row.id), scope.row.station">
											<div class="parkName">
												{{ scope.row.name }}
											</div>
											<div class="parkAddress">
												<div v-if="scope.row.address == ''">地址未配置</div>
												<div v-else>{{ scope.row.address }}</div>
											</div>
											<div class="parkIcon">
												<div>
													<span class="parkIcon-word">充电桩</span>
												</div>
											</div>
										</div>
										<template v-if="scope.row.id == isActive">
											<div class="leftBox-right">
												<div @click="showEditDialog1(scope.row.id)">
													<img src="../../assets/images/xiu.png" title="修改" />
												</div>
												<div @click="removeUserByID1(scope.row.id)">
													<img src="../../assets/images/shan2.png" title="删除" />
												</div>
												<router-link to="/stationsmoto">
													<div
														@click="huodeid(scope.row.id,scope.row.name,scope.row.type,scope.row.memo,scope.row.lot_rate_group,scope.row.rate_group)">
														<img src="../../assets/images/lan.png" title="查看" />
													</div>
												</router-link>
											</div>
										</template>
										<template v-else>
											<div style="text-align: right;width: 20%;font-size: 30px;">
												...
											</div>
										</template>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
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
				<div class="sousuo">
					<div class="textBox-right">
						<img src="../../assets/images/search.png" class="sear-img" />
						<el-input placeholder="请输入关键字进行查找" v-model="input2" class="textWord"
							@keyup.enter.native="search"></el-input>
					</div>
					<div class="but-weizhi">
						<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
					</div>
					<div>
						<el-button type="success" icon="el-icon-circle-plus-outline" @click="addDialogVisible = true">添加
						</el-button>
					</div>
				</div>
				<div class="rightbx">
					<template>
						<el-table :data="parkList" stripe style="width:100%">
							<el-table-column show-overflow-tooltip prop="id" label="设备ID">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="name" label="名称">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="mac" label="机号">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="energy" label="电量/kwh">
							</el-table-column>
							<el-table-column show-overflow-tooltip label="端口" width="320">
								<template slot-scope="scope">
									<div class="jindu">
										<div v-if="scope.row.ports == null" class="jiduBox1">
											<div style="height: 20px;line-height:20px;">暂无端口</div>
										</div>
										<div v-else class="jiduBox" v-for="(item,index) in scope.row.ports.slice(0,5)"
											@click="gunId(scope.row.ports[index].port,scope.row.id,scope.row.online)">
											<el-progress :show-text="false" type="circle" :percentage="100" :width="40"
												status="success" v-show="scope.row.online == true&&item.state == 0">
											</el-progress>
											<el-progress :show-text="false" type="circle" :percentage="100" :width="40"
												status="exception" v-show="scope.row.online == true&&item.state !== 0">
											</el-progress>
											<el-progress :show-text="false" type="circle" :percentage="0" :width="40"
												status="exception" v-show="scope.row.online == false"></el-progress>
											<div style="height: 20px;line-height:20px;margin-top: -30px;font-size: 12px;color: black;"
												v-show="scope.row.online == true&&item.state == 0">空闲</div>
											<div style="height: 20px;line-height:20px;margin-top: -30px;font-size: 12px; color: black;"
												v-show="scope.row.online == true&&item.state !== 0">充电</div>
											<div style="height: 20px;line-height:20px;margin-top: -30px;font-size: 12px; color: black;"
												v-show="scope.row.online == false">离线</div>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column show-overflow-tooltip label="状态" width="130">
								<template slot-scope="scope">
									<div style="display: flex;flex-direction: row;width: 100%;justify-content: space-between;">
										<div v-if="scope.row.online == true">
											<div class="tipG">在线</div>
										</div>
										<div v-if="scope.row.online == false">
											<div class="tipR">离线</div>
										</div>
										<div v-if="scope.row.state">
											<div class="tipB">{{scope.row.state.t}}</div>
										</div>
										<div v-else>
											<div class="tipB">20℃</div>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="address" label="操作" width="150">
								<template slot-scope="scope">
									<div class="operation">
										<div>
											<button type="text" @click="removeUserByID(scope.row.id)" style="cursor: pointer;">
												<img src="../../assets/images/delete.png" title="删除"/>
											</button>
										</div>
										<div>
											<el-button type="text" @click="showEditDialog(scope.row.id)"><img
													src="../../assets/images/compile.png" title="修改"/></el-button>
										</div>
										<router-link to="/chargersmoto">
											<div @click="
                          huodeid(
                            scope.row.id,
                            scope.row.name,
                            scope.row.type,
                            scope.row.address,
                            scope.row.memo,
							scope.row.mac,
                            scope.row.lot_rate_group,
                            scope.row.rate_group,
                            kong
                          )
                        ">
												<img style="height:14px;width:19px" src="../../assets/images/see.png" title="详情"/>
											</div>
										</router-link>
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
		<!-- 添加设备 -->
		<el-dialog title="添加设备" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
			<el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="80px">
				<el-form-item label="设备编号" prop="dev_id">
					<el-input v-model="addForm.dev_id" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="机号" prop="mac">
					<el-input v-model="addForm.mac" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="端口数" prop="gun">
					<el-input v-model="addForm.gun" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="addForm.longitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="addForm.latitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contact_name">
					<el-input v-model="addForm.contact_name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="contact_phone">
					<el-input v-model="addForm.contact_phone" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="chargersUser">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改设备 -->
		<el-dialog title="修改设备" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
			<el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
				<el-form-item label="设备编号" prop="dev_id">
					<el-input v-model="editForm.dev_id" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input v-model="editForm.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="机号" prop="mac">
					<el-input v-model="editForm.mac" class="addinput" disabled></el-input>
				</el-form-item>
				<el-form-item label="端口数" prop="gun">
					<el-input v-model="editForm.gun" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="editForm.longitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="editForm.latitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contact_name">
					<el-input v-model="editForm.contact_name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="contact_phone">
					<el-input v-model="editForm.contact_phone" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editChargerInfo">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加设备 -->
		<el-dialog title="添加站点" :visible.sync="addDialogVisible1" width="30%" @close="addDialogClosed1">
			<el-form :model="addForm1" :rules="formRules" ref="addFormRef1" label-width="80px">
				<el-form-item label="站点名" prop="name">
					<el-input v-model="addForm1.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="addForm1.longitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="addForm1.latitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="addForm1.address" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="chargersUser1">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改设备 -->
		<el-dialog title="修改站点" :visible.sync="editDialogVisible1" width="30%" @close="editDialogClosed1">
			<el-form :model="editForm1" :rules="formRules" ref="editFormRef1" label-width="80px">
				<el-form-item label="站点名" prop="name">
					<el-input v-model="editForm1.name" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="editForm1.longitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="editForm1.latitude" class="addinput"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="editForm1.address" class="addinput"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="editChargerInfo1">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog :visible.sync="dialogVisible" width="60%">
			<div class="danchuBox">
				<div class="danchuTitle">
					<div style="display: flex;flex-direction: row;">
						<div class="navList" v-for="item in navList" :class="{ BGactive1:item.id == Isnav }"
							@click="changeNav(item.id)">{{item.name}}</div>
					</div>
					<div>
						<img src="../../assets/images/NoSignalX.png" style="width: 41px;height: 31px;"
							v-show="online == false">
						<img src="../../assets/images/Full signal.png" v-show="online == true&&signal>75">
						<img src="../../assets/images/signal3.png" v-show="online == true&&signal<75&&signal>50">
						<img src="../../assets/images/signal2.png" v-show="online == true&&signal<50&&signal>20">
						<img src="../../assets/images/signal1.png" v-show="online == true&&signal<25&&signal>0">
						<img src="../../assets/images/TemporarilyNoData.png" style="width: 41px;height: 31px;"
							v-show="online == true&&!signal">
					</div>
				</div>
				<div style="width: 100%;display: flex;flex-direction: row;height: 100%;" v-show="this.isshow == 2">
					<div class="tanchuCon">
						<div class="chongdianBox" v-for="(item,index) in this.duan" :class="{ blue:index == choose }"
							@click="chooseDuan(index,item.state)">
							<div>{{index+1}}</div>
							<div v-if="item.state !== 0">充电中</div>
							<div v-if="item.state == 0">空闲</div>
							<img src="../../assets/images/smallIntng.png">
						</div>
					</div>
					<div class="tanchuCon1">
						<div
							style="width: 60%;height: 100%; display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
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
									<div>{{v}}V</div>
									<div>电压</div>
								</div>
								<div style="font-size: 18px;text-align: center;">
									<div>{{i}}A</div>
									<div>电流</div>
								</div>
								<div style="font-size: 18px;text-align: center;">
									<div>{{p}}W</div>
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
				<div style="width: 100%;display: flex;flex-direction: row;height: 100%;justify-content: space-between;"
					v-show="this.isshow == 1">
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
							<div class="offline">{{instate}}</div>
							<div class="reOn" @click="reOn()">重启设备</div>
						</div>
						<div class="ani">
							<img src="../../assets/images/zhi.png" alt="">
						</div>
						<!-- <div class="jingwei">
							经纬度&nbsp;&nbsp; ( {{lng}} , {{lat}} )&nbsp;&nbsp;&nbsp;
							<img src="../../assets/images/compileg.png" @click="showEditDialog">
						</div> -->
					</div>
				</div>
			</div>
		</el-dialog>
		<!-- 充电弹出框 -->
		<el-dialog :title="getName" :visible.sync="chongdian" width="30%">
			<div class="timeBox">
				<div class="chongTime">
					<div class="leftInp1">
						<div>端口数</div>
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
	import myhead from "../../components/myhead.vue";
	export default {
		components: {
			myhead
		},
		data() {
			return {
				arr: [],
				total: 1,
				duan: [],
				chongdian: false,
				gunNum: '',
				shua: 0,
				dealno: '',
				i: 0,
				v: 0,
				p: 0,
				instate: '',
				startTime: '',
				amount: '',
				charge_type: '',
				c_name: '',
				signal: '',
				c_type: '',
				inpTime: 10,
				c_mac: '',
				c_gun: '',
				c_station: '',
				c_address: '',
				getID: '',
				choose: 0,
				isshow: 2,
				parkTotal: 0,
				getName: '',
				Isnav: 2,
				isActive: 0,
				token: "",
				pagenum: 1, //分页
				pagesize: 6,
				online: '',
				changeId: [],
				pagepark: 9,
				newpark: 1, //分页
				tableData: [],
				getStation: "",
				parkList: [],
				getFristID: "",
				input1: "",
				input2: "",
				kong: 1,
				ports: [],
				newpark2: 1,
				editForm: {},
				editForm1: {},
				dialogVisible: false, //端口弹出窗
				addDialogVisible: false,
				addDialogVisible1: false,
				isType: false,
				leftType: "",
				portNum: [],
				navList: [{
						name: '基本信息',
						id: 1
					},
					{
						name: '充电状态',
						id: 2
					}
				],
				editDialogVisible: false, //控制修改设备对话框显示隐藏
				editDialogVisible1: false, //控制修改设备对话框显示隐藏
				addForm: {
					token: localStorage.getItem("token").replace(/\"/g, ""),
					dev_id: "",
					name: "",
					mac: "",
					longitude: "",
					latitude: "",
					gun: "",
					contact_phone: "",
					contact_name: "",
					type: 4
				}, //添加设备添加数据
				addForm1: {
					token: localStorage.getItem("token").replace(/\"/g, ""),
					name: "",
					address: "",
					longitude: "",
					latitude: "",
					type: 4
				}, //添加设备添加数据
				//修改设备表单数据
				editFormRules: {
					dev_id: [{
							required: true,
							message: "请输入正确的信息",
							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "用户名的长度在3~10个字符之间",
							trigger: "blur"
						}
					],
					name: [{
							required: true,
							message: "请输入正确的信息",
							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "用户名的长度在3~10个字符之间",
							trigger: "blur"
						}
					],
					mac: [{
							required: true,
							message: "请输入正确的信息",
							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "用户名的长度在3~10个字符之间",
							trigger: "blur"
						}
					]
				},
				editFormRules1: {
					name: [{
							required: true,
							message: "请输入站点名",
							trigger: "blur"
						},
						{
							min: 3,
							max: 20,
							message: "站点名的长度在3~20个字符之间",
							trigger: "blur"
						}
					]
				},
				//添加表单的验证规则
				formRules: {
					dev_id: [{
						required: true,
						message: "设备编号不能为空",
						trigger: "blur"
					}],
					name: [{
						required: true,
						message: "名称不能为空",
						trigger: "blur"
					}],
					mac: [{
						required: true,
						message: "机号不能为空",
						trigger: "blur"
					}],
					address: [{
						required: true,
						message: "地址不能为空",
						trugger: "blur"
					}]
				},
				addFormRules1: {
					name: [{
							required: true,
							message: "请输入正确的信息",
							trigger: "blur"
						},
						{
							min: 3,
							max: 10,
							message: "用户名的长度在3~10个字符之间",
							trigger: "blur"
						}
					],
					address: [{
							required: true,
							message: "地址",
							trugger: "blur"
						},
						{
							trigger: "blur"
						}
					]
				},
				options: [{
						value: "7",
						label: "道路"
					},
					{
						value: "10",
						label: "高位视频"
					},
					{
						value: "11",
						label: "低位视频"
					}
				],
				selType: ""
			};
		},
		created() {
			this.token = localStorage.getItem("token");
			this.getRoadMes();
			// this.getRoadChargers()
		},
		methods: {
			huodeid(id, name, type, address, memo, mac, lot_rate_group, rate_group, kong) {
				localStorage.setItem("charId", id)
				localStorage.setItem("charName", name)
				localStorage.setItem("charMac", mac)
				if (kong == 1) {
					console.log("you");
					console.log(kong);
				}
				if (!kong == 1) {
					console.log("zuo");
					console.log(kong);
				}
				this.$store.commit("changeId", {
					chanId: id,
					name: name,
					type: type,
					address: address,
					memo: memo,
					lot_rate_group: lot_rate_group,
					rate_group: rate_group,
					kong: kong
				});
			},
			chooseDuan(index, state) {
				this.choose = index
				console.log(this.choose, state)
				this.gunNum = index + 1
				this.shua = state
				this.getNum()
			},
			getNum() {
				this.shua = this.duan[this.gunNum - 1].state
				console.log(this.duan[this.gunNum - 1].i,'电流')
				this.dealno = this.duan[this.gunNum - 1].dealno
				if(this.duan[this.gunNum - 1].i){
					this.i = (this.duan[this.gunNum - 1].i).toFixed(2)
				}else{
					this.i = 0
				}
				if(this.duan[this.gunNum - 1].v){
					this.v = (this.duan[this.gunNum - 1].v).toFixed(2)
				}else{
					this.v = 0
				}
				if(this.duan[this.gunNum - 1].p){
					this.p = (this.duan[this.gunNum - 1].p).toFixed(2)
				}else{
					this.p = 0
				}
				// this.i = (this.duan[this.gunNum - 1].i).toFixed(2)
				// this.v = (this.duan[this.gunNum - 1].v).toFixed(2)
				// this.p = (this.duan[this.gunNum - 1].p).toFixed(2)
				this.startTime = this.duan[this.gunNum - 1].start_time
				this.amount = (this.duan[this.gunNum - 1].amount).toFixed(2)
				this.charge_type = this.duan[this.gunNum - 1].charge_type
			},
			gunId(port, id, online) {
				console.log(port)
				console.log(id)
				this.isshow = 2
				this.gunNum = port
				this.getID = id
				if (online == true) {
					this.choose = port - 1
					this.dialogVisible = true
					let toKen = this.token.replace(/\"/g, "");
					this.$axios
						.get("admin/api/charger/" + id + "?token=" + toKen + "&attach=state,ports") //根据id点击修改的id查询设备信息
						.then(res => {
							console.log(res)
							this.duan = res.data.charger.ports
							this.getName = res.data.charger.name
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
							} else if (res.data.charger.type == 10) {
								this.c_type = '高位视频桩'
							} else {
								this.c_type = res.data.charger.type
							}
							if (res.data.charger.online == true) {
								this.instate = '设备在线'
							} else {
								this.instate = '设备离线'
							}
						});
					setInterval(() => {
						if (this.dialogVisible) {
							this.shuaxincharger()
							setTimeout(() => {
								this.getNum()
							}, 500);
						}
					}, 2000);
				} else {
					this.$message.error('端口设备已离线')
				}
			},
			shuaxincharger() {
				let toKen = this.token.replace(/\"/g, "");
				this.$axios
					.get("admin/api/charger/" + this.getID + "?token=" + toKen + "&attach=state,ports") //根据id点击修改的id查询设备信息
					.then(res => {
						console.log(res)
						this.duan = res.data.charger.ports
						this.getName = res.data.charger.name
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
						} else if (res.data.charger.type == 10) {
							this.c_type = '高位视频桩'
						} else {
							this.c_type = res.data.charger.type
						}
						if (res.data.charger.online == true) {
							this.instate = '设备在线'
						} else {
							this.instate = '设备离线'
						}
					});
			},
			getRoadMes() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get(
						"admin/api/stations/4?token=" +
						toKen +
						"&page=" +
						this.pagenum +
						"&row=6"
					)
					.then(res => {
						if (res.status == 200) {
							const {
								stations: result
							} = res.data; //用户列表数据
							this.tableData = result;
							this.total = res.data.total;
							this.getFristID = this.tableData[0].id;
							this.isActive = this.tableData[0].id;
							console.log(this.tableData);
							this.getRoadChargers();
						}
					});
			},
			reOn() {
				let toKen = this.token.replace(/\"/g, "");
				if (confirm('确定重启设备吗?')) {
					this.$axios.post("admin/api/charger/" + this.getID + "/reboot/?token=" + toKen).then(res => {
						console.log(res)
						if (res.data.error == 0) {
							this.$message.success("设备重启成功")
						} else {
							this.$message.error("设备重启失败")
						}
					})
				}
			},
			changeBg(id) {
				this.isActive = id;
			},
			shop() {
				let toKen = this.token.replace(/\"/g, "");
				if (confirm("确认停止充电吗？")) {
					this.$axios.delete("admin/api/charger/" + this.getID + "/" + this.gunNum + "/session?token=" + toKen)
						.then(res => {
							// this.daojishi(this.out)
							console.log(res)
							setTimeout(() => {
								this.shuaxincharger()
							}, 2000);
						})
				}
			},
			qidong() {
				this.chongdian = true
				console.log(this.choose)
			},

			getInputMes() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				if (!this.input1) {
					this.getRoadMes();
					return;
				}
				let url =
					"admin/api/stations?token=" +
					toKen +
					"&page=" +
					this.pagenum +
					"&row=6&type=4&keyword=" +
					this.input1;
				this.$axios.get(url).then(res => {
					if (res.status == 200) {
						console.log("url");
						console.log(url);
						this.tableData = res.data.stations; //用户列表数据
						this.total = res.data.total;
						// console.log(this.tableData)
					}
				});
			},

			getParksMes(id) {
				//token去掉引号
				this.getFristID = id;
				this.leftType = id;
				let toKen = this.token.replace(/\"/g, "");
				this.$axios
					.get(
						"admin/api/station/" +
						id +
						"/chargers/4?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=9&attach=ports"
					)
					.then(res => {
						//console.log(id)
						console.log(res.data.chargers);
						if (res.status == 200) {
							this.parkList = res.data.chargers;
							this.parkTotal = res.data.total;
							// for(let i in res.data.chargers){
							// 	this.ports = res.data.chargers
							// 	console.log(this.ports)
							// }
							// console.log(this.ports)
							this.isType = true;
							// console.log(this.getFristID);
						}
					});
			},
			changeNav(id) {
				this.Isnav = id
				this.isshow = id
			},
			search() {
				//token去掉引号
				if (!this.input2) {
					this.getRoadChargers();
					return;
				}
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				let url =
					"admin/api/chargers?token=" +
					toKen +
					"&page=" +
					this.newpark +
					"&row=14&station=" +
					this.getFristID +
					"&keyword=" +
					this.input2;
				this.$axios.get(url).then(res => {
					console.log(res.data);
					if (res.status == 200) {
						console.log("searchurl");
						console.log(url);
						this.parkList = res.data.chargers; //用户列表数据
						this.parkTotal = res.data.total;
						// console.log(this.tableData)
					}
				});
			},
			getRoadChargers() {
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get(
						"admin/api/station/" +
						this.getFristID +
						"/chargers?token=" +
						toKen +
						"&page=" +
						this.newpark +
						"&row=9&attach=ports"
					)
					.then(res => {
						console.log(res.data);
						if (res.status == 200) {
							this.parkList = res.data.chargers; //用户列表数据
							this.parkTotal = res.data.total;
							// for(let i in this.parkList){
							// 	this.ports.push(this.parkList[i].ports)
							// 	console.log(this.ports)
							// }
							// console.log(this.ports)
						}
					});
			},
			//启动充电
			sure() {
				let toKen = this.token.replace(/\"/g, "");
				this.$axios.post("admin/api/charger/" + this.getID + "/" + this.gunNum + "/session", {
						token: toKen,
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
			//点击确认按钮，添加新设备
			chargersUser() {
				let toKen = this.token.replace(/\"/g, "");
				this.$refs.addFormRef.validate(valid => {
					if (!valid) {
						return this.$message.error("请输入正确的信息");
					} else {
						this.$axios
							.post(
								"/admin/api/charger?token=" +
								this.addForm.token +
								"&dev_id=" +
								this.addForm.dev_id +
								"&name=" +
								this.addForm.name +
								"&latitude=" +
								this.addForm.latitude +
								"&contact_phone=" +
								this.addForm.contact_phone +
								"&contact_name=" +
								this.addForm.contact_name +
								"&longitude=" +
								this.addForm.longitude +
								"&gun=" +
								this.addForm.gun +
								"&mac=" +
								this.addForm.mac +
								"&type=4&station=" +
								this.getFristID
							)
							.then(res => {
								if (res.status !== 200) {
									return this.$message.error("添加失败!");
								}
								this.$message.success("添加成功!");
								this.addDialogVisible = false;
								console.log(this.addForm);
								console.log(res);
								//刷新用户列表
								setTimeout(() => {
									this.getRoadChargers();
								}, 1000);
							});
					} //若表单正则验证未通过，则不允许添加
				});
				//如果验证通过，则发起添加用户请求
			},
			chargersUser1() {
				let toKen = this.token.replace(/\"/g, "");
				this.$refs.addFormRef1.validate(valid => {
					if (!valid) {
						return this.$message.error("请输入正确的信息");
					} else {
						this.$axios.post("/admin/api/station", this.addForm1).then(res => {
							if (res.status !== 200) {
								return this.$message.error("添加失败!");
							}
							this.$message.success("添加成功!");
							this.addDialogVisible1 = false;
							setTimeout(() => {
								this.getRoadMes();
							}, 2000);
						});
					} //若表单正则验证未通过，则不允许添加
				});
				//如果验证通过，则发起添加用户请求
			},
			handleCurrentChange(newPage) {
				//console.log(newPage)
				this.pagenum = newPage;
				this.getRoadMes();
			},
			parksNumber(parknum) {
				this.newpark = parknum;
				if (this.isType) {
					this.getParksMes(this.leftType); //通过id查询右边数据
				} else {
					this.getRoadChargers(); //页面加载查询总数据
				}
			},
			//根据ID删除泊位
			async removeUserByID(id) {
				console.log(id);
				let toKen = this.token.replace(/\"/g, "");
				const confirmRes = await this.$confirm(
					"此操作将永久删除该数据, 是否继续?",
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
					.delete("/admin/api/charger/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res.status);
						if (res.status == 200) {
							this.$message.success("删除数据成功");
							setTimeout(() => {
								this.getRoadChargers(); //刷新设备数据
							}, 1000);
						} else {
							this.$message.error("删除数据失败");
						}
					});
				//删除设备提示
			},
			async removeUserByID1(id) {
				console.log(id);
				let toKen = this.token.replace(/\"/g, "");
				const confirmRes1 = await this.$confirm(
					"此操作将永久删除该数据, 是否继续?",
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
					.delete("/admin/api/station/" + id + "?token=" + toKen)
					.then(res => {
						console.log(res.status);
						if (res.status == 200) {
							this.$message.success("删除数据成功");
							setTimeout(() => {
								this.getRoadMes(); //刷新设备数据
								this.getRoadChargers();
							}, 2000);
							console.log(this.tableData);
						} else {
							this.$message.error("删除数据失败");
						}
					});
				//删除设备提示
			},
			//点击修改，将选择的id查询到的数据渲染到修改文本框
			showEditDialog(id) {
				this.editDialogVisible = true;
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get("admin/api/charger/" + id + "?token=" + toKen + "&attach=state") //根据id点击修改的id查询设备信息
					.then(res => {
						//console.log(res.status)
						if (res.status == 200) {
							this.editForm = res.data.charger;
							console.log(res.data.charger);
						}
					});
			},
			showEditDialog1(id) {
				this.editDialogVisible1 = true;
				//token去掉引号
				let toKen = this.token.replace(/\"/g, "");
				// console.log(toKen)
				this.$axios
					.get("admin/api/station/" + id + "?token=" + toKen) //根据id点击修改的id查询设备信息
					.then(res => {
						//console.log(res.status)
						if (res.status == 200) {
							this.editForm1 = res.data.station;
						}
					});
			},

			//提交修改后的设备信息
			editChargerInfo() {
				let toKen = this.token.replace(/\"/g, "");
				this.$refs.editFormRef.validate(valid => {
					if (!valid) {
						return this.$message.error("请输入正确的信息");
					} else {
						if (confirm("确认修改吗?")) {
							this.$axios
								.put("/admin/api/charger/" + this.editForm.id, {
									token: toKen,
									dev_id: this.editForm.dev_id,
									name: this.editForm.name,
									mac: this.editForm.mac,
									gun: this.editForm.gun,
									contact_phone: this.editForm.contact_phone,
									contact_name: this.editForm.contact_name,
									longitude: this.editForm.longitude,
									latitude: this.editForm.latitude
								})
								.then(res => {
									if (res.status !== 200) {
										return this.$message.error("设备修改失败!");
									}
									this.$message.success("设备修改成功!");
									this.addDialogVisible = false;
									//刷新设备列表
									setTimeout(() => {
										this.getRoadChargers();
									}, 1000);
									//关闭对话框
									this.editDialogVisible = false;
								});
						}
					} //若表单正则验证未通过，则不允许添加
				});
				//如果验证通过，则发起添加修改设备请求
			},
			//提交修改后的设备信息
			editChargerInfo1() {
				let toKen = this.token.replace(/\"/g, "");
				this.$refs.editFormRef1.validate(valid => {
					if (!valid) {
						return this.$message.error("请输入正确的信息");
					} else {
						if (confirm("确认修改吗?")) {
							this.$axios
								.put("/admin/api/station/" + this.editForm1.id, {
									token: toKen,
									name: this.editForm1.name,
									address: this.editForm1.address,
									longitude: this.editForm.longitude,
									latitude: this.editForm.latitude
								})
								.then(res => {
									if (res.status !== 200) {
										return this.$message.error("设备站点失败!");
									}
									this.$message.success("设备站点成功!");
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
					} //若表单正则验证未通过，则不允许添加
				});
				//如果验证通过，则发起添加修改设备请求
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
	
	.tipG{
		width: 50px;
		height: 25px;
		background-color: #d9f2e6;
		color: #01a65a;
		border-radius: 5px;
		line-height: 25px;
		font-size: 13px;
	}
	
	.tipB{
		width: 50px;
		height: 25px;
		background-color: #e1f3fe;
		color: #6abff7;
		border-radius: 5px;
		line-height: 25px;
		font-size: 13px;
	}
	
	.tipR{
		width: 50px;
		height: 25px;
		background-color: #f4dfe0;
		color: #ff5b4c;
		border-radius: 5px;
		line-height: 25px;
		font-size: 13px;
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

	.zhanCon {
		height: 150px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.inpt {
		width: 275px;
		height: 30px;
	}

	.conLeft {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.navList {
		width: 100px;
		cursor: pointer;
		text-align: center;
	}

	.conBot {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}

	.offline {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
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

	.ani {
		width: 60%;
		height: 200px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
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

	.reOn {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 15px;
		background-color: #00AEFF;
		color: white;
		cursor: pointer;
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

	.inpt1 {
		width: 280px;
		height: 30px;
	}

	.tanchuCon {
		width: 20%;
		display: flex;
		flex-direction: column;
		background-color: whitesmoke;
		height: auto;
		overflow: auto;
	}

	.chongING {
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
	}

	.blue {
		background-color: dodgerblue;
	}

	.tanchuCon1 {
		width: 80%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
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

	.kongxian {
		font-size: 20px;
		color: gray;
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

	.danchuBox {
		width: 90%;
		margin: 0 auto;
		height: 400px;
		display: flex;
		flex-direction: column;
	}

	.BGactive {
		background-color: #bed3ff;
	}

	.BGactive1 {
		color: #0C52DE;
		border-bottom: solid 1px #0C52DE;
	}

	.parkName {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.sousuo {
		display: flex;
		flex-direction: row;
	}

	.leftBox-right {
		width: 20%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.leftBox-right img {
		margin-top: -25px;
	}

	.leftBox-right div {
		height: 20px;
		width: 20px;
		border-radius: 50%;
		margin-left: 20px;
		margin-top: 20px;
	}

	.parkIcon {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
	}

	.parkIcon div {
		background-color: #f2d0bd;
		height: 22px;
		width: 55px;
		line-height: 22px;
		border-radius: 5px;
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
		width: 45%;
		text-align: left;
		line-height: 35px;
	}

	.jindu {
		width: 280px;
		height: 50px;
		display: flex;
		flex-direction: row;
		margin: 0 20px;
		align-items: center;
		cursor: pointer;
	}

	.jiduBox {
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.jiduBox1 {
		width: 100%;
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.leftBox {
		display: flex;
		flex-direction: row;
	}

	/* 弹出对话框边框样式 */
	.addinput {
		border: solid #1c6ff9 1px;
		border-radius: 10px;
	}

	.right-con-left {
		width: 26%;
		box-shadow: 1px 1px 20px 10px #edf1f5;
		border-radius: 10px;
	}

	.but-weizhi1 {
		margin-left: 10px;
	}

	.right-con-right {
		width: 68%;
	}

	.el-button--success {
		margin-left: 20px;
		border-radius: 10px;
		height: 37px;
		color: #1e69fe;
		background-color: #fff;
		border-color: #1e69fe;
		width: 100px;
	}
	
	.el-button--success1 {
		margin-left: 10px;
		border-radius: 10px;
		height: 37px;
		color: #1e69fe;
		background-color: #fff;
		border-color: #1e69fe;
		width: 75px;
	}

	.parkimg {
		margin: 13px 20px;
	}

	.parkimg img {
		width: 78px;
		height: 78px;
	}

	.el-table .cell {
		line-height: 44px;
	}

	.right-con {
		width: 95%;
		margin: 0 auto;
		height: auto;
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

	.textBox-right {
		width: 70%;
		height: 34px;
		border-radius: 10px;
		border: solid 1px #1e69fe;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-ms-flex-pack: distribute;
	}

	.right-con-top {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 15px;
	}

	.but-weizhi {
		margin-left: 20px;
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
		width: 55%;
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
