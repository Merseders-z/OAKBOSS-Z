<template>
  <div class="oneCard-right">
    <div class="UserAssets-right-top">
      <div class="user-left">
        <span class="user-word">停车报表</span>
      </div>
      <div class="users-right">
        <myhead></myhead>
      </div>
    </div>
    <div class="conB">
      <div class="UserAssets-right-text">
        <div class="date">
          <div v-for="item in dateList">
            <span
              :class="{ chooseB: item.id == isBg }"
              @click="changeBg(item.id)"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="dateSel">
          <template>
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </template>
        </div>
        <div class="RoadSearch">
          <img
            src="../../assets/images/search.png"
            style="width: 15px;height: 15px;"
          />
          <input type="text" placeholder="请输入关键字" class="searchText" />
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="getTableData"
            >查询</el-button
          >
        </div>
        <!-- <div class="whiteBut">
          <img
            src="../../assets/images/export.png"
            style="width: 14px;height: 14px;"
          />
          导出
        </div>
        <div class="whiteBut">
          <img
            src="../../assets/images/print.png"
            style="width: 14px;height: 14px;"
          />
          打印
        </div> -->
      </div>
    </div>
    <div style="height: 700px;">
      <div style="height: 680px;">
        <table class="tableClass">
          <tr class="firstTr">
            <td class="td1">{{ tableChangeInfo.itemName }}</td>
            <!-- <td class="td2">x</td> -->
            <td class="td2">缴费数量</td>
            <td class="td2">缴费金额</td>
            <td class="td2">支付金额</td>
            <td class="td2">驶入次数</td>
            <td class="td2">应收金额</td>
            <td class="td2">实收金额</td>
            <!-- <td class="td2">x</td>
            <td class="td2">图表</td> -->
          </tr>
          <tr class="dataTable" v-for="item in tableData">
            <td>{{ item.dt }}</td>
            <!-- <td>x</td> -->
            <td>{{ item.payment_service_22_count }}</td>
            <td>{{ item.payment_service_22_amount }}</td>
            <td>{{ item.payment_service_22_pay }}</td>
            <td>{{ item.pdr_count }}</td>
            <td>{{ item.pdr_amount }}</td>
            <td>{{ item.pdr_paid }}</td>
            <!-- <td>x</td>
            <td>
              <img
                src="../../assets/images/The chart.png"
                @click="(dialogVisible = true), charts(e)"
                style="cursor: pointer;"
              />
            </td> -->
          </tr>
        </table>
      </div>
      <el-dialog title="123" :visible.sync="dialogVisible" width="70%">
        <div class="tanchuTubiao" id="myEcharts"></div>
      </el-dialog>
    </div>
    <div class="UserAssets-bottom">
      <div class="UserAssets-bottom-left" :data="tableData">
        <span>共{{ total }}条信息</span>
      </div>
      <div class="UserAssets-bottom-right">
        <el-pagination
          background
          :current-page.sync.number="pagenum"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
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
      tableData: [], //卡数据
      tableChangeInfo: {
        itemName: "日期",
        code: "025BC0A1E99A4C01858488BA68803998"
      },
      tanchuT: "",
      option: "",
      dateList: [
        {
          name: "日",
          id: 1
        },
        {
          name: "月",
          id: 3
        },
        {
          name: "年",
          id: 5
        }
      ],
      username: "",
      total: 1, //数据总条数
      isActive: true,
      isBg: 1,
      dialogVisible: false,
      addDialogVisible: false,
      add: false,
      changeList: false,
      selected: 0, //下拉框
      pagenum: 1, //分页
      pagenum2: 1, //分页
      token: "", //token令牌
      pagesize: 10, //每次查询条数
      type: 0,
      input: "",
      value1: "",
      value: true,
      e: 0,
      typeList: [
        {
          id: 0,
          type: "所有"
        },
        {
          id: 1,
          type: "手机"
        },
        {
          id: 2,
          type: "微信"
        },
        {
          id: 3,
          type: "支付宝"
        }
      ]
    };
  },
  created() {
    this.token = localStorage.getItem("token").replace(/\"/g, "");
    this.getTableData();
  },
  methods: {
    getTableData() {
      let url =
        "/admin/api/report/" +
        this.tableChangeInfo.code +
        "/?token=" +
        this.token +
        "&page=" +
        this.pagenum +
        "&row=" +
        this.pagesize;

      this.$axios.get(url).then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          console.log("res");
          console.log(this.tableData);
          this.total = res.data.total || 0;
        }
      });
    },
    charts(e) {
      this.$nextTick(() => {
        this.drawChart();
      });
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myEcharts"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          show: true
        },
        xAxis: {
          type: "category",
          data: [
            "订单总数",
            "订单金额",
            "分成金额",
            "比比清金额",
            "转账金额",
            "钱包分成"
          ],
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16
            }
          }
        },
        yAxis: {
          type: "value",
          name: "单位:元",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16
            }
          }
        },
        series: [
          {
            data: [2320, 1700, 3150, 2480, 4670, 1110],
            type: "bar",
            barWidth: "60",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: "#006bdf"
                  },
                  {
                    offset: 0,
                    color: "#4cbbfb"
                  }
                ])
              }
            },
            label: {
              //label要加入normal才可生效,label即为x轴对应Y轴的值
              normal: {
                show: true,
                color: "#4cbbfb", //设置渐变时候控制不到颜色，只能通过全局textStyle来控制
                position: "top"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    changeIcon() {
      this.changeList = !this.changeList;
    },

    changeBg(id) {
      this.isBg = id;

      switch (id) {
        case 1:
          this.tableChangeInfo.code = "025BC0A1E99A4C01858488BA68803998";
          this.tableChangeInfo.itemName = "日期";
          break;
        case 3:
          this.tableChangeInfo.code = "8807E28C31CE405084E9340B80B74A09";
          this.tableChangeInfo.itemName = "月度";
          break;
        case 5:
          this.tableChangeInfo.code = "DD43DB30C64C42CA9286630D83EAFF1C";
          this.tableChangeInfo.itemName = "年度";
          break;
        default:
          this.tableChangeInfo.code = "025BC0A1E99A4C01858488BA68803998";
          this.tableChangeInfo.itemName = "日期";
      }
      this.getTableData();
    },

    //监听页码值改变
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getTableData();
    }
  }
};
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

.tanchuTubiao {
  width: 100%;
  height: 500px;
}

.RoadSearch {
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: solid 1px #0000ff;
  border-radius: 5px;
  box-sizing: border-box;
  justify-content: space-around;
}

.searchText {
  border: none;
}

.tanchubox {
  height: 500px;
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

.tubBoxTitle {
  width: 90%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tubBoxConBox {
  width: 100%;
  height: 80%;
}

.tubBoxTitleBox {
  width: 100%;
  background-color: #f3f6fb;
}

.tubBoxTitleW {
  font-size: 18px;
}

.bgTuli {
  height: 100px;
  width: 130px;
  box-shadow: ;
  position: absolute;
  box-shadow: 0px 0px 10px 5px #cccccc;
  top: center;
  right: 0;
  border-radius: 10px;
}

.tbodyBox {
  display: flex;
  flex-direction: row;
}

.tbodyBox div {
  display: flex;
  flex: 4;
  justify-content: center;
  border-bottom: solid 1px #cddeff;
  border-left: solid 1px #cddeff;
  border-right: solid 1px #cddeff;
  height: 56px;
  align-items: center;
}

.dateColor {
  font-size: 16px;
  color: #7c7c7c;
}

.dataTable td {
  font-size: 16px;
  text-align: center;
  color: #7c7c7c;
  border: solid 1px #cddeff;
}
.dataTable td {
  /* 张义华添加 */
  height: 55px;
}

.tBox {
  text-align: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
}

.tbox2 {
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #cddeff;
}

.tBox1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50%;
  align-items: center;
  border-bottom: solid 1px #cddeff;
}

.tBox1 div {
  display: flex;
  flex: 4;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #cddeff;
  border-left: solid 1px #cddeff;
  border-right: solid 1px #cddeff;
}

.tableClass {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
}

.td1 {
  width: 16%;
  height: 100px;
  background-color: #dce8ff;
  text-align: center;
  font-size: 20px;
  color: black;
  border: solid 1px #cddeff;
}

.td2 {
  width: 9%;
  background-color: #dce8ff;
  text-align: center;
  font-size: 20px;
  color: black;
  border: solid 1px #cddeff;
}

.td3 {
  width: 33%;
  background-color: #dce8ff;
  font-size: 20px;
  color: black;
  border: solid 1px #cddeff;
}

.td6 {
  width: 15%;
  background-color: #dce8ff;
  text-align: center;
  font-size: 20px;
  color: black;
  border: solid 1px #cddeff;
}

.whiteBut {
  width: 95px;
  height: 37px;
  border: solid 1px #1e69fe;
  border-radius: 10px;
  text-align: center;
  line-height: 37px;
  font-size: 16px;
  cursor: pointer;
}

.imgBoxBotM {
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-between;
  color: white;
  align-items: center;
}

.money {
  font-size: 22px;
}

.chongzhi {
  width: 50px;
  height: 18px;
  border: solid 1px white;
  border-radius: 9px;
  text-align: center;
  line-height: 18px;
}

.netWord {
  margin-left: 30px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.netWord1 {
  font-size: 18px;
  color: white;
}

.netWord2 {
  font-size: 28px;
  color: white;
}

.imgBoxConL {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.netImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #71b7f2;
  text-align: center;
  line-height: 50px;
}

.netImg1 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #eb9494;
  text-align: center;
  line-height: 50px;
}

.netImg2 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #8ea4be;
  text-align: center;
  line-height: 50px;
}

.netImg3 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #c0c0c0;
  text-align: center;
  line-height: 50px;
}

.imgWord {
  color: #dedede;
  font-size: 13px;
}

.seeBox {
  width: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.imgBoxCon {
  width: 90%;
  height: 90px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.imgBoxBotW {
  width: 90%;
  height: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.imgBoxBot {
  width: 100%;
  height: 30px;

  border-top: dashed 1px #dedede;
}

.tubiaobox {
  width: 90%;
  height: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
}

.tub1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 370px;
  justify-content: space-between;
  align-items: center;
}

.tubBox {
  width: 30%;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
  border: solid 1px #1e69fe;
  box-shadow: 0 0 10px 5px #e8e9ea;
}

.tub {
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -90px;
  align-items: center;
}

.imgBoxTop {
  width: 95%;
  margin: 0 auto;
  height: 30px;
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  justify-content: flex-end;
}

.imgBoxB {
  width: 450px;
  height: 160px;
  background: linear-gradient(to right, #479ae8, #3a6cd6);
  border-radius: 20px;
  box-shadow: 1px 1px 10px 2px #cccccc;
  margin: 20px 30px;
}

.imgBoxR {
  width: 450px;
  height: 160px;
  background: linear-gradient(to right, #e06e6e, #e44a4a);
  border-radius: 20px;
  box-shadow: 1px 1px 10px 2px #cccccc;
  margin: 20px 30px;
}

.imgBoxG {
  width: 450px;
  height: 160px;
  background: linear-gradient(to right, #6781a2, #567193);
  border-radius: 20px;
  box-shadow: 1px 1px 10px 2px #cccccc;
  margin: 20px 30px;
}

.date {
  width: 300px;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: solid 1px #1e69fe;
}

.date span {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  color: #1e69fe;
  font-size: 16px;
}

.date div {
  width: 33.333%;
  height: 40px;
  text-align: center;
  cursor: pointer;
}

.imgBoxOff {
  width: 450px;
  height: 160px;
  background: linear-gradient(to right, #567193, #567193);
  border-radius: 20px;
  box-shadow: 1px 1px 10px 2px #cccccc;
  margin: 20px 30px;
}

.chooseB {
  background-color: #1e69fe;
  color: white !important;
}

.conB {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}

.el-table td {
  padding: 0 0;
}

.dateSel >>> .el-input__inner {
  height: 40px;
  border-radius: 5px;
  border: solid 1px #1e69fe;
}

.el-table td div {
  margin: 0 auto;
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

.el-button--primary {
  color: #fff;
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
  width: 1000px;
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
